import { AnyAction, createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { $authHost, $host } from "../../http";
import jwtDecode from "jwt-decode";

interface IRegistrationProps {
  id?: number
  email: string,
  password: string,
  name: string,
  surname: string,
  tel: string,
  street: string,
  house: string,
  floor: string,
  entrance: string,
  room: string
}

interface ILoginProps {
  login: string,
  password: string
}

export interface IUser {
  id: number,
  email: string,
  role: "USER" | "ADMIN"
}

export interface IUserState {
  isAuth: boolean,
  user: IUser | {},
  error: string | undefined | null
}

const fetchRegistration = createAsyncThunk<IRegistrationProps, IRegistrationProps, { rejectValue: string }>(
  "user/fetchRegistration",
  async ({ email, password, name, surname, tel, street, house, floor, entrance, room }, { rejectWithValue }) => {
    try {
      const { data } = await $host.post("api/user/registration", {
        email,
        password,
        name,
        surname,
        tel,
        street,
        house,
        floor,
        entrance,
        room
      });
      const token: string = data.token;
      localStorage.setItem('token', token);
      return jwtDecode(token);
    } catch (e: any) {
      return rejectWithValue(e.response.data.message);
    }
  }
);


const fetchLogin = createAsyncThunk<IUser, ILoginProps, { rejectValue: string }>(
  "user/fetchLogin",
  async ({ login, password }, { rejectWithValue }) => {
    try {
      const { data } = await $host.post("api/user/login", { email: login, password });
      const token: string = await data.token;
      await localStorage.setItem('token', token);
      return jwtDecode(token);
    } catch (e: any) {
      return rejectWithValue(e.response.data.message);
    }
  }
);

const fetchAuth = createAsyncThunk<IUser, void>(
  "user/fetchAuth",
  async () => {
    const { data } = await $authHost.get("api/user/auth");
    await localStorage.setItem('token', data.token);
    return jwtDecode(data.token);
  }
);

const fetchUserInfo = createAsyncThunk<IRegistrationProps, void, { state: { user: any } }>(
  'user/fetchUserInfo',
  async (_, { getState }) => {
    const { user } = await getState();
    const { data }: any = await $authHost.post('api/user/info', { id: user.user.id });
    if (user.isAuth) {
      return data.user;
    } else {
      throw Error();
    }
  }
)

function isError(action: AnyAction) {
  return action.type.endsWith('rejected');
}

const initialState: IUserState = {
  isAuth: false,
  user: {},
  error: null
};

const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    setAuth: (state, action: PayloadAction<boolean>) => {
      state.isAuth = action.payload;
    },
    setUser: (state, action: PayloadAction<any>) => {
      state.user = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchLogin.fulfilled, (state, action: PayloadAction<IUser>) => {
        state.isAuth = true;
        state.user = action.payload;
      })
      .addCase(fetchAuth.fulfilled, (state, action: PayloadAction<IUser>) => {
          state.user = action.payload;
          state.isAuth = true;
      })
      .addMatcher(isError, (state, action: PayloadAction<string>) => {
        state.user = {};
        state.isAuth = false;
        state.error = action.payload;
      })
  }
});

export { fetchRegistration, fetchLogin, fetchAuth, fetchUserInfo };
export default userSlice.reducer;
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import { $api } from "@services/api";
import { IUserState } from "@store/features/user";
import {IOrderProducts} from "@store/features/order/model";
import {OrderType} from "@store/features/order/ui";
import {PaymentType} from "@store/features/order/ui/DeliveryForm";

export type StatusType = 'new' | 'production' | 'produced' | 'delivery' | 'completed' | 'deleted';

export interface IOrdersFetched {
  id: number,
  createdAt: string,
  updatedAt: string,
  totalPrice: number,
  totalAmount: number,
  type: OrderType,
  name: string,
  address: string | null,
  entrance: number | null,
  floor: number | null,
  room: number | null,
  tel: string,
  email: string,
  day: "today" | null,
  time: string | null,
  utensils: number,
  payment: PaymentType,
  commentary: string | null,
  promocode: string | null,
  status: StatusType,
  userId: number,
  products: IOrderProducts[],
}

type statusType = 'PENDING' | 'FULFILLED' | 'REJECTED';
export type SelectedType = "profile" | "orders" | "settings" | 'admin';

export interface IOrdersReducer {
  status: statusType;
  page: SelectedType
}

const fetchOrdersByUserId = createAsyncThunk<IOrdersFetched[], void, { state: { userReducer: IUserState } }>(
  "account/fetchOrdersByUserId",
  async (_, { rejectWithValue, getState }) => {
    try {
      const { userReducer } = getState();
      const response = await $api.get(`api/order/get/${userReducer.user?.id}`);
      return response.data;
    } catch (error: any) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

const initialState: IOrdersReducer = {
  status: "PENDING",
  page: 'profile'
}

export const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    setPage: (state, action: PayloadAction<SelectedType>) => {
      state.page = action.payload;
    }
  },
  extraReducers: builder => {
    builder.addCase(fetchOrdersByUserId.pending, (state: IOrdersReducer) => {
      state.status = "PENDING"
    })
      .addCase(fetchOrdersByUserId.fulfilled, (state: IOrdersReducer, action) => {
        if (action.payload.length > 0) {
          state.status = "FULFILLED"
        } else {
          state.status = "REJECTED"
        }
      })
      .addCase(fetchOrdersByUserId.rejected, (state: IOrdersReducer) => {
        state.status = "REJECTED"
      })
  }
})

export { fetchOrdersByUserId };

export const {setPage} = ordersSlice.actions;

export default ordersSlice.reducer;
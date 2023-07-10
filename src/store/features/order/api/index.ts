import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IUserState} from "@store/features/user";
import {ICartState} from "@store/features/cart/api";
import OrderDto from "@store/features/order/model/OrderDto";
import {$api, $api_guest} from "@services/api";
import {IFormData} from "../model";

export interface IPromocode {
    id: number,
    code: string,
    type: 'RUB' | 'percent',
    discount: number,
    limit: 'infinite' | number
}


const fetchOrderCreate = createAsyncThunk<void, IFormData, { rejectValue: any, state: { userReducer: IUserState, cartReducer: ICartState, orderCreateReducer: IOrderCreate } }>(
  'order/fetchOrderCreate',
  async (formData, { rejectWithValue, getState }) => {
    try {
      const { userReducer, cartReducer, orderCreateReducer } = getState();
      const orderDto = new OrderDto(cartReducer, userReducer, formData, orderCreateReducer);
      const response = await $api.post('api/order/create', orderDto.order);
      return response.data;
    } catch (error: any) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
)

const fetchPromocodeCheck = createAsyncThunk<Awaited<any>, string, {rejectValue: any}>(
    'order/fetchPromocodeCheck',
    async (code, { rejectWithValue }) => {
        try {
            const {data} = await $api_guest.post<Awaited<IPromocode>>('api/promocode/check', { code });
            return data;
        } catch (error: any) {
            if (error.response && error.response.data.message) {
                return rejectWithValue(error.response.data.message);
            } else {
                return rejectWithValue(error.message);
            }
        }
    }
)

export interface IOrderCreate {
    orderCreateLoadProcess: boolean
    promocodeCreateLoadProcess: boolean
    formData: IFormData | null,
    promocode: IPromocode | null,
    promocodeError: boolean,
    orderError: boolean,
}

const initialState: IOrderCreate = {
    orderCreateLoadProcess: false,
    promocodeCreateLoadProcess: false,
    formData: null,
    promocode: null,
    promocodeError: false,
    orderError: false
}

const orderCreateSlice = createSlice({
    name: 'orderCreateReducer',
    initialState,
    reducers: {
        setFormData: (state, action: PayloadAction<IFormData | null>) => {
            state.orderCreateLoadProcess = true;
            state.formData = action.payload;
            state.orderCreateLoadProcess = false;
        },
        setPromocodeError: (state, action: PayloadAction<boolean>) => {
            state.promocodeError = action.payload;
        },
        setPromocode: (state, action: PayloadAction<IPromocode | null>) => {
            state.promocode = action.payload
        },
        clearOrderData: (state) => {
            state.orderCreateLoadProcess = true;
            state.formData = null;
            state.promocode = null;
            state.promocodeError = false;
            state.orderCreateLoadProcess = false;
        },
        clearPromocodeData: (state) => {
            state.promocodeError = false;
            state.promocode = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchPromocodeCheck.pending, (state) => {
                state.promocodeError = false
                state.promocodeCreateLoadProcess = true
            })
            .addCase(fetchPromocodeCheck.fulfilled, (state, action: PayloadAction<IPromocode>) => {
                state.promocodeError = false
                state.promocode = action.payload
                state.promocodeCreateLoadProcess = false
            })
            .addCase(fetchPromocodeCheck.rejected, (state) => {
                state.promocodeError = true
                state.promocode = null
                state.promocodeCreateLoadProcess = false
            })

        builder
            .addCase(fetchOrderCreate.pending, (state) => {
                state.orderError = false;
                state.orderCreateLoadProcess = true;

            })
            .addCase(fetchOrderCreate.fulfilled, (state) => {
                state.orderError = false;
                state.orderCreateLoadProcess = false;
            })
            .addCase(fetchOrderCreate.rejected, (state) => {
                state.orderError = true;
                state.orderCreateLoadProcess = false;
            })
    }
})

export const { setFormData, setPromocodeError, setPromocode, clearOrderData, clearPromocodeData } = orderCreateSlice.actions;

export { fetchOrderCreate, fetchPromocodeCheck }

export default orderCreateSlice.reducer;
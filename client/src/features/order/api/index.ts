import { createAsyncThunk } from "@reduxjs/toolkit";
import { IUserState } from "entities/user";
import { ICartState } from "entities/cart";
import OrderDto from "features/order/model/OrderDto";
// import { $api } from "processes/api";
import { IFormInputs } from "../ui/DeliveryForm";

const fetchOrderCreate = createAsyncThunk<void, IFormInputs, { rejectValue: any, state: { userReducer: IUserState, cartReducer: ICartState } }>(
  'order/fetchOrderCreate',
  async (formData, { rejectWithValue, getState }) => {
    try {
      const { userReducer, cartReducer } = getState();
      // @ts-ignore
      const orderDto = new OrderDto(cartReducer, userReducer, formData)
      console.log(orderDto)
      // await $api.post('api/order/create', orderDto.order);
    } catch (error: any) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
)

export { fetchOrderCreate }
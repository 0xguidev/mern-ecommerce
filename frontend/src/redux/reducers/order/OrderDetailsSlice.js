import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const OrderDetailsSlice = createSlice({
  name: 'orderDetails',
  initialState: {
    loadingOrderDetails: 'idle',
    orderDetails: '',
    errorOrderDetails: '',
  },
  reducers: {
    orderDetailsLoading: (state) => {
      return {
        ...state,
        loadingOrderDetails: 'pending',
      };
    },
    orderDetailsSucess: (state, action) => {
      return {
        ...state,
        loadingOrderDetails: 'idle',
        orderDetails: action.payload,
        errorOrderDetails: '',
      };
    },
    orderDetailsError: (state, action) => {
      return {
        ...state,
        loadingOrderDetails: 'idle',
        orderDetails: {},
        errorOrderDetails: action.payload,
      };
    },
  },
});

export const { orderDetailsLoading, orderDetailsSucess, orderDetailsError } =
  OrderDetailsSlice.actions;
export default OrderDetailsSlice.reducer;

export const asyncOrderDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch(orderDetailsLoading());

    const {
      user: { user },
    } = getState();

    const { data } = await axios({
      method: 'get',
      url: `http://localhost:3001/api/orders/${id}`,
      headers: {
        authorization: `Bearer ${user.token}`,
      },
    });
    dispatch(orderDetailsSucess(data));
  } catch (error) {
    dispatch(orderDetailsError(error.message));
  }
};

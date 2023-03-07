import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const PayOrderSlice = createSlice({
  name: 'orderPay',
  initialState: {
    loadingOrderPay: 'idle',
    orderPay: '',
    errorOrderPay: '',
  },
  reducers: {
    orderPayLoad: (state) => {
      return {
        ...state,
        loadingOrderPay: 'pending',
      };
    },
    orderPaySuccess: (state, action) => {
      return {
        ...state,
        loadingOrderPay: 'idle',
        orderPay: action.payload,
        errorOrderPay: '',
      };
    },
    orderPayReset: (state) => {
      return {
        ...state,
        loadingOrderPay: 'idle',
        orderPay: {},
        errorOrderPay: '',
      };
    },
    orderPayError: (state, action) => {
      return {
        ...state,
        loadingOrderPay: 'idle',
        orderPay: {},
        errorOrderPay: action.payload,
      };
    },
  },
});

export const { orderPayLoad, orderPaySuccess, orderPayReset, orderPayError } =
  PayOrderSlice.actions;
export default PayOrderSlice.reducer;

export const asyncPayOrder =
  (orderId, paymentResult) => async (dispatch, getState) => {
    try {
      dispatch(orderPayLoad());

      const {
        user: { user },
      } = getState();

      const { data } = await axios({
        method: 'put',
        url: `http://localhost:3001/api/orders/${orderId}/pay`,
        headers: {
          authorization: `Bearer ${user.token}`,
          'Content-Type': 'application/json',
        },
        data: paymentResult,
      });
      dispatch(orderPaySuccess(data));
    } catch (error) {
      dispatch(orderPayError(error.message));
    }
  };

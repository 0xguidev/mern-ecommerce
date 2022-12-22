import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const ordersReducer = createSlice({
  name: 'orders',
  initialState: {
    loadingOrder: 'idle',
    loadingOrderDetails: 'idle',
    loadingOrderPay: 'idle',
    order: '',
    orderDetails: '',
    orderPay: '',
    errorOrder: '',
    errorOrderDetails: '',
    errorOrderPay: '',
  },
  reducers: {
    orderLoading(state) {
      if (state.loadingOrder === 'idle') {
        state.loadingOrder = 'pending';
      }
    },
    orderSucess(state, action) {
      if (state.loadingOrder === 'pending') {
        state.loadingOrder = 'idle';
        state.errorOrder = '';
        state.order = action.payload;
      }
    },
    orderError(state, action) {
      if (state.loadingOrder === 'pending') {
        state.loadingOrder = 'idle';
        state.order = {};
        state.errorOrder = action.payload;
      }
    },
    orderDetailsLoading(state, action) {
      if (state.loadingOrderDetails === 'idle') {
        state.loadingOrderDetails = 'pending';
      }
    },
    orderDetailsSucess(state, action) {
      if (state.loadingOrderDetails === 'pending') {
        state.loadingOrderDetails = 'idle';
        state.orderDetails = action.payload;
        state.errorOrderDetails = '';
      }
    },
    orderDetailsError(state, action) {
      if (state.loadingOrderDetails === 'pending') {
        state.loadingOrderDetails = 'idle';
        state.orderDetails = {};
        state.errorOrderDetails = action.payload;
      }
    },
    orderPayLoad(state, action) {
      if (state.loadingOrderPay === 'idle') {
        state.loadingOrderPay = 'pending';
      }
    },
    orderPaySucess(state, action) {
      if (state.loadingOrderPay === 'pending') {
        state.loadingOrderPay = 'idle';
        state.orderPay = action.payload;
        state.errorOrderPay = '';
      }
    },
    orderPayReset(state) {
      state.loadingOrderPay = 'idle';
      state.orderPay = {};
      state.errorOrderPay = '';
    },
    orderPayError(state, action) {
      if (state.loadingOrderPay === 'pending') {
        state.loadingOrderPay = 'idle';
        state.orderPay = {};
        state.errorOrderPay = action.payload;
      }
    },
  },
});

export const {
  orderLoading,
  orderSucess,
  orderError,
  orderDetailsLoading,
  orderDetailsSucess,
  orderDetailsError,
  orderPayLoad,
  orderPaySucess,
  orderPayReset,
  orderPayError
} = ordersReducer.actions;
export default ordersReducer.reducer;

export const asyncCreateOrder = (orders) => async (dispatch, getState) => {
  try {
    dispatch(orderLoading());

    const { user } = getState();

    const { data } = await axios({
      method: 'post',
      url: 'http://localhost:3001/api/orders',
      headers: {
        authorization: `Bearer ${user.token}`,
        'Content-Type': 'application/json',
      },
      data: orders,
    });
    dispatch(orderSucess(data));
  } catch (error) {
    dispatch(orderError(error.message));
  }
};

export const asyncOrderDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch(orderDetailsLoading());

    const { user } = getState();

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

export const asyncPayOrder =
  (orderId, paymentResult) => async (dispatch, getState) => {
    try {
      dispatch(orderPayLoad());

      const {
        userLogin: { userInfo },
      } = getState();

      const { data } = await axios({
        method: 'put',
        url: `http://localhost:3001/api/orders/${orderId}/pay`,
        headers: {
          authorization: `Bearer ${userInfo.token}`,
          'Content-Type': 'application/json',
        },
        data: paymentResult,
      });
      dispatch(orderPaySucess(data));
    } catch (error) {
      dispatch(orderPayError(error.message));
    }
  };

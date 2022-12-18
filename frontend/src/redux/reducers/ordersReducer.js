import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const ordersReducer = createSlice({
  name: 'orders',
  initialState: {
    loading: 'idle',
    error: '',
  },
  reducers: {
    orderLoading(state) {
      if (state.loading === 'idle') {
        state.loading = 'pending';
      }
    },
    orderSucess(state, action) {
      if (state.loading === 'pending') {
        state.loading = 'idle';
        state.error = '';
      }
    },
    orderByIdSucess(state, action) {
      if (state.loading === 'pending') {
        state.loading = 'idle';
        state.error = '';
      }
    },
    orderError(state, action) {
      if (state.loading === 'pending') {
        state.loading = 'idle';
        state.error = action.payload;
      }
    },
  },
});

export const { orderSucess, orderLoading, orderByIdSucess, orderError } = ordersReducer.actions;
export default ordersReducer.reducer;

export const asyncCreateOrder = (orders, token) => async (dispatch) => {
  try {
    dispatch(orderLoading());
    const data = await axios({
      method: 'post',
      url: 'http://localhost:3001/api/orders',
      headers: {
        authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      data: orders,
    });
    dispatch(orderSucess(data));
  } catch (error) {
    dispatch(orderError(error.message));
  }
};

export const asyncGetOrderById = (id, token) => async (dispatch) => {
  try {
    dispatch(orderLoading());
    const data = await axios({
      method: 'get',
      url: `http://localhost:3001/api/orders/${id}`,
      headers: {
        authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      }
    });
    dispatch(orderSucess(data));
  } catch (error) {
    dispatch(orderError(error.message));
  }
};
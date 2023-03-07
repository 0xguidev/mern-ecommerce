import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const CreateOrder = createSlice({
  name: 'createOrder',
  initialState: {
    loadingOrder: 'idle',
    order: '',
    errorOrder: '',
  },
  reducers: {
    orderLoading: (state) => {
      if (state.loadingOrder === 'idle') {
        return {
          ...state,
          loadingOrder: 'pending',
        };
      }
      return state;
    },
    orderSucess: (state, action) => {
      if (state.loadingOrder === 'pending') {
        return {
          ...state,
          loadingOrder: 'idle',
          errorOrder: '',
          order: action.payload,
        };
      }
      return state;
    },
    orderError: (state, action) => {
      if (state.loadingOrder === 'pending') {
        return {
          ...state,
          loadingOrder: 'idle',
          order: {},
          errorOrder: action.payload,
        };
      }
      return state;
    },
    resetCreateOrder: (state) => {
      return {
        ...state,
        loadingOrder: 'idle',
        order: '',
        errorOrder: '',
      };
    },
  },
});

export const { orderLoading, orderSucess, orderError, resetCreateOrder } =
  CreateOrder.actions;
export default CreateOrder.reducer;

export const asyncCreateOrder = (orders) => async (dispatch, getState) => {
  try {
    dispatch(orderLoading());

    const {
      user: { user },
    } = getState();

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

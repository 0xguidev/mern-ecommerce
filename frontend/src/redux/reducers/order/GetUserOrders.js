import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const GetUserOrders = createSlice({
  name: 'userOrders',
  initialState: {
    loadingUserOrders: 'idle',
    userOrders: '',
    errorUserOrders: '',
  },
  reducers: {
    userOrderLoading: (state) => {
      return {
        ...state,
        loadingUserOrders: 'pending',
      };
    },
    userOrdersSuccess: (state, action) => {
      return {
        ...state,
        loadingUserOrders: 'idle',
        userOrders: action.payload,
        errorUserOrders: '',
      };
    },
    userOrdersError: (state, action) => {
      return {
        ...state,
        loadingUserOrders: 'idle',
        userOrders: '',
        errorUserOrders: action.payload,
      };
    },
    resetOrderDetails: (state) => {
      return {
        ...state,
        loadingUserOrders: 'idle',
        userOrders: '',
        errorUserOrders: '',
      };
    },
  },
});

export const {
  userOrderLoading,
  userOrdersSuccess,
  userOrdersError,
  resetOrderDetails,
} = GetUserOrders.actions;
export default GetUserOrders.reducer;

export const getUserOrders = () => async (dispatch, getState) => {
  try {
    dispatch(userOrderLoading());
    const {
      user: { user },
    } = getState();
    const { data } = await axios({
      method: 'get',
      url: `http://localhost:3001/api/orders/ordersUser`,
      headers: {
        authorization: `Bearer ${user.token}`,
      },
    });
    dispatch(userOrdersSuccess(data));
  } catch {
    dispatch(userOrdersError());
  }
};

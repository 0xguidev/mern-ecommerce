import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const ordersReducer = createSlice({
  name: 'orders',
  initialState: {
    loadingOrder: 'idle',
    loadingOrderDetails: 'idle',
    loadingOrderPay: 'idle',
    loadingUserOrders: 'idle',
    order: '',
    orderDetails: '',
    orderPay: '',
    userOrders: '',
    errorOrder: '',
    errorOrderDetails: '',
    errorOrderPay: '',
    errorUserOrders: '',
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
    userOdersError: (state, action) => {
      return {
        ...state,
        loadingUserOrders: 'idle',
        userOrders: '',
        errorUserOrders: action.payload,
      };
    },
    ordersReset: (state) => {
      return {
        ...state,
        loadingOrder: 'idle',
        loadingOrderDetails: 'idle',
        loadingOrderPay: 'idle',
        loadingUserOrders: 'idle',
        order: '',
        orderDetails: '',
        orderPay: '',
        userOrders: '',
        errorOrder: '',
        errorOrderDetails: '',
        errorOrderPay: '',
        errorUserOrders: '',
      };
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
  orderPaySuccess,
  orderPayReset,
  orderPayError,
  userOrderLoading,
  userOrdersSuccess,
  userOdersError,
  ordersReset,
} = ordersReducer.actions;
export default ordersReducer.reducer;

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
    dispatch(userOdersError());
  }
};

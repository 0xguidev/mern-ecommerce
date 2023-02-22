import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const UpdateProductSlice = createSlice({
  name: 'product',
  initialState: {
    loading: 'idle',
    product: {},
    error: '',
  },
  reducers: {
    updateProductLoading: (state) => {
      return {
        ...state,
        loading: 'pending',
      };
    },
    updateProductSuccess: (state, action) => {
      return {
        ...state,
        loading: 'idle',
        product: action.payload,
      };
    },
    updateProductError: (state, action) => {
      return {
        ...state,
        loading: 'idle',
        error: action.payload,
      };
    },
  },
});

export const {
  updateProductLoading,
  updateProductSuccess,
  updateProductError,
} = UpdateProductSlice.actions;

export default UpdateProductSlice.reducer;

export const updateProduct = (product) => async (dispatch, getState) => {
  try {
    dispatch(updateProductLoading());
    const {
      user: { user },
    } = getState();
    const { data, status } = await axios({
      method: 'put',
      url: `http://localhost:3001/api/produtcs/${product._id}`,
      headers: {
        authorization: `Bearer ${user.token}`,
        'Content-Type': 'application/json',
      },
      data: product,
    });
    if (status === 200) {
      return dispatch(updateProductSuccess(data));
    }
  } catch (e) {
    return dispatch(updateProductError(e.response.data.message));
  }
};

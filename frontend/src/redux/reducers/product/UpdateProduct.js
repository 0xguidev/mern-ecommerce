import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const UpdateProductSlice = createSlice({
  name: 'UpdateProduct',
  initialState: {
    updateLoading: 'idle',
    updatedProduct: false,
    updatedError: '',
  },
  reducers: {
    updateProductLoading: (state) => {
      return {
        ...state,
        updateLoading: 'pending',
        updatedProduct: false,
      };
    },
    updateProductSuccess: (state) => {
      return {
        ...state,
        updateLoading: 'idle',
        updatedProduct: true,
      };
    },
    updateProductError: (state, action) => {
      return {
        ...state,
        updateLoading: 'idle',
        updatedError: action.payload,
      };
    },
    resetDataUpdateProduct: (state) => {
      return {
        ...state,
        updateLoading: 'idle',
        updatedProduct: false,
        updatedError: '',
      };
    },
  },
});

export const {
  updateProductLoading,
  updateProductSuccess,
  updateProductError,
  resetDataUpdateProduct,
} = UpdateProductSlice.actions;

export default UpdateProductSlice.reducer;

export const asyncUpdateProduct = (product) => async (dispatch, getState) => {
  try {
    dispatch(updateProductLoading());
    const {
      user: { user },
    } = getState();
    const { status } = await axios({
      method: 'put',
      url: `http://localhost:3001/api/products/${product._id}`,
      headers: {
        authorization: `Bearer ${user.token}`,
        'Content-Type': 'application/json',
      },
      data: product,
    });
    if (status === 200) {
      return dispatch(updateProductSuccess());
    }
  } catch (e) {
    return dispatch(updateProductError(e.response.data.message));
  }
};

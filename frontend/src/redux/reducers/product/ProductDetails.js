import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const ProductDetailSlice = createSlice({
  name: 'ProductDetails',
  initialState: {
    detailLoading: 'idle',
    detailSuccess: '',
    detailError: '',
  },
  reducers: {
    ProductDetailsLoading: (state) => {
      return {
        ...state,
        detailLoading: 'pending',
      };
    },
    ProductDetailsSuccess: (state, action) => {
      return {
        ...state,
        detailLoading: 'idle',
        detailSuccess: action.payload,
      };
    },
    ProductDetailsError: (state, action) => {
      return {
        ...state,
        detailLoading: 'idle',
        detailError: action.payload,
      };
    },
  },
});
export const {
  ProductDetailsLoading,
  ProductDetailsSuccess,
  ProductDetailsError,
} = ProductDetailSlice.actions;

export default ProductDetailSlice.reducer;

export const asyncSingleProduct = (productId) => async (dispatch) => {
  try {
    dispatch(ProductDetailsLoading());
    const { data } = await axios({
      method: 'get',
      url: `http://localhost:3001/api/products/${productId}`,
      headers: {
        'Content-Type': 'application/json',
      },
    });
    dispatch(ProductDetailsSuccess(data));
  } catch (error) {
    dispatch(ProductDetailsError(error.message));
  }
};

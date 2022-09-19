import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const productReducer = createSlice({
  name: 'product',
  initialState: {
    loading: 'idle',
    products: [],
    product: {},
    error: '',
  },
  reducers: {
    listProductReceived(state, action) {
      if (state.loading === 'pending') {
        state.loading = 'idle';
        state.products = [...action.payload];
      }
    },
    singleProductReceived(state, action) {
      if (state.loading === 'pending') {
        state.loading = 'idle';
        state.product = action.payload;
      }
    },
    throwErrorProduct(state, action) {
      if (state.loading === 'pending') {
        state.loading = 'idle';
        state.error = action.payload;
      }
    },
    productsLoading(state) {
      if (state.loading === 'idle') {
        state.loading = 'pending';
      }
    },
  },
});

export const {
  listProductReceived,
  productsLoading,
  singleProductReceived,
  throwErrorProduct,
} = productReducer.actions;
export default productReducer.reducer;

export const asyncListProduct = () => async (dispatch) => {
  try {
    dispatch(productsLoading());
    const { data } = await axios.get('http://localhost:3001/api/products');
    dispatch(listProductReceived(data));
  } catch (error) {
    dispatch(throwErrorProduct(error.message));
  }
};

export const asyncSingleProduct = (productId) => async (dispatch) => {
  try {
    dispatch(productsLoading());
    const { data } = await axios.get(
      `http://localhost:3001/api/products/${productId}`
    );
    dispatch(singleProductReceived(data));
  } catch (error) {
    dispatch(throwErrorProduct(error.message));
  }
};

import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const productReducer = createSlice({
  name: 'product',
  initialState: {
    loading: 'idle',
    products: [],
    product: {},
  },
  reducers: {
    productsLoading(state) {
      if (state.loading === 'idle') {
        state.loading = 'pending';
      }
    },
    productReceived(state, action) {
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
  },
});

export const { productReceived, productsLoading, singleProductReceived } =
  productReducer.actions;
export default productReducer.reducer;

export const asyncListProduct = () => async (dispatch) => {
  try {
    dispatch(productsLoading());
    const { data } = await axios.get('http://localhost:3001/api/products');
    dispatch(productReceived(data));
  } catch (error) {
    console.error(error.message);
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
    console.error(error.messageg);
  }
};

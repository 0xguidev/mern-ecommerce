import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const productReducer = createSlice({
  name: 'product',
  initialState: {
    loading: 'idle',
    products: [],
  },
  reducers: {
    productsLoading(state, action) {
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
  },
});

export const { productReceived, productsLoading } = productReducer.actions;
export default productReducer.reducer;

export const asyncListProduct = () => async (dispatch) => {
  dispatch(productsLoading());
  const { data } = await axios.get('http://localhost:3001/api/products');
  dispatch(productReceived(data));
};

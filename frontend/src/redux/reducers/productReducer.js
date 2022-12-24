import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const productSlice = createSlice({
  name: 'product',
  initialState: {
    loading: 'idle',
    products: [],
    product: {},
    error: '',
  },
  reducers: {
    listProductReceived: (state, action) => {
      return {
        ...state,
        loading: 'idle',
        products: [...action.payload],
      };
    },
    singleProductReceived: (state, action) => {
      return {
        ...state,
        loading: 'idle',
        product: action.payload,
      };
    },
    throwErrorProduct: (state, action) => {
      return {
        ...state,
        loading: 'idle',
        error: action.payload,
      };
    },
    productsLoading: (state) => {
      return {
        ...state,
        loading: 'pending',
      };
    },
  },
});

export const {
  listProductReceived,
  singleProductReceived,
  throwErrorProduct,
  productsLoading,
} = productSlice.actions;

export default productSlice.reducer;

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

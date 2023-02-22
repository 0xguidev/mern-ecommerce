import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { resetCreteProductState } from './CreateProduct';
import { resetDeleteProductState } from './DeleteProduct';

const ListProductSlice = createSlice({
  name: 'ListProduct',
  initialState: {
    loading: 'idle',
    products: [],
    error: '',
  },
  reducers: {
    ListProductLoading: (state) => {
      return {
        ...state,
        loading: 'pending',
      };
    },
    listProductReceived: (state, action) => {
      return {
        ...state,
        loading: 'idle',
        products: [...action.payload],
      };
    },
    ListProductError: (state, action) => {
      return {
        ...state,
        loading: 'idle',
        error: action.payload,
      };
    },
  },
});
export const { ListProductLoading, listProductReceived, ListProductError } =
  ListProductSlice.actions;

export default ListProductSlice.reducer;
export const asyncListProduct = () => async (dispatch) => {
  try {
    dispatch(ListProductLoading());
    dispatch(resetCreteProductState());
    dispatch(resetDeleteProductState());
    const { data } = await axios({
      method: 'get',
      url: 'http://localhost:3001/api/products',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    dispatch(listProductReceived(data));
  } catch (error) {
    dispatch(ListProductError(error.message));
  }
};

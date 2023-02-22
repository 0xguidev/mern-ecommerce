import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const CreateProductSlice = createSlice({
  name: 'CreateProductSlice',
  initialState: {
    createLoading: 'idle',
    createdSuccess: '',
    createdError: '',
  },
  reducers: {
    loadCreateProducts: (state, action) => {
      return {
        ...state,
        createLoading: 'load',
      };
    },
    succesCreateProduct: (state, action) => {
      return {
        ...state,
        createLoading: 'idle',
        createdSuccess: action.payload,
      };
    },
    errorCreateProduct: (state, action) => {
      return {
        ...state,
        createLoading: 'idle',
        createdError: action.payload,
      };
    },
    resetCreteProductState: (state) => {
      return {
        ...state,
        createLoading: 'idle',
        createdSuccess: '',
        createdError: '',
      };
    },
  },
});

export const {
  loadCreateProducts,
  succesCreateProduct,
  errorCreateProduct,
  resetCreteProductState,
} = CreateProductSlice.actions;

export default CreateProductSlice.reducer;

export const createProductRequest = () => async (dispatch, getState) => {
  try {
    dispatch(loadCreateProducts());
    const {
      user: { user },
    } = getState();
    const { data, status } = await axios({
      method: 'post',
      url: 'http://localhost:3001/api/products',
      headers: {
        authorization: `Bearer ${user.token}`,
        'Content-Type': 'application/json',
      },
    });

    if (status === 201) {
      return dispatch(succesCreateProduct(data));
    }
  } catch ({ message }) {
    return dispatch(errorCreateProduct(message));
  }
};

import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const productSlice = createSlice({
  name: 'product',
  initialState: {
    loading: 'idle',
    products: [],
    product: {},
    error: '',
    loadingDelete: 'idle',
    successDelete: false,
    errorDelete: '',
    loadingUpdate: 'idle',
    successUpdate: '',
    errorUpdate: '',
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
        successDelete: false
      };
    },
    deleteProductRequest: (state) => {
      return {
        ...state,
        loadingDelete: 'pending'
      }
    },
    deleteProductReceived: (state, action) => {
      return {
        ...state,
        loadingDelete: 'idle',
        successDelete: true
      }
    },
    deleteProductError: (state, action) => {
      return {
        ...state,
        loadingDelete: 'idle',
        errorDelete: action.payload
      }
    },
    updateProductRequest: (state) => {
      return {
        ...state,
        loadingUpdate: 'pending'
      }
    },
    updateProductReceived: (state, action) => {
      return {
        ...state,
        loadingUpdate: 'idle',
        successUpdate: action.payload
      }
    },
    updateProductError: (state, action) => {
      return {
        ...state,
        loadingUpdate: 'idle',
        errorUpdate: action.payload
      }
    }
  },
});

export const {
  listProductReceived,
  singleProductReceived,
  throwErrorProduct,
  productsLoading,
  deleteProductRequest,
  deleteProductReceived,
  deleteProductError,
  updateProductRequest,
  updateProductReceived,
  updateProductError
} = productSlice.actions;

export default productSlice.reducer;

export const asyncListProduct = () => async (dispatch) => {
  try {
    dispatch(productsLoading());
    const { data } = await axios({
      method: 'get',
      url: 'http://localhost:3001/api/products',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    dispatch(listProductReceived(data));
  } catch (error) {
    dispatch(throwErrorProduct(error.message));
  }
};

export const asyncSingleProduct = (productId) => async (dispatch) => {
  try {
    dispatch(productsLoading());
    const { data } = await axios({
      method: 'get',
      url: `http://localhost:3001/api/products/${productId}`,
      headers: {
        'Content-Type': 'application/json',
      },
    });
    dispatch(singleProductReceived(data));
  } catch (error) {
    dispatch(throwErrorProduct(error.message));
  }
};

export const deleteProduct = (productId) => async (dispatch, getState) => {
  try {
    dispatch(deleteProductRequest());
    const {
      user: { user },
    } = getState();
    const { data, status } = await axios({
      method: 'delete',
      url: `http://localhost:3001/api/products/${productId}`,
      headers: {
        authorization: `Bearer ${user.token}`,
        'Content-Type': 'application/json',
      },
    });
    if (status === 200) {
      return dispatch(deleteProductReceived(data));
    }
  } catch (e) {
    return dispatch(deleteProductError(e.message));
  }
};

export const updateProduct = (product) => async (dispatch, getState) => {
  try {
    dispatch(updateProductRequest());
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
      return dispatch(updateProductReceived(data));
    }
  } catch (e) {
    return dispatch(updateProductError(e.response.data.message));
  }
};

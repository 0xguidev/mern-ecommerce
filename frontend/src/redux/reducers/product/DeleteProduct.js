import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const DeleteProductSlice = createSlice({
  name: 'ProductDetailSlice',
  initialState: {
    deleteLoading: 'idle',
    success: '',
    successDelete: false,
    deleteError: '',
  },
  reducers: {
    DeleteProductLoading: (state) => {
      return {
        ...state,
        deleteLoading: 'pending',
      };
    },
    DeleteProductSuccess: (state, action) => {
      return {
        ...state,
        deleteLoading: 'idle',
        successDelete: true,
      };
    },
    DeleteProductError: (state, action) => {
      return {
        ...state,
        deleteLoading: 'idle',
        deleteError: action.payload,
      };
    },
    resetDeleteProductState: (state) => {
      return {
        ...state,
        deleteLoading: 'idle',
        success: '',
        successDelete: false,
        deleteError: '',
      };
    },
  },
});
export const {
  DeleteProductLoading,
  DeleteProductSuccess,
  DeleteProductError,
  resetDeleteProductState,
} = DeleteProductSlice.actions;

export default DeleteProductSlice.reducer;

export const deleteProduct = (productId) => async (dispatch, getState) => {
  try {
    dispatch(DeleteProductLoading());
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
      return dispatch(DeleteProductSuccess(data));
    }
  } catch (e) {
    return dispatch(DeleteProductError(e.message));
  }
};

import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const productImageSlice = createSlice({
  name: 'ProductImageUpload',
  initialState: {
    loadingImage: 'idle',
    productImageUpload: '',
    uploadError: '',
  },
  reducers: {
    uploadImageRequest: (state) => {
      return {
        ...state,
        loadingImage: 'pending',
      };
    },
    uploadImageSuccess: (state, action) => {
      return {
        ...state,
        loadingImage: 'idle',
        productImageUpload: action.payload,
      };
    },
    uploadImageError: (state, action) => {
      return {
        ...state,
        loadingImage: 'idle',
        uploadError: action.payload,
      };
    },
    resetDataUploadImage: (state) => {
      return {
        ...state,
        loadingImage: 'idle',
        productImageUpload: '',
        uploadError: '',
      };
    },
  },
});
export const {
  uploadImageRequest,
  uploadImageSuccess,
  uploadImageError,
  resetDataUploadImage,
} = productImageSlice.actions;

export default productImageSlice.reducer;

export const asyncUploadImageProduct = (file) => async (dispatch) => {
  try {
    dispatch(uploadImageRequest());
    const data = new FormData();
    data.append('image', file[0]);
    const response = await axios({
      method: 'post',
      url: 'http://localhost:3001/api/uploads',
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      data,
    });
    dispatch(uploadImageSuccess(response.data));
  } catch (error) {
    dispatch(uploadImageError(error.message));
  }
};

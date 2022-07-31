import { createSlice } from '@reduxjs/toolkit';

const userReducer = createSlice({
  name: 'user',
  initialState: {
    loading: 'idle',
    users: [],
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

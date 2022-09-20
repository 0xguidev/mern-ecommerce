import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const cartItemsFromStorage = localStorage.getItem('cartItems')
  ? JSON.parse(localStorage.getItem('cartItems'))
  : [];

const shippingAddressFromStorage = localStorage.getItem('shippingAddress')
  ? JSON.parse(localStorage.getItem('shippingAddress'))
  : {
      address: '',
      city: '',
      country: '',
      postalCode: '',
    };

const cartReducer = createSlice({
  name: 'cart',
  initialState: {
    loading: 'idle',
    cartItems: cartItemsFromStorage,
    shipping: shippingAddressFromStorage,
    error: '',
  },
  reducers: {
    addProductsLoading(state) {
      if (state.loading === 'idle') {
        state.loading = 'pending';
      }
    },
    addItem(state, action) {
      if (state.loading === 'pending') {
        state.loading = 'idle';
        state.error = '';
        const item = action.payload;

        const existItem = state.cartItems.find(
          (x) => x.product === item.product
        );

        if (existItem) {
          state.cartItems = state.cartItems.map((x) =>
            x.product === existItem.product ? item : x
          );
        } else {
          state.cartItems = [...state.cartItems, item];
        }
      }
    },
    throwError(state, action) {
      if (state.loading === 'pending') {
        state.loading = 'idle';
        state.error = action.payload;
      }
    },
    saveInLocalStorage(state) {
      localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
    },
    cartRemoveItem(state, action) {
      state.cartItems = [
        ...state.cartItems.filter((x) => x.product !== action.payload),
      ];

      localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
    },
    SaveShippingAddress(state, action) {
      state.shipping = action.payload;
      localStorage.setItem('shippingAddress', JSON.stringify(state.shipping));
    },
  },
});

export const {
  addItem,
  addProductsLoading,
  saveInLocalStorage,
  throwError,
  cartRemoveItem,
  SaveShippingAddress,
} = cartReducer.actions;
export default cartReducer.reducer;

export const asyncAddProduct = (productId, qty) => async (dispatch) => {
  try {
    dispatch(addProductsLoading());
    const { data } = await axios.get(
      `http://localhost:3001/api/products/${productId}`
    );
    dispatch(
      addItem({
        product: data._id,
        name: data.name,
        image: data.image,
        price: data.price,
        countInStock: data.countInStock,
        qty: Number(qty),
      })
    );
    dispatch(saveInLocalStorage());
  } catch (error) {
    dispatch(throwError(error.message));
  }
};

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

const paymentMethodFromStorage = localStorage.getItem('paymentMethod')
  ? JSON.parse(localStorage.getItem('paymentMethod'))
  : '';

const checkoutFromStorage = localStorage.getItem('checkout')
  ? JSON.parse(localStorage.getItem('checkout'))
  : {
      itemsPrice: 0,
      taxPrice: 0,
      shippingPrice: 0,
      totalPrice: 0,
    };

const cartReducer = createSlice({
  name: 'cart',
  initialState: {
    loading: 'idle',
    cartItems: cartItemsFromStorage,
    shipping: shippingAddressFromStorage,
    paymentMethod: paymentMethodFromStorage,
    checkout: checkoutFromStorage,
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
      saveItemsPrice();
      saveShippingPrice();
      saveTaxPrice();
      saveTotalPrice();
      saveCheckout();
      localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
    },
    saveShippingAddress(state, action) {
      state.shipping = action.payload;
      localStorage.setItem('shippingAddress', JSON.stringify(state.shipping));
    },
    savePaymentMethod(state, action) {
      state.paymentMethod = action.payload;
      localStorage.setItem(
        'paymentMethod',
        JSON.stringify(state.paymentMethod)
      );
    },
    saveItemsPrice(state) {
      state.checkout = {
        ...state.checkout,
        itemsPrice: state.cartItems.reduce(
          (acc, item) => Number(acc + item.price * item.qty),
          0
        ),
      };
    },
    saveShippingPrice(state) {
      state.checkout = {
        ...state.checkout,
        shippingPrice:
          state.checkout.itemsPrice > 100
            ? 0
            : state.checkout.itemsPrice === 0
            ? 0
            : 100,
      };
    },
    saveTaxPrice(state) {
      state.checkout = {
        ...state.checkout,
        taxPrice:
          state.checkout.itemsPrice > 0
            ? Number(0.15 * state.checkout.itemsPrice)
            : 0,
      };
    },
    saveTotalPrice(state) {
      state.checkout = {
        ...state.checkout,
        totalPrice:
          state.checkout.itemsPrice > 0
            ? Number(
                state.checkout.itemsPrice +
                  state.checkout.shippingPrice +
                  state.checkout.taxPrice
              )
            : 0,
      };
    },
    saveCheckout(state) {
      localStorage.setItem('checkout', JSON.stringify(state.checkout));
    },
  },
});

export const {
  addItem,
  addProductsLoading,
  saveInLocalStorage,
  throwError,
  cartRemoveItem,
  saveShippingAddress,
  savePaymentMethod,
  saveItemsPrice,
  saveShippingPrice,
  saveTaxPrice,
  saveTotalPrice,
  saveCheckout,
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
    dispatch(saveItemsPrice());
    dispatch(saveShippingPrice());
    dispatch(saveTaxPrice());
    dispatch(saveTotalPrice());
    dispatch(saveCheckout());
    dispatch(saveInLocalStorage());
  } catch (error) {
    dispatch(throwError(error.message));
  }
};

export const removeProductFromCart = (productId) => async (dispatch) => {
  dispatch(cartRemoveItem(productId));
  dispatch(saveItemsPrice());
  dispatch(saveShippingPrice());
  dispatch(saveTaxPrice());
  dispatch(saveTotalPrice());
  dispatch(saveCheckout());
};

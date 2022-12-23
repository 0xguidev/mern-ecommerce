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
    addProductsLoading: (state) => {
      if (state.loading === 'idle') {
        return {
          ...state,
          loading: 'pending',
        };
      }
      return state;
    },
    addItem: (state, action) => {
      if (state.loading === 'pending') {
        const item = action.payload;

        const existItem = state.cartItems.find(
          (x) => x.product === item.product
        );

        if (existItem) {
          return {
            ...state,
            loading: 'idle',
            error: '',
            cartItems: state.cartItems.map((x) =>
              x.product === existItem.product ? item : x
            ),
          };
        } else {
          return {
            ...state,
            loading: 'idle',
            error: '',
            cartItems: [...state.cartItems, item],
          };
        }
      }
      return state;
    },
    throwError: (state, action) => {
      if (state.loading === 'pending') {
        return {
          ...state,
          loading: 'idle',
          error: action.payload,
        };
      }
    },
    saveInLocalStorage: (state) => {
      return localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
    },
    cartRemoveItem: (state, action) => {
      saveItemsPrice();
      saveShippingPrice();
      saveTaxPrice();
      saveTotalPrice();
      saveCheckout();
      localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
      return {
        ...state,
        cartItems: [
          ...state.cartItems.filter((x) => x.product !== action.payload),
        ]
      }
    },
    saveShippingAddress: (state, action) => {
      localStorage.setItem('shippingAddress', JSON.stringify({ shipping: action.payload }));
      return {
        ...state,
        shipping: action.payload,

      }
    },
    savePaymentMethod(state, action) {
      return {
        ...state,
        paymentMethod: action.payload,
      };
    },
    saveItemsPrice(state) {
      const checkout = {
        ...state.checkout,
        itemsPrice: state.cartItems.reduce(
          (acc, item) => Number(acc + item.price * item.qty),
          0
        ),
      };
      return {
        ...state,
        checkout,
      };
    },
    saveShippingPrice(state) {
      const checkout = {
        ...state.checkout,
        shippingPrice:
          state.checkout.itemsPrice > 100
            ? 0
            : state.checkout.itemsPrice === 0
            ? 0
            : 100,
      };
      return {
        ...state,
        checkout,
      };
    },
    saveTaxPrice(state) {
      const checkout = {
        ...state.checkout,
        taxPrice:
          state.checkout.itemsPrice > 0
            ? Number(0.15 * state.checkout.itemsPrice)
            : 0,
      };
      return {
        ...state,
        checkout,
      };
    },
    saveTotalPrice(state) {
      const checkout = {
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
      return {
        ...state,
        checkout,
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

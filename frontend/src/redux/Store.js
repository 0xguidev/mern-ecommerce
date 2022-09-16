import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './reducers/cartReducer';
import ProductReducer from './reducers/productReducer';

const Store = configureStore({
  reducer: {
    productList: ProductReducer,
    cartItems: cartReducer,
  },
});

export default Store;

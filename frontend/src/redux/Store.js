import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './reducers/cartReducer';
import ProductReducer from './reducers/productReducer';
import userReducer from './reducers/userReducer';

const Store = configureStore({
  reducer: {
    product: ProductReducer,
    cart: cartReducer,
    user: userReducer,
  },
});

export default Store;

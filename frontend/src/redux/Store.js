import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './reducers/cartReducer';
import ordersReducer from './reducers/ordersReducer';
import ProductReducer from './reducers/productReducer';
import userReducer from './reducers/userReducer';

const Store = configureStore({
  reducer: {
    product: ProductReducer,
    cart: cartReducer,
    user: userReducer,
    orders: ordersReducer,
  },
});

export default Store;

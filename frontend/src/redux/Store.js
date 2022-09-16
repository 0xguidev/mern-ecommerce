import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './reducers/cartReducer';
import ProductReducer from './reducers/productReducer';
import userLoginReducer from "./reducers/userLoginReducer";

const Store = configureStore({
  reducer: {
    productList: ProductReducer,
    cartItems: cartReducer,
    userLogin: userLoginReducer,
  },
});

export default Store;

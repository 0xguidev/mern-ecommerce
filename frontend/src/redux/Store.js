import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './reducers/cartReducer';
import ProductReducer from './reducers/productReducer';
import userLoginReducer from "./reducers/userLoginReducer";
import registerReducer from "./reducers/registerReducer";
import userUpdateReducer from "./reducers/userUpdateReducer";

const Store = configureStore({
  reducer: {
    productList: ProductReducer,
    cartItems: cartReducer,
    userLogin: userLoginReducer,
    registerUser: registerReducer,
    updateUser: userUpdateReducer,
  },
});

export default Store;

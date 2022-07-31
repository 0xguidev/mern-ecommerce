import { configureStore } from '@reduxjs/toolkit';
import ProductReducer from './reducers/ProductReducer';

const Store = configureStore({
  reducer: {
    productList: ProductReducer,
  },
});

export default Store;

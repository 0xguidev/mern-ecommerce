import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './reducers/cart';
import ordersReducer from './reducers/order';
import {
  CreateProductSlice,
  DeleteProductSlice,
  ListProductSlice,
  ProductDetailSlice,
  UpdateProductSlice,
} from './reducers/product';
import userReducer from './reducers/user';

const Store = configureStore({
  reducer: {
    createProduct: CreateProductSlice,
    deleteProduct: DeleteProductSlice,
    listProduct: ListProductSlice,
    productDetails: ProductDetailSlice,
    updateProduct: UpdateProductSlice,
    cart: cartReducer,
    user: userReducer,
    orders: ordersReducer,
  },
});

export default Store;

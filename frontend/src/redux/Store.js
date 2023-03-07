import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './reducers/cart';
import {
  CreateOrderSlice,
  GetUserOrders,
  OrderDetailsSlice,
  PayOrderSlice,
} from './reducers/order';
import {
  CreateProductSlice,
  DeleteProductSlice,
  ListProductSlice,
  ProductDetailSlice,
  productImageSlice,
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
    uploadImage: productImageSlice,
    cart: cartReducer,
    user: userReducer,
    createOrders: CreateOrderSlice,
    userOrders: GetUserOrders,
    orderDetails: OrderDetailsSlice,
    payOrder: PayOrderSlice,
  },
});

export default Store;

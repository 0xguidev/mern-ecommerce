import React from 'react';
import { Route, Routes } from 'react-router-dom';
import CartScreen from './screens/CartScreen';
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';
import LogoutScreen from './screens/LogoutScreen';
import OrderScreen from './screens/OrderScreen';
import PaymentScreen from './screens/PaymentScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import ProductEditSreen from './screens/ProductEditScreen';
import ProductListScreen from './screens/ProductListScreen';
import ProductScreen from './screens/ProductScreen';
import ProfileScreen from './screens/ProfileScreen';
import ShippingScreen from './screens/ShippingScreen';
import SingUpScreen from './screens/SingUpScreen';
import UserEditSreen from './screens/UserEditScreen';
import UserListScreen from './screens/UserListScreen';

const Router = () => {
  return (
    <Routes>
      <Route exact path='/' element={<HomeScreen />} />
      <Route exact path='/login' element={<LoginScreen />} />
      <Route exact path='/product/:id' element={<ProductScreen />} />
      <Route path='/cart'>
        <Route path=':id' element={<CartScreen />} />
        <Route path='' element={<CartScreen />} />
      </Route>
      <Route exact path='/logout' element={<LogoutScreen />} />
      <Route exact path='/singup' element={<SingUpScreen />} />
      <Route exact path='/profile' element={<ProfileScreen />} />
      <Route exact path='/shipping' element={<ShippingScreen />} />
      <Route exact path='/payment' element={<PaymentScreen />} />
      <Route exact path='/placeOrder' element={<PlaceOrderScreen />} />
      <Route exact path='/order/:id' element={<OrderScreen />} />
      <Route exact path='/admin/userlist' element={<UserListScreen />} />
      <Route exact path='/admin/user/:id/edit' element={<UserEditSreen />} />
      <Route
        exact
        path='/admin/productslist/'
        element={<ProductListScreen />}
      />
      <Route
        exact
        path='/admin/product/:id/edit'
        element={<ProductEditSreen />}
      />
    </Routes>
  );
};

export default Router;

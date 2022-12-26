import React from 'react';
import { Route, Routes } from 'react-router-dom';
import ProductScreen from './screens/ProductScreen';
import HomeScreen from './screens/HomeScreen';
import CartScreen from './screens/CartScreen';
import SingUpScreen from './screens/SingUpScreen';
import LoginScreen from './screens/LoginScreen';
import LogoutScreen from './screens/LogoutScreen';
import ShippingScreen from './screens/ShippingScreen';
import ProfileScreen from './screens/ProfileScreen';
import PaymentScreen from './screens/PaymentScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import OrderScreen from './screens/OrderScreen';
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
    </Routes>
  );
};

export default Router;

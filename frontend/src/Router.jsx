import React from 'react';
import { Route, Routes } from 'react-router-dom';
import ProductScreen from './screens/ProductScreen';
import HomeScreen from './screens/HomeScreen';
import CartScreen from './screens/CartScreen';
import SingUpScreen from './screens/SingUpScreen';
import LoginScreen from "./screens/LoginScreen";
import LogoutScreen from "./screens/LogoutScreen";
import ProfileScreen from "./screens/ProfileScreen";

const Router = () => {
  return (
    <Routes>
      <Route exact path="/" element={<HomeScreen />} />
      <Route exact path="/login" element={<LoginScreen />} />
      <Route exact path="/product/:id" element={<ProductScreen />} />
      <Route path="/cart">
        <Route path=":id" element={<CartScreen />} />
        <Route path="" element={<CartScreen />} />
      </Route>
      <Route exact path="/logout" element={<LogoutScreen />} />
      <Route exact path="/singup" element={<SingUpScreen />} />
        <Route exact path="/profile" element={<ProfileScreen />} />
    </Routes>
  );
};

export default Router;

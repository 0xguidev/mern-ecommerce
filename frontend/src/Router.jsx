import React from 'react';
import { Route, Routes } from 'react-router-dom';
import ProductScreen from './screens/ProductScreen';
import HomeScreen from './screens/HomeScreen';
import CartScreen from './screens/CartScreen';
import SingUpScreen from './screens/SingUpScreen';

const Router = () => {
  return (
      <Routes>
        <Route exact path="/" element={<HomeScreen />} />
        <Route exact path="/product/:id" element={<ProductScreen />} />
        <Route exact path="/cart" element={<CartScreen />} />
        <Route exact path="/singup" element={<SingUpScreen />} />
      </Routes>
  );
};

export default Router;

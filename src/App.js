import React, { useState } from 'react';
import './App.css';
import Home from './Components/Home';
import Header from './Components/Header';
import Footer from './Components/Footer';
import Cart from './pages/Cart'; // Import the Cart component
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ProductDetail from './pages/ProductDetail';

const App = () => {
  const [cartItems, setCartItems] = useState([]);

  return (
    <BrowserRouter>
      <Header cartItems={cartItems} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<Home />} />
        <Route path="/product/:id" element={<ProductDetail setCartItems={setCartItems}  cartItems={cartItems}/>} />
        <Route path="/cart" element={<Cart cartItems={cartItems} setCartItems={setCartItems} />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default App;

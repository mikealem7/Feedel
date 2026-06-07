import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './styles/global.css';

import { CartProvider } from './contexts/CartContext';
import { WishlistProvider } from './contexts/WishlistContext';
import { RewardsProvider } from './contexts/RewardsContext';
import { AuthProvider } from './contexts/AuthContext';

import BottomNav from './components/BottomNav';

import Home from './pages/Home';
import Shop from './pages/Shop';
import CategoryPage from './pages/CategoryPage';
import ProductDetail from './pages/ProductDetail';
import PreparedFoods from './pages/PreparedFoods';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Rewards from './pages/Rewards';
import Account from './pages/Account';
import Login from './pages/Login';

export default function App() {
  return (
    <AuthProvider>
      <RewardsProvider>
        <CartProvider>
          <WishlistProvider>
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/shop" element={<Shop />} />
                <Route path="/shop/:category" element={<CategoryPage />} />
                <Route path="/product/:id" element={<ProductDetail />} />
                <Route path="/prepared-foods" element={<PreparedFoods />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/rewards" element={<Rewards />} />
                <Route path="/account" element={<Account />} />
                <Route path="/login" element={<Login />} />
              </Routes>
              <BottomNav />
            </BrowserRouter>
          </WishlistProvider>
        </CartProvider>
      </RewardsProvider>
    </AuthProvider>
  );
}

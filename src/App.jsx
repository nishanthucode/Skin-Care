import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Home from './pages/Home';
import Shop from './pages/Shop';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Wishlist from './pages/Wishlist';
import Checkout from './pages/Checkout';
import About from './pages/About';
import Contact from './pages/Contact';
import Blog from './pages/Blog';
import FAQ from './pages/FAQ';
import TrackOrder from './pages/TrackOrder';
import Account from './pages/Account';
import Login from './pages/Login';
import Register from './pages/Register';
import NotFound from './pages/NotFound';

import ScrollToTop from './components/ScrollToTop';

function App() {
  return (
    <CartProvider>
      <Router>
        <ScrollToTop />
        <div className="App">
          <Header />
          <main>
            <Routes>
              {/* Home */}
              <Route path="/" element={<Home />} />

              {/* Shop Pages */}
              <Route path="/shop-all" element={<Shop category="all" />} />
              <Route path="/face-care" element={<Shop category="face-care" />} />
              <Route path="/body-care" element={<Shop category="body-care" />} />
              <Route path="/perfumes" element={<Shop category="perfumes" />} />
              <Route path="/bakhoor" element={<Shop category="bakhoor" />} />
              <Route path="/anniversary-sale" element={<Shop category="anniversary-sale" />} />
              <Route path="/best-seller" element={<Shop category="best-seller" />} />

              {/* Product Detail */}
              <Route path="/product" element={<Navigate to="/shop-all" replace />} />
              <Route path="/product/:id" element={<ProductDetail />} />

              {/* Cart & Checkout */}
              <Route path="/cart" element={<Cart />} />
              <Route path="/wishlist" element={<Wishlist />} />
              <Route path="/checkout" element={<Checkout />} />

              {/* Info Pages */}
              <Route path="/about-us" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/faq" element={<FAQ />} />

              {/* User Pages */}
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/account" element={<Account />} />
              <Route path="/track-order" element={<TrackOrder />} />

              {/* 404 */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;

import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiTrash2, FiPlus, FiMinus, FiShoppingBag } from 'react-icons/fi';
import { useCart } from '../context/CartContext';
import './Cart.css';

const Cart = () => {
  const { cart, removeFromCart, updateQuantity, getCartTotal, getCartCount } = useCart();
  const navigate = useNavigate();

  const handleQuantityChange = (productId, newQuantity) => {
    if (newQuantity < 1) return;
    updateQuantity(productId, newQuantity);
  };

  const handleCheckout = () => {
    navigate('/checkout');
  };

  if (cart.length === 0) {
    return (
      <div className="cart-page">
        <div className="container">
          <div className="empty-cart">
            <FiShoppingBag className="empty-cart-icon" />
            <h2>Your cart is empty</h2>
            <p>Add some products to get started!</p>
            <Link to="/shop-all" className="btn btn-primary">
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <div className="container">
        <h1 className="page-title">Shopping Cart ({getCartCount()} items)</h1>

        <div className="cart-layout">
          {/* Cart Items */}
          <div className="cart-items">
            {cart.map((item) => (
              <div key={item._id} className="cart-item">
                <Link to={`/product/${item._id}`} className="item-image">
                  <img
                    src={item.image || 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=150&h=150&fit=crop'}
                    alt={item.name}
                  />
                </Link>

                <div className="item-details">
                  <Link to={`/product/${item.productId || item._id}`} className="item-name">
                    <h3>{item.name}</h3>
                  </Link>
                  {item.packName && (
                    <p className="item-pack-name">{item.packName}</p>
                  )}
                  {item.description && (
                    <p className="item-description">{item.description}</p>
                  )}
                  <p className="item-price">Rs. {item.price.toFixed(2)}</p>
                </div>

                <div className="item-quantity">
                  <button
                    className="qty-btn"
                    onClick={() => handleQuantityChange(item._id, item.quantity - 1)}
                  >
                    <FiMinus />
                  </button>
                  <input
                    type="number"
                    value={item.quantity}
                    onChange={(e) =>
                      handleQuantityChange(item._id, parseInt(e.target.value) || 1)
                    }
                    min="1"
                  />
                  <button
                    className="qty-btn"
                    onClick={() => handleQuantityChange(item._id, item.quantity + 1)}
                  >
                    <FiPlus />
                  </button>
                </div>

                <div className="item-total">
                  <p>Rs. {(item.price * item.quantity).toFixed(2)}</p>
                </div>

                <button
                  className="remove-btn"
                  onClick={() => removeFromCart(item._id)}
                  title="Remove item"
                >
                  <FiTrash2 />
                </button>
              </div>
            ))}
          </div>

          {/* Cart Summary */}
          <div className="cart-summary">
            <h2>Order Summary</h2>

            <div className="summary-row">
              <span>Subtotal</span>
              <span>Rs. {getCartTotal().toFixed(2)}</span>
            </div>

            <div className="summary-row">
              <span>Shipping</span>
              <span>Calculated at checkout</span>
            </div>

            <div className="summary-divider"></div>

            <div className="summary-row total">
              <span>Total</span>
              <span>Rs. {getCartTotal().toFixed(2)}</span>
            </div>

            <button className="btn btn-primary checkout-btn" onClick={handleCheckout}>
              Proceed to Checkout
            </button>

            <Link to="/shop-all" className="continue-shopping">
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;

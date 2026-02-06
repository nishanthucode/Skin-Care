import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { FiChevronRight, FiCheckCircle } from 'react-icons/fi';
import './Checkout.css';

const Checkout = () => {
  const { cart, getCartTotal, clearCart } = useCart();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    apartment: '',
    city: '',
    state: '',
    pincode: '',
    phone: '',
    paymentMethod: 'cod'
  });

  const [isOrderPlaced, setIsOrderPlaced] = useState(false);

  // If cart is empty and order not placed, redirect
  if (cart.length === 0 && !isOrderPlaced) {
    return (
      <div className="container" style={{ padding: '100px 20px', textAlign: 'center' }}>
        <h2>Your cart is empty</h2>
        <Link to="/shop-all" className="btn btn-primary" style={{ marginTop: '20px' }}>
          Continue Shopping
        </Link>
      </div>
    );
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would integrate validaton and API call
    console.log('Order Data:', { items: cart, customer: formData, total: getCartTotal() });

    setIsOrderPlaced(true);
    clearCart();
    window.scrollTo(0, 0);
  };

  if (isOrderPlaced) {
    return (
      <div className="checkout-page">
        <div className="container" style={{ textAlign: 'center', maxWidth: '600px', padding: '60px 20px' }}>
          <div style={{ fontSize: '80px', color: '#28a745', marginBottom: '20px' }}>
            <FiCheckCircle />
          </div>
          <h1 style={{ marginBottom: '15px' }}>Order Placed Successfully!</h1>
          <p style={{ fontSize: '1.1rem', color: '#666', marginBottom: '30px' }}>
            Thank you for your purchase. We have sent specific details to your email.
          </p>
          <div style={{ background: 'white', padding: '20px', borderRadius: '10px', boxShadow: '0 4px 15px rgba(0,0,0,0.05)', marginBottom: '30px' }}>
            <p style={{ fontWeight: '600', marginBottom: '5px' }}>Order Number</p>
            <p style={{ fontSize: '1.2rem', color: '#ff1493', fontWeight: '700' }}>#{Math.floor(100000 + Math.random() * 900000)}</p>
          </div>
          <Link to="/" className="btn btn-primary">
            Return to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="checkout-page">
      <div className="container">
        <div className="checkout-container">
          {/* Left Column: Form */}
          <div className="checkout-form-section">
            <div className="checkout-steps">
              <span className="step completed">Cart</span>
              <FiChevronRight className="step-divider" />
              <span className="step active">Information</span>
              <FiChevronRight className="step-divider" />
              <span className="step">Shipping</span>
              <FiChevronRight className="step-divider" />
              <span className="step">Payment</span>
            </div>

            <h2 className="form-title">Contact Information</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Email Address</label>
                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>

              <h2 className="form-title" style={{ marginTop: '30px' }}>Shipping Address</h2>
              <div className="form-row">
                <div className="form-group">
                  <label>First Name</label>
                  <input
                    type="text"
                    name="firstName"
                    placeholder="First Name"
                    required
                    value={formData.firstName}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label>Last Name</label>
                  <input
                    type="text"
                    name="lastName"
                    placeholder="Last Name"
                    required
                    value={formData.lastName}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Address</label>
                <input
                  type="text"
                  name="address"
                  placeholder="Street address, house number"
                  required
                  value={formData.address}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label>Apartment (optional)</label>
                <input
                  type="text"
                  name="apartment"
                  placeholder="Apartment, suite, unit, etc."
                  value={formData.apartment}
                  onChange={handleChange}
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>City</label>
                  <input
                    type="text"
                    name="city"
                    placeholder="City"
                    required
                    value={formData.city}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label>State</label>
                  <select
                    name="state"
                    required
                    value={formData.state}
                    onChange={handleChange}
                  >
                    <option value="">Select State</option>
                    <option value="Maharashtra">Maharashtra</option>
                    <option value="Delhi">Delhi</option>
                    <option value="Karnataka">Karnataka</option>
                    <option value="Tamil Nadu">Tamil Nadu</option>
                    <option value="Uttar Pradesh">Uttar Pradesh</option>
                    <option value="Gujarat">Gujarat</option>
                    {/* Add more states as needed */}
                  </select>
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>PIN Code</label>
                  <input
                    type="text"
                    name="pincode"
                    placeholder="PIN Code"
                    required
                    value={formData.pincode}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label>Phone</label>
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Phone Number"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <h2 className="form-title" style={{ marginTop: '30px' }}>Payment Method</h2>
              <div
                className={`payment-method ${formData.paymentMethod === 'cod' ? 'selected' : ''}`}
                onClick={() => setFormData({ ...formData, paymentMethod: 'cod' })}
              >
                <input
                  type="radio"
                  name="paymentMethod"
                  checked={formData.paymentMethod === 'cod'}
                  onChange={() => setFormData({ ...formData, paymentMethod: 'cod' })}
                />
                <div>
                  <div style={{ fontWeight: '600' }}>Cash on Delivery (COD)</div>
                  <div style={{ fontSize: '0.85rem', color: 'var(--gray-text)' }}>Pay when you receive the order</div>
                </div>
              </div>
              <div
                className={`payment-method ${formData.paymentMethod === 'online' ? 'selected' : ''}`}
                onClick={() => setFormData({ ...formData, paymentMethod: 'online' })}
              >
                <input
                  type="radio"
                  name="paymentMethod"
                  checked={formData.paymentMethod === 'online'}
                  onChange={() => setFormData({ ...formData, paymentMethod: 'online' })}
                />
                <div>
                  <div style={{ fontWeight: '600' }}>UPI / Cards / Netbanking</div>
                  <div style={{ fontSize: '0.85rem', color: 'var(--gray-text)' }}>Secure online payment</div>
                </div>
              </div>

              <button type="submit" className="btn btn-primary btn-place-order">
                Place Order
              </button>
            </form>
          </div>

          {/* Right Column: Order Summary */}
          <div className="order-summary-section">
            <h3 className="form-title" style={{ fontSize: '1.2rem' }}>Order Summary</h3>

            <div className="summary-items">
              {cart.map((item) => (
                <div key={item._id} className="summary-item">
                  <div className="summary-image-container">
                    <img
                      src={item.image || 'https://images.unsplash.com/photo-1556228578-8c89e6adf883'}
                      alt={item.name}
                      className="summary-image"
                    />
                    <span className="item-qty-badge">{item.quantity}</span>
                  </div>
                  <div className="summary-details">
                    <h4>{item.name}</h4>
                    {item.packName && <p>{item.packName}</p>}
                  </div>
                  <div className="summary-price">
                    Rs. {(item.price * item.quantity).toFixed(2)}
                  </div>
                </div>
              ))}
            </div>

            <div className="summary-divider"></div>

            <div className="summary-row">
              <span>Subtotal</span>
              <span style={{ fontWeight: '600' }}>Rs. {getCartTotal().toFixed(2)}</span>
            </div>
            <div className="summary-row">
              <span>Shipping</span>
              <span style={{ color: '#28a745', fontWeight: '600' }}>FREE</span>
            </div>

            <div className="summary-divider"></div>

            <div className="summary-row total">
              <span>Total</span>
              <span style={{ color: 'var(--primary-color)' }}>Rs. {getCartTotal().toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;

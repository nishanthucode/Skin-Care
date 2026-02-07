import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaYoutube,

  FaLinkedinIn,
  FaWhatsapp,
  FaEnvelope
} from 'react-icons/fa';
import { newsletterAPI } from '../../utils/api';
import logo from '../../assets/logo.png';
import './Footer.css';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [subscribeStatus, setSubscribeStatus] = useState('');

  const handleSubscribe = async (e) => {
    e.preventDefault();

    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      setSubscribeStatus('Please enter a valid email');
      return;
    }

    try {
      await newsletterAPI.subscribe(email);
      setSubscribeStatus('Thanks for subscribing!');
      setEmail('');
      setTimeout(() => setSubscribeStatus(''), 3000);
    } catch (error) {
      setSubscribeStatus('Something went wrong. Please try again.');
    }
  };

  return (
    <footer className="footer">
      {/* Main Footer */}
      <div className="footer-main">
        <div className="container">
          <div className="footer-grid">
            {/* Brand Section */}
            <div className="footer-col">
              <Link to="/" className="footer-logo">
                <img src={logo} alt="Youth Face" className="footer-logo-img" />
              </Link>
              <p className="footer-desc">
                For over eight years, Youthface has been on a mission to deliver the best skin whitening products India deserves—safe, dermatologist-approved formulations that actually work.
              </p>
              <div className="social-links">
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                  <FaFacebookF />
                </a>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                  <FaInstagram />
                </a>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                  <FaTwitter />
                </a>
                <a href="https://youtube.com" target="_blank" rel="noopener noreferrer">
                  <FaYoutube />
                </a>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                  <FaLinkedinIn />
                </a>
                <a href="https://wa.me/919876543210" target="_blank" rel="noopener noreferrer">
                  <FaWhatsapp />
                </a>
                <a href="mailto:support@youthface.in">
                  <FaEnvelope />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div className="footer-col">
              <h4>Quick Link</h4>
              <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/shop-all">Collections</Link></li>
                <li><Link to="/track-order">Track Order</Link></li>
                <li><Link to="/about-us">About Us</Link></li>
                <li><Link to="/contact">Contact</Link></li>
                <li><Link to="/blog">Blog</Link></li>
              </ul>
            </div>

            {/* Policies */}
            <div className="footer-col">
              <h4>Policies</h4>
              <ul>
                <li><Link to="/privacy-policy">Privacy Policy</Link></li>
                <li><Link to="/terms-of-service">Terms of Service</Link></li>
                <li><Link to="/shipping-policy">Shipping Policy</Link></li>
                <li><Link to="/refund-policy">Refund Policy</Link></li>
              </ul>
            </div>

            {/* Info */}
            <div className="footer-col">
              <h4>Info</h4>
              <ul>
                <li><Link to="/about-us">Our Story</Link></li>
                <li><Link to="/contact">Grievance Office</Link></li>
                <li><Link to="/track-order">Track Your Order</Link></li>
                <li><Link to="/faq">FAQs</Link></li>
                <li><Link to="/blog">Blogs</Link></li>
                <li><Link to="/distributorship">Distributorship</Link></li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="footer-bottom">
        <div className="container">
          <p>&copy; 2026, Youth Face. All rights reserved.</p>
        </div>
      </div>
    </footer >
  );
};

export default Footer;

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  FaFacebookF,
  FaInstagram,
  FaYoutube,
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
                Aura is dedicated to creating safe, effective skincare that enhances your natural glow. With carefully crafted formulations and premium ingredients, we focus on delivering visible results while keeping your skin’s health our top priority. Experience confidence and radiance with every use.              </p>
              <div className="social-links">
                <a href="https://www.instagram.com/dd_aura_offcial/" target="_blank" rel="noopener noreferrer">
                  <FaFacebookF />
                </a>
                <a href="https://www.instagram.com/dd_aura_offcial/" target="_blank" rel="noopener noreferrer">
                  <FaInstagram />
                </a>
                <a href="https://www.instagram.com/dd_aura_offcial/" target="_blank" rel="noopener noreferrer">
                  <FaYoutube />
                </a>
                {/* <a href="https://wa.me/919876543210" target="_blank" rel="noopener noreferrer">
                  <FaWhatsapp />
                </a>
                <a href="mailto:support@youthface.in">
                  <FaEnvelope />
                </a> */}
              </div>
            </div>

            {/* Quick Links */}
            <div className="footer-col">
              <h4>Quick Link</h4>
              <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/shop-all">Shop All</Link></li>
                {/* <li><Link to="/track-order">Track Order</Link></li> */}
                <li><Link to="/about-us">About Us</Link></li>
                <li><Link to="/contact">Contact Us</Link></li>
                {/* <li><Link to="/blog">Blog</Link></li> */}
              </ul>
            </div>

            {/* Policies */}
            {/* <div className="footer-col">
              <h4>Policies</h4>
              <ul>
                <li><Link to="#">Privacy Policy</Link></li>
                <li><Link to="#">Terms of Service</Link></li>
                <li><Link to="#">Shipping Policy</Link></li>
                <li><Link to="#">Refund Policy</Link></li>
              </ul>
            </div> */}

            {/* Info */}
            <div className="footer-col" style={{ fontSize: '0.9rem' }}>
              <h4>Address</h4>
              <p>DD Aura Lifestyle, AYBBS Complex, Guruvayanakere - 574214</p>
              <p>+91 82963 50093</p>
              <p>info@ddauralifestyle.in</p>

            </div>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="footer-bottom">
        <div className="container">
          <p>&copy; 2026, Aura. Designed by graphixsquare.com</p>
        </div>
      </div>
    </footer >
  );
};

export default Footer;

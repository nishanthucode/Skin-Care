import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiSearch, FiShoppingCart, FiUser, FiMenu, FiX, FiHeart, FiMail } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';
import { useCart } from '../../context/CartContext';
import logo from '../../assets/logo.svg';
import './Header.css';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Shop All', path: '/shop-all' },
    { name: 'About Us', path: '/about-us' },
  ];

  return (
    <>
      <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
        <div className="header-container">
          {/* Mobile Menu Button */}
          <button
            className="mobile-menu-btn"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <FiX /> : <FiMenu />}
          </button>

          {/* Logo */}
          <Link to="/" className="logo">
            <img
              src={logo}
              alt="Youth Face - Whitening Cream"
              className="logo-image"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className={`nav-menu ${isMobileMenuOpen ? 'open' : ''}`}>
            <ul className="nav-links">
              {navLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Header Actions - Call Us */}
          <div className="header-actions">
            <a href="tel:+919876543210" className="call-btn">
              <span className="call-icon">📞</span>
              <span className="call-text">Call Us</span>
            </a>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;

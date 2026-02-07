import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiMenu, FiX, FiChevronLeft, FiPhone, FiMail } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';
import logo from '../../assets/logo.png';
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
    { name: 'Contact Us', path: '/contact' },
  ];

  return (
    <>
      <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
        <div className="header-container">
          {/* Mobile Menu Button - Left on Mobile */}
          <button
            className="mobile-menu-btn"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <FiX /> : <FiMenu />}
          </button>

          {/* Logo - Centered on Mobile, Left on Desktop */}
          <Link to="/" className="logo">
            <img
              src={logo}
              alt="Youth Face"
              className="logo-image"
            />
          </Link>

          {/* Desktop Navigation - Centered */}
          <nav className={`nav-menu ${isMobileMenuOpen ? 'open' : ''}`}>
            <div className="mobile-nav-header">
              <button
                className="mobile-back-btn"
                onClick={() => setIsMobileMenuOpen(false)}
                aria-label="Close Menu"
              >
                <FiChevronLeft /> <span>Back</span>
              </button>
            </div>
            <ul className="nav-links">
              {navLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className={link.isSpecial ? 'special-link' : ''}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Header Actions - Right Side Icons */}
          <div className="header-actions">
            <a href="tel:+919876543210" className="icon-action-btn" aria-label="Call Us">
              <FiPhone />
            </a>
            <a
              href="https://wa.me/919876543210"
              target="_blank"
              rel="noopener noreferrer"
              className="icon-action-btn"
              aria-label="WhatsApp"
            >
              <FaWhatsapp />
            </a>
            <a href="mailto:support@youthface.in" className="icon-action-btn" aria-label="Email Us">
              <FiMail />
            </a>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;

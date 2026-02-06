import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './HeroBanner.css';

const HeroBanner = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      id: 1,
      image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=1920&h=400&fit=crop',
      mobileImage: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=768&h=400&fit=crop',
      link: '/anniversary-sale',
    },
    {
      id: 2,
      image: 'https://images.unsplash.com/photo-1571875257727-256c39da42af?w=1920&h=400&fit=crop',
      mobileImage: 'https://images.unsplash.com/photo-1571875257727-256c39da42af?w=768&h=400&fit=crop',
      link: '/body-care',
    },
    {
      id: 3,
      image: 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=1920&h=400&fit=crop',
      mobileImage: 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=768&h=400&fit=crop',
      link: '/anniversary-sale',
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [slides.length]);

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <div className="hero-banner">
      <div className="banner-slider">
        {slides.map((slide, index) => (
          <Link
            key={slide.id}
            to={slide.link}
            className={`banner-slide ${index === currentSlide ? 'active' : ''}`}
          >
            <picture>
              <source media="(max-width: 768px)" srcSet={slide.mobileImage} />
              <img src={slide.image} alt={`Banner ${slide.id}`} />
            </picture>
          </Link>
        ))}
      </div>

      {/* Navigation Arrows */}
      <button className="banner-arrow prev" onClick={prevSlide}>
        ❮
      </button>
      <button className="banner-arrow next" onClick={nextSlide}>
        ❯
      </button>

      {/* Dots Navigation */}
      <div className="banner-dots">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`dot ${index === currentSlide ? 'active' : ''}`}
            onClick={() => goToSlide(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroBanner;

import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { HiArrowNarrowLeft, HiArrowNarrowRight } from 'react-icons/hi';
import './HeroBanner.css';

const HeroBanner = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      id: 1,
      image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=1920&h=800&fit=crop',
      mobileImage: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=768&h=600&fit=crop',
      title: 'Reveal Your Natural Glow',
      subtitle: 'Premium ingredients for radiant, healthy-looking skin.',
      buttonText: 'Shop Collection',
      link: '/shop-all',
    },
    {
      id: 2,
      image: 'https://images.unsplash.com/photo-1571875257727-256c39da42af?w=1920&h=800&fit=crop',
      mobileImage: 'https://images.unsplash.com/photo-1571875257727-256c39da42af?w=768&h=600&fit=crop',
      title: 'Science Meets Elegance',
      subtitle: 'Dermatologist-approved formulas for visible results.',
      buttonText: 'Discover More',
      link: '/about',
    },
    {
      id: 3,
      image: 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=1920&h=800&fit=crop',
      mobileImage: 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=768&h=600&fit=crop',
      title: 'Nourish Your Body',
      subtitle: 'Luxurious textures and gentle care for all skin types.',
      buttonText: 'Shop All',
      link: '/shop-all',
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000); // Slightly slower for readability

    return () => clearInterval(timer);
  }, [slides.length]);

  const goToSlide = (index) => setCurrentSlide(index);
  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);

  const touchStart = useRef(0);
  const touchEnd = useRef(0);
  const minSwipeDistance = 50;

  const onTouchStart = (e) => {
    touchEnd.current = 0;
    touchStart.current = e.targetTouches[0].clientX;
  };

  const onTouchMove = (e) => {
    touchEnd.current = e.targetTouches[0].clientX;
    if (Math.abs(touchStart.current - touchEnd.current) > 10) {
      if (e.cancelable) e.preventDefault();
    }
  };

  const onTouchEnd = () => {
    if (!touchStart.current || !touchEnd.current) return;
    const distance = touchStart.current - touchEnd.current;
    if (Math.abs(distance) > 40) {
      if (distance > 0) {
        nextSlide();
      } else {
        prevSlide();
      }
    }
    touchStart.current = 0;
    touchEnd.current = 0;
  };

  return (
    <div className="hero-banner">
      <div
        className="banner-slider"
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`banner-slide ${index === currentSlide ? 'active' : ''}`}
          >
            <div className="banner-image-wrapper">
              <picture>
                <source media="(max-width: 768px)" srcSet={slide.mobileImage} />
                <img src={slide.image} alt={slide.title} draggable="false" style={{ pointerEvents: 'none' }} />
              </picture>
            </div>

            <div className="banner-overlay"></div>

            <div className="banner-content container">
              <div className="content-inner">
                {/* Content Removed */}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Controls */}
      <div className="hero-nav-controls">
        <button className="nav-control-arrow prev" onClick={prevSlide} aria-label="Previous slide">
          <HiArrowNarrowLeft />
        </button>

        <div className="banner-dots">
          {slides.map((_, index) => (
            <button
              key={index}
              className={`dot ${index === currentSlide ? 'active' : ''}`}
              onClick={() => goToSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        <button className="nav-control-arrow next" onClick={nextSlide} aria-label="Next slide">
          <HiArrowNarrowRight />
        </button>
      </div>
    </div>
  );
};

export default HeroBanner;

import React, { useState, useEffect, useRef } from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import './TestimonialSection.css';

const TestimonialSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 992);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 992);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const testimonials = [
  {
    id: 1,
    name: 'Customer 1',
    location: 'India',
    beforeImage: '',
    afterImage: '',
    rating: 5,
    review: "I started using Aura Whitening Cream and within a few days my skin looked brighter and smoother. My dark spots have reduced and my skin feels more confident now.",
  },
  {
    id: 2,
    name: 'Customer 2',
    location: 'India',
    beforeImage: '',
    afterImage: '',
    rating: 4,
    review: "Aura Whitening Cream really worked well for my skin. It helped reduce pimples and improved my overall complexion. I highly recommend Aura.",
  },
  {
    id: 3,
    name: 'Customer 3',
    location: 'India',
    beforeImage: '',
    afterImage: '',
    rating: 5,
    review: "I love Aura Whitening Cream! My skin tone looks more even and glowing after regular use.",
  },
  {
    id: 4,
    name: 'Customer 4',
    location: 'India',
    beforeImage: '',
    afterImage: '',
    rating: 4,
    review: "After using Aura Whitening Cream, my skin looks clearer and healthier. The dark spots have visibly reduced.",
  },
  {
    id: 5,
    name: 'Customer 5',
    location: 'India',
    beforeImage: '',
    afterImage: '',
    rating: 5,
    review: "Aura Whitening Cream is amazing. My skin feels softer, brighter, and much more refreshed.",
  },
  {
    id: 6,
    name: 'Customer 6',
    location: 'India',
    beforeImage: '',
    afterImage: '',
    rating: 4,
    review: "I had dull skin before, but after using Aura Whitening Cream, my face looks more radiant and fresh.",
  },
  {
    id: 7,
    name: 'Customer 7',
    location: 'India',
    beforeImage: '',
    afterImage: '',
    rating: 4,
    review: "Aura Whitening Cream helped reduce my acne marks and improved my skin tone. Very satisfied with the results.",
  }
];

  const maxSlides = isMobile ? testimonials.length - 1 : testimonials.length - 2;
  const slideShift = isMobile ? 100 : 50;

  const nextSlide = () => {
    if (currentSlide < maxSlides) {
      setCurrentSlide(currentSlide + 1);
    }
  };

  const prevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  const StarRating = () => (
    <div className="star-rating">
      {[...Array(5)].map((_, i) => (
        <span key={i} className="star">★</span>
      ))}
    </div>
  );

  const touchStart = useRef(0);
  const touchEnd = useRef(0);
  const minSwipeDistance = 50;

  const onTouchStart = (e) => {
    touchEnd.current = 0;
    touchStart.current = e.targetTouches[0].clientX;
  };

  const onTouchMove = (e) => {
    touchEnd.current = e.targetTouches[0].clientX;
    // Lower threshold for preventing scroll interference
    if (Math.abs(touchStart.current - touchEnd.current) > 10) {
      if (e.cancelable) e.preventDefault();
    }
  };

  const onTouchEnd = () => {
    if (!touchStart.current || !touchEnd.current) return;
    const distance = touchStart.current - touchEnd.current;
    const isLeftSwipe = distance > 40; // Lowered from 50
    const isRightSwipe = distance < -40; // Lowered from 50

    if (isLeftSwipe) {
      nextSlide();
    } else if (isRightSwipe) {
      prevSlide();
    }

    // Reset
    touchStart.current = 0;
    touchEnd.current = 0;
  };

  return (
    <section className="testimonial-section section">
      <div className="container">
        <div className="testimonial-header">
          <h2 className="section-title">Testimonials</h2>
          <div className="testimonial-nav-arrows">
            <button
              className={`nav-arrow ${currentSlide === 0 ? 'disabled' : 'active-prev'}`}
              onClick={prevSlide}
              disabled={currentSlide === 0}
            >
              <FiChevronLeft />
            </button>
            <button
              className={`nav-arrow ${currentSlide >= maxSlides ? 'disabled' : 'active-next'}`}
              onClick={nextSlide}
              disabled={currentSlide >= maxSlides}
            >
              <FiChevronRight />
            </button>
          </div>
        </div>

        <div className="testimonials-carousel">
          <div
            className="testimonials-track"
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
            style={{
              transform: `translateX(-${currentSlide * slideShift}%)`,
            }}
          >
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className="testimonial-card-v2">
                <div className="testimonial-card-inner-v2">
                  {/* Left: Before/After Side-by-Side Image */}
                  <div className="testimonial-image-wrapper">
                    <div className="ba-split">
                      <div className="ba-item">
                        <img src={testimonial.beforeImage} alt="Before" draggable="false" style={{ pointerEvents: 'none' }} />
                      </div>
                      <div className="ba-item">
                        <img src={testimonial.afterImage} alt="After" draggable="false" style={{ pointerEvents: 'none' }} />
                      </div>
                    </div>
                  </div>

                  {/* Right: Text Content */}
                  <div className="testimonial-text-wrapper">
                    <h3 className="customer-name-v2">{testimonial.name}</h3>
                    <StarRating />
                    <p className="testimonial-text-v2">{testimonial.review}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;

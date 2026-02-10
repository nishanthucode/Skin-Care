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
      name: 'Shiva',
      location: 'Kerala',
      beforeImage: 'https://youthface.co.in/cdn/shop/files/3_c4e0d5ca-04b1-474a-b6ee-130833bd08df.png?v=1769862945&width=800',
      afterImage: 'https://youthface.co.in/cdn/shop/files/4_52e3cad0-dd1a-4d3b-9005-ec4a3d293f72.png?v=1769862945&width=800',
      rating: 5,
      review: "I am Shiva Kerala Now I feel more confident to smile and talk YouthFace super... I'm a courier boy, saw so many YouthFace orders, so I tried it too. In just 1 month, superb result! My face got clear and bright.",
    },
    {
      id: 2,
      name: 'Nanditha',
      location: 'Bangalore',
      beforeImage: 'https://youthface.co.in/cdn/shop/files/3_c4e0d5ca-04b1-474a-b6ee-130833bd08df.png?v=1769862945&width=800',
      afterImage: 'https://youthface.co.in/cdn/shop/files/4_52e3cad0-dd1a-4d3b-9005-ec4a3d293f72.png?v=1769862945&width=800',
      rating: 5,
      review: "Hey, I'm Nanditha from Bangalore. My skin had a lot of marks and dullness before, but after using YouthFace for just 1 month, it's totally changed! Now my face looks so clean, soft, and glowing. Seriously, YouthFace did magic love it..",
    },
    {
      id: 3,
      name: 'Anusha',
      location: 'Chennai',
      beforeImage: 'https://youthface.co.in/cdn/shop/files/3_c4e0d5ca-04b1-474a-b6ee-130833bd08df.png?v=1769862945&width=800',
      afterImage: 'https://youthface.co.in/cdn/shop/files/4_52e3cad0-dd1a-4d3b-9005-ec4a3d293f72.png?v=1769862945&width=800',
      rating: 5,
      review: "I Didn't expect such a big change in just one month! My skin feels lighter, clearer, and has that natural glow now I feel confident and fresh every day YouthFace really surprised me..",
    },
    {
      id: 4,
      name: 'Keerthana',
      location: 'Coimbatore',
      beforeImage: 'https://youthface.co.in/cdn/shop/files/3_c4e0d5ca-04b1-474a-b6ee-130833bd08df.png?v=1769862945&width=800',
      afterImage: 'https://youthface.co.in/cdn/shop/files/4_52e3cad0-dd1a-4d3b-9005-ec4a3d293f72.png?v=1769862945&width=800',
      rating: 5,
      review: "I am Keerthana from Coimbatore College days were full of travel and sun, and my skin looked so dull. After using YouthFace for just 1 month, my face became clear and Whiten! Now all my friends keep asking, 'What are you using?' I feel so happy seeing my skin glow every day YouthFace is just super bro..!",
    },
    {
      id: 5,
      name: 'Fathima',
      location: 'Kerala',
      beforeImage: 'https://youthface.co.in/cdn/shop/files/3_c4e0d5ca-04b1-474a-b6ee-130833bd08df.png?v=1769862945&width=800',
      afterImage: 'https://youthface.co.in/cdn/shop/files/4_52e3cad0-dd1a-4d3b-9005-ec4a3d293f72.png?v=1769862945&width=800',
      rating: 5,
      review: "I am Fathima from Kerala when I see my face in the mirror, I just smile automatically, I've used so many big brand creams, but none gave this kind of change. After using YouthFace, my skin became clear, fair, and smooth in just 4 weeks!",
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
  };

  const onTouchEnd = () => {
    if (!touchStart.current || !touchEnd.current) return;
    const distance = touchStart.current - touchEnd.current;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      nextSlide();
    } else if (isRightSwipe) {
      prevSlide();
    }
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
                        <img src={testimonial.beforeImage} alt="Before" draggable="false" />
                      </div>
                      <div className="ba-item">
                        <img src={testimonial.afterImage} alt="After" draggable="false" />
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

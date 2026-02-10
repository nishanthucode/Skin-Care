import React, { useState } from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import './TestimonialSection.css';

const TestimonialSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const testimonials = [
    {
      id: 1,
      name: 'Nanditha',
      location: 'Bangalore',
      beforeImage: 'https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?w=400&h=400&fit=crop',
      afterImage: 'https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=400&h=400&fit=crop',
      rating: 5,
      review: "Hey, I'm Nanditha from Bangalore. My skin had a lot of marks and dullness before, but after using YouthFace for just 1 month, it's totally changed! Now my face looks so clean, soft, and glowing. Seriously, YouthFace did magic love it..",
    },
    {
      id: 2,
      name: 'Anusha',
      location: 'Chennai',
      beforeImage: 'https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?w=400&h=400&fit=crop',
      afterImage: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop',
      rating: 5,
      review: "I Didn't expect such a big change in just one month! My skin feels lighter, clearer, and has that natural glow now I feel confident and fresh every day YouthFace really surprised me..",
    },
    {
      id: 3,
      name: 'Fathima',
      location: 'Kerala',
      beforeImage: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400&h=400&fit=crop',
      afterImage: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=400&h=400&fit=crop',
      rating: 5,
      review: "I am Fathima from Kerala when I see my face in the mirror, I just smile automatically, I've used so many big brand creams, even Fair & Lovely and other international ones, but none gave this kind of change.After using YouthFace, my skin became clear, fair, and smooth in just 4 weeks Now",
    },
    {
      id: 4,
      name: 'Keerthana',
      location: 'Coimbatore',
      beforeImage: 'https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=400&h=400&fit=crop',
      afterImage: 'https://images.unsplash.com/photo-1524502397800-2eeaad7c3fe5?w=400&h=400&fit=crop',
      rating: 5,
      review: "I am Keerthana from Coimbatore College days were full of travel and sun, and my skin looked so dull. After using YouthFace for just 1 month, my face became clear and Whiten! Now all my friends keep asking, 'What are you using?' I feel so happy seeing my skin glow every day YouthFace is just super bro..!",
    },
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % (testimonials.length - 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + (testimonials.length - 1)) % (testimonials.length - 1));
  };

  return (
    <section className="testimonial-section section">
      <div className="container">
        <div className="testimonial-header">
          <h2 className="section-title">Testimonials</h2>
          <div className="testimonial-nav-arrows">
            <button className="nav-arrow" onClick={prevSlide}>
              <FiChevronLeft />
            </button>
            <button className="nav-arrow" onClick={nextSlide}>
              <FiChevronRight />
            </button>
          </div>
        </div>

        <div className="testimonials-carousel">
          <div
            className="testimonials-track"
            style={{
              transform: `translateX(calc(-${currentSlide} * var(--slide-pct)))`,
            }}
          >
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className="testimonial-card">
                <div className="testimonial-card-inner">
                  {/* Before/After Split Image */}
                  <div className="testimonial-image-container">
                    <div className="split-image">
                      <div className="before-side">
                        <img src={testimonial.beforeImage} alt="Before" />
                        <span className="image-label">Before</span>
                      </div>
                      <div className="after-side">
                        <img src={testimonial.afterImage} alt="After" />
                      </div>
                    </div>
                    <div className="play-button">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  </div>

                  {/* Testimonial Content */}
                  <div className="testimonial-content">
                    <h3 className="testimonial-name">{testimonial.name}</h3>
                    <p className="testimonial-review">{testimonial.review}</p>
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

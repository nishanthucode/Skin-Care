import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaLeaf, FaHeart, FaAward, FaUsers } from 'react-icons/fa';
import './About.css';

const About = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="about-page">
      {/* Hero Section */}
      <section className="about-hero">
        <div className="about-hero-content">
          <h1>Redefining Beauty Standards</h1>
          <p>Empowering you to embrace your natural glow with science-backed, dermatologist-approved skincare.</p>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="our-story">
        <div className="container">
          <div className="section-title">
            <h2>Our Story</h2>
            <p className="sub-title">From a humble beginning to a trusted skincare partner.</p>
          </div>

          <div className="story-container">
            <div className="story-content">
              <h3>8 Years of Excellence</h3>
              <p>
                Founded in 2016, YouthFace began with a simple yet powerful mission: to deliver safe, effective, and high-quality skin whitening products that actually work. What started as a small passion project has grown into a beloved brand trusted by thousands across India.
              </p>
              <p>
                We believe that skincare isn't just about looking good—it's about feeling confident in your own skin. That's why every product we create is rigorous tested, dermatologist-approved, and formulated with the finest ingredients to ensure safety and efficacy.
              </p>
              <blockquote>
                "True beauty comes from confidence, and our goal is to help you shine your brightest."
              </blockquote>
            </div>
            <div className="story-image">
              <img
                src="https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?q=80&w=2070&auto=format&fit=crop"
                alt="Our Story - Skincare"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="values-section">
        <div className="container">
          <div className="section-title">
            <h2>Why Choose YouthFace?</h2>
            <p className="sub-title">Our commitment to quality sets us apart.</p>
          </div>

          <div className="values-grid">
            <div className="value-card">
              <div className="value-icon">
                <FaLeaf />
              </div>
              <h4>Natural Ingredients</h4>
              <p>We harness the power of nature combined with science to bring you safe and effective solutions.</p>
            </div>

            <div className="value-card">
              <div className="value-icon">
                <FaAward />
              </div>
              <h4>Dermatologist Approved</h4>
              <p>Your safety is our priority. All our products are clinically tested and approved by experts.</p>
            </div>

            <div className="value-card">
              <div className="value-icon">
                <FaHeart />
              </div>
              <h4>Cruelty-Free</h4>
              <p>We love animals as much as you do. None of our products are tested on animals.</p>
            </div>

            <div className="value-card">
              <div className="value-icon">
                <FaUsers />
              </div>
              <h4>Customer First</h4>
              <p>With thousands of happy customers, we are dedicated to providing the best service and results.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section">
        <div className="container">
          <div className="stats-container">
            <div className="stat-item">
              <span className="stat-number">8+</span>
              <span className="stat-label">Years of Trust</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">50+</span>
              <span className="stat-label">Products</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">10k+</span>
              <span className="stat-label">Happy Customers</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">100%</span>
              <span className="stat-label">Safe & Effective</span>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="cta-section">
        <div className="cta-content">
          <h2>Ready to Glow?</h2>
          <p>Join thousands of others who have transformed their skin with YouthFace.</p>
          <br />
          <Link to="/shop-all" className="cta-btn">
            Shop Now
          </Link>
        </div>
      </section>
    </div>
  );
};

export default About;

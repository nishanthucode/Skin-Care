import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaLeaf, FaHeart, FaAward, FaUsers, FaLightbulb, FaBullseye } from 'react-icons/fa';
import './About.css';

const About = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="about-page">
      {/* Hero Section */}
      <section className="about-hero">
        <div className="about-hero-overlay"></div>
        <div className="about-hero-content container">
          <h1>About Aura</h1>
          <p className="hero-subtitle">Quality. Safety. Elegance.</p>
        </div>
      </section>

      {/* Brand Introduction (About Us) */}
      <section className="about-intro section">
        <div className="container">
          <div className="intro-grid">
            <div className="intro-text">
              <h2 className="section-title text-left">The Aura Philosophy</h2>
              <p className="lead-text">
                Aura is a premium skincare brand dedicated to enhancing natural beauty through thoughtfully crafted personal care products. We focus on combining gentle, skin-loving ingredients with modern skincare science to create products that support healthy, radiant-looking skin.
              </p>
              <p>
                From nourishing creams to moisturizing soaps, every Aura product is designed for daily use, visible glow, and lasting confidence. Our goal is to deliver quality, safety, and elegance in every package, making skincare simple, effective, and luxurious.
              </p>
            </div>
            <div className="intro-image">
              <img
                src="https://images.unsplash.com/photo-1556228578-0d85b1a4d571?q=80&w=2070&auto=format&fit=crop"
                alt="Aura Skincare Products"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="mission-vision section bg-light">
        <div className="container">
          <div className="mv-grid">
            {/* Mission */}
            <div className="mv-card">
              <div className="mv-icon">
                <FaBullseye />
              </div>
              <h3>Our Mission</h3>
              <p>
                Our mission is to provide high-quality, glow-enhancing skincare products made with effective and skin-friendly ingredients that people can trust for everyday use. We aim to make premium skincare accessible, reliable, and results-focused while maintaining strong standards in formulation, packaging, and customer satisfaction.
              </p>
            </div>

            {/* Vision */}
            <div className="mv-card">
              <div className="mv-icon">
                <FaLightbulb />
              </div>
              <h3>Our Vision</h3>
              <p>
                Our vision is to become a trusted and recognized skincare brand known for delivering visible results, premium experience, and ingredient transparency. We strive to build a brand that inspires confidence, promotes healthy skin habits, and grows into a leading name in modern beauty and personal care.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="values-section section">
        <div className="container">
          <h2 className="section-title text-center">Why Chooses Aura?</h2>
          <div className="values-grid">
            <div className="value-card">
              <div className="value-icon"><FaLeaf /></div>
              <h4>Natural Ingredients</h4>
              <p>Harnessing the power of nature combined with science for safe, effective solutions.</p>
            </div>
            <div className="value-card">
              <div className="value-icon"><FaAward /></div>
              <h4>Dermatologist Approved</h4>
              <p>Clinically tested and approved by experts to ensure your safety is our priority.</p>
            </div>
            <div className="value-card">
              <div className="value-icon"><FaHeart /></div>
              <h4>Cruelty-Free</h4>
              <p>We love animals. None of our products are ever tested on animals.</p>
            </div>
            <div className="value-card">
              <div className="value-icon"><FaUsers /></div>
              <h4>Customer Focused</h4>
              <p>Dedicated to providing the best service, experience, and radiant results for you.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="about-cta">
        <div className="container text-center">
          <h2>Experience the Aura Glow</h2>
          <p>Join thousands who have transformed their daily ritual.</p>
          <Link to="/shop-all" className="btn btn-primary mt-2">Shop Collection</Link>
        </div>
      </section>
    </div>
  );
};

export default About;

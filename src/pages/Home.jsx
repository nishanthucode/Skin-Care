import React from 'react';
import HeroBanner from '../components/Home/HeroBanner';
import CategorySection from '../components/CategorySection/CategorySection';
import ProductSection from '../components/Home/ProductSection';
import VideoTestimonials from '../components/VideoTestimonials/VideoTestimonials';
import BeforeAfter from '../components/BeforeAfter/BeforeAfter';
import TestimonialSection from '../components/TestimonialSection/TestimonialSection';
import TrustBadges from '../components/Home/TrustBadges';
import WhyChooseYouthface from '../components/WhyChooseYouthface/WhyChooseYouthface';
import FAQ from '../components/Home/FAQ';
import './Home.css';

const Home = () => {
  return (
    <div className="home-page">
      {/* Hero Banner / Carousel */}
      <HeroBanner />

      {/* Shop by Category */}
      <CategorySection />

      {/* Our Products - Soap and Body Cream Only */}
      <ProductSection
        title="Our Products"
        viewAllLink="/best-seller"
        categories={['soap', 'body-cream']}
        limit={4}
      />

      {/* Video Testimonials */}
      <VideoTestimonials />

      {/* Before/After Comparisons */}
      <BeforeAfter />

      {/* Testimonials */}
      <TestimonialSection />

      {/* Trust Badges */}
      <TrustBadges />

      {/* Why Choose Youthface */}
      <WhyChooseYouthface />

      {/* FAQ */}
      <FAQ />
    </div>
  );
};

export default Home;

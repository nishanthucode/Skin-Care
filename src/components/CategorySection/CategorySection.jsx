import React from 'react';
import { Link } from 'react-router-dom';
import './CategorySection.css';

const CategorySection = () => {
  const categories = [
    {
      id: 1,
      name: 'Face Care',
      image: 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=400&h=400&fit=crop',
      link: '/face-care',
    },
    {
      id: 2,
      name: 'Body Care',
      image: 'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=400&h=400&fit=crop',
      link: '/body-care',
    },
  ];

  return (
    <section className="category-section">
      <h2 className="category-title">SHOP BY CATEGORY</h2>
      <div className="category-grid">
        {categories.map((category) => (
          <Link
            key={category.id}
            to={category.link}
            className="category-card"
          >
            {/* Upper Section - Product Display Area */}
            <div className="category-image-wrapper">
              <img
                src={category.image}
                alt={category.name}
                className="category-display-image"
              />
            </div>

            {/* Lower Section - Category Label */}
            <div className="category-label-banner">
              <span className="category-label-text">{category.name}</span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default CategorySection;

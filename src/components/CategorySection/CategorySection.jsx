import React from 'react';
import { Link } from 'react-router-dom';
import './CategorySection.css';
import faceCareImg from '../../assets/skin-care.jpeg';
import bodyCareImg from '../../assets/body-care.jpeg';

const CategorySection = () => {
  const categories = [
    {
      id: 1,
      name: 'Face Care',
      image: faceCareImg,
      link: '/face-care',
    },
    {
      id: 2,
      name: 'Body Care',
      image: bodyCareImg,
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

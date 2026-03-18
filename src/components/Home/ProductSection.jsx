import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../ProductCard/ProductCard';
import { productAPI } from '../../utils/api';
import image1 from '../../assets/product-1.jpeg';
import image2 from '../../assets/product-2.jpeg'
import image3 from '../../assets/product-3.jpeg';
import image4 from '../../assets/product-4.jpeg';
import image5 from '../../assets/product-5.jpeg';

import newImg from '../../assets/new-img.jpeg';
import './ProductSection.css';

const ProductSection = ({ title, viewAllLink, fetchFunction, category, categories, limit }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        let response;

        if (fetchFunction) {
          response = await fetchFunction();
        } else if (category) {
          response = await productAPI.getByCategory(category);
        } else if (categories) {
          // Fetch products from multiple categories
          response = await productAPI.getByCategories(categories);
        } else {
          response = await productAPI.getAll({ limit: limit || 4 });
        }

        let productsList = response.data.products || response.data || [];

        // Apply limit if specified
        if (limit) {
          productsList = productsList.slice(0, limit);
        }

        setProducts(productsList);
        setError(null);
      } catch (err) {
        console.error('Error fetching products:', err);
        setError('Failed to load products');
        // Set mock data for development
        setProducts(getMockProducts(categories, limit));
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [fetchFunction, category, categories, limit]);

  const getMockProducts = (filterCategories, productLimit) => {
    // Mock products for Soap and Body Cream
    const allMockProducts = [
      {
        _id: 'beauty-cream',
        name: 'Aura Face Cream',
        description: 'Bright Cream',
        price: 699,
        originalPrice: 799,
        category: 'body-cream',
        image: image1,
        rating: 4.9,
        reviewCount: 60,
        stock: 50,
        discount: 25,
      },
      {
        _id: 'darkspot-soap',
        name: 'Aura Goat Milk Soap',
        description: 'Glow Soap',
        price: 249,
        originalPrice: 299,
        category: 'soap',
        image: image2,
        rating: 4.5,
        reviewCount: 40,
        stock: 45,
        specialOffer: 'Best Seller',
      },
      {
        _id: 'glow-combo',
        name: 'Aura Face Whitening Cream & Aura Goat Milk Soap (Combo)',
        description: 'Glow Combo',
        price: 949,
        originalPrice: 999,
        category: 'face-care',
        image: image3,
        rating: 5.0,
        reviewCount: 31,
        stock: 30,
        comboOffer: 'EXCLUSIVE COMBO',
      },
      {
        _id: 'soap-pack-3',
        name: 'Aura Goat Milk Soap (Pack 2)',
        description: 'Buy 2 Saop',
        price: 499,
        originalPrice: 597,
        category: 'soap',
        image: image4,
        rating: 4.8,
        reviewCount: 52,
        stock: 40,
        specialOffer: 'PACK OF 3',
      },
      {
        _id: 'cream-pack-2',
        name: 'Aura Face Whitening Cream (Pack 2)',
        description: 'Brighten & Glow',
        price: 1399,
        originalPrice: 1599,
        category: 'face-care',
        image: image5,
        rating: 4.9,
        reviewCount: 60,
        stock: 35,
        specialOffer: 'PACK OF 2',
      }
    ];

    // Filter by categories if specified
    let filteredProducts = allMockProducts;
    if (filterCategories && filterCategories.length > 0) {
      filteredProducts = allMockProducts.filter(p => filterCategories.includes(p.category));
    }

    // Apply limit if specified
    if (productLimit) {
      filteredProducts = filteredProducts.slice(0, productLimit);
    }

    return filteredProducts;
  };

  if (loading) {
    return (
      <section className="product-section section">
        <div className="container">
          <div className="spinner"></div>
        </div>
      </section>
    );
  }

  if (error && products.length === 0) {
    return (
      <section className="product-section section">
        <div className="container">
          <p className="error-message">{error}</p>
        </div>
      </section>
    );
  }

  return (
    <section className="product-section section">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">{title}</h2>
          {viewAllLink && (
            <Link to={viewAllLink} className="view-all-link">
              VIEW ALL
            </Link>
          )}
        </div>

        <div className="products-carousel">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductSection;

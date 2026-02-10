import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../ProductCard/ProductCard';
import { productAPI } from '../../utils/api';
import image1 from '../../assets/image 1.jpeg';
import image2 from '../../assets/image 2.jpeg';
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
        _id: '1',
        name: 'Beauty Cream (250g)',
        description: 'Brighter Skin in 4 Weeks',
        price: 599,
        originalPrice: 799,
        category: 'body-cream',
        image: image1,
        rating: 4.9,
        reviewCount: 60,
        stock: 50,
        discount: 25,
      },
      {
        _id: '2',
        name: 'DarkSpot Remover Soap (100g)',
        description: 'Brighten, Smooth, And Protect',
        price: 199,
        originalPrice: 249,
        category: 'soap',
        image: image2,
        rating: 4.5,
        reviewCount: 40,
        stock: 45,
        specialOffer: 'Best Seller',
      },
      {
        _id: '3',
        name: 'Papaya Face Wash (50ml)',
        description: 'Oil Control & Brighter Skin in 4 Weeks',
        price: 199,
        originalPrice: 299,
        category: 'face-wash',
        image: 'https://images.unsplash.com/photo-1612817288484-6f916006741a?w=300&h=300&fit=crop', // Orange fruit vibe
        rating: 5.0,
        reviewCount: 31,
        stock: 30,
        comboOffer: 'Buy 2 Get 1',
      },
      {
        _id: '4',
        name: 'MARYA (50ml)',
        description: 'Perfect for Every Moment',
        price: 299,
        originalPrice: 499,
        category: 'perfume',
        image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?w=300&h=300&fit=crop', // Perfume bottle
        rating: 0,
        reviewCount: 0,
        stock: 20,
      },
      // ... keep existing ones as filler if needed, but these 4 are priority
      {
        _id: '5',
        name: 'Whitening Soap (100g)',
        description: 'Natural Ingredients for Glowing Skin',
        price: 149,
        category: 'soap',
        image: 'https://images.unsplash.com/photo-1585652757173-57de5e9fab42?w=300&h=300&fit=crop',
        rating: 4.7,
        reviewCount: 38,
        stock: 60,
      },
      {
        _id: '6',
        name: 'Collagen Boost Cream (45g)',
        description: 'Firm & Lift Your Skin',
        price: 849,
        category: 'body-cream',
        image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=300&h=300&fit=crop',
        rating: 4.9,
        reviewCount: 57,
        stock: 22,
      },
      {
        _id: '7',
        name: 'Aloe Vera Soap (100g)',
        description: 'Soothing & Healing Properties',
        price: 139,
        category: 'soap',
        image: 'https://images.unsplash.com/photo-1631214524020-7e18db9a8f92?w=300&h=300&fit=crop',
        rating: 4.5,
        reviewCount: 29,
        stock: 65,
      },
      {
        _id: '8',
        name: 'Vitamin C Cream (35g)',
        description: 'Brightening & Radiance Boost',
        price: 649,
        category: 'body-cream',
        image: 'https://images.unsplash.com/photo-1617897903246-719242758050?w=300&h=300&fit=crop',
        rating: 4.8,
        reviewCount: 44,
        stock: 38,
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

        <div className="products-grid">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductSection;

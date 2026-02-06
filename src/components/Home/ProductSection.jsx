import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../ProductCard/ProductCard';
import { productAPI } from '../../utils/api';
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
        name: 'DarkSpot Remover Soap (100g)',
        description: 'Brighten, Smooth, And Protect',
        price: 199,
        originalPrice: 299,
        category: 'soap',
        image: 'https://images.unsplash.com/photo-1612817288484-6f916006741a?w=300&h=300&fit=crop',
        rating: 4.8,
        reviewCount: 45,
        stock: 50,
      },
      {
        _id: '2',
        name: 'Beauty Cream (25g)',
        description: 'Brighter Skin in 4 Weeks',
        price: 599,
        originalPrice: 799,
        category: 'body-cream',
        discount: 25,
        image: 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=300&h=300&fit=crop',
        rating: 4.9,
        reviewCount: 60,
        stock: 40,
      },
      {
        _id: '3',
        name: 'Whitening Soap (100g)',
        description: 'Natural Ingredients for Glowing Skin',
        price: 149,
        originalPrice: 199,
        category: 'soap',
        image: 'https://images.unsplash.com/photo-1585652757173-57de5e9fab42?w=300&h=300&fit=crop',
        rating: 4.7,
        reviewCount: 38,
        stock: 60,
      },
      {
        _id: '4',
        name: 'Moisturizing Body Cream (50g)',
        description: 'Deep Hydration & Nourishment',
        price: 399,
        originalPrice: 499,
        category: 'body-cream',
        image: 'https://images.unsplash.com/photo-1571875257727-256c39da42af?w=300&h=300&fit=crop',
        rating: 4.6,
        reviewCount: 52,
        stock: 35,
      },
      {
        _id: '5',
        name: 'Herbal Soap (100g)',
        description: 'Gentle Cleansing with Natural Herbs',
        price: 129,
        originalPrice: 179,
        category: 'soap',
        image: 'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=300&h=300&fit=crop',
        rating: 4.5,
        reviewCount: 28,
        stock: 70,
      },
      {
        _id: '6',
        name: 'Night Repair Cream (30g)',
        description: 'Overnight Skin Renewal',
        price: 699,
        originalPrice: 899,
        category: 'body-cream',
        image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=300&h=300&fit=crop',
        rating: 4.8,
        reviewCount: 41,
        stock: 30,
      },
      {
        _id: '7',
        name: 'Charcoal Detox Soap (100g)',
        description: 'Deep Cleansing & Purifying',
        price: 179,
        originalPrice: 229,
        category: 'soap',
        image: 'https://images.unsplash.com/photo-1570194065650-d99fb4bedf0a?w=300&h=300&fit=crop',
        rating: 4.9,
        reviewCount: 55,
        stock: 45,
      },
      {
        _id: '8',
        name: 'Anti-Aging Cream (40g)',
        description: 'Reduce Fine Lines & Wrinkles',
        price: 799,
        originalPrice: 999,
        category: 'body-cream',
        image: 'https://images.unsplash.com/photo-1611930022073-b7a4ba5fcccd?w=300&h=300&fit=crop',
        rating: 4.7,
        reviewCount: 48,
        stock: 25,
      },
      {
        _id: '9',
        name: 'Turmeric Soap (100g)',
        description: 'Natural Glow & Even Tone',
        price: 159,
        originalPrice: 209,
        category: 'soap',
        image: 'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=300&h=300&fit=crop',
        rating: 4.6,
        reviewCount: 33,
        stock: 55,
      },
      {
        _id: '10',
        name: 'Vitamin C Cream (35g)',
        description: 'Brightening & Radiance Boost',
        price: 649,
        originalPrice: 849,
        category: 'body-cream',
        image: 'https://images.unsplash.com/photo-1617897903246-719242758050?w=300&h=300&fit=crop',
        rating: 4.8,
        reviewCount: 44,
        stock: 38,
      },
      {
        _id: '11',
        name: 'Aloe Vera Soap (100g)',
        description: 'Soothing & Healing Properties',
        price: 139,
        originalPrice: 189,
        category: 'soap',
        image: 'https://images.unsplash.com/photo-1631214524020-7e18db9a8f92?w=300&h=300&fit=crop',
        rating: 4.5,
        reviewCount: 29,
        stock: 65,
      },
      {
        _id: '12',
        name: 'Collagen Boost Cream (45g)',
        description: 'Firm & Lift Your Skin',
        price: 849,
        originalPrice: 1099,
        category: 'body-cream',
        image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=300&h=300&fit=crop',
        rating: 4.9,
        reviewCount: 57,
        stock: 22,
      },
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

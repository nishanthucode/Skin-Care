import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard/ProductCard';
import { productAPI } from '../utils/api';
import { FiChevronDown, FiChevronUp, FiX, FiFilter } from 'react-icons/fi';
import image1 from '../assets/image 1.jpeg';
import image2 from '../assets/image 2.jpeg';
import './Shop.css';

const Shop = ({ category }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState('featured');
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get('q');

  useEffect(() => {
    fetchProducts();
  }, [category, searchQuery]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      let response;

      if (searchQuery) {
        response = await productAPI.search(searchQuery);
      } else if (category && category !== 'all') {
        response = await productAPI.getByCategory(category);
      } else {
        response = await productAPI.getAll();
      }

      let productsList = response.data.products || response.data || [];
      setProducts(productsList);
    } catch (error) {
      console.error('Error fetching products:', error);
      setProducts(getMockProducts());
    } finally {
      setLoading(false);
    }
  };

  const getMockProducts = () => {
    const productImages = [
      image1,
      image2,
      'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=300&h=300&fit=crop',
      'https://images.unsplash.com/photo-1612817288484-6f916006741a?w=300&h=300&fit=crop',
      'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=300&h=300&fit=crop',
      'https://images.unsplash.com/photo-1571875257727-256c39da42af?w=300&h=300&fit=crop',
      'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=300&h=300&fit=crop',
      'https://images.unsplash.com/photo-1612817288484-6f916006741a?w=300&h=300&fit=crop',
      'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=300&h=300&fit=crop',
      'https://images.unsplash.com/photo-1571875257727-256c39da42af?w=300&h=300&fit=crop',
    ];

    const productNames = [
      'Beauty Cream (25g)',
      'DarkSpot Remover Soap (100g)',
      'Glow & Protect Combo Pack',
      'DarkSpot Remover Soap (Pack of 3)',
    ];

    const descriptions = [
      'Brighter Skin in 4 Weeks',
      'Brighten, Smooth, And Protect',
      'Complete Skincare Solution',
      'Buy 2 Get 1 Free Special Offer',
    ];

    const prices = [599, 199, 699, 398];
    const originalPrices = [799, 299, 899, 597];
    const ratings = [4.9, 0, 5.0, 4.8];
    const reviewCounts = [60, 0, 31, 52];
    const stocks = [50, 25, 30, 40];

    const productSlugs = [
      'beauty-cream',
      'darkspot-soap',
      'glow-combo',
      'soap-pack-3',
    ];

    return Array.from({ length: 4 }, (_, i) => ({
      _id: productSlugs[i],
      name: productNames[i],
      description: descriptions[i],
      price: prices[i],
      originalPrice: originalPrices[i],
      image: productImages[i],
      rating: ratings[i],
      reviewCount: reviewCounts[i],
      stock: stocks[i],
      discount: i === 0 ? 25 : null,
      comboOffer: i === 2 ? 'EXCLUSIVE COMBO' : null,
      specialOffer: i === 3 ? 'PACK OF 3' : null,
    }));
  };

  const getSortedProducts = () => {
    const sorted = [...products];

    switch (sortBy) {
      case 'price-low':
        return sorted.sort((a, b) => a.price - b.price);
      case 'price-high':
        return sorted.sort((a, b) => b.price - a.price);
      case 'name-asc':
        return sorted.sort((a, b) => a.name.localeCompare(b.name));
      case 'name-desc':
        return sorted.sort((a, b) => b.name.localeCompare(a.name));
      case 'date-old':
        return sorted.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
      case 'date-new':
        return sorted.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      case 'best-selling':
        return sorted.sort((a, b) => (b.sold || 0) - (a.sold || 0));
      default:
        return sorted;
    }
  };

  const filteredProducts = getSortedProducts();

  const getCategoryTitle = () => {
    if (searchQuery) return `Search Results for "${searchQuery}"`;
    if (category === 'best-seller') return 'best seller';
    if (category === 'anniversary-sale') return 'Anniversary Sale';
    return category ? category.replace('-', ' ') : 'All Products';
  };

  return (
    <div className="shop-page">
      {/* Breadcrumb */}
      <div className="breadcrumb">
        <div className="container">
          <Link to="/">Home</Link>
          <span> / </span>
          <span>{getCategoryTitle()}</span>
        </div>
      </div>

      <div className="shop-container container">
        {/* Main Content */}
        <main className="shop-main">
          {/* Top Bar */}

          {/* Products Grid */}
          {loading ? (
            <div className="loading">Loading products...</div>
          ) : filteredProducts.length > 0 ? (
            <div className="products-grid">
              {filteredProducts.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          ) : (
            <div className="no-products">
              <p>No products found matching your criteria.</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Shop;

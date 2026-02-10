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
      'MARYA (50ml)',
      'Papaya Face Wash (50ml)',
      'Niacinamide Serum (30ml)',
      'Vitamin C Face Wash (100ml)',
      'Kojic Acid Soap (75g)',
      'Anti-Aging Cream (50g)',
      'Charcoal Face Mask (100g)',
      'Rose Water Toner (150ml)',
    ];

    const descriptions = [
      'Brighter Skin in 4 Weeks',
      'Brighten, Smooth, And Protect',
      'Perfect for Every Moment',
      'Oil Control & Brighter Skin in 4 Weeks',
      'Reduces Dark Spots & Pigmentation',
      'Deep Cleansing & Brightening',
      'Natural Skin Whitening',
      'Reduces Fine Lines & Wrinkles',
      'Deep Pore Cleansing',
      'Hydrates & Refreshes Skin',
    ];

    const prices = [599, 199, 299, 199, 449, 249, 179, 699, 349, 199];
    const originalPrices = [799, 299, 399, 299, 599, 349, 249, 899, 449, 299];
    const ratings = [4.9, 0, 0, 5.0, 4.7, 4.5, 4.8, 4.6, 4.9, 4.4];
    const reviewCounts = [60, 0, 0, 31, 45, 28, 52, 38, 67, 22];
    const stocks = [50, 25, 30, 40, 35, 45, 28, 32, 38, 42];

    return Array.from({ length: 10 }, (_, i) => ({
      _id: `${i + 1}`,
      name: productNames[i],
      description: descriptions[i],
      price: prices[i],
      originalPrice: originalPrices[i],
      image: productImages[i],
      rating: ratings[i],
      reviewCount: reviewCounts[i],
      stock: stocks[i],
      discount: i === 0 ? 25 : null,
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

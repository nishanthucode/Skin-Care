import React from 'react';
import { Link } from 'react-router-dom';
import { FiShoppingCart, FiHeart } from 'react-icons/fi';
import { FaStar } from 'react-icons/fa';
import { useCart } from '../../context/CartContext';
import './ProductCard.css';

const ProductCard = ({ product }) => {
  const { addToCart, addToWishlist, isInWishlist } = useCart();

  const handleAddToCart = (e) => {
    e.preventDefault();
    addToCart(product);
  };

  const handleToggleWishlist = (e) => {
    e.preventDefault();
    addToWishlist(product);
  };

  const renderRating = (rating) => {
    return (
      <div className="rating">
        {[...Array(5)].map((_, index) => (
          <FaStar
            key={index}
            className={index < Math.floor(rating) ? 'filled' : 'empty'}
          />
        ))}
        <span className="rating-text">({rating})</span>
      </div>
    );
  };

  return (
    <div className="product-card">
      <Link to={`/product/${product._id}`} className="product-link">
        {/* Product Image */}
        <div className="product-image-container">
          {product.discount && (
            <span className="discount-badge">{product.discount}% OFF</span>
          )}
          {product.comboOffer && (
            <span className="combo-badge">{product.comboOffer}</span>
          )}
          {product.specialOffer && (
            <span className="special-badge">{product.specialOffer}</span>
          )}
          <button
            className={`wishlist-btn ${isInWishlist(product._id) ? 'active' : ''}`}
            onClick={handleToggleWishlist}
          >
            <FiHeart />
          </button>
          <img
            src={product.image || 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=300&h=300&fit=crop'}
            alt={product.name}
            className="product-image"
          />
          {product.hoverImage && (
            <img
              src={product.hoverImage}
              alt={product.name}
              className="product-image-hover"
            />
          )}
        </div>

        {/* Product Info */}
        <div className="product-info">
          <h3 className="product-name">{product.name}</h3>

          {product.description && (
            <p className="product-description">{product.description}</p>
          )}

          <div className="product-price">
            <span className="current-price">Rs. {product.price.toFixed(2)}</span>
            {product.originalPrice && (
              <span className="original-price">Rs. {product.originalPrice.toFixed(2)}</span>
            )}
          </div>

          <div className="product-rating">
            <div className="rating">
              {[...Array(5)].map((_, index) => (
                <svg
                  key={index}
                  className={index < Math.floor(product.rating || 0) ? 'filled' : 'empty'}
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  width="14"
                  height="14"
                >
                  <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                </svg>
              ))}
              {product.rating > 0 && (
                <span className="rating-text">{product.rating.toFixed(1)}</span>
              )}
            </div>
            {product.reviewCount > 0 && (
              <span className="review-count">({product.reviewCount} Ratings)</span>
            )}
          </div>
        </div>
      </Link>

      {/* Add to Cart Button */}
      {product.stock > 0 ? (
        <button className="btn-add-to-cart" onClick={handleAddToCart}>
          Add To Cart
        </button>
      ) : (
        <button className="btn-out-of-stock" disabled>
          Out of Stock
        </button>
      )}
    </div>
  );
};

export default ProductCard;

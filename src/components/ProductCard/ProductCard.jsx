import React from 'react';
import { Link } from 'react-router-dom';
import { FiShoppingCart, FiHeart, FiEye } from 'react-icons/fi';
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

          <p className="product-description">
            {product.description || 'Brighter Skin in 4 Weeks'}
          </p>

          <div className="product-meta-row">
            <div className="price-wrapper">
              <span className="current-price">Rs. {product.price.toFixed(2)}</span>
              {product.originalPrice && (
                <span className="original-price">Rs. {product.originalPrice.toFixed(2)}</span>
              )}
            </div>

          </div>

        </div>
      </Link>

      {/* Add to Cart Button */}
      {product.stock > 0 ? (
        <div className="action-container">
          <button className="btn-add-to-cart" onClick={handleAddToCart}>
            Add To Cart
          </button>
        </div>
      ) : (
        <div className="action-container">
          <button className="btn-out-of-stock" disabled>
            Out of Stock
          </button>
        </div>
      )}
    </div>
  );
};

export default ProductCard;

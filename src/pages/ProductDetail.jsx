import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { FiChevronLeft, FiChevronRight, FiShare2, FiHeart } from 'react-icons/fi';
import { useCart } from '../context/CartContext';
import './ProductDetail.css';

const ProductDetail = () => {
  /* ... inside ProductDetail ... */
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedPack, setSelectedPack] = useState(0); // Default to first pack
  const [quantity, setQuantity] = useState(1);
  // activeTab removed

  // ... (mock product data remains same) ...

  const nextImage = () => {
    setSelectedImage((prev) => (prev + 1) % product.images.length);
  };

  const prevImage = () => {
    setSelectedImage((prev) => (prev - 1 + product.images.length) % product.images.length);
  };

  const { addToCart } = useCart();

  const handleAddToBag = () => {
    const selectedPackData = product.packs[selectedPack];

    const cartItem = {
      _id: `${product.id}-${selectedPackData.id}`,
      productId: product.id,
      name: product.name,
      packName: selectedPackData.name,
      price: selectedPackData.price,
      image: selectedPackData.image || product.images[0],
      description: selectedPackData.description,
    };

    addToCart(cartItem, quantity);

    // Optional: Show success feedback or navigate
    alert('Added to cart!');
  };

  const handleBuyNow = () => {
    handleAddToBag();
    navigate('/checkout');
  };

  return (
    <div className="product-detail-page">
      {/* Breadcrumb */}
      <div className="container">
        <div className="breadcrumb">
          <Link to="/">Home</Link>
          <span>/</span>
          <span>{product.name}</span>
        </div>
      </div>

      {/* Main Product Section */}
      <div className="container">
        <div className="product-detail-container">
          {/* Left: Image Gallery */}
          <div className="product-gallery">
            <div className="main-image-container">
              <button className="gallery-nav prev" onClick={prevImage}>
                <FiChevronLeft />
              </button>
              <img src={product.images[selectedImage]} alt={product.name} className="main-image" />
              <button className="gallery-nav next" onClick={nextImage}>
                <FiChevronRight />
              </button>
            </div>
            <div className="thumbnail-gallery">
              {product.images.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`${product.name} ${index + 1}`}
                  className={`thumbnail ${selectedImage === index ? 'active' : ''}`}
                  onClick={() => setSelectedImage(index)}
                />
              ))}
            </div>
          </div>

          {/* Right: Product Info */}
          <div className="product-info">
            <h1 className="product-title">{product.name}</h1>
            <p className="product-tagline">{product.tagline}</p>

            {/* Benefits Tags */}
            <div className="benefits-tags">
              {product.benefits.map((benefit, index) => (
                <span key={index} className="benefit-tag">{benefit}</span>
              ))}
            </div>

            {/* Rating */}
            <div className="product-rating">
              <div className="stars">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="star filled">★</span>
                ))}
              </div>
              <span className="review-count">{product.reviewCount} reviews</span>
            </div>

            {/* Price */}
            <div className="product-price-section">
              <span className="label">Price:</span>
              <span className="price">Rs. {product.packs[selectedPack].price.toFixed(2)}</span>
            </div>
            <p className="tax-info">Tax included. Shipping calculated at checkout</p>

            {/* Description (Replaces Pack Selection) */}
            <div className="product-description-block" style={{ margin: '20px 0', lineHeight: '1.6', color: '#555' }}>
              <h3 style={{ fontSize: '1.1rem', marginBottom: '10px', textTransform: 'uppercase' }}>Description</h3>
              <p>{product.description}</p>
            </div>

            {/* Quantity */}
            <div className="quantity-section">
              <label>Quantity</label>
              <div className="quantity-controls">
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))}>-</button>
                <span>{quantity}</span>
                <button onClick={() => setQuantity(quantity + 1)}>+</button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="action-buttons">
              <button className="add-to-bag-btn" onClick={handleAddToBag}>
                + ADD TO BAG
              </button>
              <button className="buy-now-btn" onClick={handleBuyNow}>
                BUY NOW
              </button>
            </div>

            {/* Offers Removed */}

            {/* Related Products */}
            <div className="related-products-inline">
              <h3>You can also pair it with</h3>
              <div className="related-products-grid">
                {product.relatedProducts.map((relatedProduct) => (
                  <div key={relatedProduct.id} className="related-product-card">
                    <img src={relatedProduct.image} alt={relatedProduct.name} />
                    <div className="related-product-info">
                      <h4>{relatedProduct.name}</h4>
                      <p className="related-product-price">Rs. {relatedProduct.price.toFixed(2)}</p>
                    </div>
                    <button className="add-related-btn">+ Add</button>
                  </div>
                ))}
              </div>
            </div>

            {/* Share */}
            <div className="share-section">
              <FiShare2 /> <span>SHARE</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Tabs Section Removed */}

    </div>
  );
};

export default ProductDetail;

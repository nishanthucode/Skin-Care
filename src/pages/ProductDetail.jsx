import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { FiChevronLeft, FiChevronRight, FiShare2, FiHeart } from 'react-icons/fi';
import { useCart } from '../context/CartContext';
import './ProductDetail.css';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedPack, setSelectedPack] = useState(2);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');

  // Mock product data - replace with API call
  const product = {
    id: id,
    name: 'Papaya Face Wash (50ml)',
    tagline: 'Glow, Lighten, Tighten Pores & Brighten Skin Tone',
    rating: 5,
    reviewCount: 31,
    benefits: ['Deep Cleansing', 'Oil Control', 'Fresh, Clear Skin'],
    images: [
      'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1571875257727-256c39da42af?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1612817288484-6f916006741a?w=600&h=600&fit=crop',
    ],
    packs: [
      {
        id: 1,
        name: 'Pack 1',
        description: 'Standard Price',
        price: 199.00,
        originalPrice: 199.00,
        discount: 0,
        image: 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=100&h=100&fit=crop',
      },
      {
        id: 2,
        name: 'Pack 2',
        description: 'You save 3%',
        price: 386.06,
        originalPrice: 398.00,
        discount: 3,
        badge: 'MOST POPULAR',
        image: 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=100&h=100&fit=crop',
      },
      {
        id: 3,
        name: 'Pack 3',
        description: 'You save 6%',
        price: 561.18,
        originalPrice: 597.00,
        discount: 6,
        image: 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=100&h=100&fit=crop',
      },
    ],
    offers: [
      {
        icon: '🏷️',
        title: '6% OFF',
        description: '₹1000+ orders',
        code: 'YF1000',
      },
      {
        icon: '🎁',
        title: 'Solid perfume free',
        description: 'Above ₹500 order',
      },
    ],
    relatedProducts: [
      {
        id: 'beauty-cream',
        name: 'Beauty Cream (25g)',
        price: 599.00,
        image: 'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=200&h=200&fit=crop',
      },
      {
        id: 'night-serum',
        name: 'Night Serum (30ml)',
        price: 449.00,
        image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=200&h=200&fit=crop',
      },
    ],
    description: `YouthFace Papaya Face Wash is a gentle, brightening face wash designed for everyday cleansing. Powered by Papaya Enzyme and effective skin-cleansing actives, it helps remove dirt, excess oil, and impurities without disrupting the skin's natural moisture balance.

With regular use, this refreshing formula supports clearer-looking skin, smoother texture, and a naturally healthy glow. Enriched with hydrating ingredients, it cleanses thoroughly yet feels light and non-drying, making it ideal for daily use on normal to oily skin.`,
  };

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

            {/* Pack Selection */}
            <div className="pack-selection">
              <h3>Choose your offer</h3>
              {product.packs.map((pack, index) => (
                <div
                  key={pack.id}
                  className={`pack-option ${selectedPack === index ? 'selected' : ''}`}
                  onClick={() => setSelectedPack(index)}
                >
                  <input
                    type="radio"
                    name="pack"
                    checked={selectedPack === index}
                    onChange={() => setSelectedPack(index)}
                  />
                  <img src={pack.image} alt={pack.name} className="pack-image" />
                  <div className="pack-details">
                    <div className="pack-name">{pack.name}</div>
                    <div className="pack-description">{pack.description}</div>
                  </div>
                  <div className="pack-pricing">
                    {pack.badge && <span className="pack-badge">{pack.badge}</span>}
                    <div className="pack-price">Rs. {pack.price.toFixed(2)}</div>
                    {pack.originalPrice > pack.price && (
                      <div className="pack-original-price">Rs. {pack.originalPrice.toFixed(2)}</div>
                    )}
                  </div>
                </div>
              ))}
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

            {/* Offers */}
            <div className="offers-section">
              {product.offers.map((offer, index) => (
                <div key={index} className="offer-card">
                  <span className="offer-icon">{offer.icon}</span>
                  <div className="offer-content">
                    <div className="offer-title">{offer.title}</div>
                    <div className="offer-description">{offer.description}</div>
                  </div>
                  {offer.code && <div className="offer-code">{offer.code}</div>}
                </div>
              ))}
            </div>

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

      {/* Product Details Tabs */}
      <div className="container">
        <div className="product-details-section">
          <h2>All About Our Product</h2>
          <div className="tabs">
            <button
              className={`tab ${activeTab === 'description' ? 'active' : ''}`}
              onClick={() => setActiveTab('description')}
            >
              Description
            </button>
          </div>
          <div className="tab-content">
            {activeTab === 'description' && (
              <div className="description-content">
                <h3>{product.name}</h3>
                <p>{product.description}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;

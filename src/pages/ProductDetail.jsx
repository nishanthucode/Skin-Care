import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { FiChevronLeft, FiChevronRight, FiShare2, FiHeart } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';
import { useCart } from '../context/CartContext';
import { productAPI } from '../utils/api';
import image1 from '../assets/image 1.jpeg';
import image2 from '../assets/image 2.jpeg';
import './ProductDetail.css';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedPack, setSelectedPack] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const touchStart = useRef(0);
  const touchEnd = useRef(0);

  // Mock Products Database for Fallback
  const mockProducts = [
    {
      id: 'beauty-cream',
      _id: 'beauty-cream',
      name: 'Beauty Cream (25g)',
      tagline: 'Brighter Skin in 4 Weeks',
      description: 'Experience the ultimate skin transformation with our Beauty Cream. Specially formulated with natural extracts, it deeply nourishes and brightens your complexion while providing 24-hour hydration. Perfect for all skin types, this non-greasy formula works while you sleep to reveal a radiant glow.',
      benefits: ['Intense Brightening', '24h Moisture', 'Anti-Aging', 'For All Skin Types'],
      rating: 4.9,
      reviewCount: 60,
      image: image1,
      images: [
        image1,
        'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=800&h=800&fit=crop',
        'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=800&h=800&fit=crop'
      ],
      packs: [
        { id: 1, name: 'Single Jar', price: 599.00, description: 'Standard size jar' },
        { id: 2, name: 'Twin Pack', price: 1099.00, description: 'Best value for 2 months' }
      ]
    },
    {
      id: 'darkspot-soap',
      _id: 'darkspot-soap',
      name: 'DarkSpot Remover Soap (100g)',
      tagline: 'Brighten, Smooth, And Protect',
      description: 'Our DarkSpot Remover Soap is a powerful yet gentle cleanser that targeted hyperpigmentation and uneven skin tone. Infused with vitamin C and herbal extracts, it fades dark spots effectively while maintaining your skins natural moisture balance.',
      benefits: ['Fades Dark Spots', 'Even Tone', 'Germ Protection', 'Gentle Fragrance'],
      rating: 4.5,
      reviewCount: 40,
      image: image2,
      images: [
        image2,
        'https://images.unsplash.com/photo-1585652757173-57de5e9fab42?w=800&h=800&fit=crop'
      ],
      packs: [
        { id: 1, name: 'Standard Bar', price: 199.00, description: 'Luxury soap bar' },
        { id: 2, name: 'Pack of 3', price: 499.00, description: 'Value multi-pack' }
      ]
    },
    {
      id: 'glow-combo',
      _id: 'glow-combo',
      name: 'Glow & Protect Combo Pack',
      tagline: 'Complete Skincare Solution',
      description: 'Get the best of both worlds with our exclusive Glow & Protect Combo. This pack includes our signature Beauty Cream and the DarkSpot Remover Soap, working in harmony to cleanse, protect and brighten your skin every day.',
      benefits: ['Complete Care', 'Value Set', 'Deep Cleansing', 'Daily Protection'],
      rating: 5.0,
      reviewCount: 31,
      image: 'https://images.unsplash.com/photo-1612817288484-6f916006741a?w=800&h=800&fit=crop',
      images: [
        'https://images.unsplash.com/photo-1612817288484-6f916006741a?w=800&h=800&fit=crop',
        image1,
        image2
      ],
      packs: [
        { id: 1, name: 'Combo Pack', price: 699.00, description: 'Cream + Soap' }
      ]
    },
    {
      id: 'soap-pack-3',
      _id: 'soap-pack-3',
      name: 'DarkSpot Remover Soap (Pack of 3)',
      tagline: 'Buy 2 Get 1 Free Special Offer',
      description: 'Stock up on your favorite DarkSpot Remover Soap with our value pack of 3. Our powerful yet gentle formula target hyperpigmentation effectively when used consistently. This special pack ensures you never run out of your essential skincare.',
      benefits: ['Value Savings', 'Consistent Result', 'Targeted Action', 'Family Pack'],
      rating: 4.8,
      reviewCount: 52,
      image: image2,
      images: [
        image2,
        image2,
        image2
      ],
      packs: [
        { id: 1, name: 'Pack of 3', price: 398.00, description: 'Buy 2 Get 1 Free' }
      ]
    }
  ];

  useEffect(() => {
    const fetchProduct = async () => {
      console.log('Loading product detail for ID:', id);
      try {
        setLoading(true);
        // Try to fetch from API
        const response = await productAPI.getById(id);
        if (response.data && response.data.product) {
          setProduct(response.data.product);
        } else if (response.data) {
          setProduct(response.data);
        } else {
          throw new Error('No product found');
        }
      } catch (err) {
        console.error('API Error, using fallback:', err);
        // Fallback to mock data by ID
        const found = mockProducts.find(p => p.id === id || p._id === id);
        if (found) {
          setProduct(found);
        } else {
          // If not found, use first as default so it doesn't crash during dev
          setProduct(mockProducts[0]);
        }
      } finally {
        setLoading(false);
      }
      setSelectedImage(0); // Reset for new product
      setSelectedPack(0);
    };

    fetchProduct();
    // Scroll to top on change
    window.scrollTo(0, 0);
  }, [id]);

  if (loading) return <div className="product-detail-page"><div className="container" style={{ padding: '100px 0', textAlign: 'center' }}><h2>Loading Premium Skincare...</h2></div></div>;
  if (!product) return <div className="product-detail-page"><div className="container" style={{ padding: '100px 0', textAlign: 'center' }}><h2>Product Not Found</h2><Link to="/shop-all">Back to Shop</Link></div></div>;

  const nextImage = () => {
    setSelectedImage((prev) => (prev + 1) % (product.images?.length || 1));
  };

  const prevImage = () => {
    setSelectedImage((prev) => (prev - 1 + (product.images?.length || 1)) % (product.images?.length || 1));
  };

  const handleAddToBag = () => {
    const selectedPackData = product.packs[selectedPack];
    const cartItem = {
      _id: `${product._id || product.id}-${selectedPackData.id}`,
      productId: product._id || product.id,
      name: product.name,
      packName: selectedPackData.name,
      price: selectedPackData.price,
      image: product.images[0],
      description: product.tagline,
    };

    addToCart(cartItem, quantity);
    alert('Added to cart!');
  };

  const handleBuyNow = () => {
    handleAddToBag();
    navigate('/checkout');
  };

  const minSwipeDistance = 50;

  const onTouchStart = (e) => {
    touchEnd.current = 0;
    touchStart.current = e.targetTouches[0].clientX;
  };

  const onTouchMove = (e) => {
    touchEnd.current = e.targetTouches[0].clientX;
  };

  const onTouchEnd = () => {
    if (!touchStart.current || !touchEnd.current) return;
    const distance = touchStart.current - touchEnd.current;
    if (distance > minSwipeDistance) nextImage();
    if (distance < -minSwipeDistance) prevImage();
  };

  return (
    <div className="product-detail-page">
      <div className="container">
        <div className="breadcrumb">
          <Link to="/">Home</Link>
          <span>/</span>
          <span>{product.name}</span>
        </div>
      </div>

      <div className="container">
        <div className="product-detail-container">
          <div className="product-gallery">
            <div
              className="main-image-container"
              onTouchStart={onTouchStart}
              onTouchMove={onTouchMove}
              onTouchEnd={onTouchEnd}
            >
              <button className="gallery-nav prev" onClick={prevImage}><FiChevronLeft /></button>
              <img src={product.images && product.images[selectedImage]} alt={product.name} className="main-image" draggable="false" />
              <button className="gallery-nav next" onClick={nextImage}><FiChevronRight /></button>
            </div>
            <div className="thumbnail-gallery">
              {product.images && product.images.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={product.name}
                  className={`thumbnail ${selectedImage === index ? 'active' : ''}`}
                  onClick={() => setSelectedImage(index)}
                />
              ))}
            </div>
          </div>

          <div className="product-info">
            <h1 className="product-title">{product.name}</h1>
            <p className="product-tagline">{product.tagline}</p>

            <div className="benefits-tags">
              {product.benefits && product.benefits.map((benefit, index) => (
                <span key={index} className="benefit-tag">{benefit}</span>
              ))}
            </div>


            <div className="product-price-section">
              <span className="label">Price:</span>
              <span className="price">Rs. {product.packs && product.packs[selectedPack].price.toFixed(2)}</span>
            </div>
            <p className="tax-info">Tax included. Shipping calculated at checkout</p>

            <div className="product-description-block">
              <h3>Description</h3>
              <p>{product.description}</p>
            </div>

            {/* Quantity Removed */}

            <div className="action-buttons">
              <button className="add-to-bag-btn" onClick={handleAddToBag}>
                + ADD TO BAG
              </button>
              <button className="buy-now-btn" onClick={() => window.open(`https://wa.me/919876543210?text=I want to buy ${product.name}`, '_blank')}>
                <FaWhatsapp className="whatsapp-icon" /> ORDER VIA WHATSAPP
              </button>
            </div>

            {/* Related Products and Share Removed */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;

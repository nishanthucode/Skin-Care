import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { FaWhatsapp } from 'react-icons/fa';
import { useCart } from '../context/CartContext';
import { productAPI } from '../utils/api';
import image1 from '../assets/product-1.jpeg';
import image2 from '../assets/product-2.jpeg';
import image3 from '../assets/product-3.jpeg';
import image4 from '../assets/product-4.jpeg';
import image5 from '../assets/product-5.jpeg';
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
      name: 'Aura Face Whitening Cream',
      description: 'Aura Face Whitening Cream is a specially formulated skincare cream designed to help brighten the skin and improve overall complexion. Made with carefully selected ingredients, it helps reduce the appearance of dark spots, blemishes, and uneven skin tone while keeping the skin soft and nourished. This cream works gently on the skin to restore its natural glow and freshness. With regular use, Aura Face Whitening Cream helps the skin look clearer, smoother, and more radiant. Its lightweight texture absorbs easily into the skin without feeling heavy or greasy, making it suitable for daily use. Aura Face Whitening Cream helps moisturize the skin while supporting a more even and healthy-looking complexion. It also helps reduce dullness caused by pollution, sun exposure, and everyday environmental stress.',
      careTip: 'Aura Care Tip: For best results, use Aura Face Whitening Cream regularly on a clean face. Use a gentle facewash before application and avoid direct sunlight for better skincare results.',
      tagline: 'Brighten, Nourish & Glow',
      benefits: ['Helps brighten and improve skin complexion', 'Reduces the appearance of dark spots and blemishes', 'Supports smoother and clearer skin', 'Helps maintain skin moisture and softness', 'Suitable for daily skincare routine'],
      rating: 4.9,
      reviewCount: 60,
      image: image1,
      images: [
        image1,

      ],
      packs: [
        { id: 1, name: 'Single Jar', price: 699.00, description: 'Standard size jar' },
        { id: 2, name: 'Twin Pack', price: 1099.00, description: 'Best value for 2 months' }
      ]
    },
    {
      id: 'darkspot-soap',
      _id: 'darkspot-soap',
      name: 'Aura Goat Milk Soap',
      description: 'Aura Goat Milk Soap is a gentle and nourishing skincare soap made with the natural goodness of goat milk. It is specially designed to cleanse the skin while keeping it soft, smooth, and hydrated. Goat milk is rich in vitamins, minerals, and natural moisturizers that help improve skin texture and maintain healthy, glowing skin. This soap helps remove dirt, excess oil, and impurities from the skin without making it dry. The natural properties of goat milk support skin hydration and help soothe dryness and irritation. With regular use, Aura Goat Milk Soap helps the skin feel refreshed, soft, and naturally radiant. The creamy lather gently cleanses the skin while providing essential nutrients that support overall skin health. It is suitable for daily use and can be used on both face and body.',
      careTip: 'Aura Care Tip: For best results, use Aura Goat Milk Soap regularly as part of your daily skincare routine and follow with Aura recommended skincare products.',
      tagline: 'Brighten, Smooth, And Protect',
      benefits: ['Deeply cleanses the skin', 'Helps moisturize and nourish the skin', 'Supports smoother and softer skin texture', 'Helps maintain natural skin glow','Suitable for daily use for face and body'],
      rating: 4.5,
      reviewCount: 40,
      image: image2,
      images: [
        image2,

      ],
      packs: [
        { id: 1, name: 'Standard Bar', price: 249.00, description: 'Luxury soap bar' },
        { id: 2, name: 'Pack of 3', price: 699.00, description: 'Value multi-pack' }
      ]
    },
    {
      id: 'glow-combo',
      _id: 'glow-combo',
      name: 'Aura Face Whitening Cream & Aura Goat Milk Soap (Combo)',
      description: 'The Aura Face Whitening Cream & Aura Goat Milk Soap Combo is a complete skincare solution designed to cleanse, nourish, and brighten your skin naturally. This powerful combination works together to improve skin tone, reduce dark spots, and maintain soft, healthy, and glowing skin. Aura Goat Milk Soap gently cleanses the skin by removing dirt, oil, and impurities while providing natural moisture and nourishment. Enriched with the goodness of goat milk, it helps keep the skin soft, smooth, and refreshed without causing dryness. Aura Face Whitening Cream works to brighten the complexion, reduce the appearance of dark spots, and improve uneven skin tone. Its lightweight formula absorbs quickly into the skin, helping restore natural glow and smooth texture. When used together, this combo helps enhance your skincare routine by deeply cleansing the skin and providing the nourishment needed for a brighter and healthier-looking complexion.',
      careTip: 'Aura Care Tip: For best results, wash your face with Aura Goat Milk Soap daily and apply Aura Face Whitening Cream on clean skin. Use regularly as part of your Aura skincare routine and avoid excessive sunlight exposure.',
      tagline: 'Complete Skincare Solution',
      benefits: ['Helps brighten and improve skin complexion', 'Reduces dark spots, blemishes, and pigmentation', 'Deeply cleanses and nourishes the skin', 'Keeps skin soft, smooth, and hydrated', 'Supports a natural, healthy glow'],
      rating: 5.0,
      reviewCount: 31,
      image: image3,
      images: [
        image3
      ],
      packs: [
        { id: 1, name: 'Combo Pack', price: 949.00, description: 'Cream + Soap' }
      ]
    },
    {
      id: 'soap-pack-3',
      _id: 'soap-pack-3',
      name: 'Aura Goat Milk Soap (Pack 2)',
      description: 'Aura Goat Milk Soap is a gentle and nourishing skincare soap made with the natural goodness of goat milk. It is specially designed to cleanse the skin while keeping it soft, smooth, and hydrated. Goat milk is rich in vitamins, minerals, and natural moisturizers that help improve skin texture and maintain healthy, glowing skin. This soap helps remove dirt, excess oil, and impurities from the skin without making it dry. The natural properties of goat milk support skin hydration and help soothe dryness and irritation. With regular use, Aura Goat Milk Soap helps the skin feel refreshed, soft, and naturally radiant. The creamy lather gently cleanses the skin while providing essential nutrients that support overall skin health. It is suitable for daily use and can be used on both face and body.',
      careTip: 'Aura Care Tip: For best results, use Aura Goat Milk Soap regularly as part of your daily skincare routine and follow with Aura recommended skincare products.',
      tagline: 'Buy 2 Get 1 Free Special Offer',
      benefits: ['Deeply cleanses the skin', 'Helps moisturize and nourish the skin', 'Supports smoother and softer skin texture', 'Helps maintain natural skin glow', 'Suitable for daily use for face and body'],
      rating: 4.8,
      reviewCount: 52,
      image: image4,
      images: [
        image4,

      ],
      packs: [
        { id: 1, name: 'Pack of 3', price: 499.00, description: 'Buy 2 Get 1 Free' }
      ]
    },
    {
      id: 'cream-pack-2',
      _id: 'cream-pack-2',
      name: 'Aura Face Whitening Cream (Pack 2)',
      description: 'Aura Face Whitening Cream is a specially formulated skincare cream designed to help brighten the skin and improve overall complexion. Made with carefully selected ingredients, it helps reduce the appearance of dark spots, blemishes, and uneven skin tone while keeping the skin soft and nourished. This cream works gently on the skin to restore its natural glow and freshness. With regular use, Aura Face Whitening Cream helps the skin look clearer, smoother, and more radiant. Its lightweight texture absorbs easily into the skin without feeling heavy or greasy, making it suitable for daily use. Aura Face Whitening Cream helps moisturize the skin while supporting a more even and healthy-looking complexion. It also helps reduce dullness caused by pollution, sun exposure, and everyday environmental stress.',
      careTip: 'Aura Care Tip: For best results, use Aura Face Whitening Cream regularly on a clean face. Use a gentle facewash before application and avoid direct sunlight for better skincare results.',
      tagline: 'Brighten, Nourish & Glow',
      benefits: ['Helps brighten and improve skin complexion', 'Reduces the appearance of dark spots and blemishes', 'Supports smoother and clearer skin', 'Helps maintain skin moisture and softness', 'Suitable for daily skincare routine'],
      rating: 4.9,
      reviewCount: 60,
      image: image5,
      images: [
        image5,

      ],
      packs: [
        { id: 1, name: 'Pack of 2', price: 1399.00, description: 'Best value for 2 months' }
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
              <img src={product.images && product.images[selectedImage]} alt={product.name} className="main-image" draggable="false" />
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
              {product.careTip && (
                <p className="care-tip"><strong>{product.careTip}</strong></p>
              )}
            </div>

            {/* Quantity Removed */}

            <div className="action-buttons">
              <button className="add-to-bag-btn" onClick={handleAddToBag}>
                + ADD TO BAG
              </button>
              <button className="buy-now-btn" onClick={() => window.open(`https://wa.me/918296350093?text=I want to buy ${product.name}`, '_blank')}>
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

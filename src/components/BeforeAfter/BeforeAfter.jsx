import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import './BeforeAfter.css';

const BeforeAfter = () => {
    const [visibleItems, setVisibleItems] = useState(3);

    const [currentSlide, setCurrentSlide] = useState(0);
    const [sliderPositions, setSliderPositions] = useState({});
    const [isDragging, setIsDragging] = useState({});
    const containerRefs = useRef({});

    // Handle Resize for Visible Items
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 968) {
                setVisibleItems(1);
            } else if (window.innerWidth < 1200) {
                setVisibleItems(2);
            } else {
                setVisibleItems(3);
            }
        };

        handleResize(); // Initial call
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // ... comparisons array ...

    // ... slider position handlers ...

    // ... global mouse up ...

    const comparisons = [
        {
            id: 1,
            beforeImage: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=500&fit=crop',
            afterImage: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=500&fit=crop',
            concerns: ['Dark Spots', 'Dullness'],
            productName: 'Beauty Cream',
            customerName: '- Nanditha',
            productLink: '/product/beauty-cream',
        },
        {
            id: 2,
            beforeImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=500&fit=crop',
            afterImage: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=500&fit=crop',
            concerns: ['Acne & Pimples', 'Redness'],
            productName: 'Papaya Face Wash',
            customerName: '- Rahul',
            productLink: '/product/papaya-face-wash',
        },
        {
            id: 3,
            beforeImage: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=500&fit=crop',
            afterImage: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=500&fit=crop',
            concerns: ['Blackheads', 'Dull Skin'],
            productName: 'DarkSpot Remover Soap',
            customerName: '- Priya',
            productLink: '/product/darkspot-soap',
        },
        {
            id: 4,
            beforeImage: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400&h=500&fit=crop',
            afterImage: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400&h=500&fit=crop',
            concerns: ['Acne Scars', 'Dark Spots'],
            productName: 'Beauty Cream',
            customerName: '- Anjali',
            productLink: '/product/beauty-cream',
        },
        {
            id: 5,
            beforeImage: 'https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=400&h=500&fit=crop',
            afterImage: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=400&h=500&fit=crop',
            concerns: ['Dull Skin', 'Fine Lines'],
            productName: 'Sunscreen',
            customerName: '- Vikram',
            productLink: '/product/sunscreen',
        },
    ];

    // Update slider position based on mouse/touch position
    const updateSliderPosition = (e, id) => {
        const container = containerRefs.current[id];
        if (!container) return;

        const rect = container.getBoundingClientRect();
        const x = e.clientX ? e.clientX - rect.left : e.touches[0].clientX - rect.left;
        const percentage = (x / rect.width) * 100;

        setSliderPositions(prev => ({
            ...prev,
            [id]: Math.min(Math.max(percentage, 0), 100)
        }));
    };

    // Handle click on container - move slider to click position
    const handleContainerClick = (e, id) => {
        // Don't trigger if clicking on the slider button itself
        if (e.target.closest('.slider-button')) return;
        updateSliderPosition(e, id);
    };

    // Handle mouse down on slider button or container
    const handleMouseDown = (e, id) => {
        setIsDragging(prev => ({ ...prev, [id]: true }));
        updateSliderPosition(e, id);
    };

    // Handle mouse up
    const handleMouseUp = (id) => {
        setIsDragging(prev => ({ ...prev, [id]: false }));
    };

    // Handle mouse move - only works if dragging
    const handleMouseMove = (e, id) => {
        if (!isDragging[id]) return;
        updateSliderPosition(e, id);
    };

    // Handle touch start
    const handleTouchStart = (e, id) => {
        setIsDragging(prev => ({ ...prev, [id]: true }));
        updateSliderPosition(e, id);
    };

    // Handle touch end
    const handleTouchEnd = (id) => {
        setIsDragging(prev => ({ ...prev, [id]: false }));
    };

    // Handle touch move - only works if dragging
    const handleTouchMove = (e, id) => {
        if (!isDragging[id]) return;
        updateSliderPosition(e, id);
    };

    // Add global mouse up listener
    useEffect(() => {
        const handleGlobalMouseUp = () => {
            setIsDragging({});
        };

        window.addEventListener('mouseup', handleGlobalMouseUp);
        window.addEventListener('touchend', handleGlobalMouseUp);

        return () => {
            window.removeEventListener('mouseup', handleGlobalMouseUp);
            window.removeEventListener('touchend', handleGlobalMouseUp);
        };
    }, []);

    const nextSlide = () => {
        const maxIndex = Math.max(0, comparisons.length - visibleItems);
        setCurrentSlide((prev) => (prev >= maxIndex ? 0 : prev + 1));
    };

    const prevSlide = () => {
        const maxIndex = Math.max(0, comparisons.length - visibleItems);
        setCurrentSlide((prev) => (prev <= 0 ? maxIndex : prev - 1));
    };

    const goToSlide = (index) => {
        setCurrentSlide(index);
    };

    return (
        <section className="before-after-section section">
            <div className="container">
                <div className="carousel-wrapper">
                    <button className="carousel-nav prev" onClick={prevSlide}>
                        <FiChevronLeft />
                    </button>

                    <div className="comparisons-carousel">
                        <div
                            className="comparisons-track"
                            style={{
                                transform: `translateX(-${currentSlide * 33.333}%)`,
                            }}
                        >
                            {comparisons.map((comparison) => {
                                const sliderPosition = sliderPositions[comparison.id] || 50;

                                return (
                                    <div key={comparison.id} className="comparison-card">
                                        <div
                                            className="comparison-container"
                                            ref={(el) => (containerRefs.current[comparison.id] = el)}
                                            onClick={(e) => handleContainerClick(e, comparison.id)}
                                            onMouseDown={(e) => handleMouseDown(e, comparison.id)}
                                            onMouseMove={(e) => handleMouseMove(e, comparison.id)}
                                            onMouseUp={() => handleMouseUp(comparison.id)}
                                            onMouseLeave={() => handleMouseUp(comparison.id)}
                                            onTouchStart={(e) => handleTouchStart(e, comparison.id)}
                                            onTouchMove={(e) => handleTouchMove(e, comparison.id)}
                                            onTouchEnd={() => handleTouchEnd(comparison.id)}
                                        >
                                            {/* Background Image (AFTER) - Bottom Layer */}
                                            {/* In standard before/after, Left is Before. Right is After.
                                                If we want After on Right, it should be the Background (revealed by clipping).
                                                So Background = After.
                                                Top Layer = Before.
                                                Clip Top Layer from Right.
                                             */}
                                            <div className="after-image-wrapper">
                                                <img src={comparison.afterImage} alt="After" draggable="false" />
                                                <span className="image-label after-label" style={{ opacity: sliderPosition > 85 ? 0 : 1 }}>After</span>
                                            </div>

                                            {/* Foreground Image (BEFORE) - Top Layer, Clipped */}
                                            <div
                                                className="before-image-wrapper"
                                                style={{
                                                    clipPath: `inset(0 ${100 - sliderPosition}% 0 0)`,
                                                    zIndex: 2,
                                                    position: 'absolute', top: 0, left: 0, width: '100%', height: '100%'
                                                }}
                                            >
                                                <img src={comparison.beforeImage} alt="Before" draggable="false" />
                                                <span className="image-label before-label" style={{ opacity: sliderPosition < 15 ? 0 : 1 }}>Before</span>
                                            </div>

                                            {/* Slider Handle */}
                                            <div
                                                className="slider-handle"
                                                style={{ left: `${sliderPosition}%` }}
                                            >
                                                <div className="slider-line"></div>
                                                <div className="slider-button">
                                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                                                        <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" fill="currentColor" />
                                                        <path d="M8.59 16.59L10 18l6-6-6-6-1.41 1.41L10.83 12z" fill="currentColor" />
                                                        {/* Adjusted SVG to be generic Left/Right arrows or keep same code */}
                                                    </svg>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Product Info */}
                                        <div className="comparison-info">
                                            <div className="concerns">
                                                {comparison.concerns.map((concern, index) => (
                                                    <span key={index} className="concern-tag">{concern}</span>
                                                ))}
                                            </div>
                                            <p className="customer-name">{comparison.customerName}</p>
                                            <Link to={comparison.productLink} className="shop-product-btn">
                                                Show The Product →
                                            </Link>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    <button className="carousel-nav next" onClick={nextSlide}>
                        <FiChevronRight />
                    </button>
                </div>

                {/* Carousel Dots */}
                <div className="carousel-dots">
                    {comparisons.map((_, index) => (
                        <button
                            key={index}
                            className={`dot ${index === currentSlide ? 'active' : ''}`}
                            onClick={() => goToSlide(index)}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default BeforeAfter;

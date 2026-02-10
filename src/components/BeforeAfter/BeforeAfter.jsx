import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import './BeforeAfter.css';

const BeforeAfter = () => {
    const comparisons = [
        {
            id: 1,
            beforeImage: 'https://youthface.co.in/cdn/shop/files/3_c4e0d5ca-04b1-474a-b6ee-130833bd08df.png?v=1769862945&width=800',
            afterImage: 'https://youthface.co.in/cdn/shop/files/4_52e3cad0-dd1a-4d3b-9005-ec4a3d293f72.png?v=1769862945&width=800',
            concerns: ['Fine Lines', 'Puffiness', 'Dark Circles'],
            customerName: 'Fathima',
            productLink: '/product/beauty-cream',
        },
        {
            id: 2,
            beforeImage: 'https://youthface.co.in/cdn/shop/files/3_c4e0d5ca-04b1-474a-b6ee-130833bd08df.png?v=1769862945&width=800',
            afterImage: 'https://youthface.co.in/cdn/shop/files/4_52e3cad0-dd1a-4d3b-9005-ec4a3d293f72.png?v=1769862945&width=800',
            concerns: ['Acne & Pimples', 'Redness & Sunburn', 'Skin Inflammation'],
            customerName: 'Keerthana, Age: 25',
            productLink: '/product/papaya-face-wash',
        },
        {
            id: 3,
            beforeImage: 'https://youthface.co.in/cdn/shop/files/3_c4e0d5ca-04b1-474a-b6ee-130833bd08df.png?v=1769862945&width=800',
            afterImage: 'https://youthface.co.in/cdn/shop/files/4_52e3cad0-dd1a-4d3b-9005-ec4a3d293f72.png?v=1769862945&width=800',
            concerns: ['Blackheads', 'Dull Skin', 'Dark Spots'],
            customerName: 'Shiva',
            productLink: '/product/darkspot-soap',
        },
        {
            id: 4,
            beforeImage: 'https://youthface.co.in/cdn/shop/files/3_c4e0d5ca-04b1-474a-b6ee-130833bd08df.png?v=1769862945&width=800',
            afterImage: 'https://youthface.co.in/cdn/shop/files/4_52e3cad0-dd1a-4d3b-9005-ec4a3d293f72.png?v=1769862945&width=800',
            concerns: ['Acne Scars', 'Dark Spots', 'Hyperpigmentation'],
            customerName: 'Nanditha',
            productLink: '/product/beauty-cream',
        },
        {
            id: 5,
            beforeImage: 'https://youthface.co.in/cdn/shop/files/3_c4e0d5ca-04b1-474a-b6ee-130833bd08df.png?v=1769862945&width=800',
            afterImage: 'https://youthface.co.in/cdn/shop/files/4_52e3cad0-dd1a-4d3b-9005-ec4a3d293f72.png?v=1769862945&width=800',
            concerns: ['Dull Skin', 'Fine Lines', 'Puffiness'],
            customerName: 'Vikram',
            productLink: '/product/sunscreen',
        },
    ];

    const [activeIndex, setActiveIndex] = useState(2);
    const [sliderPositions, setSliderPositions] = useState({});
    const [isDragging, setIsDragging] = useState({});
    const containerRefs = useRef({});
    const scrollRef = useRef(null);

    // Card width (350px) + Horizontal Margin (15px * 2) = 380px
    const CARD_WIDTH_WITH_MARGIN = 380;

    useEffect(() => {
        // Scroll to initial active index on mount
        scrollToSlide(2);
    }, []);

    const scrollToSlide = (index) => {
        if (scrollRef.current) {
            const scrollPos = index * CARD_WIDTH_WITH_MARGIN;
            scrollRef.current.scrollTo({
                left: scrollPos,
                behavior: 'smooth'
            });
            setActiveIndex(index);
        }
    };

    const handleScroll = () => {
        if (scrollRef.current) {
            const scrollLeft = scrollRef.current.scrollLeft;
            const index = Math.round(scrollLeft / CARD_WIDTH_WITH_MARGIN);
            // Clamp index between 0 and comparisons.length - 1
            const clampedIndex = Math.min(Math.max(index, 0), comparisons.length - 1);
            if (clampedIndex !== activeIndex) {
                setActiveIndex(clampedIndex);
            }
        }
    };

    const updateSliderPosition = (e, id) => {
        const container = containerRefs.current[id];
        if (!container) return;
        const rect = container.getBoundingClientRect();
        const clientX = e.clientX || (e.touches && e.touches[0].clientX);
        const x = clientX - rect.left;
        const percentage = (x / rect.width) * 100;
        setSliderPositions(prev => ({ ...prev, [id]: Math.min(Math.max(percentage, 0), 100) }));
    };

    const handleMouseDown = (e, id) => {
        setIsDragging(prev => ({ ...prev, [id]: true }));
        updateSliderPosition(e, id);
    };

    const handleMouseMove = (e, id) => {
        if (!isDragging[id]) return;
        updateSliderPosition(e, id);
    };

    const handleMouseUp = (id) => {
        setIsDragging(prev => ({ ...prev, [id]: false }));
    };

    useEffect(() => {
        const handleGlobalMouseUp = () => setIsDragging({});
        window.addEventListener('mouseup', handleGlobalMouseUp);
        window.addEventListener('touchend', handleGlobalMouseUp);
        return () => {
            window.removeEventListener('mouseup', handleGlobalMouseUp);
            window.removeEventListener('touchend', handleGlobalMouseUp);
        };
    }, []);

    return (
        <section className="before-after-section">
            <div className="container">
                <div className="section-header-center">
                    <h2 className="section-title">Over 1 Million People Trust Youthface</h2>
                    <p className="section-subtitle">Explore Clinically Proven Formulations For South Indian Skin & Hair</p>
                </div>

                <div
                    className="comparisons-scroll-container"
                    ref={scrollRef}
                    onScroll={handleScroll}
                >
                    <div className="comparisons-flex-track">
                        {comparisons.map((comparison, index) => {
                            const isActive = index === activeIndex;
                            return (
                                <div
                                    key={comparison.id}
                                    className={`comparison-card-modern ${isActive ? 'active' : ''}`}
                                    onClick={() => !isActive && scrollToSlide(index)}
                                >
                                    <div
                                        className="comparison-box"
                                        ref={(el) => (containerRefs.current[comparison.id] = el)}
                                        onMouseDown={(e) => handleMouseDown(e, comparison.id)}
                                        onMouseMove={(e) => handleMouseMove(e, comparison.id)}
                                        onMouseUp={() => handleMouseUp(comparison.id)}
                                        onMouseLeave={() => handleMouseUp(comparison.id)}
                                        onTouchStart={(e) => handleMouseDown(e, comparison.id)}
                                        onTouchMove={(e) => handleMouseMove(e, comparison.id)}
                                        onTouchEnd={() => handleMouseUp(comparison.id)}
                                    >
                                        <div className="after-layer">
                                            <img src={comparison.afterImage} alt="After" draggable="false" />
                                            <span className="label-modern after">After</span>
                                        </div>

                                        <div
                                            className="before-layer"
                                            style={{ clipPath: `inset(0 ${100 - (sliderPositions[comparison.id] || 50)}% 0 0)` }}
                                        >
                                            <img src={comparison.beforeImage} alt="Before" draggable="false" />
                                            <span className="label-modern before">Before</span>
                                        </div>

                                        <div className="slider-divider" style={{ left: `${sliderPositions[comparison.id] || 50}%` }}>
                                            <div className="slider-btn-modern">
                                                <div className="slider-grip-line">|||</div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="comparison-content-modern">
                                        <div className="concern-pills">
                                            {comparison.concerns.map((concern, i) => (
                                                <span key={i} className="pill-modern">{concern}</span>
                                            ))}
                                        </div>
                                        <p className="customer-attribution">
                                            - {comparison.customerName}
                                        </p>
                                        <Link to={comparison.productLink} className="cta-button-block">
                                            SHOW THE PRODUCT →
                                        </Link>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                <div className="pagination-dots-modern">
                    {comparisons.map((_, index) => (
                        <button
                            key={index}
                            className={`modern-dot ${index === activeIndex ? 'active' : ''}`}
                            onClick={() => scrollToSlide(index)}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default BeforeAfter;

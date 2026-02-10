import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import './BeforeAfter.css';

const originalComparisons = [
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
        productLink: '/product/darkspot-soap',
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
        productLink: '/product/beauty-cream',
    },
];

const CLONE_COUNT = 2;
const items = [
    ...originalComparisons.slice(-CLONE_COUNT),
    ...originalComparisons,
    ...originalComparisons.slice(0, CLONE_COUNT)
];

const BeforeAfter = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [sliderPositions, setSliderPositions] = useState({});
    const dragTargetRef = useRef(null);


    const containerRefs = useRef({});
    const scrollRef = useRef(null);
    const paramsRef = useRef({
        isScrolling: false,
        timeout: null
    });

    // We need a ref to track active index inside scroll handler without dependency issues
    // We need a ref to track active index inside scroll handler without dependency issues
    const activeRealIndexRef = useRef(0);

    // Card width tracking
    const cardWidthRef = useRef(380); // Default to desktop width

    const updateCardWidth = () => {
        const firstCard = document.querySelector('.comparison-card-modern');
        if (firstCard && firstCard.offsetWidth > 0) {
            // Margin is 15px * 2 = 30px
            cardWidthRef.current = firstCard.offsetWidth + 30;
        } else {
            // Fallback base on screen size if DOM is not ready
            cardWidthRef.current = window.innerWidth <= 768 ? 330 : 380;
        }
    };

    useEffect(() => {
        updateCardWidth();
        window.addEventListener('resize', updateCardWidth);
        return () => window.removeEventListener('resize', updateCardWidth);
    }, []);

    // Initialize scroll position to the first real item
    useEffect(() => {
        // Ensure width is correct before setting initial scroll
        updateCardWidth();

        if (scrollRef.current) {
            const initialRealIndex = 0;
            const extendedIndex = initialRealIndex + CLONE_COUNT;

            scrollRef.current.scrollLeft = extendedIndex * cardWidthRef.current;
            setActiveIndex(initialRealIndex);
        }
    }, [items]); // Re-run if items change (though they are static here)

    // Helper to scroll to a specific REAL index (0-4)
    const scrollToRealSlide = (realIndex, behavior = 'smooth') => {
        updateCardWidth(); // Ensure accuracy before scroll
        if (scrollRef.current) {
            const extendedIndex = realIndex + CLONE_COUNT;
            const scrollPos = extendedIndex * cardWidthRef.current;
            scrollRef.current.scrollTo({
                left: scrollPos,
                behavior: behavior
            });
            setActiveIndex(realIndex);
        }
    };

    const handleScroll = () => {
        if (scrollRef.current) {
            updateCardWidth(); // Ensure tracking matches reality
            const scrollLeft = scrollRef.current.scrollLeft;
            const extendedIndex = Math.round(scrollLeft / cardWidthRef.current);

            let realIndex = (extendedIndex - CLONE_COUNT);
            // Normalize positive modulo
            realIndex = ((realIndex % originalComparisons.length) + originalComparisons.length) % originalComparisons.length;

            if (activeRealIndexRef.current !== realIndex) {
                setActiveIndex(realIndex);
                activeRealIndexRef.current = realIndex;
            }

            clearTimeout(paramsRef.current.timeout);
            paramsRef.current.timeout = setTimeout(() => {
                checkInfiniteScrollLoop(scrollLeft);
            }, 100);
        }
    };

    const checkInfiniteScrollLoop = (currentScrollLeft) => {
        if (!scrollRef.current) return;

        const extendedIndex = Math.round(currentScrollLeft / cardWidthRef.current);
        const totalExtended = items.length;
        const realCount = originalComparisons.length;

        // If we are at the clones at the START (Indices < CLONE_COUNT)
        if (extendedIndex < CLONE_COUNT) {
            const newExtendedIndex = extendedIndex + realCount;
            scrollRef.current.scrollTo({
                left: newExtendedIndex * cardWidthRef.current,
                behavior: 'auto' // Instant jump
            });
        }
        // If we are at the clones at the END (Indices >= CLONE_COUNT + realCount)
        else if (extendedIndex >= CLONE_COUNT + realCount) {
            const newExtendedIndex = extendedIndex - realCount;
            scrollRef.current.scrollTo({
                left: newExtendedIndex * cardWidthRef.current,
                behavior: 'auto' // Instant jump
            });
        }
    };

    const updateSliderPosition = (clientX, refKey, dataId) => {
        const container = containerRefs.current[refKey];
        if (!container) return;
        const rect = container.getBoundingClientRect();
        const x = clientX - rect.left;
        const percentage = (x / rect.width) * 100;

        // Update slider position for this specific ID (shared across clones)
        setSliderPositions(prev => ({ ...prev, [dataId]: Math.min(Math.max(percentage, 0), 100) }));
    };

    const handleDragStart = (e, refKey, dataId) => {
        // Prevent default only if needed, but here we want to allow scrolling if not dragging slider?
        // But dragging slider is horizontal, scrolling is horizontal. Conflict?
        // Let's assume user wants to drag slider if they touch it.
        // e.preventDefault(); // Might block page scroll on touch devices? Carefully use.

        dragTargetRef.current = { key: refKey, id: dataId };

        const clientX = e.touches ? e.touches[0].clientX : e.clientX;
        updateSliderPosition(clientX, refKey, dataId);
    };

    // Global Event Listeners for Dragging
    useEffect(() => {
        const handleGlobalMove = (e) => {
            if (!dragTargetRef.current) return;

            // Prevent page scroll while dragging the comparison slider on mobile
            if (e.type === 'touchmove' && e.cancelable) {
                e.preventDefault();
            }

            const { key, id } = dragTargetRef.current;
            const clientX = e.touches ? e.touches[0].clientX : e.clientX;
            updateSliderPosition(clientX, key, id);
        };

        const handleGlobalUp = () => {
            if (dragTargetRef.current) {
                dragTargetRef.current = null;
            }
        };

        window.addEventListener('mousemove', handleGlobalMove);
        window.addEventListener('mouseup', handleGlobalUp);
        window.addEventListener('touchmove', handleGlobalMove, { passive: false });
        window.addEventListener('touchend', handleGlobalUp);

        return () => {
            window.removeEventListener('mousemove', handleGlobalMove);
            window.removeEventListener('mouseup', handleGlobalUp);
            window.removeEventListener('touchmove', handleGlobalMove);
            window.removeEventListener('touchend', handleGlobalUp);
        };
    }, []);

    // Cleanup refs on unmount or updates
    useEffect(() => {
        // We keep refs valid
    });

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
                        {items.map((comparison, index) => {
                            const isDataActive = comparison.id === originalComparisons[activeIndex].id;

                            return (
                                <div
                                    key={`${comparison.id}-${index}`} // Unique key for extended array
                                    className={`comparison-card-modern ${isDataActive ? 'active' : ''}`}
                                    onClick={() => !isDataActive && scrollToRealSlide(originalComparisons.findIndex(c => c.id === comparison.id))}
                                >
                                    <div
                                        className="comparison-box"
                                        ref={(el) => (containerRefs.current[index] = el)} // Use index as key
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
                                            <div
                                                className="slider-btn-modern"
                                                onMouseDown={(e) => handleDragStart(e, index, comparison.id)}
                                                onTouchStart={(e) => handleDragStart(e, index, comparison.id)}
                                            >
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
                    {originalComparisons.map((_, index) => (
                        <button
                            key={index}
                            className={`modern-dot ${index === activeIndex ? 'active' : ''}`}
                            onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                scrollToRealSlide(index);
                            }}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default BeforeAfter;

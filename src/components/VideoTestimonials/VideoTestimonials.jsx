import React, { useState, useRef, useEffect } from 'react';
import './VideoTestimonials.css';

const VideoTestimonials = () => {
    const [hoveredVideo, setHoveredVideo] = useState(null);
    const [mutedVideos, setMutedVideos] = useState({});
    const [currentIndex, setCurrentIndex] = useState(0);
    const scrollContainerRef = useRef(null);

    const videos = [
        {
            id: 1,
            videoId: 'dQw4w9WgXcQ', // Placeholder - replace with actual YouTube video ID
            productName: 'Papaya Face Wash (50ml)',
            price: 199.00,
            thumbnail: 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=300&h=400&fit=crop',
            label: 'Before / After'
        },
        {
            id: 2,
            videoId: 'dQw4w9WgXcQ', // Placeholder
            productName: 'Papaya Face Wash (50ml)',
            price: 199.00,
            thumbnail: 'https://images.unsplash.com/photo-1571875257727-256c39da42af?w=300&h=400&fit=crop',
        },
        {
            id: 3,
            videoId: 'dQw4w9WgXcQ', // Placeholder
            productName: 'Beauty Cream (25g)',
            price: 599.00,
            thumbnail: 'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=300&h=400&fit=crop',
        },
        {
            id: 4,
            videoId: 'dQw4w9WgXcQ', // Placeholder
            productName: 'Beauty Cream (25g)',
            price: 599.00,
            thumbnail: 'https://images.unsplash.com/photo-1612817288484-6f916006741a?w=300&h=400&fit=crop',
        },
        {
            id: 5,
            videoId: 'dQw4w9WgXcQ', // Placeholder
            productName: 'Sunscreen (50ml)',
            price: 399.00,
            thumbnail: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=300&h=400&fit=crop',
        },
    ];

    // Auto-scroll effect
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => {
                const nextIndex = (prevIndex + 1) % videos.length;

                // Scroll to the next video
                if (scrollContainerRef.current) {
                    const cardWidth = scrollContainerRef.current.querySelector('.video-card')?.offsetWidth || 0;
                    const gap = 20; // Gap between cards
                    scrollContainerRef.current.scrollTo({
                        left: nextIndex * (cardWidth + gap),
                        behavior: 'smooth'
                    });
                }

                return nextIndex;
            });
        }, 4000); // Change slide every 4 seconds

        return () => clearInterval(interval);
    }, [videos.length]);

    const toggleMute = (videoId) => {
        setMutedVideos(prev => ({
            ...prev,
            [videoId]: !prev[videoId]
        }));
    };

    return (
        <section className="video-testimonials-section section">
            <div className="container">
                <div className="section-header-center">
                    <h2 className="section-title">Over 1 Million People Trust Youthface</h2>
                    <p className="section-subtitle">
                        Explore Clinically Proven Formulations For South Indian Skin & Hair
                    </p>
                </div>

                <div className="videos-container">
                    <div className="videos-scroll" ref={scrollContainerRef}>
                        {videos.map((video) => (
                            <div
                                key={video.id}
                                className="video-card"
                                onMouseEnter={() => setHoveredVideo(video.id)}
                                onMouseLeave={() => setHoveredVideo(null)}
                            >
                                <div className="video-wrapper">
                                    {/* Video Thumbnail/Iframe */}
                                    <div className="video-frame">
                                        {hoveredVideo === video.id ? (
                                            <iframe
                                                src={`https://www.youtube.com/embed/${video.videoId}?autoplay=1&mute=${mutedVideos[video.id] ? 0 : 1}&controls=0&loop=1&playlist=${video.videoId}`}
                                                title={video.productName}
                                                frameBorder="0"
                                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                allowFullScreen
                                            ></iframe>
                                        ) : (
                                            <img src={video.thumbnail} alt={video.productName} />
                                        )}

                                        {/* Play Button Overlay */}
                                        {hoveredVideo !== video.id && (
                                            <div className="play-overlay">
                                                <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
                                                    <circle cx="30" cy="30" r="30" fill="rgba(255, 0, 0, 0.9)" />
                                                    <path d="M24 18L42 30L24 42V18Z" fill="white" />
                                                </svg>
                                            </div>
                                        )}

                                        {/* Unmute Button */}
                                        {hoveredVideo === video.id && (
                                            <button
                                                className="unmute-btn"
                                                onClick={() => toggleMute(video.id)}
                                            >
                                                {mutedVideos[video.id] ? (
                                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
                                                        <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02z" />
                                                    </svg>
                                                ) : (
                                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
                                                        <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z" />
                                                    </svg>
                                                )}
                                            </button>
                                        )}

                                        {/* Label (Before/After) */}
                                        {video.label && (
                                            <div className="video-label">{video.label}</div>
                                        )}
                                    </div>

                                    {/* Product Info */}
                                    <div className="video-product-info">
                                        <div className="product-image-small">
                                            <img src={video.thumbnail} alt={video.productName} />
                                        </div>
                                        <div className="product-details">
                                            <h4>{video.productName}</h4>
                                            <p className="product-price">Rs. {video.price.toFixed(2)}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default VideoTestimonials;

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiVolume2, FiVolumeX } from 'react-icons/fi';
import './VideoTestimonials.css';
import image1 from '../../assets/image 1.jpeg';
import image2 from '../../assets/image 2.jpeg';

const VideoTestimonials = () => {
    const [hoveredVideo, setHoveredVideo] = useState(null);

    const videos = [
        {
            id: 1,
            // Using the requested m3u8 URL for hover play
            webUrl: 'https://youthface.co.in/cdn/shop/videos/c/vp/6c83543f1ce047129dcaa166b755b63c/6c83543f1ce047129dcaa166b755b63c.m3u8?v=0',
            productName: 'Papaya Face Wash (50ml)',
            price: 199.00,
            // Using the requested thumbnail
            thumbnail: 'https://youthface.co.in/cdn/shop/files/preview_images/6c83543f1ce047129dcaa166b755b63c.thumbnail.0000000000.jpg?v=1763800022&width=600',
            productImage: 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=200&h=200&fit=crop',
        },
        {
            id: 2,
            webUrl: 'https://youthface.co.in/cdn/shop/videos/c/vp/fe70d588d9144700bcce6b0151c9fe34/fe70d588d9144700bcce6b0151c9fe34.m3u8?v=0',
            productName: 'Papaya Face Wash (50ml)',
            price: 199.00,
            thumbnail: 'https://youthface.co.in/cdn/shop/files/preview_images/fe70d588d9144700bcce6b0151c9fe34.thumbnail.0000000000.jpg?v=1752250018&width=720',
            productImage: 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=200&h=200&fit=crop',
        },
        {
            id: 3,
            webUrl: 'https://youthface.co.in/cdn/shop/videos/c/vp/6c83543f1ce047129dcaa166b755b63c/6c83543f1ce047129dcaa166b755b63c.m3u8?v=0',
            productName: 'Beauty Cream (25g)',
            price: 599.00,
            thumbnail: 'https://youthface.co.in/cdn/shop/files/preview_images/6c83543f1ce047129dcaa166b755b63c.thumbnail.0000000000.jpg?v=1763800022&width=600',
            productImage: image1,
        },
        {
            id: 4,
            webUrl: 'https://youthface.co.in/cdn/shop/videos/c/vp/fe70d588d9144700bcce6b0151c9fe34/fe70d588d9144700bcce6b0151c9fe34.m3u8?v=0',
            productName: 'Beauty Cream (25g)',
            price: 599.00,
            thumbnail: 'https://youthface.co.in/cdn/shop/files/preview_images/fe70d588d9144700bcce6b0151c9fe34.thumbnail.0000000000.jpg?v=1752250018&width=720',
            productImage: image2,
        },
        {
            id: 5,
            webUrl: 'https://youthface.co.in/cdn/shop/videos/c/vp/6c83543f1ce047129dcaa166b755b63c/6c83543f1ce047129dcaa166b755b63c.m3u8?v=0',
            productName: 'Sunscreen (50ml)',
            price: 399.00,
            thumbnail: 'https://youthface.co.in/cdn/shop/files/preview_images/6c83543f1ce047129dcaa166b755b63c.thumbnail.0000000000.jpg?v=1763800022&width=600',
            productImage: image2,
        },
    ];

    return (
        <section className="video-testimonials-section">
            <div className="container">
                <div className="section-header-center">
                    <h2 className="section-title">Real Results, Real Stories</h2>
                    <p className="section-subtitle">See why thousands love Youthface</p>
                </div>

                <div className="videos-gallery-container">
                    {videos.map((video) => (
                        <div
                            key={video.id}
                            className="video-card-v3"
                            onMouseEnter={() => setHoveredVideo(video.id)}
                            onMouseLeave={() => setHoveredVideo(null)}
                        >
                            <div className="v-video-container">
                                {hoveredVideo === video.id ? (
                                    <video
                                        src={video.webUrl}
                                        className="main-video"
                                        autoPlay
                                        muted
                                        loop
                                        playsInline
                                    />
                                ) : (
                                    <>
                                        <img src={video.thumbnail} alt={video.productName} className="main-thumbnail" />

                                        {/* Centered Play Button */}
                                        <div className="play-overlay-center">
                                            <div className="play-circle-red">
                                                <div className="play-icon-white"></div>
                                            </div>
                                        </div>
                                    </>
                                )}

                                {/* Bottom Info Gradient */}
                                <div className="info-overlay-gradient">
                                    <div className="product-info-row">
                                        <div className="small-product-thumb">
                                            <img src={video.productImage} alt="Product" />
                                        </div>
                                        <div className="text-info">
                                            <span className="product-title-bold">{video.productName}</span>
                                            <span className="product-price-white">Rs. {video.price.toFixed(2)}</span>
                                        </div>
                                    </div>
                                </div>

                                <Link to={`/product/${video.id}`} className="card-link-overlay" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 10 }}></Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default VideoTestimonials;

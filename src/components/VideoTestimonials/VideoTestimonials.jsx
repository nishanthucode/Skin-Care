import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiVolume2, FiVolumeX } from 'react-icons/fi';
import './VideoTestimonials.css';
import image2 from '../../assets/product-2.jpeg';
import image1 from '../../assets/product-1.jpeg';
import image3 from '../../assets/product-3.jpeg';
import image4 from '../../assets/product-4.jpeg';

const VideoTestimonials = () => {
    const [hoveredVideo, setHoveredVideo] = useState(null);
    const [playingVideoId, setPlayingVideoId] = useState(null);
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

    React.useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const videos = [
        {
            id: 1,
            // Using the requested m3u8 URL for hover play
            webUrl: 'https://youthface.co.in/cdn/shop/videos/c/vp/fe70d588d9144700bcce6b0151c9fe34/fe70d588d9144700bcce6b0151c9fe34.m3u8?v=0',
            productName: 'Papaya Face Wash (50ml)',
            price: 199.00,
            // Using the requested thumbnail
            thumbnail: 'https://instagram.fixe1-1.fna.fbcdn.net/v/t51.71878-15/568652650_1467514497809228_6741214977905343715_n.jpg?stp=dst-jpg_e15_tt6&_nc_cat=101&ig_cache_key=Mzc0NzQ3MDQyMzg4NzAxNjMwNA%3D%3D.3-ccb7-5&ccb=7-5&_nc_sid=58cdad&efg=eyJ2ZW5jb2RlX3RhZyI6InhwaWRzLjY0MHgxMTM2LnNkci5DMyJ9&_nc_ohc=klPIGxRo4aIQ7kNvwGNJRbW&_nc_oc=AdldwpnpcTYpFVFeVnOUI4c0YjEWeiMW-JBgRMX20LOMSwGQIl2ji6ZVhvhhIn75PQtDvJLmaSgiS57zIgLIlhUq&_nc_ad=z-m&_nc_cid=1174&_nc_zt=23&_nc_ht=instagram.fixe1-1.fna&_nc_gid=rrIV-HV1-ppc_X5iK2IPMA&_nc_ss=8&oh=00_AfzByraC5uMgnENFDXHOd2RzGbSGWobez6cO86itznOdow&oe=69BFF7D3',
            productImage: image3,
        },
        {
            id: 2,
            webUrl: 'https://youthface.co.in/cdn/shop/videos/c/vp/fe70d588d9144700bcce6b0151c9fe34/fe70d588d9144700bcce6b0151c9fe34.m3u8?v=0',
            productName: 'Papaya Face Wash (50ml)',
            price: 199.00,
            thumbnail: 'https://youthface.co.in/cdn/shop/files/preview_images/fe70d588d9144700bcce6b0151c9fe34.thumbnail.0000000000.jpg?v=1752250018&width=720',
            productImage: image4,
        },
        {
            id: 3,
            webUrl: 'https://youthface.co.in/cdn/shop/videos/c/vp/7a64a636af7f4e328872b68416d58be5/7a64a636af7f4e328872b68416d58be5.m3u8?v=0',
            productName: 'Beauty Cream (25g)',
            price: 599.00,
            thumbnail: 'https://youthface.co.in/cdn/shop/files/preview_images/7a64a636af7f4e328872b68416d58be5.thumbnail.0000000000.jpg?v=1764055048&width=480',
            productImage: image1,
        },
        {
            id: 4,
            webUrl: 'https://youthface.co.in/cdn/shop/videos/c/vp/63b3ac2467d94f60b3b8e425da374564/63b3ac2467d94f60b3b8e425da374564.m3u8?v=0',
            productName: 'Beauty Cream (25g)',
            price: 599.00,
            thumbnail: 'https://youthface.co.in/cdn/shop/files/preview_images/63b3ac2467d94f60b3b8e425da374564.thumbnail.0000000000.jpg?v=1752249510&width=600',
            productImage: image2,
        },
        {
            id: 5,
            webUrl: '=c76aed8460769.m3u8?v=0',
            productName: 'Sunscreen (50ml)',
            price: 399.00,
            thumbnail: 'https://youthface.co.in/cdn/shop/files/preview_images/f6001e20954544f6b16c76aed8460769.thumbnail.0000000000.jpg?v=1755847917&width=600',
            productImage: image1,
        },
    ];

    const shouldPlay = (id, index) => {
        if (isMobile) {
            // Mobile: Play if explicitly clicked OR (it's the first one and nothing else is manually playing)
            // Actually, usually if I click another, I want the first one to stop?
            // "1st video play automatical and rest must play after clicking play button"
            // Simple logic: If index 0 and playingVideoId is null, play. Or if playingVideoId matches.
            return playingVideoId === id || (index === 0 && playingVideoId === null);
        }
        return hoveredVideo === id;
    };

    return (
        <section className="video-testimonials-section">
            <div className="container">
                <div className="section-header-center">
                    <h2 className="section-title">Reel Stories, DD Aura Lifestyle </h2>
                    <p className="section-subtitle">Watch out for Latest Update</p>
                </div>

                <div className="videos-gallery-container">
                    {videos.map((video, index) => (
                        <div
                            key={video.id}
                            className="video-card-v3"
                            onMouseEnter={() => !isMobile && setHoveredVideo(video.id)}
                            onMouseLeave={() => !isMobile && setHoveredVideo(null)}
                        >
                            <div className="v-video-container">
                                {shouldPlay(video.id, index) ? (
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

                                        {/* Centered Play Button - Interactive on Mobile */}
                                        <div
                                            className="play-overlay-center"
                                            style={isMobile ? { pointerEvents: 'auto', zIndex: 20, cursor: 'pointer' } : {}}
                                            onClick={(e) => {
                                                if (isMobile) {
                                                    e.preventDefault();
                                                    e.stopPropagation();
                                                    setPlayingVideoId(video.id);
                                                }
                                            }}
                                        >
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

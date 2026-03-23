import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Hls from 'hls.js';
import './VideoTestimonials.css';
import image1 from '../../assets/product-1.jpeg';
import image2 from '../../assets/product-2.jpeg';
import image3 from '../../assets/product-3.jpeg';
import image4 from '../../assets/product-4.jpeg';

import image11 from '../../assets/image-1.0.png';
import image21 from '../../assets/image-2.0.png';
import image31 from '../../assets/image-3.0.png';
import image41 from '../../assets/image-4.0.png';
import image51 from '../../assets/image-5.0.png';

import video1 from '../../assets/video-1.mp4';
import video2 from '../../assets/video-2.mp4';
import video3 from '../../assets/video-3.mp4';
import video4 from '../../assets/video-4.mp4';
import video5 from '../../assets/video-5.mp4';

// HLS Video Player Component
const HlsVideo = ({ src, autoPlay, muted, loop, playsInline, className }) => {
    const videoRef = useRef(null);

    useEffect(() => {
        const video = videoRef.current;
        if (!video || !src) return;

        let hls = null;

        if (src.includes('.m3u8')) {
            if (Hls.isSupported()) {
                hls = new Hls({
                    enableWorker: true,
                    lowLatencyMode: true,
                });
                hls.loadSource(src);
                hls.attachMedia(video);
                hls.on(Hls.Events.MANIFEST_PARSED, () => {
                    if (autoPlay) {
                        video.play().catch(() => { });
                    }
                });
            } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
                // Safari native HLS support
                video.src = src;
                if (autoPlay) {
                    video.play().catch(() => { });
                }
            }
        } else {
            // Regular video file
            video.src = src;
            if (autoPlay) {
                video.play().catch(() => { });
            }
        }

        return () => {
            if (hls) {
                hls.destroy();
            }
        };
    }, [src, autoPlay]);

    return (
        <video
            ref={videoRef}
            className={className}
            autoPlay={autoPlay}
            muted={muted}
            loop={loop}
            playsInline={playsInline}
        />
    );
};

// Instagram Embed Component
const InstagramEmbed = ({ url, className }) => {
    const getEmbedUrl = (instagramUrl) => {
        // Handle various Instagram URL formats
        const match = instagramUrl.match(/instagram\.com\/(?:p|reel|reels)\/([A-Za-z0-9_-]+)/);
        if (match) {
            return `https://www.instagram.com/p/${match[1]}/embed/`;
        }
        // If already an embed URL, return as-is
        if (instagramUrl.includes('/embed')) {
            return instagramUrl;
        }
        return instagramUrl;
    };

    return (
        <iframe
            className={className}
            src={getEmbedUrl(url)}
            frameBorder="0"
            scrolling="no"
            allowTransparency="true"
            allow="autoplay; encrypted-media"
            allowFullScreen
            style={{
                width: '100%',
                height: '100%',
                border: 'none',
                overflow: 'hidden',
                background: '#000',
                position: 'absolute',
                top: 0,
                left: 0,
            }}
        />
    );
};

// Universal Video Player - handles HLS and Instagram
const VideoPlayer = ({ src, autoPlay, muted, loop, playsInline, className }) => {
    const isInstagram = src && src.includes('instagram.com');

    if (isInstagram) {
        return <InstagramEmbed url={src} className={className} />;
    }

    return (
        <HlsVideo
            src={src}
            autoPlay={autoPlay}
            muted={muted}
            loop={loop}
            playsInline={playsInline}
            className={className}
        />
    );
};

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
            webUrl: video1,
            productName: 'Aura Face Cream',
            price: 699.00,
            productImage: image1,
            thumbnail: image11,},

        {
            id: 2,
            webUrl: video2,
            productName: 'Aura Face Cream',
            price: 699.00,
            thumbnail: image21,
            productImage: image1,       
        },
        {
            id: 3,
             webUrl: video5,
            productName: 'Aura Face Cream',
            price: 249.00,
            thumbnail: image51,
            productImage: image2,
        },
        {
            id: 4,
            webUrl: video4,
            productName: 'Aura Glow Combo',
            price: 949.00,
            thumbnail:image41,
            productImage: image3,
        },
        {
            id: 5,
          webUrl: video3,
            productName: 'Aura Goat Milk Soap',
            price: 249.00,
            thumbnail: image31,
            productImage: image2 ,
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
                                    <VideoPlayer
                                        src={video.embedUrl || video.webUrl}
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

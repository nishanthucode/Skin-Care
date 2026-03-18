import React, { useState } from 'react';
import './WhyChooseYouthface.css';
import image1 from '../../assets/product-1.jpeg';
import image3 from '../../assets/product-3.jpeg';
import image4 from '../../assets/product-4.jpeg';

const WhyChooseYouthface = () => {
    const [activeTab, setActiveTab] = useState(0);

    const tabs = [
        {
            id: 0,
            title: 'Built 2+ Years of Trust',
            content: {
                title: 'Rooted Where We Began',
                description: 'Our brand stays true to the values and vision that started our journey — providing trusted skincare solutions that help people achieve healthy, bright, and confident skin.',
                image: image1,
            },
        },
        {
            id: 1,
            title: 'Complete Skincare Range',
            content: {
                title: 'Made with Love',
                description: "Carefully created with dedication and passion to give your skin the care it truly deserves.",
                image: image3,
            },
        },
        {
            id: 2,
            title: 'Safety Without Compromise',
            content: {
                title: 'Care You Can Trust',
                description: "Aura Whitening Cream is created with care and dedication to provide reliable skincare results. Our commitment to quality and customer satisfaction has earned the trust of many users who rely on Aura for brighter, clearer, and healthier-looking skin.",
                image: image4,
            },
        },
    ];

    return (
        <section className="why-choose-section section">
            <div className="container">
                <h2 className="section-title">WHY CHOOSE AURA WHITENNING</h2>

                {/* Tabs */}
                <div className="why-choose-tabs">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            className={`tab-button ${activeTab === tab.id ? 'active' : ''}`}
                            onClick={() => setActiveTab(tab.id)}
                        >
                            {tab.title}
                        </button>
                    ))}
                </div>

                {/* Tab Content */}
                <div className="tab-content-wrapper">
                    <div className="content-card">
                        <div className="content-image">
                            <img src={tabs[activeTab].content.image} alt={tabs[activeTab].content.title} />
                        </div>
                        <div className="content-text">
                            <h3>{tabs[activeTab].content.title}</h3>
                            <p>{tabs[activeTab].content.description}</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default WhyChooseYouthface;

import React, { useState } from 'react';
import './WhyChooseYouthface.css';

const WhyChooseYouthface = () => {
    const [activeTab, setActiveTab] = useState(0);

    const tabs = [
        {
            id: 0,
            title: 'Built on 8 Years of Trust',
            content: {
                title: 'Rooted Where We Began',
                description: 'We started from our homeland Kasaragod, Kerala, India. Built with pride, grown with purpose, and trusted by communities across the country. No matter how far we reach, our roots remain our strength.',
                image: 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=600&h=400&fit=crop',
            },
        },
        {
            id: 1,
            title: 'Complete Skincare Range',
            content: {
                title: 'Made with Love',
                description: "It all began with our Beauty Cream. With the love and trust people showed us, we gently grew, adding skin care, body care, and perfumes that feel just right for everyday life. Made with love, always. 💛",
                image: 'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=600&h=400&fit=crop',
            },
        },
        {
            id: 2,
            title: 'Safety Without Compromise',
            content: {
                title: 'Care You Can Trust',
                description: "FDA-approved, cruelty-free, and carefully tested, because your skin's safety comes first. Gentle yet effective formulas powered by Kojic Acid, Niacinamide, Salicylic Acid, Alpha Arbutin, fruit enzymes, and nourishing actives. 💛",
                image: 'https://images.unsplash.com/photo-1612817288484-6f916006741a?w=600&h=400&fit=crop',
            },
        },
    ];

    return (
        <section className="why-choose-section section">
            <div className="container">
                <h2 className="section-title">WHY CHOOSE YOUTHFACE</h2>

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

import React from 'react';
import { FaAward, FaUsers, FaCheckCircle, FaShieldAlt, FaPaw, FaLeaf, FaRecycle } from 'react-icons/fa';
import './TrustBadges.css';

const TrustBadges = () => {
  const badges = [
    {
      id: 1,
      icon: <FaAward />,
      title: '5K+ Happy Customers',
      color: '#E6AB24',
    },
    {
      id: 2,
      icon: <FaUsers />,
      title: '2+ Years of Excellence',
      color: '#E6AB24',
    },
    {
      id: 3,
      icon: <FaCheckCircle />,
      title: 'Dermatologist Tested',
      color: '#E6AB24',
    },
    {
      id: 4,
      icon: <FaShieldAlt />,
      title: 'FDA Approved',
      color: '#E6AB24',
    },
    {
      id: 5,
      icon: <FaPaw />,
      title: 'Cruelty-Free',
      color: '#E6AB24',
    },
  ];

  return (
    <section className="trust-badges-section section">
      <div className="container">
        <h2 className="section-title">Trusted by Thousands of Aura Clients</h2>
        <div className="badges-grid">
          {badges.map((badge) => (
            <div key={badge.id} className="badge-item">
              <div className="badge-icon" style={{ color: badge.color }}>
                {badge.icon}
              </div>
              <h3>{badge.title}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustBadges;

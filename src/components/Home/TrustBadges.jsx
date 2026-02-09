import React from 'react';
import { FaAward, FaUsers, FaCheckCircle, FaShieldAlt, FaPaw, FaLeaf, FaRecycle } from 'react-icons/fa';
import './TrustBadges.css';

const TrustBadges = () => {
  const badges = [
    {
      id: 1,
      icon: <FaAward />,
      title: '9+ Years of Excellence',
      color: '#ff69b4',
    },
    {
      id: 2,
      icon: <FaUsers />,
      title: '2M+ Happy Customers',
      color: '#ff1493',
    },
    {
      id: 3,
      icon: <FaCheckCircle />,
      title: 'Dermatologist Tested',
      color: '#ff69b4',
    },
    {
      id: 4,
      icon: <FaShieldAlt />,
      title: 'FDA Approved',
      color: '#ff1493',
    },
    {
      id: 5,
      icon: <FaPaw />,
      title: 'Cruelty-Free',
      color: '#ff69b4',
    },
  ];

  return (
    <section className="trust-badges-section section">
      <div className="container">
        <h2 className="section-title">Trusted by over 2 Million Indians</h2>
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

import React, { useState } from 'react';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';
import './FAQ.css';

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqs = [
    {
      question: 'How long does it take to see results with Aura Whitening Cream?',
      answer: 'Most users start seeing visible improvements in skin brightness and clarity within 10 days of regular use of Aura Whitening Cream.',
    },
    {
      question: 'Can Aura Whitening Cream remove pimples and dark spots?',
      answer: 'Yes, Aura Whitening Cream helps reduce pimples, dark spots, and blemishes, giving the skin a clearer and more even tone.',
    },
    {
      question: 'Is Aura Whitening Cream safe for daily use?',
      answer: 'Yes, Aura Whitening Cream is designed for daily skincare use to help maintain brighter, healthier-looking skin.',
    },
    {
      question: 'How should I use Aura Whitening Cream for best results?',
      answer: 'For best results, use Aura Whitening Cream as recommended, wash your face with a facewash before applying Aura, and avoid excessive sunlight exposure to maintain skin brightness.',
    },
    {
      question: 'What if Aura Whitening Cream does not show results?',
      answer: 'We offer a 100% satisfaction guarantee. If Aura Whitening Cream does not show results within 7 days, you are eligible for a refund.',
    }
    // {
    //   question: 'Why do some products recommend night use only?',
    //   answer: 'Certain active whitening ingredients work more effectively when skin is in repair mode during sleep, away from sun exposure. This maximizes absorption and transformation while minimizing any sensitivity.',
    // },
  ];

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="faq-section section">
      <div className="container">
        <h2 className="section-title">Frequently Asked Questions</h2>
        <p className="section-subtitle">
          Find quick answers to the most common questions about our products, orders, shipping, and more all in one place.
        </p>

        <div className="faq-container">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className={`faq-item ${activeIndex === index ? 'active' : ''}`}
            >
              <button
                className="faq-question"
                onClick={() => toggleFAQ(index)}
              >
                <h3>{faq.question}</h3>
                <span className="faq-icon">
                  {activeIndex === index ? <FiChevronUp /> : <FiChevronDown />}
                </span>
              </button>
              <div className="faq-answer">
                <p>{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;

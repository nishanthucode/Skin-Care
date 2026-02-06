import React, { useState } from 'react';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';
import './FAQ.css';

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqs = [
    {
      question: 'How to ensure original Youthface products?',
      answer: 'Due to counterfeit products in the market, purchasing only from the official website (youthface.co.in) or verified retail partners is strongly recommended. Counterfeit products may not deliver expected outcomes and could potentially harm skin. Official channels guarantee authentic, safe formulations.',
    },
    {
      question: 'How long before seeing visible changes?',
      answer: 'Most customers notice visible improvements within 4 weeks of consistent use. Individual experiences may vary based on skin type and product selection.',
    },
    {
      question: 'Can men use Youthface products?',
      answer: 'Absolutely. While the primary customer base is women, many men trust Youthface for effective skin whitening and care.',
    },
    {
      question: 'Is pan-India shipping available?',
      answer: 'Yes, shipping covers all of India. Whether in metro cities or rural areas, Youthface products reach every doorstep.',
    },
    {
      question: 'Can whitening cream be used during the day?',
      answer: 'Some products, like the brightening cream, are formulated for night use for best performance. However, sunscreen is available to protect skin during the day. Always check individual product instructions.',
    },
    {
      question: 'Why do some products recommend night use only?',
      answer: 'Certain active whitening ingredients work more effectively when skin is in repair mode during sleep, away from sun exposure. This maximizes absorption and transformation while minimizing any sensitivity.',
    },
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

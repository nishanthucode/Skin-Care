import React, { useState } from 'react';
import { FiPhone, FiMail, FiMapPin, FiSend } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';
import { contactAPI } from '../utils/api';
import './Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({ type: '', message: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ type: '', message: '' });

    try {
      await contactAPI.send(formData);
      setStatus({ type: 'success', message: 'Message sent successfully! We will get back to you soon.' });
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      console.error('Error sending message:', error);
      setStatus({ type: 'error', message: 'Failed to send message. Please try again later.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="contact-page">
      <div className="contact-header">
        <div className="container">
          <h1>Contact Us</h1>
          <p>We'd love to hear from you. Get in touch with us for any queries.</p>
        </div>
      </div>

      <div className="container contact-content">
        <div className="contact-grid">
          {/* Contact Info */}
          <div className="contact-info-card">
            <h2>Get In Touch</h2>
            <div className="info-item">
              <div className="icon-wrapper">
                <FiPhone />
              </div>
              <div className="info-text">
                <h3>Call Us</h3>
                <p>+91 98765 43210</p>
                <p>Mon - Sat, 9am - 6pm</p>
              </div>
            </div>

            <div className="info-item">
              <div className="icon-wrapper">
                <FaWhatsapp />
              </div>
              <div className="info-text">
                <h3>WhatsApp</h3>
                <p>+91 98765 43210</p>
                <p>Available 24/7 for quick support</p>
              </div>
            </div>

            <div className="info-item">
              <div className="icon-wrapper">
                <FiMail />
              </div>
              <div className="info-text">
                <h3>Email Us</h3>
                <p>support@youthface.in</p>
                <p>We reply within 24 hours</p>
              </div>
            </div>

            <div className="info-item">
              <div className="icon-wrapper">
                <FiMapPin />
              </div>
              <div className="info-text">
                <h3>Visit Us</h3>
                <p>123 Skincare Avenue, Beauty City</p>
                <p>Mumbai, Maharashtra - 400001</p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="contact-form-card">
            <h2>Send Message</h2>
            {status.message && (
              <div className={`status-message ${status.type}`}>
                {status.message}
              </div>
            )}
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">Full Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="Your Name"
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="Your Email"
                />
              </div>

              <div className="form-group">
                <label htmlFor="subject">Subject</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  placeholder="Subject"
                />
              </div>

              <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  placeholder="How can we help you?"
                  rows="5"
                ></textarea>
              </div>

              <button type="submit" className="submit-btn" disabled={loading}>
                {loading ? 'Sending...' : (
                  <>
                    Send Message <FiSend />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;

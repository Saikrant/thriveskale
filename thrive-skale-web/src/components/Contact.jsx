import React, { useState } from 'react';
import './Contact.css';
import AIAgent from './AIAgent';

const Contact = () => {
    const [showAgent, setShowAgent] = useState(false);
    const [agentData, setAgentData] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setAgentData(formData);
        setShowAgent(true);
        setFormData({
            name: '',
            email: '',
            message: ''
        });
    };

    return (
        <section id="contact" className="section-padding contact">
            <div className="container">
                <h2 className="section-title text-center">Get in <span className="gradient-text">Touch</span></h2>
                <p className="section-subtitle text-center">Ready to engineer your growth? Let's talk.</p>

                <div className="contact-container">
                    <div className="contact-info">
                        <h3>Contact Information</h3>
                        <p>Reach out to us directly or fill out the form to book a call.</p>

                        <div className="info-item">
                            <span className="icon">👤</span>
                            <div>
                                <h4>Founder</h4>
                                <p>Sai Kranth</p>
                            </div>
                        </div>
                        <div className="info-item">
                            <span className="icon">📞</span>
                            <div>
                                <h4>Phone</h4>
                                <p>+91 98765 43210</p>
                            </div>
                        </div>
                        <div className="info-item">
                            <span className="icon">📧</span>
                            <div>
                                <h4>Email</h4>
                                <p>contact@thriveskale.com</p>
                            </div>
                        </div>
                        <div className="info-item">
                            <span className="icon">📍</span>
                            <div>
                                <h4>Location</h4>
                                <p>Hyderabad, India</p>
                            </div>
                        </div>
                    </div>

                    <form className="contact-form glass" onSubmit={handleSubmit}>
                        <h3>Book a Call</h3>
                        <div className="form-group">
                            <input
                                type="text"
                                name="name"
                                placeholder="Your Name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="email"
                                name="email"
                                placeholder="Your Email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <textarea
                                name="message"
                                placeholder="Tell us about your project"
                                rows="5"
                                value={formData.message}
                                onChange={handleChange}
                                required
                            ></textarea>
                        </div>
                        <button type="submit" className="submit-btn">Send Message</button>
                    </form>
                </div>
            </div>

            {showAgent && agentData && (
                <AIAgent
                    initialData={agentData}
                    onClose={() => setShowAgent(false)}
                />
            )}
        </section>
    );
};

export default Contact;

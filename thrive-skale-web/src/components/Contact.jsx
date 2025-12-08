import React, { useState } from 'react';
import './Contact.css';
import AIAgent from './AIAgent';

const Contact = ({ initialService }) => {
    const [showAgent, setShowAgent] = useState(false);
    const [agentData, setAgentData] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        service: '',
        message: ''
    });

    React.useEffect(() => {
        if (initialService) {
            setFormData(prev => ({ ...prev, service: initialService }));
        }
    }, [initialService]);

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
            service: '',
            message: ''
        });
    };

    return (
        <section id="contact" className="section-padding contact">
            <div className="container">
                <h2 className="section-title text-center">Get in <span className="gradient-text">Touch</span></h2>
                <p className="section-subtitle text-center">Ready to engineer your growth? Let's talk.</p>

                <div className="contact-container">
                    <form className="contact-form glass" onSubmit={handleSubmit}>
                        <h3>Start Your Journey</h3>

                        <div className="form-group floating-group">
                            <input
                                type="text"
                                name="name"
                                id="name"
                                placeholder=" "
                                value={formData.name}
                                onChange={handleChange}
                                required
                            />
                            <label htmlFor="name">Your Name</label>
                        </div>

                        <div className="form-group floating-group">
                            <input
                                type="email"
                                name="email"
                                id="email"
                                placeholder=" "
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                            <label htmlFor="email">Your Email</label>
                        </div>

                        <div className="form-group floating-group">
                            <select
                                name="service"
                                id="service"
                                value={formData.service}
                                onChange={handleChange}
                                required
                                className={formData.service ? 'has-value' : ''}
                            >
                                <option value="" disabled></option>
                                <option value="Website Setup">Website Setup</option>
                                <option value="Digital Marketing">Digital Marketing</option>
                                <option value="Mobile Applications">Mobile Applications</option>
                                <option value="AI & Automation">AI & Automation</option>
                                <option value="Other">Other</option>
                            </select>
                            <label htmlFor="service">Service Interest</label>
                        </div>

                        <div className="form-group floating-group">
                            <textarea
                                name="message"
                                id="message"
                                placeholder=" "
                                rows="4"
                                value={formData.message}
                                onChange={handleChange}
                                required
                            ></textarea>
                            <label htmlFor="message">Tell us about your project</label>
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

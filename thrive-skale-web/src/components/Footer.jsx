import React from 'react';
import { Link } from 'react-router-dom';
import useReveal from '../utils/useReveal';
import './Footer.css';

const Footer = () => {
    useReveal();
    const currentYear = new Date().getFullYear();

    return (
        <footer className="footer">
            <div className="container footer-grid">
                <div className="footer-col reveal rev-up">
                    <h3>ThrivvSkale</h3>
                    <p className="footer-tagline">Engineering your digital growth with AI-driven strategies and stunning design.</p>
                </div>

                <div className="footer-col reveal rev-up delay-2">
                    <h4>Quick Links</h4>
                    <ul className="footer-links">
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/why-us">Why Us</Link></li>
                        <li><Link to="/services">Services</Link></li>
                        <li><Link to="/industries">Industries</Link></li>
                    </ul>
                </div>

                <div className="footer-col reveal rev-up delay-3">
                    <h4>Contact Us</h4>
                    <div className="footer-contact">
                        <p><strong>Founder:</strong> Sai Kranth</p>
                        <p><strong>Phone:</strong> +91 6302193115</p>
                        <p><strong>Email:</strong> info@thrivvskale.com</p>
                        <p><strong>Location:</strong> Hyderabad, India</p>
                    </div>
                </div>
            </div>
            <div className="footer-bottom reveal delay-4">
                <p>&copy; {currentYear} Thrivv Skale Private Limited. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;

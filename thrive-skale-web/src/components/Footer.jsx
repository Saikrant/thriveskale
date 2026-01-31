import React from 'react';
import './Footer.css';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="footer">
            <div className="container footer-grid">
                <div className="footer-col">
                    <h3>ThrivvSkale</h3>
                    <p className="footer-tagline">Engineering your digital growth with AI-driven strategies and stunning design.</p>
                </div>

                <div className="footer-col">
                    <h4>Quick Links</h4>
                    <ul className="footer-links">
                        <li><a href="#hero">Home</a></li>
                        <li><a href="#reality-vision">Why Us</a></li>
                        <li><a href="#services">Services</a></li>
                        <li><a href="#industries">Industries</a></li>
                    </ul>
                </div>

                <div className="footer-col">
                    <h4>Contact Us</h4>
                    <div className="footer-contact">
                        <p><strong>Founder:</strong> Sai Kranth</p>
                        <p><strong>Phone:</strong> +91 6302193115</p>
                        <p><strong>Email:</strong> info@thrivvskale.com</p>
                        <p><strong>Location:</strong> Hyderabad, India</p>
                    </div>
                </div>
            </div>
            <div className="footer-bottom">
                <p>&copy; {currentYear} Thrivv Skale Private Limited. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;

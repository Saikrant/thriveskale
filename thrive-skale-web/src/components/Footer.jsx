import React from 'react';
import { Link } from 'react-router-dom';
import { useCountry } from '../context/CountryContext';
import useReveal from '../utils/useReveal';
import './Footer.css';

const Footer = () => {
    useReveal();
    const { config } = useCountry();
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
                        <p>
                            <strong>Phone:</strong>{' '}
                            <a
                                href={config.contact.phone.link}
                                className="footer-link"
                            >
                                {config.contact.phone.display}
                            </a>
                        </p>
                        <p><strong>Email:</strong> {config.contact.email}</p>
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

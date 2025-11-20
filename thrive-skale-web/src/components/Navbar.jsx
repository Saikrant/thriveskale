import React, { useState, useEffect } from 'react';
import './Navbar.css';

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
            <div className="container navbar-container">
                <a href="#" className="logo-container">
                    <div className="logo-text">
                        thrive<span className="highlight">Skale</span>
                    </div>
                    <svg className="logo-arrow" viewBox="0 0 200 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M5 10H190M190 10L180 5M190 10L180 15" stroke="var(--primary-color)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </a>
                <ul className="nav-links">
                    <li><a href="#hero">Home</a></li>
                    <li><a href="#reality-vision">Why Us</a></li>
                    <li><a href="#industries">Industries</a></li>
                    <li><a href="#services">Services</a></li>
                    <li><a href="#contact">Contact</a></li>
                </ul>
                <a href="#contact" className="cta-btn">Book a Call</a>
            </div>
        </nav>
    );
};

export default Navbar;

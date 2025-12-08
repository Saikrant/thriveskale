import React, { useState, useEffect } from 'react';
import './Navbar.css';

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);
    const [activeLink, setActiveLink] = useState('hero');

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

    useEffect(() => {
        const sections = ['hero', 'reality-vision', 'services', 'industries', 'contact'];

        const observerOptions = {
            root: null,
            rootMargin: '-45% 0px -45% 0px', // Trigger when the section is in the middle 10% of the viewport
            threshold: 0
        };

        const observerCallback = (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    setActiveLink(entry.target.id);
                }
            });
        };

        const observer = new IntersectionObserver(observerCallback, observerOptions);

        sections.forEach((id) => {
            const element = document.getElementById(id);
            if (element) observer.observe(element);
        });

        return () => observer.disconnect();
    }, []);

    const handleLinkClick = (id) => {
        setActiveLink(id);
    };

    return (
        <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
            <div className="container navbar-container">
                <a href="#" className="logo-container">
                    <div className="logo-text">
                        thrivv<span className="highlight">Skale</span>
                    </div>
                    <svg className="logo-arrow" viewBox="0 0 200 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M5 10H190M190 10L180 5M190 10L180 15" stroke="var(--primary-color)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </a>
                <ul className="nav-links">
                    <li><a href="#hero" className={activeLink === 'hero' ? 'active' : ''} onClick={() => handleLinkClick('hero')}>Home</a></li>
                    <li><a href="#reality-vision" className={activeLink === 'reality-vision' ? 'active' : ''} onClick={() => handleLinkClick('reality-vision')}>Why Us</a></li>
                    <li><a href="#services" className={activeLink === 'services' ? 'active' : ''} onClick={() => handleLinkClick('services')}>Services</a></li>
                    <li><a href="#industries" className={activeLink === 'industries' ? 'active' : ''} onClick={() => handleLinkClick('industries')}>Industries</a></li>
                    <li><a href="#contact" className={activeLink === 'contact' ? 'active' : ''} onClick={() => handleLinkClick('contact')}>Contact</a></li>
                </ul>
                <a href="#contact" className="cta-btn">Book a Call</a>
            </div>
        </nav>
    );
};

export default Navbar;

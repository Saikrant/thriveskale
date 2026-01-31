import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();

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

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const closeMenu = () => {
        setIsOpen(false);
    };

    const isActive = (path) => location.pathname === path;

    return (
        <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
            <div className="container navbar-container">
                <Link to="/" className="logo-container" onClick={closeMenu}>
                    <div className="logo-text">
                        thrivv<span className="highlight">Skale</span>
                    </div>
                    <svg className="logo-arrow" viewBox="0 0 200 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M5 10H190M190 10L180 5M190 10L180 15" stroke="var(--primary-color)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </Link>

                <div className={`hamburger ${isOpen ? 'active' : ''}`} onClick={toggleMenu}>
                    <span className="bar"></span>
                    <span className="bar"></span>
                    <span className="bar"></span>
                </div>

                <div className={`nav-menu ${isOpen ? 'active' : ''}`}>
                    <ul className="nav-links">
                        <li><Link to="/" className={isActive('/') ? 'active' : ''} onClick={closeMenu}>Home</Link></li>
                        <li><Link to="/why-us" className={isActive('/why-us') ? 'active' : ''} onClick={closeMenu}>Why Us</Link></li>
                        <li><Link to="/services" className={isActive('/services') ? 'active' : ''} onClick={closeMenu}>Services</Link></li>
                        <li><Link to="/industries" className={isActive('/industries') ? 'active' : ''} onClick={closeMenu}>Industries</Link></li>
                        <li><Link to="/contact" className={isActive('/contact') ? 'active' : ''} onClick={closeMenu}>Contact</Link></li>
                    </ul>
                    <Link to="/contact" className="cta-btn mobile-cta" onClick={closeMenu}>Book a Call</Link>
                </div>

                <Link to="/contact" className="cta-btn desktop-cta">Book a Call</Link>
            </div>
        </nav>
    );
};

export default Navbar;

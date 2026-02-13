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
        const next = !isOpen;
        setIsOpen(next);
        // Stop/resume Lenis smooth scroll during mobile menu
        if (window.__lenis) {
            next ? window.__lenis.stop() : window.__lenis.start();
        }
        // Lock/unlock body scroll
        document.body.classList.toggle('menu-open', next);
    };

    const closeMenu = () => {
        setIsOpen(false);
        if (window.__lenis) window.__lenis.start();
        document.body.classList.remove('menu-open');
    };

    const isActive = (path) => location.pathname === path;

    return (
        <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
            <div className="container navbar-container">
                <Link to="/" className="logo-container" onClick={closeMenu}>
                    <div className="logo-text">
                        thrivv<span>Skale</span>
                    </div>
                </Link>

                <div className={`hamburger ${isOpen ? 'active' : ''}`} onClick={toggleMenu}>
                    <span className="bar"></span>
                    <span className="bar"></span>
                    <span className="bar"></span>
                </div>

                <div className={`nav-menu ${isOpen ? 'active' : ''}`}>
                    {isOpen && (
                        <button className="mobile-close" onClick={closeMenu} aria-label="Close menu">
                            ✕
                        </button>
                    )}
                    <ul className="nav-links">
                        <li><Link to="/" className={isActive('/') ? 'active' : ''} onClick={closeMenu}>Home</Link></li>
                        <li><Link to="/why-us" className={isActive('/why-us') ? 'active' : ''} onClick={closeMenu}>Why Us</Link></li>
                        <li><Link to="/services" className={isActive('/services') ? 'active' : ''} onClick={closeMenu}>Services</Link></li>
                        <li><Link to="/industries" className={isActive('/industries') ? 'active' : ''} onClick={closeMenu}>Industries</Link></li>
                        <li><Link to="/contact" className={isActive('/contact') ? 'active' : ''} onClick={closeMenu}>Contact</Link></li>
                    </ul>
                    {isOpen && (
                        <Link to="/contact" className="mobile-cta" onClick={closeMenu}>Book a Call</Link>
                    )}
                </div>

                <div className="nav-extras">
                    <Link to="/contact" className="cta-btn">Book a Call</Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;

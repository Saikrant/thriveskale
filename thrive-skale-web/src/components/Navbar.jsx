import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useCountry } from '../context/CountryContext';
import { COUNTRY_CONFIG } from '../utils/countryConfig';
import './Navbar.css';

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [activeSection, setActiveSection] = useState('hero');
    const location = useLocation();
    const { country, switchCountry } = useCountry();

    // Scroll spy - detect which section is in view
    useEffect(() => {
        const sections = ['hero', 'reality-vision', 'services', 'industries', 'pricing', 'contact'];
        const observers = [];

        sections.forEach((sectionId) => {
            const element = document.getElementById(sectionId);
            if (!element) return;

            const observer = new IntersectionObserver(
                (entries) => {
                    entries.forEach((entry) => {
                        if (entry.isIntersecting) {
                            setActiveSection(sectionId);
                        }
                    });
                },
                { threshold: 0.3 }
            );

            observer.observe(element);
            observers.push(observer);
        });

        return () => observers.forEach((obs) => obs.disconnect());
    }, []);

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

    const scrollToSection = (sectionId) => {
        closeMenu();
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        } else {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    const isActive = (sectionId) => activeSection === sectionId;

    /* ---- Country selector JSX (reused in desktop + mobile) ---- */
    const CountrySelect = ({ className = '' }) => (
        <div className={`country-selector-container ${className}`}>
            <label htmlFor="country-selector" className="country-label" aria-label="Select country">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" />
                    <line x1="2" y1="12" x2="22" y2="12" />
                    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                </svg>
            </label>
            <select
                id="country-selector"
                className="country-select"
                value={country}
                onChange={(e) => switchCountry(e.target.value)}
                aria-label="Select your country"
            >
                {Object.values(COUNTRY_CONFIG).map((cfg) => (
                    <option key={cfg.code} value={cfg.code}>
                        {cfg.flag} {cfg.name}
                    </option>
                ))}
            </select>
        </div>
    );

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
                        <li><a onClick={() => scrollToSection('hero')} className={isActive('hero') ? 'active' : ''}>Home</a></li>
                        <li><a onClick={() => scrollToSection('reality-vision')} className={isActive('reality-vision') ? 'active' : ''}>Why Us</a></li>
                        <li><a onClick={() => scrollToSection('services')} className={isActive('services') ? 'active' : ''}>Services</a></li>
                        <li><a onClick={() => scrollToSection('industries')} className={isActive('industries') ? 'active' : ''}>Industries</a></li>
                        <li><a onClick={() => scrollToSection('pricing')} className={isActive('pricing') ? 'active' : ''}>Pricing</a></li>
                        <li><a onClick={() => scrollToSection('contact')} className={isActive('contact') ? 'active' : ''}>Contact</a></li>
                    </ul>
                    {isOpen && (
                        <>
                            <CountrySelect className="mobile-country-selector" />
                            <a onClick={() => scrollToSection('contact')} className="mobile-cta">Book a Call</a>
                        </>
                    )}
                </div>

                <div className="nav-extras">
                    <CountrySelect />
                    <a onClick={() => scrollToSection('contact')} className="cta-btn">Book a Call</a>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;

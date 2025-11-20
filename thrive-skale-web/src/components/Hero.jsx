import React from 'react';
import './Hero.css';

const Hero = () => {
    return (
        <section id="hero" className="hero">
            <div className="hero-grid"></div>
            <div className="hero-bg">
                <div className="blob blob-1"></div>
                <div className="blob blob-2"></div>
                <div className="blob blob-3"></div>
            </div>

            <div className="container hero-container">
                <div className="hero-content">
                    <h1 className="hero-title">
                        Your growth, <br />
                        <span className="gradient-text">Engineered</span>
                    </h1>
                    <p className="hero-subtitle">
                        We fuse stunning web design, data-driven marketing, and next-gen AI agents to build your digital empire.
                    </p>
                    <div className="hero-cta">
                        <a href="#services" className="cta-btn primary">Explore Services</a>
                        <a href="#contact" className="cta-btn secondary">Get a Quote</a>
                    </div>
                </div>

                <div className="hero-stats">
                    <div className="stat-card glass float-1">
                        <h3>AI</h3>
                        <p>Custom Solutions</p>
                    </div>
                    <div className="stat-card glass float-2">
                        <h3>24/7</h3>
                        <p>AI Support Agents</p>
                    </div>
                    <div className="stat-card glass float-3">
                        <h3>100%</h3>
                        <p>Digital Growth</p>
                    </div>
                </div>
            </div>

            <div className="trusted-by">
                <p>Trusted Partners</p>
                <div className="brand-logos">
                    <span>Sri Sampatti Enterprises Pvt Ltd</span>
                    <span>RR Fashion Mall</span>
                    <span style={{ opacity: 0.5, fontSize: '0.9rem' }}>More coming soon...</span>
                </div>
            </div>
        </section>
    );
};

export default Hero;

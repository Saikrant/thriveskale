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
                        Scale Your Business with <br />
                        <span className="gradient-text">Intelligence & Design</span>
                    </h1>
                    <p className="hero-subtitle">
                        We build high-converting websites and deploy AI agents that work 24/7 to grow your revenue.
                    </p>
                    <div className="hero-cta">
                        <a href="#contact" className="cta-btn primary">Start Your Transformation</a>
                        <a href="#services" className="cta-btn secondary">View Our Work</a>
                    </div>
                </div>

                <div className="hero-values">
                    <div className="value-card glass">
                        <div className="value-icon">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="1" x2="12" y2="23"></line><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>
                        </div>
                        <h3>3x</h3>
                        <p>Revenue Growth</p>
                    </div>
                    <div className="value-card glass">
                        <div className="value-icon">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                        </div>
                        <h3>24/7</h3>
                        <p>Auto-Pilot Sales</p>
                    </div>
                    <div className="value-card glass">
                        <div className="value-icon">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2"></polygon><polyline points="2 17 12 22 22 17"></polyline><polyline points="2 12 12 17 22 12"></polyline></svg>
                        </div>
                        <h3>100%</h3>
                        <p>Custom Built</p>
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

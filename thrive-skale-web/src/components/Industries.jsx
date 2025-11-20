import React from 'react';
import './Industries.css';

const Industries = () => {
    const industries = [
        { name: "Salons & Spas", icon: "💇‍♀️" },
        { name: "Restaurants", icon: "🍽️" },
        { name: "Gyms & Fitness", icon: "💪" },
        { name: "Real Estate", icon: "🏠" },
        { name: "Healthcare", icon: "⚕️" },
        { name: "Retail", icon: "🛍️" },
        { name: "Education", icon: "🎓" },
        { name: "Home Services", icon: "🔧" }
    ];

    return (
        <section id="industries" className="industries section-padding">
            <div className="container">
                <h2 className="section-title text-center">
                    Who We <span className="gradient-text">Empower</span>
                </h2>
                <p className="section-subtitle text-center">
                    Tailored digital solutions for high-growth sectors.
                </p>

                <div className="marquee-container">
                    <div className="marquee-track">
                        {/* Duplicate items for seamless loop */}
                        {[...industries, ...industries].map((ind, index) => (
                            <div key={index} className="marquee-item">
                                <div className="marquee-content">
                                    <span className="marquee-icon">{ind.icon}</span>
                                    <span className="marquee-text">{ind.name}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Industries;

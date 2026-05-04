import React from 'react';
import './ProblemSolution.css';

const US = [
    "Custom-crafted digital experiences for your brand",
    "AI agents responding to leads 24/7 in seconds",
    "Real-time dashboards driving every decision",
    "Ongoing growth partnership with dedicated strategy",
    "Tailored solutions across web, mobile & AI",
];

const OTHERS = [
    "Template websites that look like everyone else's",
    "Slow follow-ups — leads go cold overnight",
    "No analytics, just guesswork",
    "Disappear after launch, no ongoing support",
    "One-size-fits-all solutions",
];

const ProblemSolution = () => {

    // Scroll handling for CTA
    const handleScrollContact = () => {
        const el = document.getElementById('contact');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <section id="why-us" className="problem-solution">
            <div className="ps-container">

                {/* Header */}
                <div className="ps-header">
                    <div className="ps-label">
                        <div className="ps-label-line" />
                        <span className="ps-label-text">WHY THRIVVSKALE</span>
                        <div className="ps-label-line" />
                    </div>
                    <h2 className="ps-title">
                        Not all digital partners<br />are built the same
                    </h2>
                </div>

                {/* Comparison Grid */}
                <div className="ps-grid">

                    {/* Left Card: Typical Agency */}
                    <div className="ps-card ps-card-left">
                        <div className="ps-card-header">
                            <div className="ps-icon-box">
                                <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </div>
                            <div>
                                <h3 className="ps-card-title">Typical agencies</h3>
                                <p className="ps-card-subtitle">The industry standard</p>
                            </div>
                        </div>
                        <div className="ps-list">
                            {OTHERS.map((item, i) => (
                                <div key={i} className="ps-list-item">
                                    <span className="ps-item-num">{String(i + 1).padStart(2, '0')}</span>
                                    <p className="ps-item-text">{item}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right Card: ThrivvSkale */}
                    <div className="ps-card ps-card-right">
                        <div className="ps-badge">★ Recommended</div>
                        <div className="ps-card-header">
                            <div className="ps-icon-box">
                                <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                </svg>
                            </div>
                            <div>
                                <h3 className="ps-card-title">ThrivvSkale</h3>
                                <p className="ps-card-subtitle">Engineered for growth</p>
                            </div>
                        </div>
                        <div className="ps-list">
                            {US.map((item, i) => (
                                <div key={i} className="ps-list-item">
                                    <span className="ps-item-num">{String(i + 1).padStart(2, '0')}</span>
                                    <p className="ps-item-text">{item}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>

                {/* Bottom CTA */}
                <div className="ps-cta">
                    <div className="ps-cta-content">
                        <h3>Ready to make the switch?</h3>
                        <p>Join 250+ businesses already scaling with us.</p>
                    </div>
                    <button onClick={handleScrollContact} className="ps-cta-btn">
                        Start your project →
                    </button>
                </div>

            </div>
        </section>
    );
};

export default ProblemSolution;
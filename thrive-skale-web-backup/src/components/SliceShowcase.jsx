import React from 'react';
import useReveal from '../utils/useReveal';
import './SliceShowcase.css';

const SliceShowcase = () => {
    useReveal();

    return (
        <section id="showcase" className="slice-showcase section-padding">
            <div className="container">
                <div className="showcase-header text-center reveal rev-up">
                    <h2 className="section-title">The Future of <span className="gradient-text">Intelligence</span></h2>
                    <p className="section-subtitle">Experience the power of engineering-driven growth.</p>
                </div>

                <div className="slice-container reveal">
                    {[1, 2, 3, 4, 5].map((num) => (
                        <div key={num} className={`slice slice-${num}`}>
                            <div className="slice-inner" style={{ backgroundImage: 'url("/assets/showcase-bg.png")' }}></div>
                        </div>
                    ))}
                    <div className="slice-overlay">
                        <div className="overlay-content">
                            <h3>Engineered Scaling</h3>
                            <p>Built for Performance. Designed for Conversion.</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default SliceShowcase;

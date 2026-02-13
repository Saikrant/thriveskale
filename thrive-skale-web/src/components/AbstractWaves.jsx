import React from 'react';
import './AbstractWaves.css';

const AbstractWaves = () => {
    return (
        <div className="abstract-waves-container">
            <svg viewBox="0 0 1440 800" preserveAspectRatio="xMidYMid slice" className="waves-svg">
                <defs>
                    <linearGradient id="wave-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="var(--primary-color)" stopOpacity="0.1" />
                        <stop offset="50%" stopColor="var(--primary-color)" stopOpacity="0.2" />
                        <stop offset="100%" stopColor="var(--primary-color)" stopOpacity="0.1" />
                    </linearGradient>
                </defs>

                {/* Generate multiple overlapping wave paths */}
                {[...Array(6)].map((_, i) => (
                    <path
                        key={i}
                        className={`wave-path wave-${i + 1}`}
                        d={`M-100 ${400 + i * 20} Q 360 ${300 - i * 30}, 720 ${400 + i * 10} T 1540 ${400 - i * 20}`}
                        fill="none"
                        stroke="url(#wave-gradient)"
                        strokeWidth="1"
                    />
                ))}

                {/* More complex flowing lines */}
                {[...Array(4)].map((_, i) => (
                    <path
                        key={`complex-${i}`}
                        className={`wave-path complex-wave-${i + 1}`}
                        d={`M-100 ${200 + i * 50} C 200 ${100 - i * 20}, 400 ${600 + i * 40}, 720 ${400} S 1200 ${100}, 1540 ${600 + i * 20}`}
                        fill="none"
                        stroke="rgba(255, 255, 255, 0.03)"
                        strokeWidth="0.5"
                    />
                ))}
            </svg>
        </div>
    );
};

export default AbstractWaves;

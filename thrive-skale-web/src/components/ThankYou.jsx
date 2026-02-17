import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './ThankYou.css';

function ThankYou() {
    const location = useLocation();
    const [countdown, setCountdown] = useState(3);
    const whatsappUrl = location.state?.whatsappUrl;

    // Track page view for Google Ads conversion
    useEffect(() => {
        window.scrollTo(0, 0);

        // Facebook Pixel
        if (typeof window.fbq === 'function') {
            window.fbq('track', 'Lead');
        }
    }, []);

    // Handle WhatsApp Auto-Redirect
    useEffect(() => {
        if (!whatsappUrl) return;

        const timer = setInterval(() => {
            setCountdown((prev) => prev - 1);
        }, 1000);

        const redirect = setTimeout(() => {
            window.location.href = whatsappUrl;
        }, 3000);

        return () => {
            clearInterval(timer);
            clearTimeout(redirect);
        };
    }, [whatsappUrl]);

    return (
        <div className="thank-you-page">
            <div className="thank-you-container">
                {/* Success Icon */}
                <div className="success-icon">
                    <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
                        <circle cx="40" cy="40" r="38" stroke="#48d5b1" strokeWidth="4" />
                        <path d="M25 40L35 50L55 30" stroke="#48d5b1" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </div>

                {/* Main Heading */}
                <h1 className="thank-you-heading">Thank You! We've Got Your Request</h1>
                <p className="thank-you-subheading">
                    Your information has been received. We're excited to help grow your business!
                </p>

                {/* WhatsApp Redirect Message */}
                {whatsappUrl && (
                    <div className="whatsapp-redirect-msg" style={{
                        marginTop: '20px',
                        padding: '15px',
                        background: 'rgba(37, 211, 102, 0.1)',
                        borderRadius: '12px',
                        border: '1px solid rgba(37, 211, 102, 0.2)'
                    }}>
                        <p style={{ color: '#25D366', fontWeight: 600, marginBottom: '5px' }}>
                            Redirecting to WhatsApp in {countdown}...
                        </p>
                        <p style={{ fontSize: '0.9em', opacity: 0.8 }}>
                            If you are not redirected automatically, <a href={whatsappUrl} className="redirect-link" style={{ textDecoration: 'underline', color: 'inherit' }}>click here</a>.
                        </p>
                    </div>
                )}

                {/* Back Home Button */}
                <Link to="/" className="back-home-btn">
                    ← Back to Homepage
                </Link>
            </div>
        </div>
    );
}

export default ThankYou;

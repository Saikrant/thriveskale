import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import './ThankYou.css';

function ThankYou() {
    // Track page view for Google Ads conversion
    useEffect(() => {
        window.scrollTo(0, 0);

        // This will be used for conversion tracking
        if (typeof window.gtag === 'function') {
            window.gtag('event', 'conversion', {
                'send_to': 'AW-XXXXXXXXX/XXXXX', // Replace with your conversion ID
                'value': 50.0,
                'currency': 'INR'
            });
        }

        // Facebook Pixel
        if (typeof window.fbq === 'function') {
            window.fbq('track', 'Lead');
        }
    }, []);

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


                {/* Back Home Button */}
                <Link to="/" className="back-home-btn">
                    ← Back to Homepage
                </Link>
            </div>
        </div>
    );
}

export default ThankYou;

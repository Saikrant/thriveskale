import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './ThankYou.css';

function ThankYou() {
    const location = useLocation();
    const [countdown, setCountdown] = useState(3);
    const whatsappUrl = location.state?.whatsappUrl;

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    /* Open WhatsApp with the prepared message after a short countdown. */
    useEffect(() => {
        if (!whatsappUrl) return undefined;
        const timer = setInterval(() => setCountdown((n) => Math.max(0, n - 1)), 1000);
        const redirect = setTimeout(() => { window.location.href = whatsappUrl; }, 3000);
        return () => {
            clearInterval(timer);
            clearTimeout(redirect);
        };
    }, [whatsappUrl]);

    return (
        <main id="main" className="section thanks">
            <div className="container">
                <div className="card thanks-card">
                    <h1>Thank you</h1>
                    <p className="muted">We have your details. Send the WhatsApp message that opens next and we will reply there.</p>

                    {whatsappUrl && (
                        <div className="thanks-redirect" role="status">
                            <p>Opening WhatsApp in {countdown}…</p>
                            <p className="small">
                                Not opening? <a href={whatsappUrl}>Open WhatsApp</a>
                            </p>
                        </div>
                    )}

                    <Link to="/" className="btn btn--secondary">Back to home</Link>
                </div>
            </div>
        </main>
    );
}

export default ThankYou;

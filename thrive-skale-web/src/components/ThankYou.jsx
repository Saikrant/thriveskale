import { useEffect, useState } from 'react';
import { Link, Navigate, useLocation } from 'react-router-dom';
import './ThankYou.css';

function ThankYou() {
    const location = useLocation();
    const [countdown, setCountdown] = useState(3);
    const whatsappUrl = location.state?.whatsappUrl;

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    /* Open WhatsApp once after a short countdown. If the visitor comes back
       (for example with the back button), do not send them away again. */
    const alreadyOpened = (() => {
        try { return whatsappUrl && sessionStorage.getItem('wa-opened') === whatsappUrl; } catch { return false; }
    })();

    useEffect(() => {
        if (!whatsappUrl || alreadyOpened) return undefined;
        const timer = setInterval(() => setCountdown((n) => Math.max(0, n - 1)), 1000);
        const redirect = setTimeout(() => {
            try { sessionStorage.setItem('wa-opened', whatsappUrl); } catch { /* storage blocked: fine */ }
            window.location.href = whatsappUrl;
        }, 3000);
        return () => {
            clearInterval(timer);
            clearTimeout(redirect);
        };
    }, [whatsappUrl, alreadyOpened]);

    /* Nothing was submitted (direct visit or refresh without state): go home. */
    if (!whatsappUrl) return <Navigate to="/" replace />;

    return (
        <main id="main" className="section thanks">
            <div className="container">
                <div className="card thanks-card">
                    <h1>Your message is ready</h1>
                    <p className="muted">Your message is ready in WhatsApp. Tap Send there so it reaches us; we reply in the same chat.</p>

                    {whatsappUrl && (
                        <div className="thanks-redirect">
                            <a className="btn btn--primary btn--block" href={whatsappUrl}>
                                Open WhatsApp and send
                            </a>
                            {!alreadyOpened && (
                                <p className="small muted" role="status">Opening automatically in {countdown}…</p>
                            )}
                        </div>
                    )}

                    <Link to="/" viewTransition className="btn btn--secondary">Back to home</Link>
                </div>
            </div>
        </main>
    );
}

export default ThankYou;

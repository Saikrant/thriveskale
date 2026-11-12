import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CONTACT } from '../utils/countryConfig';
import './ThankYou.css';

function NotFound() {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <main id="main" className="section thanks">
            <div className="container">
                <div className="card thanks-card">
                    <h1>Page not found</h1>
                    <p className="muted">This page does not exist or has moved. Go back to the home page, or message us on WhatsApp and we will help.</p>
                    <Link to="/" viewTransition className="btn btn--primary">Back to home</Link>
                    <a className="btn btn--secondary" href={`https://wa.me/${CONTACT.whatsappNumber}`}>Message us on WhatsApp</a>
                </div>
            </div>
        </main>
    );
}

export default NotFound;

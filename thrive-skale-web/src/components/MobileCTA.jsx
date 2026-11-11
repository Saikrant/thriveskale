import { useEffect, useState } from 'react';
import { CONTACT } from '../utils/countryConfig';
import Icon from './Icon';
import './MobileCTA.css';

/*
 * Phone-only bar with two actions, shown once the hero form is off screen and
 * hidden again at the contact section. Two IntersectionObservers, no scroll
 * listener; it slides with transform only.
 */
const MobileCTA = () => {
    const [heroVisible, setHeroVisible] = useState(true);
    const [contactVisible, setContactVisible] = useState(false);

    useEffect(() => {
        const form = document.querySelector('.hero-form');
        const contact = document.getElementById('contact');
        if (!form || !contact || !('IntersectionObserver' in window)) return undefined;
        const heroObs = new IntersectionObserver(([e]) => setHeroVisible(e.isIntersecting));
        const contactObs = new IntersectionObserver(([e]) => setContactVisible(e.isIntersecting));
        heroObs.observe(form);
        contactObs.observe(contact);
        return () => { heroObs.disconnect(); contactObs.disconnect(); };
    }, []);

    const shown = !heroVisible && !contactVisible;

    const toQuote = () => {
        document.getElementById('hero')?.scrollIntoView();
        document.getElementById('hero-name')?.focus({ preventScroll: true });
    };

    return (
        <div className={`mobile-cta ${shown ? 'is-shown' : ''}`} aria-hidden={!shown} inert={!shown}>
            <a
                className="btn btn--secondary"
                href={`https://wa.me/${CONTACT.whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
            >
                <Icon name="chat" size={20} /> WhatsApp
            </a>
            <button type="button" className="btn btn--primary" onClick={toQuote}>
                Get a quote
            </button>
        </div>
    );
};

export default MobileCTA;

import { Link } from 'react-router-dom';
import { CONTACT } from '../utils/countryConfig';
import Icon from './Icon';
import './Footer.css';

const WHATSAPP_URL = `https://wa.me/${CONTACT.whatsappNumber}`;

const Footer = () => (
    <footer className="footer">
        <div className="container">
            <div className="footer-cta">
                <div className="stack">
                    <h2 className="footer-cta-title">Ready to turn ad clicks into WhatsApp enquiries?</h2>
                    <p className="muted">Tell us about your business and we reply on WhatsApp with a price.</p>
                </div>
                <a className="btn btn--primary" href={WHATSAPP_URL}>
                    <Icon name="chat" size={20} />
                    Get a quote on WhatsApp
                </a>
            </div>

            <div className="footer-grid">
                <div className="stack">
                    <p className="footer-logo">thrivv<span>Skale</span></p>
                    <p className="muted">Websites, lead capture, CRM, WhatsApp and ads for businesses in India. Based in {CONTACT.city}.</p>
                </div>

                <nav aria-label="Footer" className="stack">
                    <h2 className="footer-title">Pages</h2>
                    <ul className="footer-links footer-links--cols">
                        <li><Link to="/how-it-works">How it works</Link></li>
                        <li><Link to="/packages">Packages</Link></li>
                        <li><Link to="/monthly">Monthly plans</Link></li>
                        <li><Link to="/faq">FAQ</Link></li>
                        <li><Link to="/privacy-policy">Privacy Policy</Link></li>
                        <li><Link to="/terms">Terms</Link></li>
                    </ul>
                </nav>

                <div className="stack">
                    <h2 className="footer-title">Contact</h2>
                    <ul className="footer-links footer-contact">
                        <li><a href={CONTACT.phone.link}><Icon name="phone" size={18} />{CONTACT.phone.display}</a></li>
                        <li><a href={CONTACT.aakash.link}><Icon name="person" size={18} />{CONTACT.aakash.name}: {CONTACT.aakash.display}</a></li>
                        <li><a href={WHATSAPP_URL}><Icon name="chat" size={18} />Message us on WhatsApp</a></li>
                        <li><a href={`mailto:${CONTACT.email}`}><Icon name="mail" size={18} />{CONTACT.email}</a></li>
                    </ul>
                </div>
            </div>
        </div>
        <div className="container footer-bottom">
            <p className="small muted">&copy; {new Date().getFullYear()} Thrivv Skale Private Limited. Prices exclude 18% GST.</p>
        </div>
    </footer>
);

export default Footer;

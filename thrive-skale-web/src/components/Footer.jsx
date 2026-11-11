import { Link } from 'react-router-dom';
import { CONTACT } from '../utils/countryConfig';
import './Footer.css';

const Footer = () => (
    <footer className="footer">
        <div className="container footer-grid">
            <div className="stack">
                <p className="footer-logo">thrivv<span>Skale</span></p>
                <p className="muted">Websites, lead capture, CRM, WhatsApp and ads for businesses in India. Based in {CONTACT.city}.</p>
            </div>

            <nav aria-label="Footer" className="stack">
                <h2 className="footer-title">Pages</h2>
                <ul className="footer-links">
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
                <ul className="footer-links">
                    <li><a href={CONTACT.phone.link}>{CONTACT.phone.display}</a></li>
                    <li>{CONTACT.aakash.name}: <a href={CONTACT.aakash.link}>{CONTACT.aakash.display}</a></li>
                    <li><a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a></li>
                </ul>
            </div>
        </div>
        <div className="container footer-bottom">
            <p className="small muted">&copy; {new Date().getFullYear()} Thrivv Skale Private Limited. Prices exclude 18% GST.</p>
        </div>
    </footer>
);

export default Footer;

import { CONTACT, GST_NOTE, LEAD_GROWTH, PACKAGES, rupees } from '../utils/countryConfig';
import './LegalPages.css';

const UPDATED = '11 November 2026';

const LegalPage = ({ title, children }) => (
    <main id="main" className="section legal">
        <div className="container">
            <article className="legal-body">
                <h1>{title}</h1>
                <p className="small muted">Last updated {UPDATED}</p>
                {children}
            </article>
        </div>
    </main>
);

const ContactLine = () => (
    <p>
        Email <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a> or call{' '}
        <a href={CONTACT.phone.link}>{CONTACT.phone.display}</a>.
    </p>
);

export const PrivacyPolicy = () => (
    <LegalPage title="Privacy Policy">
        <p>
            This policy explains what Thrivv Skale Private Limited ({CONTACT.city}, India) collects
            through this website and how we use it.
        </p>

        <h2>What we collect</h2>
        <ul className="ticks">
            <li>From the quote form: your name, phone number and type of business.</li>
            <li>From the contact form: your name, phone number, email, type of business and your message.</li>
        </ul>

        <h2>How it reaches us</h2>
        <p>
            When you submit a form, your details are put into a WhatsApp message to our business number.
            WhatsApp opens on your device and the message is sent only when you send it.
        </p>

        <h2>How we use it</h2>
        <p>Only to reply to your enquiry, prepare a quote and follow up about it.</p>

        <h2>Analytics and ads</h2>
        <p>
            This site uses the Google tag (Google Ads) to measure visits and enquiries that come from our ads.
            Google may set cookies for this. You can control ad personalisation in your Google account settings.
        </p>

        <h2>Your choices</h2>
        <p>To see, correct or delete the details you sent us, contact us:</p>
        <ContactLine />
    </LegalPage>
);

export const Terms = () => (
    <LegalPage title="Terms">
        <p>These terms cover the prices and payments shown on this website.</p>

        <h2>Prices</h2>
        <p>All prices are in Indian rupees and exclude GST ({GST_NOTE.replace('+ ', '')} is added to every invoice).</p>

        <h2>Payment stages</h2>
        <ul className="ticks">
            {PACKAGES.map((p) => (
                <li key={p.id}>
                    {p.name} ({p.priceFrom ? 'from ' : ''}{rupees(p.price)}):{' '}
                    {p.payment.map((s) => `${s.share}% ${s.when}`).join(', ')}.
                </li>
            ))}
        </ul>

        <h2>Monthly plans</h2>
        <p>{LEAD_GROWTH.name} has a minimum term of {LEAD_GROWTH.minimumMonths} months.</p>

        <h2>Costs you pay directly</h2>
        <p>
            Ad spend, domain names, hosting, WhatsApp API provider and Meta message fees, and Zoho CRM
            licences are paid by you to those providers. They are not included in our prices.
        </p>

        <h2>Your quote</h2>
        <p>Before work starts we send a written quote with the scope and timeline. That quote is what we deliver.</p>

        <h2>Questions</h2>
        <ContactLine />
    </LegalPage>
);

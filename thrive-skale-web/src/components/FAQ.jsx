import { CONTACT, LEAD_GROWTH, PACKAGES, rupees } from '../utils/countryConfig';
import './FAQ.css';

const pkg = (id) => PACKAGES.find((p) => p.id === id);
const terms = (p) => p.payment.map((s) => `${s.share}% ${s.when}`).join(', ');

const FAQ_DATA = [
    {
        q: 'What is a lead engine?',
        a: 'It is your website, enquiry forms, CRM, WhatsApp replies and ads set up to work together. Every enquiry is caught, saved and followed up, and you can see where it came from.',
    },
    {
        q: 'Which package should I choose?',
        a: `Choose the ${pkg('lead-website').name} if you mainly need a website that sends enquiries to your WhatsApp. Choose the ${pkg('lead-system').name} if you also want a simple lead tool (a quote request, booking form or calculator), a CRM, automatic WhatsApp replies and ad tracking. Complex tools are quoted separately. Choose the ${pkg('online-store').name} if you want to sell products online.`,
    },
    {
        q: 'How long does it take?',
        a: 'It depends on the package, the number of pages and how ready your content is. We give you a timeline in your quote before you pay anything.',
    },
    {
        q: 'How do payments work?',
        a: `You pay in stages. ${pkg('lead-website').name} (${rupees(pkg('lead-website').price)}): ${terms(pkg('lead-website'))}. ${pkg('lead-system').name} (${rupees(pkg('lead-system').price)}): ${terms(pkg('lead-system'))}. ${pkg('online-store').name} (from ${rupees(pkg('online-store').price)}): ${terms(pkg('online-store'))}. All prices exclude 18% GST.`,
    },
    {
        q: 'What will I pay to other companies?',
        a: 'Ad spend, your domain name, hosting, the WhatsApp API provider and Meta message fees, and Zoho CRM licences. You pay these directly. The table above shows rough costs.',
    },
    {
        q: 'Do I have to take a monthly plan?',
        a: `No. Monthly plans are optional. If you choose ${LEAD_GROWTH.name}, the minimum is ${LEAD_GROWTH.minimumMonths} months.`,
    },
    {
        q: 'Can you build a mobile app?',
        a: 'Yes. Mobile apps are quoted separately. Tell us what you need in the contact form.',
    },
];

const FAQ = () => (
    <section id="faq" className="section">
        <div className="container faq">
            <div className="faq-side">
                <div className="section-head">
                    <h2>Questions</h2>
                    <p>Plain answers. If yours is not here, ask us on WhatsApp.</p>
                </div>
                <a
                    className="btn btn--secondary"
                    href={`https://wa.me/${CONTACT.whatsappNumber}`}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Ask on WhatsApp
                </a>
            </div>

            <div className="faq-list">
                {FAQ_DATA.map((item) => (
                    <details key={item.q} className="faq-item">
                        <summary>
                            <h3>{item.q}</h3>
                            <span className="faq-icon" aria-hidden="true" />
                        </summary>
                        <p>{item.a}</p>
                    </details>
                ))}
            </div>
        </div>
    </section>
);

export default FAQ;

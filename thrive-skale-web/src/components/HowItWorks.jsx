import './HowItWorks.css';

const LEAD_WEBSITE = 'Lead Website';
const LEAD_SYSTEM = 'Lead System';
const LEAD_GROWTH = 'Lead Growth plan';

const STEPS = [
    {
        title: 'Ads and Google bring people in',
        text: 'Your Google Business Profile is set up so you show up locally. With the Lead Growth plan we also run your Meta and Google ads.',
        includedIn: [`Google: ${LEAD_WEBSITE} and ${LEAD_SYSTEM}`, `Ads: ${LEAD_GROWTH}`],
    },
    {
        title: 'Your website and calculator',
        text: 'Visitors find what you offer and leave their details. A calculator or quote tool lets them work out a price first.',
        includedIn: [`Website: ${LEAD_WEBSITE} and ${LEAD_SYSTEM}`, `Calculator: ${LEAD_SYSTEM}`],
    },
    {
        title: 'The enquiry lands in your CRM',
        text: 'Every enquiry is saved in Zoho CRM with where it came from, so nothing is lost in a chat thread.',
        includedIn: [LEAD_SYSTEM],
    },
    {
        title: 'An instant WhatsApp reply',
        text: 'The customer gets an automatic WhatsApp reply with the next step, even when you are busy.',
        includedIn: [LEAD_SYSTEM],
    },
    {
        title: 'Your team is alerted',
        text: 'The right person is told about the new lead so they can follow up.',
        includedIn: [LEAD_SYSTEM],
    },
    {
        title: 'A monthly report',
        text: 'Once a month you see what the ads cost, how many enquiries came in and what we changed.',
        includedIn: [LEAD_GROWTH],
    },
];

const HowItWorks = () => (
    <section id="how-it-works" className="section">
        <div className="container">
            <div className="section-head">
                <h2>How every enquiry is handled</h2>
                <p>Six steps from first click to follow-up. Each step shows which package includes it.</p>
            </div>

            <ol className="grid steps">
                {STEPS.map((step, i) => (
                    <li key={step.title} className="card step">
                        <span className="step-num" aria-hidden="true">{i + 1}</span>
                        <h3><span className="visually-hidden">Step {i + 1}: </span>{step.title}</h3>
                        <p className="muted">{step.text}</p>
                        <p className="step-included small">
                            <span>Included in:</span> {step.includedIn.join(' · ')}
                        </p>
                    </li>
                ))}
            </ol>
            <p className="steps-note small muted">
                The Lead Website sends enquiries straight to your WhatsApp. The CRM, automatic reply and team alerts come with the Lead System.
            </p>
        </div>
    </section>
);

export default HowItWorks;

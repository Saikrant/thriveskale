import { GST_NOTE, PACKAGES, rupees } from '../utils/countryConfig';
import './Packages.css';

/* A bar split by payment stage, so "40 / 30 / 30" reads at a glance. */
const PaymentBar = ({ payment }) => (
    <div className="pay">
        <p className="pay-title small">How you pay</p>
        <div className="pay-bar" aria-hidden="true">
            {payment.map((step, i) => (
                <span key={step.when} className={`pay-seg pay-seg--${i}`} style={{ flexBasis: `${step.share}%` }}>
                    {step.share}%
                </span>
            ))}
        </div>
        <ol className="pay-steps small">
            {payment.map((step, i) => (
                <li key={step.when}>
                    <span className={`pay-key pay-seg--${i}`} aria-hidden="true" />
                    <strong>{step.share}%</strong> {step.when}
                </li>
            ))}
        </ol>
    </div>
);

const Packages = () => (
    <section id="packages" className="section">
        <div className="container">
            <div className="section-head">
                <h2>What we build</h2>
                <p>One-time packages. Prices are in rupees and exclude GST.</p>
            </div>

            <ul className="packages">
                {PACKAGES.map((pkg) => (
                    <li key={pkg.id} className={`card package ${pkg.recommended ? 'card--featured package--featured' : ''}`}>
                        {pkg.recommended && <span className="badge">Recommended</span>}
                        <h3>{pkg.name}</h3>
                        <p className="muted">{pkg.summary}</p>
                        <p className="price">
                            {pkg.priceFrom && <small>from </small>}
                            {rupees(pkg.price)} <small>{GST_NOTE}</small>
                        </p>
                        <ul className="ticks">
                            {pkg.includes.map((item) => <li key={item}>{item}</li>)}
                        </ul>
                        <PaymentBar payment={pkg.payment} />
                        <a
                            href="#contact"
                            className={`btn ${pkg.recommended ? 'btn--primary' : 'btn--secondary'} btn--block`}
                        >
                            Ask about {pkg.name}
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    </section>
);

export default Packages;

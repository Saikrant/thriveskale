import { GST_NOTE, PACKAGES, rupees } from '../utils/countryConfig';
import './Packages.css';

const Packages = () => (
    <section id="packages" className="section">
        <div className="container">
            <div className="section-head">
                <h2>What we build</h2>
                <p>One-time packages. Prices are in rupees and exclude GST.</p>
            </div>

            <ul className="grid">
                {PACKAGES.map((pkg) => (
                    <li key={pkg.id} className={`card ${pkg.recommended ? 'card--featured' : ''}`}>
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
                        <div className="pay">
                            <p className="pay-title small">How you pay</p>
                            <ul className="pay-steps small">
                                {pkg.payment.map((step) => (
                                    <li key={step.when}><strong>{step.share}%</strong> {step.when}</li>
                                ))}
                            </ul>
                        </div>
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

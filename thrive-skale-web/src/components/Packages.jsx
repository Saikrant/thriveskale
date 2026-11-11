import { useState } from 'react';
import { GST_NOTE, PACKAGES, rupees } from '../utils/countryConfig';
import { requestContact } from '../utils/contactPrefill';
import useMediaQuery from '../hooks/useMediaQuery';
import Icon from './Icon';
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

/* Always open on wide screens; a tap-to-open list on phones to keep the page short. */
const Includes = ({ items, wide }) => {
    const [open, setOpen] = useState(wide);
    /* Follow screen-size changes by adjusting state during render (no effect, no extra pass). */
    const [prevWide, setPrevWide] = useState(wide);
    if (wide !== prevWide) {
        setPrevWide(wide);
        setOpen(wide);
    }
    return (
        <details className="includes" open={open} onToggle={(e) => setOpen(e.currentTarget.open)}>
            <summary className={wide ? 'visually-hidden' : ''}>
                What's included <span className="muted">({items.length})</span>
                <Icon name="chevron" size={20} className="includes-chevron" />
            </summary>
            <ul className="ticks">
                {items.map((item) => <li key={item}>{item}</li>)}
            </ul>
        </details>
    );
};

const Packages = () => {
    const wide = useMediaQuery('(min-width: 961px)');
    return (
    <section id="packages" className="section">
        <div className="container">
            <div className="section-head" data-reveal>
                <h2>What we build</h2>
                <p>One-time packages. Prices are in rupees and exclude GST.</p>
            </div>

            <ul className="packages">
                {PACKAGES.map((pkg, i) => (
                    <li key={pkg.id} className={`card package ${pkg.recommended ? 'card--featured package--featured' : ''}`} data-reveal style={{ '--i': i }}>
                        {pkg.recommended && <span className="badge">Recommended</span>}
                        <h3>{pkg.name}</h3>
                        <p className="muted">{pkg.summary}</p>
                        <p className="price">
                            {pkg.priceFrom && <small>from </small>}
                            {rupees(pkg.price)} <small>{GST_NOTE}</small>
                        </p>
                        <Includes items={pkg.includes} wide={wide} />
                        <PaymentBar payment={pkg.payment} />
                        <a
                            href="#contact"
                            className={`btn ${pkg.recommended ? 'btn--primary' : 'btn--secondary'} btn--block`}
                            onClick={(e) => { e.preventDefault(); requestContact(`the ${pkg.name}`); }}
                        >
                            Ask about {pkg.name}
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    </section>
    );
};

export default Packages;

import { PAID_DIRECTLY } from '../utils/countryConfig';
import './PaidDirectly.css';

const PaidDirectly = () => (
    <section id="paid-directly" className="section section--white">
        <div className="container">
            <div className="section-head" data-reveal>
                <h2>What you pay, and to whom</h2>
                <p>Some costs come to us. Others go straight to the provider. Here is the split.</p>
            </div>

            <div className="split" data-reveal style={{ '--i': 1 }}>
                <div className="split-side split-side--us">
                    <h3>Paid to us</h3>
                    <p>Everything with a price on this page: packages, monthly plans and add-ons.</p>
                    <p className="small muted">Prices exclude 18% GST, which is added to our invoices.</p>
                </div>

                <div className="split-side split-side--you">
                    <h3>Paid by you directly</h3>
                    <ul className="direct-list">
                        {PAID_DIRECTLY.map((row) => (
                            <li key={row.item}>
                                <p className="direct-item">{row.item}</p>
                                <p>{row.cost}</p>
                                <p className="small muted">Paid to {row.paidTo}</p>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    </section>
);

export default PaidDirectly;

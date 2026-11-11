import { GST_NOTE, LEAD_GROWTH, formatINR, rupees } from '../utils/countryConfig';
import './MonthlyPlans.css';

const MonthlyPlans = () => {
    const [low, mid] = LEAD_GROWTH.tiers;
    return (
        <section id="monthly" className="section">
            <div className="container">
                <div className="section-head">
                    <h2>Monthly plans</h2>
                    <p>Once your site is live, we can run the ads that fill it with enquiries.</p>
                </div>

                <div className="card monthly">
                    <div className="monthly-about">
                        <h3>{LEAD_GROWTH.name}</h3>
                        <p className="muted">{LEAD_GROWTH.summary}</p>
                        <ul className="ticks">
                            {LEAD_GROWTH.includes.map((item) => <li key={item}>{item}</li>)}
                        </ul>
                        <p className="small muted">Minimum {LEAD_GROWTH.minimumMonths} months. Ad spend is paid by you directly to Meta and Google.</p>
                    </div>

                    <div className="table-wrap">
                        <table className="table">
                            <caption className="visually-hidden">Lead Growth monthly fee by ad spend</caption>
                            <thead>
                                <tr><th scope="col">Your monthly ad spend</th><th scope="col">Our monthly fee</th></tr>
                            </thead>
                            <tbody>
                                <tr><td>Up to ₹{formatINR(low.upToAdSpend)}</td><td><strong>{rupees(low.fee)}</strong> <span className="muted small">{GST_NOTE}</span></td></tr>
                                <tr><td>Up to ₹{formatINR(mid.upToAdSpend)}</td><td><strong>{rupees(mid.fee)}</strong> <span className="muted small">{GST_NOTE}</span></td></tr>
                                <tr><td>Above ₹{formatINR(mid.upToAdSpend)}</td><td><strong>{LEAD_GROWTH.aboveTopTierPercent}% of ad spend</strong> <span className="muted small">{GST_NOTE}</span></td></tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default MonthlyPlans;

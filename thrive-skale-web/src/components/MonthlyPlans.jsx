import { useId, useState } from 'react';
import { GST_NOTE, GST_RATE, LEAD_GROWTH, leadGrowthFee, rupees } from '../utils/countryConfig';
import './MonthlyPlans.css';

const MIN = 10000;
const MAX = 500000;
const STEP = 5000;
const START = 100000;

const pct = (v) => ((v - MIN) / (MAX - MIN)) * 100;

const MonthlyPlans = () => {
    const id = useId();
    const [spend, setSpend] = useState(START);
    const fee = leadGrowthFee(spend);
    const withGst = Math.round(fee * (1 + GST_RATE));
    const [low, mid] = LEAD_GROWTH.tiers;

    const bands = [
        { key: 'low', label: `Up to ${rupees(low.upToAdSpend)}`, fee: rupees(low.fee), active: spend <= low.upToAdSpend },
        { key: 'mid', label: `Above ${rupees(low.upToAdSpend)}, up to ${rupees(mid.upToAdSpend)}`, fee: rupees(mid.fee), active: spend > low.upToAdSpend && spend <= mid.upToAdSpend },
        { key: 'top', label: `Above ${rupees(mid.upToAdSpend)}`, fee: `${LEAD_GROWTH.aboveTopTierPercent}% of ad spend, minimum ${rupees(LEAD_GROWTH.minimumFeeAboveTopTier)}`, active: spend > mid.upToAdSpend },
    ];

    return (
        <section id="monthly" className="section section--haldi">
            <div className="container">
                <div className="section-head">
                    <h2>Monthly plans</h2>
                    <p>Once your site is live, we can run the ads that bring enquiries to it.</p>
                </div>

                <div className="card monthly">
                    <div className="monthly-about">
                        <h3>{LEAD_GROWTH.name}</h3>
                        <p className="muted">{LEAD_GROWTH.summary}</p>
                        <ul className="ticks">
                            {LEAD_GROWTH.includes.map((item) => <li key={item}>{item}</li>)}
                        </ul>
                        <p className="small muted">
                            Minimum {LEAD_GROWTH.minimumMonths} months. Ad spend is paid by you directly to Meta and Google.
                        </p>
                    </div>

                    <div className="fee">
                        <label className="fee-label" htmlFor={`${id}-spend`}>Your monthly ad spend</label>
                        <p className="fee-spend" aria-hidden="true">{rupees(spend)}</p>

                        <div className="fee-track">
                            <input
                                id={`${id}-spend`}
                                type="range"
                                min={MIN}
                                max={MAX}
                                step={STEP}
                                value={spend}
                                onChange={(e) => setSpend(Number(e.target.value))}
                                aria-valuetext={`${rupees(spend)} a month in ad spend. Our fee ${rupees(fee)} plus GST.`}
                                aria-describedby={`${id}-more`}
                            />
                            <span className="fee-tick" style={{ "--p": pct(low.upToAdSpend) }} aria-hidden="true" />
                            <span className="fee-tick" style={{ "--p": pct(mid.upToAdSpend) }} aria-hidden="true" />
                        </div>
                        <div className="fee-ends small muted" aria-hidden="true">
                            <span>{rupees(MIN)}</span>
                            <span>{rupees(MAX)}</span>
                        </div>

                        <div className="fee-result">
                            <p className="small">Our monthly fee</p>
                            <p className="price">{rupees(fee)} <small>{GST_NOTE}</small></p>
                            <p className="small muted">{rupees(withGst)} a month including GST</p>
                        </div>

                        <p id={`${id}-more`} className={`fee-more small ${spend === MAX ? 'fee-more--on' : ''}`}>
                            Spending more than {rupees(MAX)} a month? <a href="#contact">Ask us</a> for a quote.
                        </p>

                        <ul className="fee-bands" aria-label="Fee by monthly ad spend">
                            {bands.map((band) => (
                                <li key={band.key} className={band.active ? 'is-active' : ''}>
                                    <span>{band.label}</span>
                                    <strong>{band.fee}</strong>
                                    {band.active && <span className="visually-hidden"> (your selection)</span>}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default MonthlyPlans;

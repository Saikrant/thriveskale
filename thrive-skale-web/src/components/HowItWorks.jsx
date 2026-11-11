import { useState } from 'react';
import { COVERAGE_LABEL, LEAD_STEPS, PLAN_OPTIONS } from '../utils/leadSteps';
import Icon from './Icon';
import './HowItWorks.css';

const STEP_ICON = { ads: 'ads', site: 'website', crm: 'crm', reply: 'chat', alert: 'bell', report: 'report' };

const summaryText = (full, part, total) => {
    if (full === 0) return `covers ${part} of ${total} steps in part.`;
    if (part === 0) return `covers ${full} of ${total} steps.`;
    return `covers ${full} of ${total} steps, and ${part} more in part.`;
};

const HowItWorks = () => {
    const [plan, setPlan] = useState('system');
    const planLabel = PLAN_OPTIONS.find((p) => p.id === plan).label;
    const fullCount = LEAD_STEPS.filter((s) => s.coverage[plan].level === 'full').length;
    const partCount = LEAD_STEPS.filter((s) => s.coverage[plan].level === 'partial').length;

    return (
        <section id="how-it-works" className="section section--white">
            <div className="container">
                <div className="flow-head" data-reveal>
                    <div className="section-head">
                        <h2>How every enquiry is handled</h2>
                        <p>Six steps from first click to follow-up. Pick a package to see which steps it covers.</p>
                    </div>

                    <fieldset className="flow-picker">
                        <legend className="small muted">Show steps for</legend>
                        <div className="segmented">
                            {PLAN_OPTIONS.map((option) => (
                                <label key={option.id}>
                                    <input
                                        type="radio"
                                        name="flow-plan"
                                        value={option.id}
                                        checked={plan === option.id}
                                        onChange={() => setPlan(option.id)}
                                    />
                                    {option.label}
                                </label>
                            ))}
                        </div>
                    </fieldset>
                </div>

                <p className="flow-summary" aria-live="polite">
                    <strong>{planLabel}</strong> {summaryText(fullCount, partCount, LEAD_STEPS.length)}
                </p>

                <ol className="flow" data-plan={plan}>
                    {LEAD_STEPS.map((step, i) => {
                        const { level, note } = step.coverage[plan];
                        const next = LEAD_STEPS[i + 1];
                        /* The line to the next step fills in when both ends are covered. */
                        const linked = next && level !== 'none' && next.coverage[plan].level !== 'none';
                        return (
                            <li
                                key={step.id}
                                className={`flow-step flow-step--${level} ${linked ? 'flow-step--linked' : ''}`}
                                data-reveal
                                style={{ '--i': i }}
                            >
                                <span className="flow-node" aria-hidden="true">{i + 1}</span>
                                <div className="flow-body">
                                    <span className="flow-icon"><Icon name={STEP_ICON[step.id]} size={22} /></span>
                                    <h3><span className="visually-hidden">Step {i + 1}: </span>{step.title}</h3>
                                    <p className="flow-status small">
                                        {COVERAGE_LABEL[level]}{note ? `: ${note}` : ''}
                                    </p>
                                    <p className="flow-text">{step.text}</p>
                                </div>
                            </li>
                        );
                    })}
                </ol>
            </div>
        </section>
    );
};

export default HowItWorks;

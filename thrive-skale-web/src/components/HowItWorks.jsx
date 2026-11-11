import { useState } from 'react';
import { COVERAGE_LABEL, LEAD_STEPS, PLAN_OPTIONS } from '../utils/leadSteps';
import './HowItWorks.css';

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
                <div className="flow-head">
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
                        return (
                            <li key={step.id} className={`flow-step flow-step--${level}`}>
                                <span className="flow-node" aria-hidden="true">{i + 1}</span>
                                <div className="flow-body">
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

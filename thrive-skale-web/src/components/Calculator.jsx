import './Calculator.css';

const SAMPLE_ROWS = [
    ['What do you need?', 'Option B'],
    ['How many?', '3'],
    ['Extras', 'Delivery, installation'],
    ['Your estimate', 'Shown here, with a button to send it on WhatsApp'],
];

const Calculator = () => (
    <section id="calculator" className="section">
        <div className="container calc">
            <div className="calc-copy">
                <div className="section-head">
                    <h2>A smart calculator for your business</h2>
                    <p>
                        We build a calculator or quote tool around how you price your work. Customers answer
                        a few questions, see an estimate, and send it to you as an enquiry.
                    </p>
                </div>
                <ul className="ticks">
                    <li>Uses your own prices and rules</li>
                    <li>Every estimate is saved as a lead with the customer's choices</li>
                    <li>Included in the Lead System package</li>
                </ul>
            </div>

            <figure className="calc-sample" aria-label="Sample of a quote tool, not a working calculator">
                <span className="badge">Sample</span>
                <p className="calc-sample-note small muted">An illustration of the steps a customer sees. It is not a working tool.</p>
                <dl className="calc-rows">
                    {SAMPLE_ROWS.map(([label, value]) => (
                        <div key={label}>
                            <dt className="small muted">{label}</dt>
                            <dd>{value}</dd>
                        </div>
                    ))}
                </dl>
            </figure>
        </div>
    </section>
);

export default Calculator;

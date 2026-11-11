import { ADD_ON_GROUPS, rupees } from '../utils/countryConfig';

const priceText = (item) => {
    if (item.quote) return 'Ask for a quote';
    const parts = [];
    if (item.setup) parts.push(`${rupees(item.setup)} setup`);
    if (item.monthly) parts.push(`${rupees(item.monthly)} a month`);
    return parts.join(' + ');
};

const AddOns = () => (
    <section id="add-ons" className="section">
        <div className="container">
            <div className="section-head">
                <h2>Add-ons</h2>
                <p>Add these to any package. Prices exclude 18% GST.</p>
            </div>

            <ul className="grid grid--4">
                {ADD_ON_GROUPS.map((group) => (
                    <li key={group.name} className="card">
                        <h3>{group.name}</h3>
                        <dl className="stack">
                            {group.items.map((item) => (
                                <div key={item.id}>
                                    <dt>{item.name}</dt>
                                    <dd className="muted">{priceText(item)}</dd>
                                </div>
                            ))}
                        </dl>
                    </li>
                ))}
            </ul>
        </div>
    </section>
);

export default AddOns;

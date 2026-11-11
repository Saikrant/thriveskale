import { ADD_ON_GROUPS, addOnPriceText } from '../utils/countryConfig';
import './AddOns.css';

/* A printed rate card: name, dotted leader, price. */
const AddOns = () => (
    <section id="add-ons" className="section">
        <div className="container addons">
            <div className="section-head">
                <h2>Add-ons</h2>
                <p>Add any of these to a package. Prices exclude 18% GST.</p>
            </div>

            <div className="rate-card">
                {ADD_ON_GROUPS.map((group) => (
                    <section key={group.name} className="rate-group" aria-labelledby={`rate-${group.name}`}>
                        <h3 id={`rate-${group.name}`}>{group.name}</h3>
                        <ul>
                            {group.items.map((item) => (
                                <li key={item.id} className="rate-row">
                                    <span className="rate-name">{item.name}</span>
                                    <span className="rate-leader" aria-hidden="true" />
                                    <span className="rate-price">{addOnPriceText(item)}</span>
                                </li>
                            ))}
                        </ul>
                    </section>
                ))}
            </div>
        </div>
    </section>
);

export default AddOns;

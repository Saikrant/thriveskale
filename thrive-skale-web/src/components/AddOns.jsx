import { ADD_ON_GROUPS, addOnPriceText } from '../utils/countryConfig';
import Icon from './Icon';
import './AddOns.css';

const GROUP_ICON = { Automation: 'automation', Visibility: 'visibility', Upkeep: 'upkeep', Custom: 'custom' };

/* A printed rate card: name, dotted leader, price. Sits beside the monthly calculator. */
const AddOns = () => (
    <div id="add-ons" className="rate-card" data-reveal style={{ '--i': 2 }}>
        <div className="rate-head">
            <h3>Add-ons</h3>
            <p className="small muted">Add any of these to a package. Prices exclude 18% GST.</p>
        </div>
        <div className="rate-groups">
                {ADD_ON_GROUPS.map((group) => (
                    <section key={group.name} className="rate-group" aria-labelledby={`rate-${group.name}`}>
                        <h4 id={`rate-${group.name}`}>
                            <Icon name={GROUP_ICON[group.name] || 'automation'} size={20} />
                            {group.name}
                        </h4>
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
);

export default AddOns;

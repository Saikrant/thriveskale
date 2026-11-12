import MonthlyPlans from './MonthlyPlans';
import AddOns from './AddOns';
import './Plans.css';

/* Monthly ad management and add-ons in one section: calculator on the left, rate card on the right. */
const Plans = () => (
    <section id="monthly" className="section section--haldi">
        <div className="container">
            <div className="section-head" data-reveal>
                <h2>Monthly plans and add-ons</h2>
                <p>Once your site is live, we can run the ads that bring enquiries to it. Add extras as you need them.</p>
            </div>
            <div className="plans">
                <MonthlyPlans />
                <AddOns />
            </div>
        </div>
    </section>
);

export default Plans;

import { useCountry } from '../context/CountryContext';
import './Hero.css';

const scrollToId = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
};

const Hero = () => {
    const { config } = useCountry();
    const { symbol } = config.currency;
    const { website, mobile, ai } = config.pricing;

    // Real tiers from the pricing config; delivery times match the pricing section.
    const rates = [
        { name: 'Business website', detail: 'Single page, ready in 7 days', price: website.plans[0].price },
        { name: 'Online store or booking site', detail: 'Payments and admin dashboard, ready in 30 days', price: website.plans[2].price },
        { name: 'WhatsApp assistant', detail: `Answers enquiries and books calls, set up in 10 days. ${config.offers.aiAgentsDiscount} off for early customers`, price: ai.plans[0].price },
        { name: 'Mobile app', detail: 'One platform, up to 5 screens', price: mobile.plans[0].price },
    ];

    return (
        <section id="hero" className="hero">
            <div className="hero-inner container">
                <div className="hero-copy">
                    <h1 className="hero-headline">
                        Websites, online stores and WhatsApp assistants, with prices upfront
                    </h1>
                    <p className="hero-lead">
                        We build it, launch it and support it. Book a free 30-minute call and we will
                        recommend the right package for your business.
                    </p>
                    <div className="hero-ctas">
                        <button type="button" className="hero-cta-primary" onClick={() => scrollToId('contact')}>
                            Book a free call
                        </button>
                        <button type="button" className="hero-cta-secondary" onClick={() => scrollToId('pricing')}>
                            See all prices
                        </button>
                    </div>
                </div>

                <aside className="hero-rates" aria-labelledby="hero-rates-title">
                    <h2 id="hero-rates-title" className="hero-rates-title">Starting prices</h2>
                    <p className="hero-rates-note">In rupees, excluding GST</p>
                    <dl className="hero-rates-list">
                        {rates.map((r) => (
                            <div className="hero-rate" key={r.name}>
                                <div className="hero-rate-text">
                                    <dt>{r.name}</dt>
                                    <dd>{r.detail}</dd>
                                </div>
                                <div className="hero-rate-price">
                                    <span className="hero-rate-from">from</span> {symbol}{r.price}
                                </div>
                            </div>
                        ))}
                    </dl>
                </aside>
            </div>
        </section>
    );
};

export default Hero;

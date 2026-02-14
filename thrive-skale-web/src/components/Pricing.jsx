import { useState, useEffect, useRef } from 'react';
import { useCountry } from '../context/CountryContext';
import './Pricing.css';

const Pricing = () => {
    const { config } = useCountry();
    const [activeCategory, setActiveCategory] = useState('website');
    const sectionRef = useRef(null);
    const cardsRef = useRef([]);

    // Get plans from the country config
    // Fallback to empty array if something goes wrong to prevent crash
    const currentPlans = config.pricing?.[activeCategory]?.plans || [];

    // Entrance animation
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        cardsRef.current.forEach((card, i) => {
                            if (card) {
                                setTimeout(() => {
                                    card.style.opacity = '1';
                                    card.style.transform = 'translateY(0)';
                                }, i * 150);
                            }
                        });
                    }
                });
            },
            { threshold: 0.05 }
        );

        if (sectionRef.current) observer.observe(sectionRef.current);
        return () => observer.disconnect();
    }, []);

    // Reset card animations when switching category
    useEffect(() => {
        cardsRef.current.forEach((card, i) => {
            if (card) {
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, i * 120);
            }
        });
    }, [activeCategory]);

    const handleGetStarted = (planName) => {
        const contactEl = document.getElementById('contact');
        if (contactEl) contactEl.scrollIntoView({ behavior: 'smooth' });
    };

    // Labels for the tabs
    const categories = [
        { key: 'website', label: 'Website Development' },
        { key: 'mobile', label: 'Mobile App Development' },
        { key: 'ai', label: 'AI Agents' }
    ];

    // Feature lists are still static/shared, or we can look them up if they differ per country. 
    // For now, I'll keep the feature lists hardcoded here but map them to the plans by name if needed,
    // OR we can assume the plans in config ONLY have name/price and we need to merge with features?
    // The user provided config object in the prompt DOES NOT have features. 
    // I need to merge the configuration price with the features.

    // Let's define the FEATURES + DESC structure here, since it wasn't in the country config I created (to keep it minimal).
    // I will merge the static features with the dynamic prices.

    const PLAN_DETAILS = {
        website: [
            {
                name: 'Starter',
                desc: 'Perfect for personal portfolios & landing pages',
                features: ['Single page / landing page', 'Mobile responsive design', 'Basic SEO setup', 'Contact form integration', 'SSL certificate', '1 round of revisions', '7-day delivery'],
                popular: false
            },
            {
                name: 'Business',
                desc: 'Ideal for growing businesses & startups',
                features: ['Up to 8 pages', 'Custom UI/UX design', 'CMS integration', 'Advanced SEO optimization', 'Google Analytics setup', 'WhatsApp & chat integration', 'Social media links', '3 rounds of revisions', '14-day delivery'],
                popular: true
            },
            {
                name: 'Enterprise',
                desc: 'Full-scale custom web solutions',
                features: ['Unlimited pages', 'E-commerce / booking system', 'Custom animations & interactions', 'Admin dashboard', 'Payment gateway integration', 'Multi-language support', 'Performance optimization', 'Unlimited revisions', '30-day delivery'],
                popular: false
            }
        ],
        mobile: [
            {
                name: 'MVP',
                desc: 'Validate your idea with a minimum viable product',
                features: ['Single platform (iOS or Android)', 'Up to 5 screens', 'Basic UI design', 'User authentication', 'Push notifications', 'REST API integration', '21-day delivery'],
                popular: false
            },
            {
                name: 'Growth',
                desc: 'Feature-rich app for scaling businesses',
                features: ['Cross-platform (iOS + Android)', 'Up to 15 screens', 'Custom UI/UX design', 'In-app payments', 'Real-time chat / notifications', 'Admin panel', 'Analytics dashboard', '3rd-party integrations', '45-day delivery'],
                popular: true
            },
            {
                name: 'Enterprise',
                desc: 'Complex, scalable mobile solutions',
                features: ['Native iOS + Android', 'Unlimited screens & features', 'AI-powered features', 'Offline mode support', 'Multi-role access system', 'Cloud infrastructure setup', 'App Store submission', '6 months support', '90-day delivery'],
                popular: false
            }
        ],
        ai: [
            {
                name: 'Starter',
                desc: 'Basic AI chatbot for customer support',
                features: ['Rule-based chatbot', 'Website widget integration', 'Up to 50 FAQ responses', 'WhatsApp integration', 'Basic analytics', 'Email lead capture', '10-day setup'],
                popular: false
            },
            {
                name: 'Professional',
                desc: 'Custom-trained AI agent for your business',
                features: ['GPT-powered conversations', 'Trained on your business data', 'Multi-channel deployment', 'CRM integration', 'Appointment booking', 'Custom personality & tone', 'Conversation analytics', 'Monthly model updates', '21-day setup'],
                popular: true
            },
            {
                name: 'Enterprise',
                desc: 'Full AI automation suite',
                features: ['Multi-agent workflow system', 'Custom LLM fine-tuning', 'Workflow automation', 'Voice AI capabilities', 'API access & webhooks', 'Advanced analytics & reporting', 'Dedicated support manager', 'SLA guarantee', '45-day setup'],
                popular: false
            }
        ]
    };

    // Merge dynamic price with static details
    const plansToRender = currentPlans.map((plan, idx) => {
        const details = PLAN_DETAILS[activeCategory][idx]; // Assume same order
        return {
            ...plan,
            ...details
        };
    });

    return (
        <section id="pricing" className="pricing-section" ref={sectionRef}>
            {/* Header */}
            <div className="pricing-header">
                <h2 className="pricing-title">
                    Transparent{' '}
                    <span className="pricing-title-accent">Pricing</span>
                </h2>
                <p className="pricing-subtitle">
                    Competitive rates tailored for businesses of every size.
                    No hidden costs — what you see is what you pay.
                </p>
            </div>

            {/* Category tabs */}
            <div className="pricing-tabs" role="tablist" aria-label="Pricing categories">
                {categories.map((cat) => (
                    <button
                        key={cat.key}
                        className={`pricing-tab ${activeCategory === cat.key ? 'pricing-tab--active' : ''}`}
                        onClick={() => setActiveCategory(cat.key)}
                        role="tab"
                        aria-selected={activeCategory === cat.key}
                    >
                        {cat.label}
                    </button>
                ))}
            </div>

            {/* Pricing cards */}
            <div className="pricing-cards">
                {plansToRender.map((plan, index) => (
                    <div
                        key={`${activeCategory}-${plan.name}`}
                        className={`pricing-card ${plan.popular ? 'pricing-card--popular' : ''}`}
                        ref={(el) => (cardsRef.current[index] = el)}
                        style={{
                            opacity: 0,
                            transform: 'translateY(20px)',
                            transition: 'opacity 0.5s ease, transform 0.5s ease, border-color 0.3s ease',
                        }}
                    >
                        <div className="pricing-plan-name">{plan.name}</div>
                        <div className="pricing-price">
                            <span className="pricing-currency">{config.currency.symbol}</span>
                            <span className="pricing-amount">{plan.price}</span>
                            <span className="pricing-period"> {plan.period}</span>
                        </div>
                        <p className="pricing-desc">{plan.desc}</p>

                        <ul className="pricing-features">
                            {plan.features.map((feature, idx) => (
                                <li key={idx} className="pricing-feature">
                                    <span className="pricing-feature-icon">✓</span>
                                    <span>{feature}</span>
                                </li>
                            ))}
                        </ul>

                        <button
                            className={`pricing-cta ${plan.popular ? 'pricing-cta--primary' : 'pricing-cta--outline'}`}
                            onClick={() => handleGetStarted(plan.name)}
                        >
                            Get Started
                        </button>
                    </div>
                ))}
            </div>

            <p className="pricing-disclaimer">
                {config.pricingDisclaimer}
            </p>
        </section>
    );
};

export default Pricing;


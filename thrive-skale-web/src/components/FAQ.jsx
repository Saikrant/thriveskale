import { useState, useCallback, useEffect } from 'react';
import { useCountry } from '../context/CountryContext';
import './FAQ.css';

const FAQ_DATA = [
    {
        q: 'How long does it take to build a website?',
        a: "Timelines depend on the plan you choose. Our Starter websites are delivered in 7 days, Business sites in 14 days, and Enterprise projects in about 30 days. We'll confirm an exact timeline after our initial consultation.",
    },
    {
        q: 'Do you offer ongoing support after the project is delivered?',
        a: 'Yes! Every project includes a post-launch support window. Enterprise clients receive extended support, and we also offer monthly maintenance plans for updates, hosting management, and performance monitoring.',
    },
    {
        q: 'What makes your AI Agents different from basic chatbots?',
        a: 'Our AI Agents are custom-trained on your business data, not generic templates. They understand your products, services, and processes — enabling them to handle bookings, answer complex queries, qualify leads, and integrate with your CRM or WhatsApp, all 24/7.',
    },
    {
        q: 'Can I see a demo or example of your work before committing?',
        a: 'Absolutely. During our free consultation call, we walk you through relevant case studies and live demos tailored to your industry. We want you to feel confident before making any commitment.',
    },
    {
        q: 'Do you build mobile apps for both iOS and Android?',
        a: 'Yes. We offer cross-platform development (iOS + Android from a single codebase) as well as fully native apps depending on your needs and budget. Our Growth and Enterprise mobile plans cover both platforms.',
    },
    {
        q: 'What industries do you specialize in?',
        a: 'We serve restaurants, salons & spas, gyms, real estate, healthcare, retail, education, and home services — though our solutions are adaptable to virtually any industry that needs a digital presence or automation.',
    },
    {
        q: 'Are there any hidden fees beyond the listed prices?',
        a: 'No. Our pricing is transparent — what you see is what you pay. Domain registration, premium third-party integrations, or ongoing hosting are separate but always communicated upfront. No surprises.',
    },
    {
        q: 'How do I get started?',
        a: "Just click \"Book a Call\" or fill out our contact form. We'll schedule a free 30-minute consultation to understand your goals, recommend the best package, and outline next steps. It's that simple.",
    },
];

const PlusIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="12" y1="5" x2="12" y2="19" />
        <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
);

const FAQ = () => {
    const [openIndex, setOpenIndex] = useState(null);

    const toggle = useCallback((i) => {
        setOpenIndex((prev) => (prev === i ? null : i));
    }, []);

    /* JSON-LD structured data for SEO */
    useEffect(() => {
        const schema = {
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: FAQ_DATA.map((item) => ({
                '@type': 'Question',
                name: item.q,
                acceptedAnswer: {
                    '@type': 'Answer',
                    text: item.a,
                },
            })),
        };

        const script = document.createElement('script');
        script.type = 'application/ld+json';
        script.textContent = JSON.stringify(schema);
        script.id = 'faq-schema';
        document.head.appendChild(script);

        return () => {
            const existing = document.getElementById('faq-schema');
            if (existing) existing.remove();
        };
    }, []);

    return (
        <section id="faq" className="faq-section">
            <div className="faq-glow" aria-hidden="true" />

            {/* Header */}
            <div className="faq-header">
                <h2 className="faq-title">
                    Frequently Asked{' '}
                    <span className="faq-title-accent">Questions</span>
                </h2>
                <p className="faq-subtitle">
                    Everything you need to know before we start building together.
                </p>
            </div>

            {/* Accordion */}
            <div className="faq-list" role="list">
                {FAQ_DATA.map((item, i) => {
                    const isOpen = openIndex === i;
                    const panelId = `faq-answer-${i}`;
                    const triggerId = `faq-trigger-${i}`;

                    return (
                        <div
                            key={i}
                            className={`faq-item ${isOpen ? 'faq-item--open' : ''}`}
                            role="listitem"
                        >
                            <button
                                id={triggerId}
                                className="faq-question"
                                onClick={() => toggle(i)}
                                aria-expanded={isOpen}
                                aria-controls={panelId}
                            >
                                <span className="faq-question-text">{item.q}</span>
                                <span className="faq-icon" aria-hidden="true">
                                    <PlusIcon />
                                </span>
                            </button>

                            <div
                                id={panelId}
                                className="faq-answer-wrapper"
                                role="region"
                                aria-labelledby={triggerId}
                            >
                                <div className="faq-answer">
                                    <div className="faq-answer-inner">
                                        {item.a}
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* CTA */}
            <div className="faq-cta">
                <p className="faq-cta-text">Still have questions?</p>
                <button
                    className="faq-cta-btn"
                    onClick={() => {
                        const el = document.getElementById('contact');
                        if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }}
                >
                    Get in Touch
                    <span aria-hidden="true">→</span>
                </button>
            </div>
        </section>
    );
};

export default FAQ;

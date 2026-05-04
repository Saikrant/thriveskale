import { useEffect, useRef, useState, useCallback } from 'react';
import './Services.css';

const Services = ({ onServiceSelect }) => {
    const scrollRef = useRef(null);
    const sectionRef = useRef(null);
    const cardsRef = useRef([]);
    const [activeIndex, setActiveIndex] = useState(0);
    const [selectedService, setSelectedService] = useState(null);

    const services = [
        {
            id: 1,
            title: "Website Setup",
            description: "Your digital storefront matters. We build high-performance, stunning websites that capture your brand's essence and convert visitors into loyal customers.",
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
                    <line x1="8" y1="21" x2="16" y2="21"></line>
                    <line x1="12" y1="17" x2="12" y2="21"></line>
                </svg>
            ),
            features: ["Custom UI/UX Design", "SEO Optimized Structure", "Fast Loading Speed", "Mobile Responsive"],
            details: "Our website setup service goes beyond just templates. We architect a digital experience that aligns with your business goals. From wireframing to deployment, every step is optimized for speed, accessibility, and conversion.",
        },
        {
            id: 2,
            title: "Digital Marketing",
            description: "Stop guessing, start growing. Our data-driven marketing strategies ensure your brand reaches the right audience at the right time for maximum ROI.",
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M2 20h20"></path>
                    <path d="M5 16l6-7 5 5 5-9"></path>
                    <line x1="12" y1="13" x2="12" y2="3"></line>
                    <line x1="12" y1="3" x2="16" y2="7"></line>
                    <line x1="12" y1="3" x2="8" y2="7"></line>
                </svg>
            ),
            features: ["Social Media Management", "Google & Meta Ads", "Content Strategy", "Analytics & Reporting"],
            details: "We don't just run ads; we build funnels. Our comprehensive digital marketing strategy includes audience segmentation, A/B testing, and real-time analytics to ensure every dollar spent brings a return.",
        },
        {
            id: 3,
            title: "Mobile Applications",
            description: "Engage your customers wherever they are. We develop intuitive, feature-rich mobile apps that provide seamless experiences on both iOS and Android.",
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect>
                    <line x1="12" y1="18" x2="12.01" y2="18"></line>
                </svg>
            ),
            features: ["iOS & Android Development", "Cross-Platform Solutions", "User-Centric Design", "Secure & Scalable"],
            details: "From concept to app store, we handle it all. Our mobile apps are built with the latest frameworks to ensure native performance, offline capabilities, and a buttery-smooth user interface.",
        },
        {
            id: 4,
            title: "AI & Automation",
            description: "Future-proof your business. Leverage the power of AI to automate repetitive tasks, enhance customer support, and streamline your operations.",
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="11" width="18" height="10" rx="2"></rect>
                    <circle cx="12" cy="5" r="2"></circle>
                    <path d="M12 7v4"></path>
                    <line x1="8" y1="16" x2="8" y2="16"></line>
                    <line x1="16" y1="16" x2="16" y2="16"></line>
                </svg>
            ),
            features: ["AI Chatbots", "Workflow Automation", "CRM Integration", "Smart Data Insights"],
            details: "Unlock efficiency you didn't know existed. We deploy intelligent agents that can handle customer queries 24/7, automate data entry, and provide predictive insights to guide your decision-making.",
        },
    ];

    // Track scroll position for active dot
    const handleScroll = useCallback(() => {
        const container = scrollRef.current;
        if (!container) return;
        const cardWidth = 380 + 24; // card width + gap
        const scrollLeft = container.scrollLeft;
        const index = Math.round(scrollLeft / cardWidth);
        setActiveIndex(Math.min(index, services.length - 1));
    }, [services.length]);

    // Scroll to a specific card
    const scrollToCard = useCallback((index) => {
        const container = scrollRef.current;
        if (!container) return;
        const cardWidth = 380 + 24;
        container.scrollTo({ left: index * cardWidth, behavior: 'smooth' });
    }, []);

    // Keyboard navigation
    const handleKeyDown = useCallback((e) => {
        if (e.key === 'ArrowRight') {
            scrollToCard(Math.min(activeIndex + 1, services.length - 1));
        } else if (e.key === 'ArrowLeft') {
            scrollToCard(Math.max(activeIndex - 1, 0));
        }
    }, [activeIndex, services.length, scrollToCard]);

    // Scroll entrance animation
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        cardsRef.current.forEach((card, i) => {
                            if (card) {
                                setTimeout(() => {
                                    card.classList.add('svc-card--visible');
                                }, i * 200);
                            }
                        });
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.3 }
        );

        if (sectionRef.current) observer.observe(sectionRef.current);
        return () => observer.disconnect();
    }, []);

    // Modal handlers
    const openModal = (service) => {
        setSelectedService(service);
        document.body.style.overflow = 'hidden';
        if (window.__lenis) window.__lenis.stop();
    };

    const closeModal = () => {
        setSelectedService(null);
        document.body.style.overflow = 'auto';
        if (window.__lenis) window.__lenis.start();
    };

    return (
        <section id="services" className="services-section" ref={sectionRef}>
            <div className="services-bg-glow"></div>

            {/* Header */}
            <div className="svc-header">
                <h2 className="svc-title">Our Expertise</h2>
                <p className="svc-subtitle">
                    Comprehensive solutions designed to scale your business.
                    Click on a card to explore.
                </p>
            </div>

            {/* Horizontal Scroll Container */}
            <div
                className="svc-scroll-wrap"
                ref={scrollRef}
                onScroll={handleScroll}
                onKeyDown={handleKeyDown}
                tabIndex={0}
                role="region"
                aria-label="Service cards carousel"
            >
                <div className="svc-scroll-track">
                    {services.map((service, index) => (
                        <div
                            key={service.id}
                            className="svc-card"
                            ref={(el) => (cardsRef.current[index] = el)}
                            onClick={() => openModal(service)}
                            tabIndex={0}
                            role="button"
                            aria-label={`Explore ${service.title}`}
                        >
                            <div className="svc-card-inner">
                                <div className="svc-icon-wrap">
                                    {service.icon}
                                </div>

                                <h3 className="svc-card-title">{service.title}</h3>

                                <p className="svc-card-desc">{service.description}</p>

                                <ul className="svc-features">
                                    {service.features.map((feature, idx) => (
                                        <li key={idx} className="svc-feature-item" style={{ transitionDelay: `${idx * 100}ms` }}>
                                            <span className="svc-check">✓</span>
                                            {feature}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className="svc-card-shine"></div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Navigation Dots */}
            <div className="svc-dots" role="tablist" aria-label="Carousel navigation">
                {services.map((_, index) => (
                    <button
                        key={index}
                        className={`svc-dot ${activeIndex === index ? 'svc-dot--active' : ''}`}
                        onClick={() => scrollToCard(index)}
                        role="tab"
                        aria-selected={activeIndex === index}
                        aria-label={`Go to card ${index + 1}`}
                    />
                ))}
            </div>

            {/* Service Detail Modal */}
            {selectedService && (
                <div className="svc-modal-overlay" onClick={closeModal}>
                    <div className="svc-modal" onClick={(e) => e.stopPropagation()}>
                        <button className="svc-modal-close" onClick={closeModal}>&times;</button>

                        <div className="svc-modal-body">
                            <div className="svc-modal-header">
                                <div className="svc-modal-icon">{selectedService.icon}</div>
                                <h2>{selectedService.title}</h2>
                            </div>

                            <p className="svc-modal-desc">{selectedService.details}</p>

                            <div className="svc-modal-benefits">
                                <h4>Key Benefits</h4>
                                <ul className="svc-modal-features">
                                    {selectedService.features.map((feature, idx) => (
                                        <li key={idx}>
                                            <span className="svc-check">✓</span> {feature}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <button
                                className="cta-btn primary svc-modal-cta"
                                onClick={() => {
                                    if (onServiceSelect) onServiceSelect(selectedService.title);
                                    closeModal();
                                    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                                }}
                            >
                                Get Started with {selectedService.title}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
};

export default Services;

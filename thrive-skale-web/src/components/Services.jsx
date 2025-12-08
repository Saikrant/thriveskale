import React from 'react';
import './Services.css';

const Services = ({ onServiceSelect }) => {
    const [selectedService, setSelectedService] = React.useState(null);

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
            visualClass: "visual-website",
            details: "Our website setup service goes beyond just templates. We architect a digital experience that aligns with your business goals. From wireframing to deployment, every step is optimized for speed, accessibility, and conversion."
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
            visualClass: "visual-marketing",
            details: "We don't just run ads; we build funnels. Our comprehensive digital marketing strategy includes audience segmentation, A/B testing, and real-time analytics to ensure every dollar spent brings a return."
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
            visualClass: "visual-mobile",
            details: "From concept to app store, we handle it all. Our mobile apps are built with the latest frameworks to ensure native performance, offline capabilities, and a buttery-smooth user interface."
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
            visualClass: "visual-ai",
            details: "Unlock efficiency you didn't know existed. We deploy intelligent agents that can handle customer queries 24/7, automate data entry, and provide predictive insights to guide your decision-making."
        }
    ];

    const openModal = (service) => {
        setSelectedService(service);
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
    };

    const closeModal = () => {
        setSelectedService(null);
        document.body.style.overflow = 'auto';
    };

    return (
        <section id="services" className="section-padding services">
            <div className="services-bg-glow"></div>
            <div className="container">
                <div className="section-header text-center">
                    <h2 className="section-title">Our <span className="gradient-text">Expertise</span></h2>
                    <p className="section-subtitle">Comprehensive solutions designed to scale your business. Click on a card to explore.</p>
                </div>

                <div className="services-grid">
                    {services.map((service) => (
                        <div key={service.id} className="service-card glass-panel" onClick={() => openModal(service)}>
                            <div className="card-content">
                                <div className="service-icon-wrapper">
                                    {service.icon}
                                </div>
                                <h3>{service.title}</h3>
                                <p className="service-description">{service.description}</p>

                                <ul className="service-features">
                                    {service.features.map((feature, idx) => (
                                        <li key={idx}>
                                            <span className="check-icon">✓</span> {feature}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="hover-reveal">
                                <span>Click me to learn more</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Service Detail Modal */}
            {selectedService && (
                <div className="service-modal-overlay" onClick={closeModal}>
                    <div className="service-modal glass-panel" onClick={(e) => e.stopPropagation()}>
                        <button className="close-modal-btn" onClick={closeModal}>&times;</button>

                        <div className="modal-info">
                            <div className="modal-header">
                                <div className="modal-icon">{selectedService.icon}</div>
                                <h2>{selectedService.title}</h2>
                            </div>

                            <p className="modal-description">{selectedService.details}</p>

                            <div className="modal-benefits">
                                <h4>Key Benefits</h4>
                                <ul className="modal-features">
                                    {selectedService.features.map((feature, idx) => (
                                        <li key={idx}>
                                            <span className="check-icon">✓</span> {feature}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <button className="cta-btn primary modal-cta" onClick={() => {
                                if (onServiceSelect) {
                                    onServiceSelect(selectedService.title);
                                }
                                closeModal();
                                document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
                            }}>
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

import { useState, useEffect, useRef, useCallback } from 'react';
import './Industries.css';

const Industries = () => {
    const [selectedIndustry, setSelectedIndustry] = useState(null);
    const [isPanelOpen, setIsPanelOpen] = useState(false);
    const gridRef = useRef(null);
    const cardsRef = useRef([]);
    const panelRef = useRef(null);
    const touchStartY = useRef(0);
    const touchDeltaY = useRef(0);

    const industries = [
        {
            name: "Salons & Spas",
            icon: "💇‍♀️",
            category: "Beauty & Wellness",
            clients: "50+ clients",
            tag: "Premium",
            image: "/images/industries/salons.png",
            description: "Transform your salon into a digital powerhouse. Streamline bookings, enhance customer loyalty, and grow your beauty business.",
            services: [
                { icon: "🌐", name: "Premium Website", desc: "Showcase services & online booking" },
                { icon: "📱", name: "Mobile App", desc: "Appointment scheduling & loyalty rewards" },
                { icon: "📊", name: "CRM & Marketing", desc: "Automated reminders & promotions" },
                { icon: "🤖", name: "AI Chatbot", desc: "24/7 booking assistance" }
            ],
            successMetrics: [
                { label: "Booking Increase", value: "45%" },
                { label: "Customer Retention", value: "65%" },
                { label: "No-Show Reduction", value: "30%" }
            ]
        },
        {
            name: "Restaurants",
            icon: "🍽️",
            category: "Food & Beverage",
            clients: "35+ clients",
            tag: "Popular",
            image: "/images/industries/restaurants.png",
            description: "Boost your restaurant's revenue with digital ordering, table management, and customer engagement tools.",
            services: [
                { icon: "🌐", name: "Restaurant Website", desc: "Menu display & online ordering system" },
                { icon: "📱", name: "Ordering App", desc: "Mobile ordering & delivery integration" },
                { icon: "📊", name: "Table Management", desc: "Reservations & waitlist automation" },
                { icon: "🤖", name: "AI Customer Support", desc: "Order tracking & customer queries" }
            ],
            successMetrics: [
                { label: "Online Orders", value: "2.5x" },
                { label: "Revenue Growth", value: "35%" },
                { label: "Customer Satisfaction", value: "90%" }
            ]
        },
        {
            name: "Gyms & Fitness",
            icon: "💪",
            category: "Health & Wellness",
            clients: "40+ clients",
            tag: "Trending",
            image: "/images/industries/gyms.png",
            description: "Empower your fitness business with membership management, class scheduling, and member engagement solutions.",
            services: [
                { icon: "🌐", name: "Fitness Website", desc: "Class schedules & membership signup" },
                { icon: "📱", name: "Member App", desc: "Class booking & progress tracking" },
                { icon: "📊", name: "Member Portal", desc: "Billing & attendance management" },
                { icon: "🤖", name: "AI Trainer Bot", desc: "Workout tips & nutrition guidance" }
            ],
            successMetrics: [
                { label: "Member Retention", value: "60%" },
                { label: "Class Attendance", value: "+40%" },
                { label: "Revenue per Member", value: "+25%" }
            ]
        },
        {
            name: "Real Estate",
            icon: "🏠",
            category: "Property & Housing",
            clients: "25+ clients",
            tag: "Premium",
            image: "/images/industries/real_estate.png",
            description: "Showcase properties beautifully, manage leads effectively, and close deals faster with our real estate solutions.",
            services: [
                { icon: "🌐", name: "Property Portal", desc: "Listings & virtual tours" },
                { icon: "📱", name: "Agent App", desc: "Lead management & scheduling" },
                { icon: "📊", name: "CRM System", desc: "Client tracking & automation" },
                { icon: "🤖", name: "AI Assistant", desc: "Property queries & lead qualification" }
            ],
            successMetrics: [
                { label: "Lead Generation", value: "+55%" },
                { label: "Conversion Rate", value: "38%" },
                { label: "Deal Closure Time", value: "-20%" }
            ]
        },
        {
            name: "Healthcare",
            icon: "⚕️",
            category: "Medical Services",
            clients: "30+ clients",
            tag: "Essential",
            image: "/images/industries/healthcare.png",
            description: "Modernize patient care with appointment scheduling, telemedicine capabilities, and HIPAA-compliant solutions.",
            services: [
                { icon: "🌐", name: "Medical Website", desc: "Patient portal & appointment booking" },
                { icon: "📱", name: "Patient App", desc: "Health records & telemedicine" },
                { icon: "📊", name: "Practice Management", desc: "Scheduling & billing automation" },
                { icon: "🤖", name: "AI Health Assistant", desc: "Symptom checker & FAQ support" }
            ],
            successMetrics: [
                { label: "Patient Satisfaction", value: "92%" },
                { label: "Appointment Efficiency", value: "+50%" },
                { label: "Administrative Time", value: "-35%" }
            ]
        },
        {
            name: "Retail",
            icon: "🛍️",
            category: "E-commerce & Stores",
            clients: "45+ clients",
            tag: "Popular",
            image: "/images/industries/retail.png",
            description: "Scale your retail business with e-commerce platforms, inventory management, and omnichannel customer experiences.",
            services: [
                { icon: "🌐", name: "E-commerce Store", desc: "Online shopping & payment processing" },
                { icon: "📱", name: "Shopping App", desc: "Mobile commerce & loyalty program" },
                { icon: "📊", name: "Inventory System", desc: "Stock management & analytics" },
                { icon: "🤖", name: "AI Shopping Assistant", desc: "Product recommendations & support" }
            ],
            successMetrics: [
                { label: "Online Sales", value: "3x" },
                { label: "Customer Lifetime Value", value: "+45%" },
                { label: "Cart Abandonment", value: "-28%" }
            ]
        },
        {
            name: "Education",
            icon: "🎓",
            category: "Learning & Training",
            clients: "20+ clients",
            tag: "Emerging",
            image: "/images/industries/education.png",
            description: "Enhance learning experiences with online courses, student portals, and interactive educational platforms.",
            services: [
                { icon: "🌐", name: "Learning Portal", desc: "Course catalog & enrollment" },
                { icon: "📱", name: "Student App", desc: "Assignments & progress tracking" },
                { icon: "📊", name: "Admin Dashboard", desc: "Student management & analytics" },
                { icon: "🤖", name: "AI Tutor Bot", desc: "Q&A support & study assistance" }
            ],
            successMetrics: [
                { label: "Student Engagement", value: "+70%" },
                { label: "Course Completion", value: "85%" },
                { label: "Enrollment Growth", value: "+42%" }
            ]
        },
        {
            name: "Home Services",
            icon: "🔧",
            category: "Repairs & Maintenance",
            clients: "38+ clients",
            tag: "Growing",
            image: "/images/industries/home_services.png",
            description: "Grow your service business with booking systems, technician dispatch, and customer feedback management.",
            services: [
                { icon: "🌐", name: "Service Website", desc: "Service listings & instant quotes" },
                { icon: "📱", name: "Technician App", desc: "Job scheduling & route optimization" },
                { icon: "📊", name: "Dispatch System", desc: "Real-time job tracking & invoicing" },
                { icon: "🤖", name: "AI Booking Bot", desc: "Quote generation & scheduling" }
            ],
            successMetrics: [
                { label: "Booking Efficiency", value: "+55%" },
                { label: "Customer Satisfaction", value: "88%" },
                { label: "Revenue Growth", value: "+40%" }
            ]
        }
    ];

    const tagColors = {
        Premium: { bg: 'rgba(255, 215, 0, 0.2)', color: '#FFD700' },
        Popular: { bg: 'rgba(239, 68, 68, 0.2)', color: '#ef4444' },
        Trending: { bg: 'rgba(72, 213, 177, 0.2)', color: '#48d5b1' },
        Essential: { bg: 'rgba(96, 165, 250, 0.2)', color: '#60a5fa' },
        Emerging: { bg: 'rgba(168, 85, 247, 0.2)', color: '#a855f7' },
        Growing: { bg: 'rgba(34, 197, 94, 0.2)', color: '#22c55e' },
    };

    // Height pattern for masonry effect
    const heights = [400, 480, 520, 450, 400, 480, 520, 450];

    // Scroll entrance animation
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const index = cardsRef.current.indexOf(entry.target);
                        setTimeout(() => {
                            entry.target.classList.add('ind-card--visible');
                        }, index * 100);
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.25 }
        );

        cardsRef.current.forEach((card) => {
            if (card) observer.observe(card);
        });

        return () => observer.disconnect();
    }, []);

    const handleClosePanel = useCallback(() => {
        setIsPanelOpen(false);
        document.body.style.overflow = 'auto';
        document.body.classList.remove('modal-open');
        if (window.__lenis) window.__lenis.start();
        setTimeout(() => setSelectedIndustry(null), 500);
    }, []);

    // Escape key to close panel
    useEffect(() => {
        const onKey = (e) => {
            if (e.key === 'Escape' && isPanelOpen) handleClosePanel();
        };
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, [isPanelOpen, handleClosePanel]);

    const handleLearnMore = useCallback((industry) => {
        setSelectedIndustry(industry);
        setIsPanelOpen(true);
        document.body.style.overflow = 'hidden';
        document.body.classList.add('modal-open');
        if (window.__lenis) window.__lenis.stop();
    }, []);

    // Touch swipe-to-close handlers for mobile panel
    const handleTouchStart = useCallback((e) => {
        touchStartY.current = e.touches[0].clientY;
        touchDeltaY.current = 0;
    }, []);

    const handleTouchMove = useCallback((e) => {
        const delta = e.touches[0].clientY - touchStartY.current;
        touchDeltaY.current = delta;
        if (delta > 0 && panelRef.current) {
            panelRef.current.style.transform = `translateY(${delta}px)`;
            panelRef.current.style.transition = 'none';
        }
    }, []);

    const handleTouchEnd = useCallback(() => {
        if (touchDeltaY.current > 100) {
            handleClosePanel();
        }
        if (panelRef.current) {
            panelRef.current.style.transform = '';
            panelRef.current.style.transition = '';
        }
    }, [handleClosePanel]);

    return (
        <section id="industries" className="ind-section">
            {/* Header */}
            <div className="ind-header">
                <h2 className="ind-title">
                    Who We <span className="ind-gradient">Empower</span>
                </h2>
                <p className="ind-subtitle">
                    Tailored digital solutions for high-growth sectors.
                </p>
            </div>

            {/* Masonry Grid */}
            <div className="ind-grid" ref={gridRef}>
                {industries.map((ind, index) => {
                    const tagStyle = tagColors[ind.tag] || tagColors.Growing;
                    return (
                        <div
                            key={index}
                            className="ind-card"
                            ref={(el) => (cardsRef.current[index] = el)}
                            style={{ '--card-h': `${heights[index]}px` }}
                            onClick={() => handleLearnMore(ind)}
                            tabIndex={0}
                            role="button"
                            aria-label={`Learn more about ${ind.name}`}
                        >
                            {/* Background image */}
                            <img
                                src={ind.image}
                                alt={ind.name}
                                className="ind-card-img"
                                loading="lazy"
                                onLoad={(e) => e.target.classList.add('loaded')}
                            />

                            {/* Gradient overlay */}
                            <div className="ind-card-overlay"></div>

                            {/* Badge */}
                            <span
                                className="ind-badge"
                                style={{ background: tagStyle.bg, color: tagStyle.color }}
                            >
                                {ind.tag}
                            </span>

                            {/* Content */}
                            <div className="ind-card-content">
                                <span className="ind-card-icon">{ind.icon}</span>
                                <h3 className="ind-card-name">{ind.name}</h3>
                                <p className="ind-card-category">{ind.category}</p>

                                <div className="ind-card-stats">
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                                        <circle cx="9" cy="7" r="4"></circle>
                                        <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                                        <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                                    </svg>
                                    <span>{ind.clients}</span>
                                </div>

                                {/* Learn More (reveals on hover) */}
                                <button className="ind-learn-btn">
                                    Learn More
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                        <path d="M5 12h14M12 5l7 7-7 7" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Overlay */}
            {isPanelOpen && (
                <div className="ind-overlay" onClick={handleClosePanel}></div>
            )}

            {/* Slide-Out Panel */}
            <div
                className={`ind-panel ${isPanelOpen ? 'ind-panel--open' : ''}`}
                ref={panelRef}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
            >
                {selectedIndustry && (
                    <>
                        <div className="ind-panel-header">
                            <div className="ind-panel-header-left">
                                <span className="ind-panel-icon">{selectedIndustry.icon}</span>
                                <div>
                                    <h3 className="ind-panel-title">{selectedIndustry.name}</h3>
                                    <p className="ind-panel-cat">{selectedIndustry.category}</p>
                                </div>
                            </div>
                            <button className="ind-panel-close" onClick={handleClosePanel} aria-label="Close panel">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <line x1="18" y1="6" x2="6" y2="18"></line>
                                    <line x1="6" y1="6" x2="18" y2="18"></line>
                                </svg>
                            </button>
                        </div>

                        <div className="ind-panel-body">
                            <p className="ind-panel-desc">{selectedIndustry.description}</p>

                            <div className="ind-panel-section">
                                <h4 className="ind-panel-section-title">Our Services</h4>
                                <div className="ind-panel-services">
                                    {selectedIndustry.services.map((svc, idx) => (
                                        <div key={idx} className="ind-panel-svc-card">
                                            <span className="ind-panel-svc-icon">{svc.icon}</span>
                                            <div>
                                                <h5 className="ind-panel-svc-name">{svc.name}</h5>
                                                <p className="ind-panel-svc-desc">{svc.desc}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="ind-panel-section">
                                <h4 className="ind-panel-section-title">Success Metrics</h4>
                                <div className="ind-panel-metrics">
                                    {selectedIndustry.successMetrics.map((m, idx) => (
                                        <div key={idx} className="ind-metric-card">
                                            <div className="ind-metric-value">{m.value}</div>
                                            <div className="ind-metric-label">{m.label}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="ind-panel-cta">
                                <button
                                    className="ind-consult-btn"
                                    onClick={() => {
                                        handleClosePanel();
                                        document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                                    }}
                                >
                                    📞 Book Free Consultation
                                </button>
                                <p className="ind-cta-sub">
                                    Let's discuss how we can help grow your {selectedIndustry.category.toLowerCase()} business
                                </p>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </section>
    );
};

export default Industries;

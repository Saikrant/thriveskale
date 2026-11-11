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
            category: "Beauty & Wellness",
            image: "/images/industries/salons.webp",
            description: "Transform your salon into a digital powerhouse. Streamline bookings, enhance customer loyalty, and grow your beauty business.",
            services: [
                { name: "Premium Website", desc: "Showcase services & online booking" },
                { name: "Mobile App", desc: "Appointment scheduling & loyalty rewards" },
                { name: "CRM & Marketing", desc: "Automated reminders & promotions" },
                { name: "AI Chatbot", desc: "24/7 booking assistance" }
            ]
        },
        {
            name: "Restaurants",
            category: "Food & Beverage",
            image: "/images/industries/restaurants.webp",
            description: "Boost your restaurant's revenue with digital ordering, table management, and customer engagement tools.",
            services: [
                { name: "Restaurant Website", desc: "Menu display & online ordering system" },
                { name: "Ordering App", desc: "Mobile ordering & delivery integration" },
                { name: "Table Management", desc: "Reservations & waitlist automation" },
                { name: "AI Customer Support", desc: "Order tracking & customer queries" }
            ]
        },
        {
            name: "Gyms & Fitness",
            category: "Health & Wellness",
            image: "/images/industries/gyms.webp",
            description: "Empower your fitness business with membership management, class scheduling, and member engagement solutions.",
            services: [
                { name: "Fitness Website", desc: "Class schedules & membership signup" },
                { name: "Member App", desc: "Class booking & progress tracking" },
                { name: "Member Portal", desc: "Billing & attendance management" },
                { name: "AI Trainer Bot", desc: "Workout tips & nutrition guidance" }
            ]
        },
        {
            name: "Real Estate",
            category: "Property & Housing",
            image: "/images/industries/real_estate.webp",
            description: "Showcase properties beautifully, manage leads effectively, and close deals faster with our real estate solutions.",
            services: [
                { name: "Property Portal", desc: "Listings & virtual tours" },
                { name: "Agent App", desc: "Lead management & scheduling" },
                { name: "CRM System", desc: "Client tracking & automation" },
                { name: "AI Assistant", desc: "Property queries & lead qualification" }
            ]
        },
        {
            name: "Healthcare",
            category: "Medical Services",
            image: "/images/industries/healthcare.webp",
            description: "Modernize patient care with appointment scheduling, telemedicine capabilities, and HIPAA-compliant solutions.",
            services: [
                { name: "Medical Website", desc: "Patient portal & appointment booking" },
                { name: "Patient App", desc: "Health records & telemedicine" },
                { name: "Practice Management", desc: "Scheduling & billing automation" },
                { name: "AI Health Assistant", desc: "Symptom checker & FAQ support" }
            ]
        },
        {
            name: "Retail",
            category: "E-commerce & Stores",
            image: "/images/industries/retail.webp",
            description: "Scale your retail business with e-commerce platforms, inventory management, and omnichannel customer experiences.",
            services: [
                { name: "E-commerce Store", desc: "Online shopping & payment processing" },
                { name: "Shopping App", desc: "Mobile commerce & loyalty program" },
                { name: "Inventory System", desc: "Stock management & analytics" },
                { name: "AI Shopping Assistant", desc: "Product recommendations & support" }
            ]
        },
        {
            name: "Education",
            category: "Learning & Training",
            image: "/images/industries/education.webp",
            description: "Enhance learning experiences with online courses, student portals, and interactive educational platforms.",
            services: [
                { name: "Learning Portal", desc: "Course catalog & enrollment" },
                { name: "Student App", desc: "Assignments & progress tracking" },
                { name: "Admin Dashboard", desc: "Student management & analytics" },
                { name: "AI Tutor Bot", desc: "Q&A support & study assistance" }
            ]
        },
        {
            name: "Home Services",
            category: "Repairs & Maintenance",
            image: "/images/industries/home_services.webp",
            description: "Grow your service business with booking systems, technician dispatch, and customer feedback management.",
            services: [
                { name: "Service Website", desc: "Service listings & instant quotes" },
                { name: "Technician App", desc: "Job scheduling & route optimization" },
                { name: "Dispatch System", desc: "Real-time job tracking & invoicing" },
                { name: "AI Booking Bot", desc: "Quote generation & scheduling" }
            ]
        }
    ];

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
                    Industries we build for
                </h2>
                <p className="ind-subtitle">
                    Open a card to see what we build for each kind of business.
                </p>
            </div>

            {/* Masonry Grid */}
            <div className="ind-grid" ref={gridRef}>
                {industries.map((ind, index) => {
                    return (
                        <div
                            key={index}
                            className="ind-card"
                            ref={(el) => (cardsRef.current[index] = el)}
                            onClick={() => handleLearnMore(ind)}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter' || e.key === ' ') {
                                    e.preventDefault();
                                    handleLearnMore(ind);
                                }
                            }}
                            tabIndex={0}
                            role="button"
                            aria-label={`Learn more about ${ind.name}`}
                        >
                            {/* Background image */}
                            <img
                                src={ind.image}
                                alt=""
                                className="ind-card-img"
                                loading="lazy"
                                onLoad={(e) => e.target.classList.add('loaded')}
                            />

                            {/* Content */}
                            <div className="ind-card-content">
                                <h3 className="ind-card-name">{ind.name}</h3>
                                <p className="ind-card-category">{ind.category}</p>

                                <span className="ind-learn-btn" aria-hidden="true">See what we build</span>
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
                                <h4 className="ind-panel-section-title">What we build</h4>
                                <div className="ind-panel-services">
                                    {selectedIndustry.services.map((svc, idx) => (
                                        <div key={idx} className="ind-panel-svc-card">
                                            <div>
                                                <h5 className="ind-panel-svc-name">{svc.name}</h5>
                                                <p className="ind-panel-svc-desc">{svc.desc}</p>
                                            </div>
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
                                    Book a free call
                                </button>
                                <p className="ind-cta-sub">
                                    We will recommend a package for your business.
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

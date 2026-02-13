import { useEffect, useRef } from 'react';
import './ProblemSolution.css';

const ProblemSolution = () => {
    const sectionRef = useRef(null);
    const cardsRef = useRef([]);
    const lineRef = useRef(null);

    const problems = [
        {
            id: 1,
            problem: "Manual Follow-ups",
            consequence: "Loss of potential customers",
            solution: "Instant AI Response",
            benefit: "24/7 Engagement",
            span: 2,
        },
        {
            id: 2,
            problem: "No Website",
            consequence: "Invisible to 90% of market",
            solution: "Premium Digital Presence",
            benefit: "Global Reach",
            span: 1,
        },
        {
            id: 3,
            problem: "No Analytics",
            consequence: "Blind decision making",
            solution: "Data-Driven Decisions",
            benefit: "Measurable Growth",
            span: 1,
        },
        {
            id: 4,
            problem: "Walk-in Dependence",
            consequence: "Unpredictable revenue",
            solution: "Digital Marketing",
            benefit: "Consistent Leads",
            span: 2,
        },
    ];

    // Scroll-triggered card animations + SVG line draw
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        // Stagger card reveals
                        cardsRef.current.forEach((card, i) => {
                            if (card) {
                                setTimeout(() => {
                                    card.classList.add('bento-card--visible');
                                }, i * 150);
                            }
                        });
                        // Animate SVG connecting line
                        if (lineRef.current) {
                            lineRef.current.classList.add('line-draw--visible');
                        }
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.3, rootMargin: '-5% 0px' }
        );

        if (sectionRef.current) observer.observe(sectionRef.current);
        return () => observer.disconnect();
    }, []);

    return (
        <section id="reality-vision" className="problem-solution section-padding">
            <div className="container">
                <div className="ps-header">
                    <h2 className="ps-title">
                        Reality <span className="ps-vs">vs</span> Vision
                    </h2>
                    <p className="ps-subtitle">
                        Transforming business struggles into engineered growth.
                    </p>
                </div>

                <div className="bento-grid" ref={sectionRef}>
                    {/* Connecting SVG line */}
                    <svg className="bento-connect-line" viewBox="0 0 1200 900" ref={lineRef}>
                        <path
                            className="connect-path"
                            d="M300,200 C500,180 400,450 600,400 S900,350 950,650"
                            fill="none"
                            stroke="rgba(72, 213, 177, 0.3)"
                            strokeWidth="2"
                            strokeDasharray="1400"
                            strokeDashoffset="1400"
                        />
                    </svg>

                    {problems.map((item, index) => (
                        <div
                            key={item.id}
                            className={`bento-card bento-span-${item.span}`}
                            ref={(el) => (cardsRef.current[index] = el)}
                        >
                            {/* Struggle Section */}
                            <div className="card-section struggle-section">
                                <div className="section-icon struggle-icon">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                                        <circle cx="12" cy="12" r="11" stroke="#ef4444" strokeWidth="1.5" />
                                        <path d="M8 8l8 8M16 8l-8 8" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" />
                                    </svg>
                                </div>
                                <div className="section-content">
                                    <span className="section-label struggle-label">THE STRUGGLE</span>
                                    <h3 className="section-title">{item.problem}</h3>
                                    <p className="section-desc">{item.consequence}</p>
                                </div>
                            </div>

                            {/* Animated connector arrow */}
                            <div className="card-connector">
                                <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                                    <path d="M12 5v14M12 19l-4-4M12 19l4-4" stroke="#48d5b1" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </div>

                            {/* Solution Section */}
                            <div className="card-section solution-section">
                                <div className="section-icon solution-icon">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                                        <circle cx="12" cy="12" r="11" stroke="#48d5b1" strokeWidth="1.5" />
                                        <path d="M8 12l3 3 5-6" stroke="#48d5b1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </div>
                                <div className="section-content">
                                    <span className="section-label solution-label">THE SOLUTION</span>
                                    <h3 className="section-title">{item.solution}</h3>
                                    <p className="section-benefit">{item.benefit}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ProblemSolution;

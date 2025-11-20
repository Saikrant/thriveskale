import React from 'react';
import './ProblemSolution.css';

const ProblemSolution = () => {
    const problems = [
        {
            id: 1,
            problem: "Manual Follow-ups",
            consequence: "Loss of potential customers",
            solution: "Instant AI Response",
            benefit: "24/7 Engagement"
        },
        {
            id: 2,
            problem: "No Website",
            consequence: "Invisible to 90% of market",
            solution: "Premium Digital Presence",
            benefit: "Global Reach"
        },
        {
            id: 3,
            problem: "No Analytics",
            consequence: "Blind decision making",
            solution: "Data-Driven Decisions",
            benefit: "Measurable Growth"
        },
        {
            id: 4,
            problem: "Walk-in Dependence",
            consequence: "Unpredictable revenue",
            solution: "Digital Marketing",
            benefit: "Consistent Leads"
        }
    ];

    return (
        <section id="reality-vision" className="problem-solution section-padding">
            <div className="container">
                <h2 className="section-title text-center">
                    Reality <span className="gradient-text">vs.</span> Vision
                </h2>
                <p className="section-subtitle text-center">
                    Transforming business struggles into engineered growth.
                </p>

                <div className="cards-grid">
                    {problems.map((item) => (
                        <div key={item.id} className="comparison-card glass">
                            <div className="struggle-box">
                                <div className="icon-wrapper struggle">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M18 6L6 18M6 6l12 12" />
                                    </svg>
                                </div>
                                <div className="content">
                                    <h4>The Struggle</h4>
                                    <p>{item.problem}</p>
                                    <span className="consequence">{item.consequence}</span>
                                </div>
                            </div>

                            <div className="connector">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M7 17L17 7M17 7H7M17 7V17" />
                                </svg>
                            </div>

                            <div className="solution-box">
                                <div className="icon-wrapper solution">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M20 6L9 17l-5-5" />
                                    </svg>
                                </div>
                                <div className="content">
                                    <h4>The Solution</h4>
                                    <p>{item.solution}</p>
                                    <span className="benefit">{item.benefit}</span>
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

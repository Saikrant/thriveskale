import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import useReveal from '../utils/useReveal';
import './ExploreAgents.css';

const AGENTS = [
    {
        id: 1,
        name: "Travel Planner Agent",
        description: "An intelligent agent that plans your entire trip, from flights to itinerary, based on your preferences.",
        tech: ["LangChain", "OpenAI", "React"],
        category: "Lifestyle",
        link: "#"
    },
    {
        id: 2,
        name: "Code Review Assistant",
        description: "Automated PR reviews with deep context understanding and security auditing capabilities.",
        tech: ["Python", "GitHub API", "Llama 3"],
        category: "Development",
        link: "#"
    },
    {
        id: 3,
        name: "Research & Digest",
        description: "Scours the web for latest papers on specific topics and generates a daily briefing summary.",
        tech: ["SerpApi", "Gemini", "Node.js"],
        category: "Productivity",
        link: "#"
    },
    {
        id: 4,
        name: "Legal Doc Analyzer",
        description: "Upload contracts and get instant risk analysis and clause summarization.",
        tech: ["OCR", "RAG", "Claude 3.5"],
        category: "Legal",
        link: "#"
    },
    {
        id: 5,
        name: "Financial Forecaster",
        description: "Predictive modeling agent that connects to your accounting software to forecast cash flow.",
        tech: ["Pandas", "Scikit-Learn", "FastAPI"],
        category: "Finance",
        link: "#"
    },
    {
        id: 6,
        name: "Customer Support Swarm",
        description: "A team of specialized agents handling tickets, refunds, and technical queries simultaneously.",
        tech: ["Autogen", "Redis", "WebSocket"],
        category: "Enterprise",
        link: "#"
    }
];

const ExploreAgents = () => {
    useReveal();
    const containerRef = useRef(null);

    // Mouse move effect for background
    useEffect(() => {
        const handleMouseMove = (e) => {
            if (!containerRef.current) return;
            const { clientX, clientY } = e;
            const x = (clientX / window.innerWidth) * 100;
            const y = (clientY / window.innerHeight) * 100;
            containerRef.current.style.setProperty('--mouse-x', `${x}%`);
            containerRef.current.style.setProperty('--mouse-y', `${y}%`);
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    return (
        <div className="ea-page" ref={containerRef}>
            {/* Background Elements */}
            <div className="ea-bg-mesh" />
            <div className="ea-bg-glow" />

            <div className="ea-container">
                <header className="ea-header reveal rev-down">
                    <Link to="/" className="ea-back-link">← Back to Home</Link>
                    <h1 className="ea-title">
                        <span>Explore</span>
                        <span className="ea-title-accent">Intelligence</span>
                    </h1>
                    <p className="ea-subtitle">
                        Discover the next generation of autonomous agents ready to be deployed for your business.
                    </p>
                </header>

                <div className="ea-grid">
                    {AGENTS.map((agent, i) => (
                        <div key={agent.id} className={`ea-card reveal rev-up delay-${(i % 3) + 1}`}>
                            <div className="ea-card-inner">
                                <div className="ea-card-header">
                                    <span className="ea-category">{agent.category}</span>
                                    <div className="ea-icon-placeholder" />
                                </div>

                                <h3 className="ea-agent-name">{agent.name}</h3>
                                <p className="ea-agent-desc">{agent.description}</p>

                                <div className="ea-tech-stack">
                                    {agent.tech.map(t => (
                                        <span key={t} className="ea-tech-tag">{t}</span>
                                    ))}
                                </div>

                                <div className="ea-card-footer">
                                    <a href={agent.link} className="ea-action-btn">
                                        View Agent <span className="arrow">→</span>
                                    </a>
                                </div>
                            </div>
                            <div className="ea-card-border" />
                        </div>
                    ))}
                </div>

                <div className="ea-footer-cta reveal rev-up">
                    <h2>Need a Custom Agent?</h2>
                    <Link to="/contact" className="ea-contact-btn">data
                        Build Your Own
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default ExploreAgents;

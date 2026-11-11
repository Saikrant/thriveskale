import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './ExploreAgents.css';

const ExploreAgents = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const timer = setTimeout(() => {
            navigate('/');
        }, 2000);

        return () => clearTimeout(timer);
    }, [navigate]);

    return (
        <div className="ea-page">
            <div className="ea-container">
                <h1 className="ea-title">Coming soon</h1>
                <p className="ea-subtitle">This page is not ready yet. Taking you back to the home page.</p>
            </div>
        </div>
    );
};

export default ExploreAgents;

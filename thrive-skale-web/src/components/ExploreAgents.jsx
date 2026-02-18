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
        <div className="ea-page" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', minHeight: '100vh', flexDirection: 'column' }}>
            <div className="ea-bg-mesh" />
            <div className="ea-container">
                <h1 className="ea-title" style={{ marginBottom: '20px' }}>Coming Soon</h1>
                <p className="ea-subtitle">We are crafting something amazing. Redirecting you to home...</p>
            </div>
        </div>
    );
};

export default ExploreAgents;

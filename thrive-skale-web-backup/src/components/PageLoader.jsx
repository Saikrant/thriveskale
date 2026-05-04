import { useState, useEffect } from 'react';
import './PageLoader.css';

const PageLoader = ({ children }) => {
    const [loaded, setLoaded] = useState(false);
    const [contentVisible, setContentVisible] = useState(false);

    useEffect(() => {
        // Logo animation plays, then loader fades out
        const loaderTimer = setTimeout(() => {
            setLoaded(true);
        }, 1200);

        // Content reveals after loader starts fading
        const contentTimer = setTimeout(() => {
            setContentVisible(true);
        }, 1600);

        return () => {
            clearTimeout(loaderTimer);
            clearTimeout(contentTimer);
        };
    }, []);

    return (
        <>
            <div className={`page-loader ${loaded ? 'loaded' : ''}`}>
                <div className="page-loader-logo">
                    thrivv<span>Skale</span>
                </div>
            </div>
            <div className={`page-content ${contentVisible ? 'visible' : ''}`}>
                {children}
            </div>
        </>
    );
};

export default PageLoader;

import { useEffect, useRef } from 'react';
import './ScrollProgress.css';

const ScrollProgress = () => {
    const fillRef = useRef(null);
    const ticking = useRef(false);

    useEffect(() => {
        const updateProgress = () => {
            const scrollTop = window.scrollY || document.documentElement.scrollTop;
            const docHeight = document.documentElement.scrollHeight;
            const winHeight = window.innerHeight;
            const scrollPercent = (scrollTop / (docHeight - winHeight)) * 100;

            if (fillRef.current) {
                fillRef.current.style.width = `${Math.min(100, Math.max(0, scrollPercent))}%`;
            }
            ticking.current = false;
        };

        const onScroll = () => {
            if (!ticking.current) {
                requestAnimationFrame(updateProgress);
                ticking.current = true;
            }
        };

        window.addEventListener('scroll', onScroll, { passive: true });
        updateProgress();

        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    return (
        <div className="scroll-progress-bar">
            <div ref={fillRef} className="scroll-progress-fill" />
        </div>
    );
};

export default ScrollProgress;

import { useEffect } from 'react';
import Lenis from 'lenis';

const SmoothScroll = () => {
    useEffect(() => {
        // Use native smooth scroll on touch devices
        const isTouch = 'ontouchstart' in window || window.matchMedia('(max-width: 768px)').matches;

        if (isTouch) {
            document.documentElement.style.scrollBehavior = 'smooth';
            return () => {
                document.documentElement.style.scrollBehavior = '';
            };
        }

        const lenis = new Lenis({
            duration: 1.2,
            easing: (t) => {
                // cubic-bezier(0.25, 0.46, 0.45, 0.94) approximation
                return 1 - Math.pow(1 - t, 3) * (1 - t * 0.5);
            },
            direction: 'vertical',
            gestureDirection: 'vertical',
            smooth: true,
            lerp: 0.1,
            mouseMultiplier: 1,
            smoothTouch: false,
            touchMultiplier: 2,
            wheelMultiplier: 1,
        });

        // Expose globally for modal stop/resume
        window.__lenis = lenis;

        function raf(time) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }

        requestAnimationFrame(raf);

        return () => {
            lenis.destroy();
            window.__lenis = null;
        };
    }, []);

    return null;
};

export default SmoothScroll;

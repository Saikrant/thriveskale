import { useEffect } from 'react';

const ParallaxManager = () => {
    useEffect(() => {
        // Only on desktop
        if (window.matchMedia('(max-width: 1024px)').matches) return;

        const elements = document.querySelectorAll('.parallax-bg, .hero-bg, .blob');
        if (elements.length === 0) return;

        let ticking = false;

        const updateParallax = () => {
            const scrollY = window.scrollY;
            elements.forEach((el) => {
                const speed = parseFloat(el.dataset.parallaxSpeed) || 0.5;
                const offset = scrollY * speed;
                el.style.transform = `translate3d(0, ${offset}px, 0)`;
            });
            ticking = false;
        };

        const onScroll = () => {
            if (!ticking) {
                requestAnimationFrame(updateParallax);
                ticking = true;
            }
        };

        // Set will-change for optimization
        elements.forEach((el) => {
            el.style.willChange = 'transform';
        });

        window.addEventListener('scroll', onScroll, { passive: true });
        updateParallax();

        return () => {
            window.removeEventListener('scroll', onScroll);
            elements.forEach((el) => {
                el.style.willChange = '';
                el.style.transform = '';
            });
        };
    }, []);

    return null;
};

export default ParallaxManager;

import { useEffect } from 'react';

const ScrollAnimations = () => {
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting && entry.intersectionRatio >= 0.3) {
                        entry.target.classList.add('animate-in--visible');
                        // Remove will-change after animation completes
                        setTimeout(() => {
                            entry.target.style.willChange = 'auto';
                        }, 1000);
                        observer.unobserve(entry.target);
                    }
                });
            },
            {
                threshold: [0, 0.3, 0.6, 1],
                rootMargin: '-10% 0px',
            }
        );

        // Observe all .animate-in elements
        const elements = document.querySelectorAll('.animate-in');
        elements.forEach((el) => {
            el.style.willChange = 'transform, opacity';
            observer.observe(el);
        });

        return () => {
            elements.forEach((el) => observer.unobserve(el));
        };
    }, []);

    return null;
};

export default ScrollAnimations;

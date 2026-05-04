import { useEffect } from 'react';

const useReveal = (options = {}) => {
    useEffect(() => {
        const { threshold = 0.1, rootMargin = '0px' } = options;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                    // Once it reveals, we can stop observing it
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold, rootMargin });

        const revealElements = document.querySelectorAll('.reveal, .reveal-text');
        revealElements.forEach((el) => observer.observe(el));

        return () => {
            revealElements.forEach((el) => observer.unobserve(el));
        };
    }, [options]);
};

export default useReveal;

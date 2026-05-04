import { useEffect } from 'react';

const TextReveal = () => {
    useEffect(() => {
        const elements = document.querySelectorAll('.text-reveal');
        if (elements.length === 0) return;

        // Split text into character spans
        elements.forEach((el) => {
            if (el.dataset.split === 'true') return; // Already split
            const text = el.textContent;
            el.textContent = '';
            el.dataset.split = 'true';

            text.split('').forEach((char, i) => {
                const span = document.createElement('span');
                span.textContent = char === ' ' ? '\u00A0' : char;
                span.style.transitionDelay = `${i * 30}ms`;
                span.className = 'text-reveal-char';
                el.appendChild(span);
            });
        });

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('text-reveal--visible');
                        observer.unobserve(entry.target);
                    }
                });
            },
            {
                threshold: 0.3,
                rootMargin: '-5% 0px',
            }
        );

        elements.forEach((el) => observer.observe(el));

        return () => {
            elements.forEach((el) => observer.unobserve(el));
        };
    }, []);

    return null;
};

export default TextReveal;

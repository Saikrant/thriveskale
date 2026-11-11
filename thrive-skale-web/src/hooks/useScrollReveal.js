import { useEffect } from 'react';

/*
 * Scroll-in reveal, built to cost almost nothing:
 * - one IntersectionObserver for the whole page, no scroll listeners
 * - each element is revealed once, then unobserved
 * - only opacity and transform change (CSS), so no layout or paint storms
 * - content is hidden only when <html> has .js-reveal, which main.jsx adds
 *   when IntersectionObserver exists and the user has not asked for reduced motion
 * State lives in a data attribute React does not manage, so re-renders
 * (for example a className change) never hide an element again.
 */
export default function useScrollReveal(deps = []) {
    useEffect(() => {
        if (!document.documentElement.classList.contains('js-reveal')) return undefined;
        const targets = document.querySelectorAll('[data-reveal]:not([data-revealed])');
        if (!targets.length) return undefined;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) return;
                entry.target.setAttribute('data-revealed', '');
                observer.unobserve(entry.target);
            });
        }, { rootMargin: '0px 0px -8% 0px', threshold: 0 });

        targets.forEach((el) => observer.observe(el));
        return () => observer.disconnect();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, deps);
}

import { useEffect, useState, useCallback, useRef } from 'react';
import './ScrollNavigator.css';

const ScrollNavigator = () => {
    const [direction, setDirection] = useState('down'); // 'down' | 'up'
    const [visible, setVisible] = useState(true);
    const lastScrollY = useRef(0);
    const hideTimeout = useRef(null);

    const update = useCallback(() => {
        const scrollY = window.scrollY || window.pageYOffset;
        const docHeight = document.documentElement.scrollHeight;
        const winHeight = window.innerHeight;
        const scrollPercent = scrollY / (docHeight - winHeight);
        const isScrollingDown = scrollY > lastScrollY.current;

        lastScrollY.current = scrollY;

        // Near the top (<5%) → always show "scroll down"
        if (scrollPercent < 0.05) {
            setDirection('down');
            setVisible(true);
            clearTimeout(hideTimeout.current);
            return;
        }

        // Near the bottom (>90%) → always show "back to top"
        if (scrollPercent > 0.90) {
            setDirection('up');
            setVisible(true);
            clearTimeout(hideTimeout.current);
            return;
        }

        // In the middle → show briefly on scroll, then fade out
        setDirection(isScrollingDown ? 'down' : 'up');
        setVisible(true);

        // Auto-hide after 1.5s of no scroll
        clearTimeout(hideTimeout.current);
        hideTimeout.current = setTimeout(() => {
            setVisible(false);
        }, 1500);
    }, []);

    useEffect(() => {
        let ticking = false;
        const onScroll = () => {
            if (!ticking) {
                ticking = true;
                requestAnimationFrame(() => {
                    update();
                    ticking = false;
                });
            }
        };

        window.addEventListener('scroll', onScroll, { passive: true });
        update(); // initial check

        return () => {
            window.removeEventListener('scroll', onScroll);
            clearTimeout(hideTimeout.current);
        };
    }, [update]);

    const handleClick = () => {
        if (direction === 'up') {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
            window.scrollBy({ top: window.innerHeight * 0.85, behavior: 'smooth' });
        }
    };

    return (
        <div
            className={`scroll-nav scroll-nav--${direction} ${visible ? 'scroll-nav--visible' : 'scroll-nav--hidden'
                }`}
            onClick={handleClick}
            role="button"
            tabIndex={0}
            aria-label={direction === 'down' ? 'Scroll down' : 'Back to top'}
            onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleClick();
                }
            }}
        >
            <span className="scroll-nav-arrow" aria-hidden="true">
                {direction === 'down' ? '↓' : '↑'}
            </span>
            <span className="scroll-nav-label">
                {direction === 'down' ? 'Scroll' : 'Back to top'}
            </span>
        </div>
    );
};

export default ScrollNavigator;

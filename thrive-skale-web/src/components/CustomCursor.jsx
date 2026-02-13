import { useEffect, useRef, useState, useCallback } from 'react';
import './CustomCursor.css';

const CustomCursor = () => {
    const outerRef = useRef(null);
    const innerRef = useRef(null);
    const rippleContainerRef = useRef(null);
    const mousePos = useRef({ x: -100, y: -100 });
    const outerPos = useRef({ x: -100, y: -100 });
    const innerPos = useRef({ x: -100, y: -100 });
    const [cursorState, setCursorState] = useState('default');
    const [cursorLabel, setCursorLabel] = useState('');
    const [isTouch, setIsTouch] = useState(false);
    const rafRef = useRef(null);

    const lerp = (start, end, factor) => start + (end - start) * factor;

    const handleMouseMove = useCallback((e) => {
        mousePos.current = { x: e.clientX, y: e.clientY };
    }, []);

    const handleMouseDown = useCallback(() => {
        setCursorState('clicking');
        // Create ripple
        if (rippleContainerRef.current) {
            const ripple = document.createElement('div');
            ripple.className = 'cursor-ripple';
            ripple.style.left = `${mousePos.current.x}px`;
            ripple.style.top = `${mousePos.current.y}px`;
            rippleContainerRef.current.appendChild(ripple);
            setTimeout(() => ripple.remove(), 600);
        }
        setTimeout(() => setCursorState((prev) => (prev === 'clicking' ? 'default' : prev)), 300);
    }, []);

    const handleMouseUp = useCallback(() => {
        setCursorState('default');
    }, []);

    useEffect(() => {
        // Detect touch device
        const checkTouch = () => {
            setIsTouch(window.matchMedia('(max-width: 768px)').matches || 'ontouchstart' in window);
        };
        checkTouch();
        window.addEventListener('resize', checkTouch);

        return () => window.removeEventListener('resize', checkTouch);
    }, []);

    useEffect(() => {
        if (isTouch) return;

        const handleMouseOver = (e) => {
            const target = e.target.closest('a, button, .cta-btn, .cta-link, [role="button"], input[type="submit"]');
            const textTarget = e.target.closest('p, span, h1, h2, h3, h4, h5, h6, li, td, th, label, blockquote');

            if (target) {
                setCursorState('hovering-clickable');
                const label = target.dataset.cursorLabel || 'view';
                setCursorLabel(label);
            } else if (textTarget && !target) {
                setCursorState('hovering-text');
                setCursorLabel('');
            } else {
                setCursorState('default');
                setCursorLabel('');
            }
        };

        document.addEventListener('mousemove', handleMouseMove, { passive: true });
        document.addEventListener('mouseover', handleMouseOver, { passive: true });
        document.addEventListener('mousedown', handleMouseDown);
        document.addEventListener('mouseup', handleMouseUp);

        // Animation loop
        const animate = () => {
            // Outer ring: lerp 0.15 (slower, trailing)
            outerPos.current.x = lerp(outerPos.current.x, mousePos.current.x, 0.15);
            outerPos.current.y = lerp(outerPos.current.y, mousePos.current.y, 0.15);
            // Inner dot: lerp 1 (instant)
            innerPos.current.x = lerp(innerPos.current.x, mousePos.current.x, 1);
            innerPos.current.y = lerp(innerPos.current.y, mousePos.current.y, 1);

            if (outerRef.current) {
                outerRef.current.style.transform = `translate3d(${outerPos.current.x}px, ${outerPos.current.y}px, 0) translate(-50%, -50%)${cursorState === 'clicking' ? ' scale(0.8)' : ''}`;
            }
            if (innerRef.current) {
                innerRef.current.style.transform = `translate3d(${innerPos.current.x}px, ${innerPos.current.y}px, 0) translate(-50%, -50%)`;
            }

            rafRef.current = requestAnimationFrame(animate);
        };

        rafRef.current = requestAnimationFrame(animate);

        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseover', handleMouseOver);
            document.removeEventListener('mousedown', handleMouseDown);
            document.removeEventListener('mouseup', handleMouseUp);
            if (rafRef.current) cancelAnimationFrame(rafRef.current);
        };
    }, [isTouch, handleMouseMove, handleMouseDown, handleMouseUp, cursorState]);

    if (isTouch) return null;

    return (
        <div className="custom-cursor">
            <div ref={outerRef} className={`cursor-outer ${cursorState}`}>
                {cursorLabel && <span className="cursor-label">{cursorLabel}</span>}
            </div>
            <div ref={innerRef} className={`cursor-inner ${cursorState}`} />
            <div ref={rippleContainerRef} />
        </div>
    );
};

export default CustomCursor;

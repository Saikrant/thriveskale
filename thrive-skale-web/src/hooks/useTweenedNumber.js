import { useEffect, useRef, useState } from 'react';

const prefersReducedMotion = () =>
    typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

/* Rolls a displayed number to its new value with one requestAnimationFrame loop.
   Under reduced motion it returns the target straight away. The caller keeps the
   exact value for screen readers. */
export default function useTweenedNumber(target, duration = 260) {
    const [value, setValue] = useState(target);
    const currentRef = useRef(target);
    const reduce = prefersReducedMotion();

    useEffect(() => {
        if (reduce) return undefined;
        const from = currentRef.current;
        if (from === target) return undefined;
        const start = performance.now();
        let frame = 0;
        const step = (now) => {
            const t = Math.min(1, (now - start) / duration);
            const next = from + (target - from) * (1 - (1 - t) ** 3);
            currentRef.current = next;
            setValue(next);
            if (t < 1) frame = requestAnimationFrame(step);
        };
        frame = requestAnimationFrame(step);
        return () => cancelAnimationFrame(frame);
    }, [target, duration, reduce]);

    return reduce ? target : Math.round(value);
}

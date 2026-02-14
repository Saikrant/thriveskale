import { useEffect, useRef, useCallback, useState } from 'react';
import { useCountry } from '../context/CountryContext';
import './LaunchHero.css';

const LaunchHero = () => {
    const { config } = useCountry();
    const canvasRef = useRef(null);
    const animFrameRef = useRef(null);
    const [isVisible, setIsVisible] = useState(false);

    /* ---- Intersection Observer — only animate when in viewport ---- */
    const sectionRef = useRef(null);

    useEffect(() => {
        const el = sectionRef.current;
        if (!el) return;

        const observer = new IntersectionObserver(
            ([entry]) => setIsVisible(entry.isIntersecting),
            { threshold: 0.1 }
        );
        observer.observe(el);
        return () => observer.disconnect();
    }, []);

    /* ---- Particle system — only runs when section is visible ---- */
    const particlesRef = useRef(null);
    const dimensionsRef = useRef({ w: 0, h: 0 });

    const initParticles = useCallback(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d', { alpha: true });
        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        let w = canvas.offsetWidth;
        let h = canvas.offsetHeight;

        canvas.width = w * dpr;
        canvas.height = h * dpr;
        ctx.scale(dpr, dpr);
        dimensionsRef.current = { w, h };

        // Lower particle count for performance
        let count = 60;
        if (w < 768) count = 25;
        else if (w < 1024) count = 40;

        const prefersReducedMotion = window.matchMedia(
            '(prefers-reduced-motion: reduce)'
        ).matches;

        if (prefersReducedMotion) {
            count = 15; // minimal for reduced motion
        }

        const colors = ['rgba(72,213,177,', 'rgba(255,255,255,', 'rgba(110,198,255,'];

        particlesRef.current = Array.from({ length: count }, () => ({
            x: Math.random() * w,
            y: Math.random() * h,
            size: 1 + Math.random() * 2,
            speedY: -(0.1 + Math.random() * 0.2),
            speedX: (Math.random() - 0.5) * 0.1,
            opacity: 0.2 + Math.random() * 0.3,
            colorBase: colors[Math.floor(Math.random() * colors.length)],
        }));

        const handleResize = () => {
            w = canvas.offsetWidth;
            h = canvas.offsetHeight;
            canvas.width = w * dpr;
            canvas.height = h * dpr;
            ctx.setTransform(1, 0, 0, 1, 0, 0);
            ctx.scale(dpr, dpr);
            dimensionsRef.current = { w, h };
        };
        window.addEventListener('resize', handleResize, { passive: true });

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    useEffect(() => {
        const cleanup = initParticles();
        return cleanup;
    }, [initParticles]);

    /* ---- Animation loop — pauses when not visible ---- */
    useEffect(() => {
        if (!isVisible || !canvasRef.current || !particlesRef.current) {
            if (animFrameRef.current) {
                cancelAnimationFrame(animFrameRef.current);
                animFrameRef.current = null;
            }
            return;
        }

        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d', { alpha: true });
        const particles = particlesRef.current;

        const draw = () => {
            const { w, h } = dimensionsRef.current;
            ctx.clearRect(0, 0, w, h);

            for (const p of particles) {
                ctx.fillStyle = p.colorBase + p.opacity + ')';
                ctx.fillRect(p.x - p.size * 0.5, p.y - p.size * 0.5, p.size, p.size);

                p.y += p.speedY;
                p.x += p.speedX;

                if (p.y < -5) {
                    p.y = h + 5;
                    p.x = Math.random() * w;
                }
                if (p.x < -5) p.x = w + 5;
                if (p.x > w + 5) p.x = -5;
            }

            animFrameRef.current = requestAnimationFrame(draw);
        };

        animFrameRef.current = requestAnimationFrame(draw);

        return () => {
            if (animFrameRef.current) {
                cancelAnimationFrame(animFrameRef.current);
                animFrameRef.current = null;
            }
        };
    }, [isVisible]);

    return (
        <section
            ref={sectionRef}
            className={`launch-hero${isVisible ? ' launch-hero--visible' : ''}`}
            role="region"
            aria-label="AI Agents service launch announcement"
        >
            {/* Particle canvas */}
            <canvas
                ref={canvasRef}
                className="launch-hero-canvas"
                aria-hidden="true"
            />

            {/* Simple glow orbs — CSS only, no heavy blur */}
            <div className="glow-orb glow-orb-1" aria-hidden="true" />
            <div className="glow-orb glow-orb-2" aria-hidden="true" />


            {/* Badge */}
            <div className="new-badge" aria-label="New service launched">
                ✦ NEW SERVICE LAUNCHED
            </div>

            {/* Main content */}
            <div className="launch-content">
                <h2 className="main-headline">
                    <span className="headline-word">CUSTOM</span>
                    <span className="headline-word">AI</span>
                    <span className="headline-word">AGENTS</span>
                </h2>

                <p className="sub-headline">
                    Built for Your Business. Trained on Your Data. Working 24/7.
                </p>

                {/* Offer banner */}
                <div className="offer-banner">
                    <div className="offer-label">{config.offers?.aiAgentLabel || 'LAUNCH OFFER'}</div>
                    <div className="discount-amount">{config.offers?.aiAgentDiscount || '10% OFF'}</div>
                    <div className="offer-detail">{config.offers?.aiAgentDetail || 'on Custom AI Agent Development'}</div>
                    <div className="offer-disclaimer">
                        Limited time offer • First 20 clients only
                    </div>
                </div>

                {/* CTA buttons */}
                <div className="cta-buttons">
                    <button
                        className="btn-launch-primary"
                        onClick={() => {
                            const el = document.getElementById('services');
                            if (el) el.scrollIntoView({ behavior: 'smooth' });
                        }}
                    >
                        EXPLORE AI AGENTS <span aria-hidden="true">→</span>
                    </button>
                    <button
                        className="btn-launch-secondary"
                        onClick={() => {
                            const el = document.getElementById('contact');
                            if (el) el.scrollIntoView({ behavior: 'smooth' });
                        }}
                    >
                        <span aria-hidden="true">▶</span> GET IN TOUCH
                    </button>
                </div>
            </div>
        </section>
    );
};

export default LaunchHero;

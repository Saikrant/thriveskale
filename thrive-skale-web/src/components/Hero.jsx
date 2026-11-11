import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useCountry } from '../context/CountryContext';
import useReveal from '../utils/useReveal';
import './Hero.css';

/* ── Asset paths ──
   Place your video + poster in /public/assets/ (or wherever your static files live).
   Adjust these paths to match your project structure.
   
   The video is 720p, muted, ~1.2 MB. It is only loaded on desktop-class
   screens; phones, reduced-motion and data-saver users get the poster image.
*/
const HERO_VIDEO = '/assets/hero-bg.mp4';
const HERO_POSTER = '/assets/hero-poster.jpg';

const canPlayHeroVideo = () => {
    if (typeof window === 'undefined') return false;
    if (window.innerWidth < 768) return false;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return false;
    if (navigator.connection?.saveData) return false;
    return true;
};

const Hero = () => {
    useReveal();
    const { config } = useCountry();
    const videoRef = useRef(null);
    const [showVideo] = useState(canPlayHeroVideo);

    /* Gentle mouse-follow for glow (desktop only, passive) */
    const glowRef = useRef(null);

    useEffect(() => {
        if (window.innerWidth < 768) return;

        let rafId = null;
        const target = { x: 0, y: 0 };
        const current = { x: 0, y: 0 };

        const onMove = (e) => {
            target.x = (e.clientX / window.innerWidth) * 100;
            target.y = (e.clientY / window.innerHeight) * 100;
        };

        // Loop runs only while the glow is still catching up to the mouse
        const tick = () => {
            current.x += (target.x - current.x) * 0.04;
            current.y += (target.y - current.y) * 0.04;
            if (glowRef.current) {
                glowRef.current.style.left = `${current.x}%`;
                glowRef.current.style.top = `${current.y}%`;
            }
            const settled = Math.abs(target.x - current.x) < 0.05 && Math.abs(target.y - current.y) < 0.05;
            rafId = settled ? null : requestAnimationFrame(tick);
        };

        const onMoveStart = (e) => {
            onMove(e);
            if (rafId == null) rafId = requestAnimationFrame(tick);
        };

        document.addEventListener('mousemove', onMoveStart, { passive: true });

        return () => {
            document.removeEventListener('mousemove', onMoveStart);
            if (rafId != null) cancelAnimationFrame(rafId);
        };
    }, []);

    /* Pause video when hero is out of viewport (performance) */
    useEffect(() => {
        const video = videoRef.current;
        if (!showVideo || !video) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    video.play().catch(() => { });
                } else {
                    video.pause();
                }
            },
            { threshold: 0.1 }
        );

        observer.observe(video);
        return () => observer.disconnect();
    }, [showVideo]);

    return (
        <section id="hero" className="hero">
            {/* Video background */}
            <div
                className="hero-video-wrap"
                aria-hidden="true"
                style={{ backgroundImage: `url(${HERO_POSTER})` }}
            >
                {showVideo && (
                    <video
                        ref={videoRef}
                        className="hero-video"
                        autoPlay
                        muted
                        loop
                        playsInline
                        poster={HERO_POSTER}
                        preload="metadata"
                    >
                        <source src={HERO_VIDEO} type="video/mp4" />
                    </video>
                )}
                <div className="hero-video-overlay" />
            </div>

            {/* Grid pattern overlay */}
            <div className="hero-grid" aria-hidden="true" />

            {/* Glow effects */}
            <div className="hero-bg" aria-hidden="true">
                <div className="hero-glow hero-glow--1" />
                <div className="hero-glow hero-glow--2" />
                <div className="hero-glow hero-glow--3" ref={glowRef} />
            </div>

            {/* Content */}
            <div className="hero-content">
                {/* Compact offer strip */}
                <Link to="/explore-agents" className="hero-offer-strip">
                    <span className="hero-offer-badge">New</span>
                    <span className="hero-offer-text">
                        Custom AI Agents — <strong>{config.offers?.aiAgentsDiscount || '10%'} OFF</strong> for early adopters
                    </span>
                    <span className="hero-offer-arrow" aria-hidden="true">→</span>
                </Link>

                {/* Headline */}
                <h1 className="hero-headline">
                    <span className="hero-headline-word hero-headline-word--top">Growth</span>
                    <span className="hero-headline-word hero-headline-word--bottom">Engineered.</span>
                </h1>

                {/* Description */}
                <div className="hero-description">
                    <p className="hero-desc-main">
                        We engineer your business success &amp; digital transformation through strategy, technology, and design.
                    </p>
                    <p className="hero-desc-accent">
                        Websites · Mobile Apps · AI Agents · Digital Marketing
                    </p>
                </div>

                {/* Social proof stats */}
                <div className="hero-stats">
                    {/* <div className="hero-stat">
                        <div className="hero-stat-value">250+</div>
                        <div className="hero-stat-label">Clients</div>
                    </div> */}
                    <div className="hero-stat">
                        <div className="hero-stat-value">8+</div>
                        <div className="hero-stat-label">Industries</div>
                    </div>
                    <div className="hero-stat">
                        <div className="hero-stat-value">98%</div>
                        <div className="hero-stat-label">Satisfaction</div>
                    </div>
                </div>

                {/* CTAs */}
                <div className="hero-ctas">
                    <button
                        className="hero-cta-primary"
                        onClick={() => {
                            const el = document.getElementById('contact');
                            if (el) el.scrollIntoView({ behavior: 'smooth' });
                        }}
                    >
                        Start Your Project
                        <span aria-hidden="true">→</span>
                    </button>
                    <button
                        className="hero-cta-secondary"
                        onClick={() => {
                            const el = document.getElementById('services');
                            if (el) el.scrollIntoView({ behavior: 'smooth' });
                        }}
                    >
                        Explore Services
                    </button>
                </div>
            </div>

            {/* Scroll hint */}
            <div className="hero-scroll-hint" aria-hidden="true">
                <div className="hero-scroll-line" />
                <span className="hero-scroll-text">Scroll</span>
            </div>
        </section>
    );
};

export default Hero;

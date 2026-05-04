import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useCountry } from '../context/CountryContext';
import useReveal from '../utils/useReveal';
import './Hero.css';

/* ── Asset paths ──
   Place your video + poster in /public/assets/ (or wherever your static files live).
   Adjust these paths to match your project structure.
   
   Recommended: also generate a WebM version for smaller file size:
   ffmpeg -i hero-bg.mp4 -c:v libvpx-vp9 -b:v 1M -an hero-bg.webm
*/
const HERO_VIDEO = '/assets/hero-bg.mp4';
const HERO_VIDEO_WEBM = '/assets/hero-bg.webm';  // optional, smaller file
const HERO_POSTER = '/assets/hero-poster.jpg';

const Hero = () => {
    useReveal();
    const { config } = useCountry();
    const videoRef = useRef(null);

    /* Gentle mouse-follow for glow (desktop only, passive) */
    const glowRef = useRef(null);

    useEffect(() => {
        if (window.innerWidth < 768) return;

        let rafId;
        const target = { x: 0, y: 0 };
        const current = { x: 0, y: 0 };

        const onMove = (e) => {
            target.x = (e.clientX / window.innerWidth) * 100;
            target.y = (e.clientY / window.innerHeight) * 100;
        };

        const tick = () => {
            current.x += (target.x - current.x) * 0.04;
            current.y += (target.y - current.y) * 0.04;
            if (glowRef.current) {
                glowRef.current.style.left = `${current.x}%`;
                glowRef.current.style.top = `${current.y}%`;
            }
            rafId = requestAnimationFrame(tick);
        };

        document.addEventListener('mousemove', onMove, { passive: true });
        rafId = requestAnimationFrame(tick);

        return () => {
            document.removeEventListener('mousemove', onMove);
            cancelAnimationFrame(rafId);
        };
    }, []);

    /* Pause video when hero is out of viewport (performance) */
    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

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
    }, []);

    return (
        <section id="hero" className="hero">
            {/* Video background */}
            <div
                className="hero-video-wrap"
                aria-hidden="true"
                style={{ backgroundImage: `url(${HERO_POSTER})` }}
            >
                <video
                    ref={videoRef}
                    className="hero-video"
                    autoPlay
                    muted
                    loop
                    playsInline
                    poster={HERO_POSTER}
                    preload="auto"
                >
                    {/* WebM first (smaller), MP4 fallback */}
                    <source src={HERO_VIDEO_WEBM} type="video/webm" />
                    <source src={HERO_VIDEO} type="video/mp4" />
                </video>
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

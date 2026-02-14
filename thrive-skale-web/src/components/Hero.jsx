import { useEffect, useRef, useState, useCallback } from 'react';
import useReveal from '../utils/useReveal';
import './Hero.css';

const Hero = () => {
    useReveal();
    const heroRef = useRef(null);
    const headlineRef = useRef(null);
    const blobRef = useRef(null);
    const [scrollProgress, setScrollProgress] = useState(0);
    const mousePos = useRef({ x: 0, y: 0 });
    const blobPos = useRef({ x: 0, y: 0 });
    const rafRef = useRef(null);

    // Mouse parallax for SVG blob
    const handleMouseMove = useCallback((e) => {
        if (window.innerWidth < 768) return;
        const rect = heroRef.current?.getBoundingClientRect();
        if (!rect) return;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const relX = e.clientX - rect.left;
        const relY = e.clientY - rect.top;
        mousePos.current = {
            x: (relX - centerX) * -0.3,
            y: (relY - centerY) * -0.3,
        };
    }, []);

    // Animate blob position with lerp
    useEffect(() => {
        const lerp = (a, b, t) => a + (b - a) * t;
        const animate = () => {
            blobPos.current.x = lerp(blobPos.current.x, mousePos.current.x, 0.08);
            blobPos.current.y = lerp(blobPos.current.y, mousePos.current.y, 0.08);
            if (blobRef.current) {
                blobRef.current.style.transform = `translate3d(${blobPos.current.x}px, ${blobPos.current.y}px, 0)`;
            }
            rafRef.current = requestAnimationFrame(animate);
        };
        rafRef.current = requestAnimationFrame(animate);
        return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
    }, []);

    // Scroll-triggered word float-away
    useEffect(() => {
        const handleScroll = () => {
            const scrollY = window.scrollY;
            const progress = Math.min(1, Math.max(0, scrollY / 300));
            setScrollProgress(progress);
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Word directions for float-away effect
    const words = ['GROWTH', 'ENGINEERED.'];
    const wordDirections = [
        { x: -120, y: -80, rotate: -15 },
        { x: 150, y: 60, rotate: 12 },
    ];

    // Description lines for staggered fade-in
    const descLines = [
        'We engineer your business success',
        '& digital transformation.',
        'Strategy, technology and analysis.',
    ];

    return (
        <section id="hero" className="hero" ref={heroRef} onMouseMove={handleMouseMove}>
            <div className="hero-grid"></div>
            <div className="hero-bg">
                <div className="blob blob-1"></div>
                <div className="blob blob-2"></div>
            </div>

            {/* Morphing SVG Blob */}
            <div className="hero-blob-container" ref={blobRef}>
                <svg className="hero-morph-blob" viewBox="0 0 500 500" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                        <linearGradient id="blobGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#48d5b1" stopOpacity="0.4" />
                            <stop offset="50%" stopColor="#27C7B8" stopOpacity="0.2" />
                            <stop offset="100%" stopColor="#142850" stopOpacity="0.3" />
                        </linearGradient>
                        <linearGradient id="blobGrad2" x1="100%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" stopColor="#36b896" stopOpacity="0.3" />
                            <stop offset="100%" stopColor="#0a1628" stopOpacity="0.1" />
                        </linearGradient>
                    </defs>
                    <path className="blob-path-1" fill="url(#blobGrad)">
                        <animate
                            attributeName="d"
                            dur="8s"
                            repeatCount="indefinite"
                            values="
                                M440,320Q410,390,340,420Q270,450,200,420Q130,390,90,320Q50,250,90,180Q130,110,200,80Q270,50,340,80Q410,110,440,180Q470,250,440,320Z;
                                M420,340Q380,430,290,440Q200,450,140,390Q80,330,80,250Q80,170,140,110Q200,50,290,60Q380,70,420,160Q460,250,420,340Z;
                                M450,310Q430,370,370,410Q310,450,240,430Q170,410,110,360Q50,310,70,240Q90,170,140,110Q190,50,270,60Q350,70,400,130Q450,190,450,250Q450,250,450,310Z;
                                M440,320Q410,390,340,420Q270,450,200,420Q130,390,90,320Q50,250,90,180Q130,110,200,80Q270,50,340,80Q410,110,440,180Q470,250,440,320Z
                            "
                        />
                    </path>
                    <path className="blob-path-2" fill="url(#blobGrad2)" opacity="0.6">
                        <animate
                            attributeName="d"
                            dur="10s"
                            repeatCount="indefinite"
                            values="
                                M420,300Q390,370,320,400Q250,430,190,390Q130,350,100,280Q70,210,110,150Q150,90,220,70Q290,50,350,90Q410,130,430,200Q450,270,420,300Z;
                                M430,320Q400,400,310,420Q220,440,160,380Q100,320,90,250Q80,180,130,120Q180,60,260,50Q340,40,400,100Q460,160,450,230Q440,300,430,320Z;
                                M410,310Q370,380,300,410Q230,440,170,390Q110,340,90,270Q70,200,110,140Q150,80,230,60Q310,40,370,90Q430,140,440,210Q450,280,410,310Z;
                                M420,300Q390,370,320,400Q250,430,190,390Q130,350,100,280Q70,210,110,150Q150,90,220,70Q290,50,350,90Q410,130,430,200Q450,270,420,300Z
                            "
                        />
                    </path>
                    {/* Network dots */}
                    {[
                        { cx: 250, cy: 200, r: 3 },
                        { cx: 310, cy: 260, r: 2 },
                        { cx: 190, cy: 280, r: 2.5 },
                        { cx: 270, cy: 340, r: 2 },
                        { cx: 220, cy: 180, r: 1.5 },
                        { cx: 340, cy: 220, r: 2 },
                        { cx: 160, cy: 230, r: 1.5 },
                        { cx: 300, cy: 310, r: 2 },
                    ].map((dot, i) => (
                        <circle key={i} cx={dot.cx} cy={dot.cy} r={dot.r} fill="#48d5b1" opacity="0.5">
                            <animate
                                attributeName="opacity"
                                values="0.3;0.8;0.3"
                                dur={`${2 + i * 0.5}s`}
                                repeatCount="indefinite"
                            />
                        </circle>
                    ))}
                    {/* Network lines */}
                    {[
                        { x1: 250, y1: 200, x2: 310, y2: 260 },
                        { x1: 310, y1: 260, x2: 270, y2: 340 },
                        { x1: 190, y1: 280, x2: 250, y2: 200 },
                        { x1: 220, y1: 180, x2: 340, y2: 220 },
                        { x1: 160, y1: 230, x2: 190, y2: 280 },
                        { x1: 300, y1: 310, x2: 340, y2: 220 },
                    ].map((line, i) => (
                        <line
                            key={i}
                            x1={line.x1} y1={line.y1}
                            x2={line.x2} y2={line.y2}
                            stroke="#48d5b1"
                            strokeWidth="0.5"
                            opacity="0.2"
                        >
                            <animate
                                attributeName="opacity"
                                values="0.1;0.4;0.1"
                                dur={`${3 + i * 0.4}s`}
                                repeatCount="indefinite"
                            />
                        </line>
                    ))}
                </svg>
            </div>

            <div className="container hero-container">
                <div className="hero-left">
                    {descLines.map((line, i) => (
                        <p
                            key={i}
                            className="hero-desc-line"
                            style={{ animationDelay: `${0.8 + i * 0.2}s` }}
                        >
                            {line}
                        </p>
                    ))}
                </div>

                <div className="hero-right" ref={headlineRef}>
                    <h1 className="hero-headline">
                        {words.map((word, i) => {
                            const dir = wordDirections[i];
                            const translateX = dir.x * scrollProgress;
                            const translateY = dir.y * scrollProgress;
                            const rotate = dir.rotate * scrollProgress;
                            const opacity = 1 - scrollProgress;
                            const scale = 1 - scrollProgress * 0.15;

                            return (
                                <span
                                    key={i}
                                    className={`hero-word ${i === 0 ? 'hero-word-bold' : 'hero-word-light'}`}
                                    style={{
                                        transform: `translate3d(${translateX}px, ${translateY}px, 0) rotate(${rotate}deg) scale(${scale})`,
                                        opacity,
                                        transition: 'transform 0.1s ease-out, opacity 0.1s ease-out',
                                    }}
                                >
                                    {word}
                                </span>
                            );
                        })}
                    </h1>
                </div>
            </div>
        </section>
    );
};

export default Hero;

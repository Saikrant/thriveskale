import { useEffect, useRef } from 'react';
import './LeadStack.css';

/*
 * An exploded view of the lead engine: four flat layers stacked like a phone.
 * Scrolling the page normally spreads them apart (about 480px of scroll). On wide
 * screens the stack sticks beside the form so you can watch it; this is plain CSS sticky.
 * Only a CSS variable (--p) changes; layers move with transform, so no layout work.
 * No pinning and no scroll hijack. With reduced motion the layers stay spread.
 * All text is sample content.
 */
const START = 0.35;     // how far apart the layers are before any scrolling
const RANGE_PX = 480;   // scroll distance that completes the spread

const LeadStack = () => {
    const ref = useRef(null);

    useEffect(() => {
        const el = ref.current;
        if (!el) return undefined;

        const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (reduce) {
            el.style.setProperty('--p', '1');
            return undefined;
        }

        const wide = window.matchMedia('(min-width: 901px)');
        let frame = 0;
        const update = () => {
            frame = 0;
            // Wide screens: the stack stays in view beside the form, so spread from the top.
            // Phones: the stack sits below the form, so start when it nears the screen.
            const startY = wide.matches
                ? 0
                : Math.max(0, el.getBoundingClientRect().top + window.scrollY - 0.7 * window.innerHeight);
            const t = Math.min(Math.max((window.scrollY - startY) / RANGE_PX, 0), 1);
            el.style.setProperty('--p', String(START + (1 - START) * t));
        };
        const onScroll = () => {
            if (!frame) frame = requestAnimationFrame(update);
        };

        update();
        window.addEventListener('scroll', onScroll, { passive: true });
        window.addEventListener('resize', onScroll);
        return () => {
            window.removeEventListener('scroll', onScroll);
            window.removeEventListener('resize', onScroll);
            if (frame) cancelAnimationFrame(frame);
        };
    }, []);

    return (
        <figure className="lead-stack" ref={ref} aria-label="How a lead moves through the system">
            <div className="lead-stack-scene" aria-hidden="true">
                <div className="lead-stack-3d">
                    <div className="ls-layer ls-wa" style={{ '--i': 0 }}>
                        <p className="ls-tag">4 WhatsApp reply</p>
                        <p className="ls-bubble ls-bubble--in">Hi, I saw your ad. What is the price?</p>
                        <p className="ls-bubble ls-bubble--out">Hello! Sending our price list now.</p>
                    </div>

                    <div className="ls-layer" style={{ '--i': 1 }}>
                        <p className="ls-tag">3 CRM</p>
                        <ul className="ls-rows">
                            <li><span>New lead</span><em>Instagram ad</em></li>
                            <li><span>New lead</span><em>Google ad</em></li>
                            <li><span>New lead</span><em>Website form</em></li>
                        </ul>
                    </div>

                    <div className="ls-layer" style={{ '--i': 2 }}>
                        <p className="ls-tag">2 Website</p>
                        <div className="ls-bar" />
                        <div className="ls-line ls-line--wide" />
                        <div className="ls-line" />
                        <div className="ls-form">
                            <span /><span />
                            <b>Get a quote</b>
                        </div>
                    </div>

                    <div className="ls-layer" style={{ '--i': 3 }}>
                        <p className="ls-tag">1 Ads</p>
                        <div className="ls-ad-image" />
                        <div className="ls-line ls-line--wide" />
                        <b className="ls-ad-cta">Message us on WhatsApp</b>
                    </div>
                </div>
            </div>

            <figcaption className="ls-caption">
                A sample enquiry: an ad, your website, your CRM, then an instant WhatsApp reply.
            </figcaption>
        </figure>
    );
};

export default LeadStack;

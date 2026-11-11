import { useEffect, useRef, useState } from 'react';
import './ChatDemo.css';

/*
 * Sample WhatsApp conversations for four kinds of local business.
 * All text is invented sample content. Nothing here claims a result.
 * Only opacity and transform animate. The loop pauses when the chat is off screen,
 * stops for good once a visitor picks a tab, and is off with reduced motion.
 */
export const SCENES = [
    {
        id: 'clinic',
        tab: 'Clinic',
        business: 'Smile Dental Clinic',
        initials: 'SD',
        inMsg: 'Hi, I saw your ad. Is there a slot tomorrow evening?',
        outMsg: 'Yes! We have 6:00 PM and 7:30 PM. Which suits you?',
        actions: ['6:00 PM', '7:30 PM'],
        lead: 'Appointment enquiry',
        source: 'Instagram ad',
    },
    {
        id: 'property',
        tab: 'Real estate',
        business: 'Green Nest Homes',
        initials: 'GN',
        inMsg: '2BHK in Kondapur under 80 lakhs?',
        outMsg: 'Yes, we have 3 options. Sending photos and prices now.',
        actions: ['See photos', 'Book a visit'],
        lead: 'Site visit enquiry',
        source: 'Google ad',
    },
    {
        id: 'salon',
        tab: 'Salon',
        business: 'Rose Bridal Studio',
        initials: 'RB',
        inMsg: 'నమస్తే! Bridal makeup ధర ఎంత?',
        outMsg: 'Namaste! Which date is your wedding? We will share our packages.',
        actions: ['Share packages', 'Book a trial'],
        lead: 'Bridal enquiry',
        source: 'Instagram ad',
    },
    {
        id: 'coaching',
        tab: 'Coaching',
        business: 'Bright Path Academy',
        initials: 'BP',
        inMsg: 'What are the batch timings and fees?',
        outMsg: 'Batches run morning and evening. Sending the fee details now.',
        actions: ['Fee details', 'Free demo class'],
        lead: 'Admission enquiry',
        source: 'Google ad',
    },
];

const SCENE_MS = 7500;

const reducedMotion = () =>
    typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const ChatDemo = () => {
    const [index, setIndex] = useState(0);
    const [auto, setAuto] = useState(() => !reducedMotion());
    const [visible, setVisible] = useState(true);
    const rootRef = useRef(null);
    const scene = SCENES[index];

    useEffect(() => {
        const el = rootRef.current;
        if (!el || typeof IntersectionObserver === 'undefined') return undefined;
        const io = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { threshold: 0.25 });
        io.observe(el);
        return () => io.disconnect();
    }, []);

    useEffect(() => {
        if (!auto || !visible) return undefined;
        const id = setTimeout(() => setIndex((i) => (i + 1) % SCENES.length), SCENE_MS);
        return () => clearTimeout(id);
    }, [auto, visible, index]);

    const pick = (i) => {
        setAuto(false);
        setIndex(i);
    };

    return (
        <div className="stage" ref={rootRef}>
            <div className="stage-tabs" role="tablist" aria-label="Sample businesses">
                {SCENES.map((s, i) => (
                    <button
                        key={s.id}
                        type="button"
                        role="tab"
                        aria-selected={i === index}
                        className="stage-tab"
                        onClick={() => pick(i)}
                    >
                        {s.tab}
                    </button>
                ))}
            </div>

            <div className="stage-body">
                <figure className="chat" aria-label="Sample WhatsApp conversation" key={scene.id}>
                    <div className="chat-top">
                        <span className="chat-avatar" aria-hidden="true">{scene.initials}</span>
                        <div>
                            <p className="chat-name">{scene.business}</p>
                            <p className="chat-status">Sample conversation</p>
                        </div>
                    </div>

                    <ol className="chat-body">
                        <li className="chat-msg chat-msg--in" style={{ '--d': '0.3s' }}>
                            {scene.inMsg}
                            <time>10:02</time>
                        </li>
                        <li className="chat-slot">
                            <span className="chat-typing" aria-hidden="true"><i /><i /><i /></span>
                            <p className="chat-msg chat-msg--out" style={{ '--d': '2.2s' }}>
                                {scene.outMsg}
                                <span className="chat-actions" aria-hidden="true">
                                    {scene.actions.map((a) => <span key={a}>{a}</span>)}
                                </span>
                                <time>10:02</time>
                            </p>
                        </li>
                    </ol>

                    <figcaption className="visually-hidden">
                        A customer messages {scene.business} after seeing an ad and gets an instant reply.
                        The enquiry is saved as a new lead.
                    </figcaption>
                </figure>

                <aside className="lead-card" style={{ '--d': '3.6s' }} key={`lead-${scene.id}`} aria-label="New lead">
                    <p className="lead-card-title">New lead saved</p>
                    <p className="lead-card-what">{scene.lead}</p>
                    <p className="lead-card-meta">From a {scene.source}. Team alerted.</p>
                </aside>
            </div>
        </div>
    );
};

export default ChatDemo;

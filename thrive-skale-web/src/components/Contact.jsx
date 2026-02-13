import React, { useState, useEffect, useRef, useCallback } from 'react';
import './Contact.css';
import AIAgent from './AIAgent';

/* ============================================
   SERVICE OPTIONS
   ============================================ */
const SERVICE_OPTIONS = [
    'Website Setup',
    'Digital Marketing',
    'Mobile Applications',
    'AI & Automation',
    'Other',
];

/* ============================================
   PARTICLE NETWORK CANVAS
   ============================================ */
const ParticleCanvas = () => {
    const canvasRef = useRef(null);
    const mouseRef = useRef({ x: -999, y: -999 });
    const animRef = useRef(null);
    const particlesRef = useRef([]);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');

        const resize = () => {
            const rect = canvas.parentElement.getBoundingClientRect();
            canvas.width = rect.width * window.devicePixelRatio;
            canvas.height = rect.height * window.devicePixelRatio;
            canvas.style.width = rect.width + 'px';
            canvas.style.height = rect.height + 'px';
            ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
        };
        resize();

        const W = () => canvas.width / window.devicePixelRatio;
        const H = () => canvas.height / window.devicePixelRatio;

        // Init particles — fewer on mobile for performance
        const isMobile = window.innerWidth < 768;
        const count = isMobile ? 40 : 100;
        if (particlesRef.current.length === 0) {
            for (let i = 0; i < count; i++) {
                particlesRef.current.push({
                    x: Math.random() * W(),
                    y: Math.random() * H(),
                    vx: (Math.random() - 0.5) * 0.6,
                    vy: (Math.random() - 0.5) * 0.6,
                    r: Math.random() * 2 + 1,
                    alpha: Math.random() * 0.5 + 0.3,
                });
            }
        }

        const handleMouseMove = (e) => {
            const rect = canvas.getBoundingClientRect();
            mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
        };

        const handleMouseLeave = () => {
            mouseRef.current = { x: -999, y: -999 };
        };

        canvas.parentElement.addEventListener('mousemove', handleMouseMove);
        canvas.parentElement.addEventListener('mouseleave', handleMouseLeave);

        const draw = () => {
            const w = W();
            const h = H();
            ctx.clearRect(0, 0, w, h);

            const particles = particlesRef.current;
            const mouse = mouseRef.current;

            // Update & draw particles
            for (let i = 0; i < particles.length; i++) {
                const p = particles[i];

                // Mouse attraction
                const dx = mouse.x - p.x;
                const dy = mouse.y - p.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < 200 && dist > 0) {
                    const force = (200 - dist) / 200 * 0.015;
                    p.vx += dx / dist * force;
                    p.vy += dy / dist * force;
                }

                // Damping
                p.vx *= 0.99;
                p.vy *= 0.99;

                p.x += p.vx;
                p.y += p.vy;

                // Wrap edges
                if (p.x < 0) p.x = w;
                if (p.x > w) p.x = 0;
                if (p.y < 0) p.y = h;
                if (p.y > h) p.y = 0;

                ctx.beginPath();
                ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(72, 213, 177, ${p.alpha})`;
                ctx.fill();
            }

            // Draw connections
            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const a = particles[i];
                    const b = particles[j];
                    const dx = a.x - b.x;
                    const dy = a.y - b.y;
                    const d = Math.sqrt(dx * dx + dy * dy);
                    if (d < 150) {
                        ctx.beginPath();
                        ctx.moveTo(a.x, a.y);
                        ctx.lineTo(b.x, b.y);
                        ctx.strokeStyle = `rgba(72, 213, 177, ${0.15 * (1 - d / 150)})`;
                        ctx.lineWidth = 0.6;
                        ctx.stroke();
                    }
                }
            }

            animRef.current = requestAnimationFrame(draw);
        };

        draw();

        const resizeObs = new ResizeObserver(resize);
        resizeObs.observe(canvas.parentElement);

        return () => {
            cancelAnimationFrame(animRef.current);
            canvas.parentElement.removeEventListener('mousemove', handleMouseMove);
            canvas.parentElement.removeEventListener('mouseleave', handleMouseLeave);
            resizeObs.disconnect();
        };
    }, []);

    return (
        <div className="ct-particles">
            <canvas ref={canvasRef} />
        </div>
    );
};

/* ============================================
   CUSTOM DROPDOWN
   ============================================ */
const CustomDropdown = ({ value, onChange, error, isVisible }) => {
    const [open, setOpen] = useState(false);
    const ref = useRef(null);

    // Close on outside click or touch
    useEffect(() => {
        const handleClick = (e) => {
            if (ref.current && !ref.current.contains(e.target)) setOpen(false);
        };
        document.addEventListener('mousedown', handleClick);
        document.addEventListener('touchstart', handleClick);
        return () => {
            document.removeEventListener('mousedown', handleClick);
            document.removeEventListener('touchstart', handleClick);
        };
    }, []);

    const cls = [
        'ct-dropdown',
        open && 'ct-dropdown--open',
        value && 'ct-dropdown--filled',
        error && 'ct-field--error',
        isVisible && 'ct-field--visible',
    ].filter(Boolean).join(' ');

    return (
        <div className={cls} ref={ref} style={{ '--field-index': 2 }}>
            <button
                type="button"
                className={`ct-dropdown-trigger ${value ? 'ct-dropdown-trigger--filled' : ''}`}
                onClick={() => setOpen((v) => !v)}
                aria-haspopup="listbox"
                aria-expanded={open}
            >
                <span>{value || ''}</span>
                <svg className="ct-dropdown-chevron" viewBox="0 0 24 24" fill="none"
                    stroke="#48d5b1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="6 9 12 15 18 9" />
                </svg>
            </button>
            <label className={`ct-label ${(open || value) ? 'ct-label--float' : ''}`}>
                Service Interest
            </label>
            {error && <span className="ct-error-msg">{error}</span>}
            <div className="ct-dropdown-menu" role="listbox">
                {SERVICE_OPTIONS.map((opt) => (
                    <div
                        key={opt}
                        role="option"
                        aria-selected={value === opt}
                        className={`ct-dropdown-option ${value === opt ? 'ct-dropdown-option--selected' : ''}`}
                        onPointerDown={(e) => { e.preventDefault(); onChange(opt); setOpen(false); }}
                    >
                        {opt}
                    </div>
                ))}
            </div>
        </div>
    );
};

/* ============================================
   CONTACT COMPONENT
   ============================================ */
const Contact = ({ initialService }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        service: '',
        message: '',
    });
    const [errors, setErrors] = useState({});
    const [touched, setTouched] = useState({});
    const [submitState, setSubmitState] = useState('idle'); // idle | loading | success
    const [fieldsVisible, setFieldsVisible] = useState(false);

    const [showAgent, setShowAgent] = useState(false);
    const [agentData, setAgentData] = useState(null);

    const formRef = useRef(null);
    const submitBtnRef = useRef(null);

    // Apply initialService from App.jsx
    useEffect(() => {
        if (initialService) {
            setFormData((prev) => ({ ...prev, service: initialService }));
        }
    }, [initialService]);

    // IntersectionObserver for staggered field entrance
    useEffect(() => {
        const el = formRef.current;
        if (!el) return;
        const obs = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setFieldsVisible(true);
                    obs.disconnect();
                }
            },
            { threshold: 0.15 }
        );
        obs.observe(el);
        return () => obs.disconnect();
    }, []);

    /* ---------- Validation ---------- */
    const validateField = useCallback((name, value) => {
        if (!value || !value.trim()) return 'This field is required';
        if (name === 'email') {
            const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!re.test(value)) return 'Please enter a valid email';
        }
        return '';
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        if (touched[name]) {
            const err = validateField(name, value);
            setErrors((prev) => ({ ...prev, [name]: err }));
        }
    };

    const handleBlur = (e) => {
        const { name, value } = e.target;
        setTouched((prev) => ({ ...prev, [name]: true }));
        const err = validateField(name, value);
        setErrors((prev) => ({ ...prev, [name]: err }));
    };

    const handleServiceChange = (service) => {
        setFormData((prev) => ({ ...prev, service }));
        setTouched((prev) => ({ ...prev, service: true }));
        setErrors((prev) => ({ ...prev, service: '' }));
    };

    /* ---------- Submit ---------- */
    const handleSubmit = (e) => {
        e.preventDefault();

        // Validate all
        const newErrors = {};
        ['name', 'email', 'service', 'message'].forEach((key) => {
            const err = validateField(key, formData[key]);
            if (err) newErrors[key] = err;
        });
        setErrors(newErrors);
        setTouched({ name: true, email: true, service: true, message: true });

        if (Object.keys(newErrors).length > 0) return;

        setSubmitState('loading');

        // Build WhatsApp message
        const phone = '19704122140'; // +1 970-412-2140
        const message = [
            `🚀 *New Lead from ThrivvSkale Website*`,
            ``,
            `👤 *Name:* ${formData.name}`,
            `📧 *Email:* ${formData.email}`,
            `🎯 *Service:* ${formData.service}`,
            `💬 *Message:* ${formData.message}`,
        ].join('\n');

        const waUrl = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;

        // Open WhatsApp in new tab
        window.open(waUrl, '_blank');

        setSubmitState('success');
        setAgentData(formData);
        setShowAgent(true);

        setTimeout(() => {
            setSubmitState('idle');
            setFormData({ name: '', email: '', service: '', message: '' });
            setTouched({});
            setErrors({});
        }, 3000);
    };

    /* ---------- Ripple ---------- */
    const handleRipple = (e) => {
        const btn = submitBtnRef.current;
        if (!btn || submitState !== 'idle') return;
        const rect = btn.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height) * 2;
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        const ripple = document.createElement('span');
        ripple.className = 'ct-ripple';
        ripple.style.cssText = `width:${size}px;height:${size}px;left:${x}px;top:${y}px;`;
        btn.appendChild(ripple);
        setTimeout(() => ripple.remove(), 600);
    };

    /* ---------- Field helper ---------- */
    const fieldCls = (name) => {
        const classes = ['ct-field'];
        if (fieldsVisible) classes.push('ct-field--visible');
        if (touched[name] && errors[name]) classes.push('ct-field--error');
        if (touched[name] && !errors[name] && formData[name]) classes.push('ct-field--success');
        return classes.join(' ');
    };

    const validationIcon = (name) => {
        if (!touched[name]) return null;
        if (errors[name]) {
            return (
                <span className="ct-validation-icon ct-validation-icon--show" style={{ color: '#ff4757' }}>
                    ✕
                </span>
            );
        }
        if (formData[name]) {
            return (
                <span className="ct-validation-icon ct-validation-icon--show" style={{ color: '#2ed573' }}>
                    ✓
                </span>
            );
        }
        return null;
    };

    /* ---------- Submit button text ---------- */
    const submitContent = () => {
        if (submitState === 'loading') {
            return (
                <>
                    <span className="ct-submit-text" style={{ opacity: 0 }}>SEND MESSAGE</span>
                    <span className="ct-spinner" style={{ display: 'block' }} />
                </>
            );
        }
        if (submitState === 'success') {
            return <span className="ct-submit-text">✓ Message Sent!</span>;
        }
        return <span className="ct-submit-text">SEND MESSAGE</span>;
    };

    return (
        <section id="contact" className="ct-section">
            <div className="ct-split">
                {/* ------- LEFT: Form ------- */}
                <div className="ct-form-panel">
                    <div className="ct-header">
                        <h2 className="ct-title">
                            Get in <span className="ct-title-accent">Touch</span>
                        </h2>
                        <p className="ct-subtitle">
                            Ready to engineer your growth? Let's talk.
                        </p>
                    </div>

                    <div className="ct-form-box" ref={formRef}>
                        <h3 className="ct-form-title">Start Your Journey</h3>

                        <form onSubmit={handleSubmit} noValidate>
                            {/* Full Name */}
                            <div className={fieldCls('name')} style={{ '--field-index': 0 }}>
                                <input
                                    type="text"
                                    name="name"
                                    id="ct-name"
                                    className="ct-input"
                                    placeholder=" "
                                    value={formData.name}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    autoComplete="name"
                                    aria-label="Full Name"
                                    aria-invalid={!!errors.name}
                                />
                                <label htmlFor="ct-name" className="ct-label">Full Name</label>
                                {validationIcon('name')}
                                {errors.name && <span className="ct-error-msg">{errors.name}</span>}
                            </div>

                            {/* Business Email */}
                            <div className={fieldCls('email')} style={{ '--field-index': 1 }}>
                                <input
                                    type="email"
                                    name="email"
                                    id="ct-email"
                                    className="ct-input"
                                    placeholder=" "
                                    value={formData.email}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    autoComplete="email"
                                    aria-label="Business Email"
                                    aria-invalid={!!errors.email}
                                />
                                <label htmlFor="ct-email" className="ct-label">Business Email</label>
                                {validationIcon('email')}
                                {errors.email && <span className="ct-error-msg">{errors.email}</span>}
                            </div>

                            {/* Service Interest — Custom Dropdown */}
                            <CustomDropdown
                                value={formData.service}
                                onChange={handleServiceChange}
                                error={touched.service ? errors.service : ''}
                                isVisible={fieldsVisible}
                            />

                            {/* Project Message */}
                            <div className={fieldCls('message')} style={{ '--field-index': 3 }}>
                                <textarea
                                    name="message"
                                    id="ct-message"
                                    className="ct-textarea"
                                    placeholder=" "
                                    value={formData.message}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    aria-label="Tell us about your project"
                                    aria-invalid={!!errors.message}
                                />
                                <label htmlFor="ct-message" className="ct-label">Tell us about your project</label>
                                {validationIcon('message')}
                                {errors.message && <span className="ct-error-msg">{errors.message}</span>}
                            </div>

                            {/* Security note */}
                            <div className="ct-security">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                                    <path d="M7 11V7a5 5 0 0110 0v4" />
                                </svg>
                                <span>This form is secure and used only to contact you regarding your enquiry.</span>
                            </div>

                            {/* Submit */}
                            <button
                                ref={submitBtnRef}
                                type="submit"
                                className={`ct-submit ${submitState === 'loading' ? 'ct-submit--loading' : ''} ${submitState === 'success' ? 'ct-submit--success' : ''}`}
                                disabled={submitState !== 'idle'}
                                onClick={handleRipple}
                            >
                                {submitContent()}
                            </button>

                            {/* Privacy */}
                            <p className="ct-privacy">
                                By submitting this form, you agree to our{' '}
                                <a href="/privacy-policy">Privacy Policy</a>.
                            </p>
                        </form>
                    </div>
                </div>

                {/* ------- RIGHT: Particle Network ------- */}
                <div className="ct-canvas-panel">
                    <ParticleCanvas />
                </div>
            </div>

            {/* AI Agent modal (preserved) */}
            {showAgent && agentData && (
                <AIAgent
                    initialData={agentData}
                    onClose={() => setShowAgent(false)}
                />
            )}
        </section>
    );
};

export default Contact;

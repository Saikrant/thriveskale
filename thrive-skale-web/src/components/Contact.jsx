import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import './Contact.css';
import AIAgent from './AIAgent';
import { BUSINESS_TYPES, getTouchedContactFields, validateContactField, validateContactForm } from '../utils/contactValidation';
import { buildContactWhatsAppUrl } from '../utils/contactLead';
import { CONTACT } from '../utils/countryConfig';

/* ============================================
   CUSTOM DROPDOWN
   ============================================ */
const CustomDropdown = ({ value, onChange, error, isVisible, options, label }) => {
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
                    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="6 9 12 15 18 9" />
                </svg>
            </button>
            <label className={`ct-label ${(open || value) ? 'ct-label--float' : ''}`}>
                {label || 'Select Option'}
            </label>
            {error && <span className="ct-error-msg">{error}</span>}
            <div className="ct-dropdown-menu" role="listbox">
                {options.map((opt) => (
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
const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        businessType: '',
        message: '',
    });
    const [errors, setErrors] = useState({});
    const [touched, setTouched] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [fieldsVisible, setFieldsVisible] = useState(false);

    const [showAgent, setShowAgent] = useState(false);
    const [agentData] = useState(null);

    const navigate = useNavigate();
    const formRef = useRef(null);
    const submitBtnRef = useRef(null);

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
    const validateField = useCallback(validateContactField, []);

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

    const handleBusinessTypeChange = (value) => {
        setFormData((prev) => ({ ...prev, businessType: value }));
        setTouched((prev) => ({ ...prev, businessType: true }));
        setErrors((prev) => ({ ...prev, businessType: '' }));
    };

    /* ---------- Submit ---------- */
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate all
        const newErrors = validateContactForm(formData);
        setErrors(newErrors);
        setTouched(getTouchedContactFields());

        if (Object.keys(newErrors).length > 0) return;

        setIsSubmitting(true);

        try {
            const whatsappUrl = buildContactWhatsAppUrl(CONTACT.whatsappNumber, formData);

            // Navigate to Thank You page with WhatsApp URL in state
            navigate('/thank-you', { state: { whatsappUrl } });

            // Success UI
            setFormData({ name: '', email: '', phone: '', businessType: '', message: '' });
            setTouched({});
            setErrors({});
            // Optional: Redirect to thank you page anyway?
            // Usually valid to just open WA.
            // But let's redirect to thank you page as well for consistency?
            // "revert to original" -> original likely didn't redirect to thank you page?
            // It kept user on page.

        } catch (error) {
            console.error('Error:', error);
        } finally {
            setIsSubmitting(false);
        }
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
                <span className="ct-validation-icon ct-validation-icon--show ct-validation-icon--error" aria-hidden="true">
                    ✕
                </span>
            );
        }
        if (formData[name]) {
            return (
                <span className="ct-validation-icon ct-validation-icon--show" aria-hidden="true">
                    ✓
                </span>
            );
        }
        return null;
    };

    /* ---------- Submit button text ---------- */
    const submitContent = () => {
        if (isSubmitting) {
            return (
                <>
                    <span className="ct-submit-text" style={{ opacity: 0 }}>Send on WhatsApp</span>
                    <span className="ct-spinner" style={{ display: 'block' }} />
                </>
            );
        }
        return <span className="ct-submit-text">Send on WhatsApp</span>;
    };

    return (
        <section id="contact" className="ct-section">
            <div className="ct-split">
                {/* ------- LEFT: Form ------- */}
                <div className="ct-form-panel">
                    <div className="ct-header">
                        <h2 className="ct-title">
                            Tell us about your project
                        </h2>
                        <p className="ct-subtitle">
                            Fill in the form and we will reply on WhatsApp.
                        </p>
                    </div>

                    <div className="ct-form-box" ref={formRef}>
                        <h3 className="ct-form-title">Your details</h3>

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
                                    disabled={isSubmitting}
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
                                    disabled={isSubmitting}
                                    aria-invalid={!!errors.email}
                                />
                                <label htmlFor="ct-email" className="ct-label">Business Email</label>
                                {validationIcon('email')}
                                {errors.email && <span className="ct-error-msg">{errors.email}</span>}
                            </div>

                            {/* Phone Number - NEW */}
                            <div className={fieldCls('phone')} style={{ '--field-index': 2 }}>
                                <input
                                    type="tel"
                                    name="phone"
                                    id="ct-phone"
                                    className="ct-input"
                                    placeholder=" "
                                    value={formData.phone}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    autoComplete="tel"
                                    aria-label="Phone Number"
                                    disabled={isSubmitting}
                                    aria-invalid={!!errors.phone}
                                />
                                <label htmlFor="ct-phone" className="ct-label">Phone Number</label>
                                {validationIcon('phone')}
                                {errors.phone && <span className="ct-error-msg">{errors.phone}</span>}
                            </div>

                            {/* Business Type — Reusing Custom Dropdown Logic */}
                            <CustomDropdown
                                value={formData.businessType}
                                onChange={handleBusinessTypeChange}
                                error={touched.businessType ? errors.businessType : ''}
                                isVisible={fieldsVisible}
                                options={BUSINESS_TYPES}
                                label="Select Your Industry"
                            />

                            {/* Project Message */}
                            <div className={fieldCls('message')} style={{ '--field-index': 4 }}>
                                <textarea
                                    name="message"
                                    id="ct-message"
                                    className="ct-textarea"
                                    placeholder=" "
                                    value={formData.message}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    aria-label="Tell us about your project"
                                    disabled={isSubmitting}
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
                                className={`ct-submit ${isSubmitting ? 'ct-submit--loading' : ''}`}
                                disabled={isSubmitting}
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

                {/* ------- RIGHT: Direct contact ------- */}
                <aside className="ct-direct" aria-labelledby="ct-direct-title">
                    <h3 id="ct-direct-title" className="ct-direct-title">Prefer to reach us directly?</h3>
                    <dl className="ct-direct-list">
                        <div>
                            <dt>WhatsApp</dt>
                            <dd><a href={`https://wa.me/${CONTACT.whatsappNumber}`} target="_blank" rel="noopener noreferrer">{CONTACT.phone.display}</a></dd>
                        </div>
                        <div>
                            <dt>Phone</dt>
                            <dd><a href={CONTACT.phone.link}>{CONTACT.phone.display}</a></dd>
                        </div>
                        <div>
                            <dt>Email</dt>
                            <dd><a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a></dd>
                        </div>
                    </dl>
                </aside>
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

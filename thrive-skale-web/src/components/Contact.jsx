import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BUSINESS_TYPES, getTouchedContactFields, validateContactField, validateContactForm } from '../utils/contactValidation';
import { buildContactWhatsAppUrl } from '../utils/contactLead';
import { CONTACT } from '../utils/countryConfig';
import { trackLead } from '../utils/gtag';
import './Contact.css';

const EMPTY = { name: '', email: '', phone: '', businessType: '', message: '' };

const Contact = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState(EMPTY);
    const [errors, setErrors] = useState({});
    const [touched, setTouched] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        if (touched[name]) setErrors((prev) => ({ ...prev, [name]: validateContactField(name, value) }));
    };

    const handleBlur = (e) => {
        const { name, value } = e.target;
        setTouched((prev) => ({ ...prev, [name]: true }));
        setErrors((prev) => ({ ...prev, [name]: validateContactField(name, value) }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const newErrors = validateContactForm(formData);
        setErrors(newErrors);
        setTouched(getTouchedContactFields());
        if (Object.keys(newErrors).length > 0) return;

        setIsSubmitting(true);
        const whatsappUrl = buildContactWhatsAppUrl(CONTACT.whatsappNumber, formData);
        trackLead('contact');
        setFormData(EMPTY);
        setTouched({});
        navigate('/thank-you', { state: { whatsappUrl } });
    };

    const fieldProps = (name) => ({
        name,
        id: `ct-${name}`,
        value: formData[name],
        onChange: handleChange,
        onBlur: handleBlur,
        disabled: isSubmitting,
        'aria-invalid': !!(touched[name] && errors[name]),
        'aria-describedby': touched[name] && errors[name] ? `ct-${name}-error` : undefined,
    });

    const error = (name) => touched[name] && errors[name] && (
        <em className="field-error" id={`ct-${name}-error`}>{errors[name]}</em>
    );

    return (
        <section id="contact" className="section">
            <div className="container contact">
                <div>
                    <div className="section-head">
                        <h2>Tell us about your business</h2>
                        <p>Fill in the form and we will reply on WhatsApp with a recommendation and a price.</p>
                    </div>

                    <form className="card form" onSubmit={handleSubmit} noValidate>
                        <div className="contact-row">
                            <label className="field" htmlFor="ct-name">
                                <span>Your name</span>
                                <input type="text" autoComplete="name" {...fieldProps('name')} />
                                {error('name')}
                            </label>
                            <label className="field" htmlFor="ct-phone">
                                <span>Phone number</span>
                                <input type="tel" inputMode="tel" autoComplete="tel" placeholder="+91" {...fieldProps('phone')} />
                                {error('phone')}
                            </label>
                        </div>
                        <div className="contact-row">
                            <label className="field" htmlFor="ct-email">
                                <span>Email</span>
                                <input type="email" inputMode="email" autoComplete="email" {...fieldProps('email')} />
                                {error('email')}
                            </label>
                            <label className="field" htmlFor="ct-businessType">
                                <span>Your business</span>
                                <select {...fieldProps('businessType')}>
                                    <option value="">Choose one</option>
                                    {BUSINESS_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
                                </select>
                                {error('businessType')}
                            </label>
                        </div>
                        <label className="field" htmlFor="ct-message">
                            <span>What do you need?</span>
                            <textarea {...fieldProps('message')} />
                            {error('message')}
                        </label>
                        <button type="submit" className="btn btn--primary btn--block" disabled={isSubmitting}>
                            Send on WhatsApp
                        </button>
                        <p className="small muted">
                            We use these details only to reply to your enquiry. See our{' '}
                            <Link to="/privacy-policy">Privacy Policy</Link> and <Link to="/terms">Terms</Link>.
                        </p>
                    </form>
                </div>

                <aside className="card contact-direct" aria-labelledby="ct-direct-title">
                    <h3 id="ct-direct-title">Or reach us directly</h3>
                    <dl className="stack">
                        <div>
                            <dt className="small muted">WhatsApp</dt>
                            <dd><a href={`https://wa.me/${CONTACT.whatsappNumber}`} target="_blank" rel="noopener noreferrer">{CONTACT.phone.display}</a></dd>
                        </div>
                        <div>
                            <dt className="small muted">Phone</dt>
                            <dd><a href={CONTACT.phone.link}>{CONTACT.phone.display}</a></dd>
                        </div>
                        <div>
                            <dt className="small muted">{CONTACT.aakash.name}</dt>
                            <dd><a href={CONTACT.aakash.link}>{CONTACT.aakash.display}</a></dd>
                        </div>
                        <div>
                            <dt className="small muted">Email</dt>
                            <dd><a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a></dd>
                        </div>
                    </dl>
                    <p className="small muted">Based in {CONTACT.city}.</p>
                </aside>
            </div>
        </section>
    );
};

export default Contact;

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CONTACT, PACKAGES, GST_NOTE, rupees } from '../utils/countryConfig';
import { BUSINESS_TYPES, validateContactField } from '../utils/contactValidation';
import { buildContactWhatsAppUrl } from '../utils/contactLead';
import { trackLead } from '../utils/gtag';
import ChatDemo from './ChatDemo';
import './Hero.css';

const FIELDS = ['name', 'phone', 'businessType'];

const Hero = () => {
    const navigate = useNavigate();
    const [form, setForm] = useState({ name: '', phone: '', businessType: '' });
    const [errors, setErrors] = useState({});

    const onChange = (e) => {
        const { name, value } = e.target;
        setForm((p) => ({ ...p, [name]: value }));
        setErrors((p) => ({ ...p, [name]: '' }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const next = {};
        FIELDS.forEach((f) => {
            const err = validateContactField(f, form[f]);
            if (err) next[f] = err;
        });
        setErrors(next);
        if (Object.keys(next).length) return;
        const whatsappUrl = buildContactWhatsAppUrl(CONTACT.whatsappNumber, {
            ...form, email: 'Not given', message: 'Quote request from the home page',
        });
        trackLead('hero');
        navigate('/thank-you', { state: { whatsappUrl } });
    };

    return (
        <section id="hero" className="hero">
            <div className="container hero-grid">
                <div className="hero-copy">
                    <h1>Get more customers messaging you on WhatsApp</h1>
                    <p className="hero-lead">
                        We build your website, run the ads, reply to every enquiry instantly and
                        save each one in your CRM. Made for Hyderabad businesses, from{' '}
                        <strong>{rupees(PACKAGES[0].price)}</strong> {GST_NOTE}.
                    </p>
                </div>

                <form className="hero-form form" onSubmit={handleSubmit} noValidate aria-labelledby="hero-form-title">
                    <div className="stack">
                        <h2 id="hero-form-title" className="hero-form-title">Get a quote on WhatsApp</h2>
                        <p className="small muted">Three details. We reply on WhatsApp with a price for your business.</p>
                    </div>
                    <label className="field">
                        <span>Your name</span>
                        <input name="name" value={form.name} onChange={onChange} autoComplete="name" aria-invalid={!!errors.name} />
                        {errors.name && <em className="field-error" role="alert">{errors.name}</em>}
                    </label>
                    <label className="field">
                        <span>Phone number</span>
                        <input name="phone" type="tel" inputMode="tel" value={form.phone} onChange={onChange} autoComplete="tel" placeholder="+91" aria-invalid={!!errors.phone} />
                        {errors.phone && <em className="field-error" role="alert">{errors.phone}</em>}
                    </label>
                    <label className="field">
                        <span>Your business</span>
                        <select name="businessType" value={form.businessType} onChange={onChange} aria-invalid={!!errors.businessType}>
                            <option value="">Choose one</option>
                            {BUSINESS_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
                        </select>
                        {errors.businessType && <em className="field-error" role="alert">{errors.businessType}</em>}
                    </label>
                    <button type="submit" className="btn btn--primary btn--block">Get my quote</button>
                </form>

                <ChatDemo />
            </div>
        </section>
    );
};

export default Hero;

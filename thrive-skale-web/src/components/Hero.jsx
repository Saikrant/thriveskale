import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CONTACT, PACKAGES, GST_NOTE, rupees } from '../utils/countryConfig';
import { BUSINESS_TYPES, validateContactField } from '../utils/contactValidation';
import { buildContactWhatsAppUrl } from '../utils/contactLead';
import { trackLead } from '../utils/gtag';
import { focusFirstInvalid } from '../utils/contactPrefill';
import LeadStack from './LeadStack';
import './Hero.css';

const FIELDS = ['name', 'phone', 'businessType'];
/* The package that includes Zoho CRM and WhatsApp auto-reply. */
const LEAD_SYSTEM = PACKAGES.find((p) => p.id === 'lead-system');

const Hero = () => {
    const navigate = useNavigate();
    const [form, setForm] = useState({ name: '', phone: '', businessType: '' });
    const [errors, setErrors] = useState({});
    const [sending, setSending] = useState(false);
    const formRef = useRef(null);

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
        if (Object.keys(next).length) {
            focusFirstInvalid(formRef.current);
            return;
        }
        setSending(true);
        const whatsappUrl = buildContactWhatsAppUrl(CONTACT.whatsappNumber, {
            ...form, email: 'Not given', message: 'Quote request from the home page',
        });
        trackLead('hero');
        navigate('/thank-you', { state: { whatsappUrl }, viewTransition: true });
    };

    return (
        <section id="hero" className="hero">
            <div className="container hero-grid">
                <div className="hero-copy">
                    <h1>Turn ad clicks into customer conversations on WhatsApp</h1>
                    <p className="hero-lead">
                        We build your website, run your ads, save every enquiry in one list (a CRM) and
                        reply on WhatsApp. Everything is set up in your own accounts. Made for Hyderabad businesses. Websites from{' '}
                        <strong>{rupees(PACKAGES[0].price)}</strong>, the full lead engine from{' '}
                        <strong>{rupees(LEAD_SYSTEM.price)}</strong> {GST_NOTE}.
                    </p>
                </div>

                <form ref={formRef} className="hero-form form" onSubmit={handleSubmit} noValidate aria-labelledby="hero-form-title">
                    <div className="stack">
                        <h2 id="hero-form-title" className="hero-form-title">Get a quote on WhatsApp</h2>
                        <p className="small muted">Three details. We reply on WhatsApp with a price.</p>
                    </div>
                    <label className="field">
                        <span>Your name</span>
                        <input id="hero-name" name="name" value={form.name} onChange={onChange} autoComplete="name" aria-invalid={!!errors.name} aria-describedby={errors.name ? 'hero-name-error' : undefined} />
                        {errors.name && <em className="field-error" id="hero-name-error">{errors.name}</em>}
                    </label>
                    <label className="field">
                        <span>Phone number</span>
                        <input name="phone" type="tel" inputMode="tel" value={form.phone} onChange={onChange} autoComplete="tel" placeholder="+91" aria-invalid={!!errors.phone} aria-describedby={errors.phone ? 'hero-phone-error' : undefined} />
                        {errors.phone && <em className="field-error" id="hero-phone-error">{errors.phone}</em>}
                    </label>
                    <label className="field">
                        <span>Your business</span>
                        <select name="businessType" value={form.businessType} onChange={onChange} aria-invalid={!!errors.businessType} aria-describedby={errors.businessType ? 'hero-type-error' : undefined}>
                            <option value="">Choose one</option>
                            {BUSINESS_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
                        </select>
                        {errors.businessType && <em className="field-error" id="hero-type-error">{errors.businessType}</em>}
                    </label>
                    <button type="submit" className="btn btn--primary btn--block" disabled={sending}>
                        {sending ? 'Opening WhatsApp…' : 'Get my quote'}
                    </button>
                </form>

                <LeadStack />
            </div>
        </section>
    );
};

export default Hero;

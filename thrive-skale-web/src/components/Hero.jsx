import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCountry } from '../context/CountryContext';
import { CONTACT } from '../utils/countryConfig';
import { BUSINESS_TYPES, validateContactField } from '../utils/contactValidation';
import { buildContactWhatsAppUrl } from '../utils/contactLead';
import './Hero.css';

const scrollToId = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
};

const Hero = () => {
    const { config } = useCountry();
    const { symbol } = config.currency;
    const { website } = config.pricing;

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
        ['name', 'phone', 'businessType'].forEach((f) => {
            const err = validateContactField(f, form[f]);
            if (err) next[f] = err;
        });
        setErrors(next);
        if (Object.keys(next).length) return;
        const whatsappUrl = buildContactWhatsAppUrl(CONTACT.whatsappNumber, {
            ...form, email: 'Not given', message: 'Free quote request from the home page',
        });
        navigate('/thank-you', { state: { whatsappUrl } });
    };

    return (
        <section id="hero" className="hero">
            <div className="hero-inner container">
                <div className="hero-copy">
                    <h1 className="hero-headline">
                        Websites, online stores and WhatsApp assistants, with prices upfront
                    </h1>
                    <p className="hero-lead">
                        We build it, launch it and support it. Tell us about your business and we will
                        recommend the right package.
                    </p>
                    <button type="button" className="hero-cta-secondary" onClick={() => scrollToId('pricing')}>
                        See all prices
                    </button>
                </div>

                <form className="hero-form" onSubmit={handleSubmit} noValidate aria-labelledby="hero-form-title">
                    <h2 id="hero-form-title" className="hero-form-title">Get a free quote on WhatsApp</h2>
                    <p className="hero-form-note">
                        Three details, then we message you on WhatsApp with a price for your business.
                    </p>
                    <label className="hero-field">
                        <span>Your name</span>
                        <input name="name" value={form.name} onChange={onChange} autoComplete="name" aria-invalid={!!errors.name} />
                        {errors.name && <em role="alert">{errors.name}</em>}
                    </label>
                    <label className="hero-field">
                        <span>Phone number</span>
                        <input name="phone" type="tel" inputMode="tel" value={form.phone} onChange={onChange} autoComplete="tel" placeholder="+91" aria-invalid={!!errors.phone} />
                        {errors.phone && <em role="alert">{errors.phone}</em>}
                    </label>
                    <label className="hero-field">
                        <span>Your business</span>
                        <select name="businessType" value={form.businessType} onChange={onChange} aria-invalid={!!errors.businessType}>
                            <option value="">Choose one</option>
                            {BUSINESS_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
                        </select>
                        {errors.businessType && <em role="alert">{errors.businessType}</em>}
                    </label>
                    <button type="submit" className="hero-cta-primary hero-form-submit">Get my free quote</button>
                    <p className="hero-form-price">
                        Websites from {symbol}{website.plans[0].price}. Online stores from {symbol}{website.plans[2].price}. Excluding GST.
                    </p>
                </form>
            </div>
        </section>
    );
};

export default Hero;

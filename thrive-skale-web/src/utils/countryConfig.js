/**
 * Country-specific configuration for multi-country content switching.
 * Currently supports United States (US) and India (IN).
 */

/**
 * Single source of truth for contact details (India-based team).
 * Used by the footer, the contact form and the AI assistant, so a number
 * only ever needs changing here. Address intentionally omitted for now.
 */
export const CONTACT = {
    phone: {
        display: '+91 90143 53465',
        link: 'tel:+919014353465',
    },
    email: 'info@thrivvskale.com',
    /** WhatsApp lead number (wa.me format: country code + number, no "+") */
    whatsappNumber: '919014353465',
};

export const COUNTRY_CONFIG = {
    US: {
        code: 'US',
        name: 'United States',
        flag: '🇺🇸',
        currency: {
            code: 'USD',
            symbol: '$',
        },
        /* -------------------------------------------------------
           Pricing — mirrors the tier structure in Pricing.jsx
           Categories: website, mobile, ai
           ------------------------------------------------------- */
        pricing: {
            website: {
                plans: [
                    { name: 'Starter', price: '999', period: 'onwards' },
                    { name: 'Business', price: '2,499', period: 'onwards' },
                    { name: 'Enterprise', price: '4,999', period: 'onwards' },
                ],
            },
            mobile: {
                plans: [
                    { name: 'MVP', price: '3,499', period: 'onwards' },
                    { name: 'Growth', price: '8,999', period: 'onwards' },
                    { name: 'Enterprise', price: '19,999', period: 'onwards' },
                ],
            },
            ai: {
                plans: [
                    { name: 'Starter', price: '1,999', period: 'onwards' },
                    { name: 'Professional', price: '4,999', period: 'onwards' },
                    { name: 'Enterprise', price: '12,999', period: 'onwards' },
                ],
            },
        },
        pricingDisclaimer:
            '* All prices are in USD. Custom packages available on request.',
        contact: CONTACT,
        offers: {
            aiAgentsDiscount: '10%',
            description: 'Limited time launch offer',
        },
    },

    IN: {
        code: 'IN',
        name: 'India',
        flag: '🇮🇳',
        currency: {
            code: 'INR',
            symbol: '₹',
        },
        pricing: {
            website: {
                plans: [
                    { name: 'Starter', price: '19,999', period: 'onwards' },
                    { name: 'Business', price: '49,999', period: 'onwards' },
                    { name: 'Enterprise', price: '1,29,999', period: 'onwards' },
                ],
            },
            mobile: {
                plans: [
                    { name: 'MVP', price: '59,999', period: 'onwards' },
                    { name: 'Growth', price: '1,49,999', period: 'onwards' },
                    { name: 'Enterprise', price: '3,49,999', period: 'onwards' },
                ],
            },
            ai: {
                plans: [
                    { name: 'Starter', price: '29,999', period: 'onwards' },
                    { name: 'Professional', price: '79,999', period: 'onwards' },
                    { name: 'Enterprise', price: '1,99,999', period: 'onwards' },
                ],
            },
        },
        pricingDisclaimer:
            '* All prices are exclusive of GST. Custom packages available on request. Prices valid for Hyderabad-based projects.',
        contact: CONTACT,
        offers: {
            aiAgentsDiscount: '10%',
            description: 'Limited time launch offer',
        },
    },
};

/** Default fallback country */
export const DEFAULT_COUNTRY = 'IN';

/** Supported country codes */
export const SUPPORTED_COUNTRIES = Object.keys(COUNTRY_CONFIG);

/**
 * Country-specific configuration for multi-country content switching.
 * Currently supports United States (US) and India (IN).
 */

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
        contact: {
            phone: {
                display: '+1 (970) 412-2140',
                link: 'tel:+19704122140',
            },
            email: 'info@thrivvskale.com',
            office: 'Fort Collins,Colorado,USA',
            address: '1600 W Plum St, Fort Collins, CO 80521, United States',
            addressHTML:
                '1600 W Plum St<br>Fort Collins, CO 80521<br>United States',
            hours: '9:00 AM - 6:00 PM PST',
            timezone: 'Denver/Mountain Time',
            founder: 'Sai Kranth',
            location: 'Fort Collins, USA',
            whatsappNumber: '19704122140',
        },
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
                    { name: 'Starter', price: '14,999', period: 'onwards' },
                    { name: 'Business', price: '39,999', period: 'onwards' },
                    { name: 'Enterprise', price: '89,999', period: 'onwards' },
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
        contact: {
            phone: {
                display: '+1 (970) 412-2140',
                link: 'tel:+19704122140',
            },
            email: 'info@thrivvskale.com',
            office: 'Hyderabad Office',
            address: 'Hyderabad, Telangana, India',
            addressHTML: 'Hyderabad<br>Telangana<br>India',
            hours: '10:00 AM - 7:00 PM IST',
            timezone: 'Asia/Kolkata',
            founder: 'Sai Kranth',
            location: 'Hyderabad, India',
            whatsappNumber: '19704122140',
        },
        offers: {
            aiAgentsDiscount: '10%',
            description: 'Limited time launch offer',
        },
    },
};

/** Default fallback country */
export const DEFAULT_COUNTRY = 'US';

/** Supported country codes */
export const SUPPORTED_COUNTRIES = Object.keys(COUNTRY_CONFIG);

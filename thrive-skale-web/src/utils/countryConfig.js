/**
 * Single source of truth for contact details and prices (India only).
 * All prices are in rupees and exclude GST. Change a number here and every
 * section of the site picks it up.
 */

export const CONTACT = {
    phone: {
        display: '+91 90143 53465',
        link: 'tel:+919014353465',
    },
    /** Second contact, shown by name only. */
    aakash: {
        name: 'Aakash',
        display: '+91 63021 93115',
        link: 'tel:+916302193115',
    },
    email: 'info@thrivvskale.com',
    /** WhatsApp lead number (wa.me format: country code + number, no "+") */
    whatsappNumber: '919014353465',
    city: 'Hyderabad',
};

export const CURRENCY = { code: 'INR', symbol: '₹' };
export const GST_RATE = 0.18;
export const GST_NOTE = '+ 18% GST';

/** One-time packages. `price` is the starting price; null means "ask for a quote". */
export const PACKAGES = [
    {
        id: 'lead-website',
        name: 'Lead Website',
        price: 39999,
        summary: 'A 5-page website that turns visitors into WhatsApp enquiries.',
        includes: [
            '5-page website',
            'Lead form that sends enquiries to your WhatsApp',
            'Google Business Profile setup',
            'Google Search Console setup',
        ],
        payment: [
            { share: 50, when: 'to start' },
            { share: 50, when: 'at go-live' },
        ],
    },
    {
        id: 'lead-system',
        name: 'Lead System',
        price: 89999,
        recommended: true,
        summary: 'The full lead engine: website, calculator, CRM and instant WhatsApp replies.',
        includes: [
            '12 to 16 page website',
            'Smart calculator or quote tool',
            'Zoho CRM setup',
            'WhatsApp auto-reply',
            'Ad conversion tracking',
        ],
        payment: [
            { share: 40, when: 'to start' },
            { share: 30, when: 'when the site is live' },
            { share: 30, when: 'when leads are flowing' },
        ],
    },
    {
        id: 'online-store',
        name: 'Online Store',
        price: 79999,
        priceFrom: true,
        summary: 'Sell online with your own store.',
        includes: [
            'Shopify or WooCommerce',
            'Online payments',
            'Product pages',
        ],
        payment: [
            { share: 50, when: 'to start' },
            { share: 50, when: 'at go-live' },
        ],
    },
];

/** Lead Growth: monthly ad management fee, by monthly ad spend band. */
export const LEAD_GROWTH = {
    id: 'lead-growth',
    name: 'Lead Growth',
    summary: 'We run and improve your Meta and Google ads every week.',
    includes: [
        'Meta and Google ads managed',
        'Weekly optimisation',
        '12 ad creatives a month',
        'Monthly report',
    ],
    minimumMonths: 3,
    tiers: [
        { upToAdSpend: 60000, fee: 25000 },
        { upToAdSpend: 150000, fee: 35000 },
    ],
    aboveTopTierPercent: 12,
    /** Above the top band the fee is 12% of spend, but never less than this. */
    minimumFeeAboveTopTier: 35000,
};

/**
 * Monthly Lead Growth fee for a given monthly ad spend (rupees, excl. GST).
 * Up to ₹60,000 → ₹25,000; above ₹60,000 up to ₹1,50,000 → ₹35,000;
 * above ₹1,50,000 → 12% of ad spend, minimum ₹35,000 (so the fee never drops as spend rises).
 */
export const leadGrowthFee = (adSpend) => {
    const spend = Number(adSpend);
    if (!Number.isFinite(spend) || spend < 0) throw new RangeError('adSpend must be a non-negative number');
    const tier = LEAD_GROWTH.tiers.find((t) => spend <= t.upToAdSpend);
    if (tier) return tier.fee;
    const percentFee = Math.round((spend * LEAD_GROWTH.aboveTopTierPercent) / 100);
    return Math.max(LEAD_GROWTH.minimumFeeAboveTopTier, percentFee);
};

/** Add-ons, grouped. `monthly` is a recurring fee; `setup` is one-time. */
export const ADD_ON_GROUPS = [
    {
        name: 'Automation',
        items: [
            { id: 'whatsapp-ai', name: 'WhatsApp AI assistant', setup: 35000, monthly: 5000 },
        ],
    },
    {
        name: 'Visibility',
        items: [
            { id: 'local-seo', name: 'Local SEO', monthly: 12000 },
            { id: 'social-posts', name: 'Social posts (12 a month)', monthly: 9000 },
        ],
    },
    {
        name: 'Upkeep',
        items: [
            { id: 'care-plan', name: 'Care plan', monthly: 4000 },
        ],
    },
    {
        name: 'Custom',
        items: [
            { id: 'mobile-app', name: 'Mobile app', quote: true },
        ],
    },
];

/** Costs the client pays to the provider directly, not to us. */
export const PAID_DIRECTLY = [
    { item: 'Ad spend', cost: 'You set the budget', paidTo: 'Meta and Google' },
    { item: 'Domain name', cost: 'About ₹500 to ₹1,500 a year', paidTo: 'Domain registrar' },
    { item: 'Hosting', cost: '₹0 to ₹6,000 a year', paidTo: 'Hosting provider' },
    { item: 'WhatsApp API', cost: 'Provider plan plus Meta message fees', paidTo: 'WhatsApp API provider and Meta' },
    { item: 'Zoho CRM', cost: 'Per-user licence', paidTo: 'Zoho' },
];

/** Format rupees with Indian digit grouping, e.g. 150000 → "1,50,000". */
export const formatINR = (amount) => new Intl.NumberFormat('en-IN', { maximumFractionDigits: 0 }).format(amount);

/** "₹39,999" */
export const rupees = (amount) => `${CURRENCY.symbol}${formatINR(amount)}`;

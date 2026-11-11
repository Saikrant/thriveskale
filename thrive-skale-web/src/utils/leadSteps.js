/**
 * The six steps of the lead engine and what each package covers.
 * Coverage per plan: 'full', 'partial' (with a note) or 'none'.
 * Plans: 'website' = Lead Website, 'system' = Lead System,
 * 'growth' = Lead System plus the Lead Growth monthly plan.
 */
export const PLAN_OPTIONS = [
    { id: 'website', label: 'Lead Website' },
    { id: 'system', label: 'Lead System' },
    { id: 'growth', label: 'Lead System + Lead Growth' },
];

export const LEAD_STEPS = [
    {
        id: 'ads',
        title: 'Ads and Google bring people in',
        text: 'Your Google Business Profile is set up so you show up locally. With Lead Growth we also run your Meta and Google ads.',
        coverage: {
            website: { level: 'partial', note: 'Google profile only' },
            system: { level: 'partial', note: 'Google profile only' },
            growth: { level: 'full' },
        },
    },
    {
        id: 'site',
        title: 'Your website and lead tool',
        text: 'Visitors see what you offer and leave their details through a quote request, booking form or calculator.',
        coverage: {
            website: { level: 'partial', note: 'Website and lead form' },
            system: { level: 'full' },
            growth: { level: 'full' },
        },
    },
    {
        id: 'crm',
        title: 'The enquiry lands in your CRM',
        text: 'Every enquiry is saved in Zoho CRM with where it came from, so nothing is lost in a chat thread.',
        coverage: { website: { level: 'none' }, system: { level: 'full' }, growth: { level: 'full' } },
    },
    {
        id: 'reply',
        title: 'An instant WhatsApp reply',
        text: 'The customer gets an automatic WhatsApp reply with the next step, even when you are busy.',
        coverage: { website: { level: 'none' }, system: { level: 'full' }, growth: { level: 'full' } },
    },
    {
        id: 'alert',
        title: 'Your team is alerted',
        text: 'The right person is told about the new lead so they can follow up.',
        coverage: { website: { level: 'none' }, system: { level: 'full' }, growth: { level: 'full' } },
    },
    {
        id: 'report',
        title: 'A monthly report',
        text: 'Once a month you see what the ads cost, how many enquiries came in and what we changed.',
        coverage: { website: { level: 'none' }, system: { level: 'none' }, growth: { level: 'full' } },
    },
];

export const COVERAGE_LABEL = { full: 'Included', partial: 'Partly', none: 'Not included' };

export const GA_TRACKING_ID = 'AW-17825269339';

/**
 * Google Ads conversion label for a lead (the part after "AW-…/").
 * Set VITE_GADS_LEAD_LABEL in Cloudflare Pages (and .env.local for testing).
 * Without it no conversion event is sent, so we never report to a wrong label.
 */
export const LEAD_CONVERSION_LABEL = import.meta.env.VITE_GADS_LEAD_LABEL || '';

// https://developers.google.com/analytics/devguides/collection/gtagjs/pages
export const pageview = (url) => {
    if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('config', GA_TRACKING_ID, {
            page_path: url,
        });
    }
};

// https://developers.google.com/analytics/devguides/collection/gtagjs/events
export const event = ({ action, category, label, value }) => {
    if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', action, {
            event_category: category,
            event_label: label,
            value: value,
        });
    }
};

/** Google Ads conversion. Returns true when an event was sent. */
export const trackConversion = (conversionLabel) => {
    if (!conversionLabel) return false;
    if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', 'conversion', {
            send_to: `${GA_TRACKING_ID}/${conversionLabel}`,
        });
        return true;
    }
    return false;
};

/** Call after a lead form (hero or contact) is submitted successfully. */
export const trackLead = (source) => {
    event({ action: 'generate_lead', category: 'lead', label: source });
    return trackConversion(LEAD_CONVERSION_LABEL);
};

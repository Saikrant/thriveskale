export const GA_TRACKING_ID = 'AW-17825269339';

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

// Specific helper for Google Ads conversion
export const trackConversion = (conversionLabel) => {
    if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', 'conversion', {
            'send_to': `${GA_TRACKING_ID}/${conversionLabel}`,
        });
    }
};

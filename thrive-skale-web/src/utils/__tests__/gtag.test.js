import { afterEach, describe, expect, it, vi } from 'vitest';
import { GA_TRACKING_ID, trackConversion } from '../gtag';

afterEach(() => { delete window.gtag; });

describe('trackConversion', () => {
    it('sends the conversion to the Google Ads account with the given label', () => {
        window.gtag = vi.fn();
        expect(trackConversion('abc123')).toBe(true);
        expect(window.gtag).toHaveBeenCalledWith('event', 'conversion', { send_to: `${GA_TRACKING_ID}/abc123` });
    });

    it('sends nothing without a label', () => {
        window.gtag = vi.fn();
        expect(trackConversion('')).toBe(false);
        expect(window.gtag).not.toHaveBeenCalled();
    });

    it('does nothing when gtag is not loaded', () => {
        expect(trackConversion('abc123')).toBe(false);
    });
});

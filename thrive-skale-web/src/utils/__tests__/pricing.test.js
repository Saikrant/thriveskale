import { describe, expect, it } from 'vitest';
import * as config from '../countryConfig';
import {
    ADD_ON_GROUPS, CONTACT, GST_RATE, LEAD_GROWTH, PACKAGES, PAID_DIRECTLY,
    formatINR, leadGrowthFee, rupees,
} from '../countryConfig';

const byId = (id) => PACKAGES.find((p) => p.id === id);
const addOn = (id) => ADD_ON_GROUPS.flatMap((g) => g.items).find((i) => i.id === id);

describe('pricing config', () => {
    it('has the approved one-time prices', () => {
        expect(byId('lead-website').price).toBe(39999);
        expect(byId('lead-system').price).toBe(89999);
        expect(byId('online-store').price).toBe(79999);
        expect(byId('online-store').priceFrom).toBe(true);
    });

    it('marks exactly one package as recommended, the Lead System', () => {
        const recommended = PACKAGES.filter((p) => p.recommended);
        expect(recommended.map((p) => p.id)).toEqual(['lead-system']);
    });

    it('has payment splits that add up to 100%', () => {
        PACKAGES.forEach((p) => {
            expect(p.payment.reduce((sum, step) => sum + step.share, 0)).toBe(100);
        });
        expect(byId('lead-website').payment.map((s) => s.share)).toEqual([50, 50]);
        expect(byId('lead-system').payment.map((s) => s.share)).toEqual([40, 30, 30]);
        expect(byId('online-store').payment.map((s) => s.share)).toEqual([50, 50]);
    });

    it('has the approved add-on and monthly prices', () => {
        expect(addOn('whatsapp-ai')).toMatchObject({ setup: 35000, monthly: 5000 });
        expect(addOn('local-seo').monthly).toBe(12000);
        expect(addOn('social-posts').monthly).toBe(9000);
        expect(addOn('care-plan').monthly).toBe(4000);
        expect(addOn('mobile-app')).toMatchObject({ quote: true });
        expect(addOn('mobile-app').monthly).toBeUndefined();
        expect(LEAD_GROWTH.minimumMonths).toBe(3);
    });

    it('uses 18% GST', () => {
        expect(GST_RATE).toBe(0.18);
    });

    it('lists the costs paid directly by the client', () => {
        expect(PAID_DIRECTLY.map((r) => r.item)).toEqual([
            'Ad spend', 'Domain name', 'Hosting', 'WhatsApp API', 'Zoho CRM',
        ]);
    });

    it('has no US or multi-country config and no old tiers', () => {
        expect(config.COUNTRY_CONFIG).toBeUndefined();
        const all = JSON.stringify(config);
        ['19999', '49999', '129999', 'USD'].forEach((old) => expect(all).not.toContain(old));
    });

    it('stores Aakash by name only', () => {
        expect(CONTACT.aakash).toEqual({ name: 'Aakash', display: '+91 63021 93115', link: 'tel:+916302193115' });
    });
});

describe('leadGrowthFee', () => {
    it.each([
        [0, 25000],
        [60000, 25000],
        [60001, 35000],
        [150000, 35000],
        [150001, 18000],
        [200000, 24000],
    ])('ad spend %i → fee %i', (spend, fee) => {
        expect(leadGrowthFee(spend)).toBe(fee);
    });

    it('rejects invalid ad spend', () => {
        expect(() => leadGrowthFee(-1)).toThrow(RangeError);
        expect(() => leadGrowthFee('abc')).toThrow(RangeError);
    });
});

describe('formatINR', () => {
    it('uses Indian digit grouping', () => {
        expect(formatINR(39999)).toBe('39,999');
        expect(formatINR(150000)).toBe('1,50,000');
        expect(formatINR(1500000)).toBe('15,00,000');
        expect(rupees(89999)).toBe('₹89,999');
    });
});

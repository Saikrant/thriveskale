import { describe, expect, it } from 'vitest';
import {
    buildContactWhatsAppMessage,
    buildContactWhatsAppUrl,
    normalizeContactLead,
} from '../contactLead';

describe('contact lead helpers', () => {
    it('trims contact lead values', () => {
        expect(normalizeContactLead({
            name: ' Sai ',
            email: ' sai@example.com ',
            phone: ' 9704122140 ',
            businessType: ' Healthcare ',
            message: ' Need automation ',
        })).toEqual({
            name: 'Sai',
            email: 'sai@example.com',
            phone: '9704122140',
            businessType: 'Healthcare',
            message: 'Need automation',
        });
    });

    it('converts missing values to empty strings', () => {
        expect(normalizeContactLead({})).toEqual({
            name: '',
            email: '',
            phone: '',
            businessType: '',
            message: '',
        });
    });

    it('builds a readable WhatsApp inquiry message', () => {
        const message = buildContactWhatsAppMessage({
            name: 'Sai',
            email: 'sai@example.com',
            phone: '9704122140',
            businessType: 'Real Estate',
            message: 'Need a lead capture website',
        });

        expect(message).toContain('*New Inquiry from Website*');
        expect(message).toContain('*Name:* Sai');
        expect(message).toContain('*Email:* sai@example.com');
        expect(message).toContain('*Phone:* 9704122140');
        expect(message).toContain('*Industry:* Real Estate');
        expect(message).toContain('*Message:* Need a lead capture website');
    });

    it('builds an encoded WhatsApp URL', () => {
        const url = buildContactWhatsAppUrl('19704122140', {
            name: 'Sai',
            email: 'sai@example.com',
            phone: '9704122140',
            businessType: 'AI Automation',
            message: 'Need website + chatbot help',
        });

        expect(url).toContain('https://wa.me/19704122140?text=');
        expect(url).toContain('Sai');
        expect(url).toContain('AI%20Automation');
        expect(url).toContain('Need%20website%20%2B%20chatbot%20help');
    });
});
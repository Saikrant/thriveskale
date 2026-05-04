import { describe, expect, it } from 'vitest';
import { generateWhatsAppLink } from '../whatsappUtils';

describe('generateWhatsAppLink', () => {
    it('creates a WhatsApp URL with encoded lead details', () => {
        const link = generateWhatsAppLink('19704122140', {
            name: 'Sai Kranth',
            email: 'sai@example.com',
            phone: '9704122140',
            service: 'AI Automation',
            message: 'Need website + chatbot help',
        });

        expect(link).toContain('https://wa.me/19704122140');
        expect(link).toContain('Name%3A%20Sai%20Kranth');
        expect(link).toContain('Email%3A%20sai%40example.com');
        expect(link).toContain('Phone%3A%209704122140');
        expect(link).toContain('Service%20Interest%3A%20AI%20Automation');
        expect(link).toContain('Message%3A%20Need%20website%20%2B%20chatbot%20help');
    });

    it('uses N/A for missing optional contact fields', () => {
        const link = generateWhatsAppLink('19704122140', {
            name: 'Sai Kranth',
            service: 'AI Automation',
            message: 'Need help',
        });

        expect(link).toContain('Email%3A%20N%2FA');
        expect(link).toContain('Phone%3A%20N%2FA');
    });
});
import { describe, expect, it } from 'vitest';
import { classifyLead, scoreLead } from '../leadScoring';

describe('lead scoring', () => {
    it('scores known industries higher than unknown industries', () => {
        expect(scoreLead({ businessType: 'Healthcare', message: 'Need help' }))
            .toBeGreaterThan(scoreLead({ businessType: 'Other', message: 'Need help' }));
    });

    it('adds score for urgent and AI-related messages', () => {
        const basicScore = scoreLead({
            businessType: 'Restaurant',
            message: 'Need help with my website',
        });

        const urgentAiScore = scoreLead({
            businessType: 'Restaurant',
            message: 'Urgent need for AI chatbot automation this week',
        });

        expect(urgentAiScore).toBeGreaterThan(basicScore);
    });

    it('penalizes very short messages', () => {
        expect(scoreLead({ businessType: 'Other', message: 'Hi' })).toBe(0);
    });

    it('caps scores at 100', () => {
        const score = scoreLead({
            businessType: 'Healthcare',
            message: 'urgent asap immediately this week launch bookings ai automation agent chatbot workflow '.repeat(3),
        });

        expect(score).toBeLessThanOrEqual(100);
    });

    it('classifies leads by priority', () => {
        expect(classifyLead({
            businessType: 'Healthcare',
            message: 'Urgent AI automation workflow needed this week for patient intake and bookings',
        }).priority).toBe('high');

        expect(classifyLead({
            businessType: 'Retail',
            message: 'Need better email automation for store promotions and website leads',
        }).priority).toBe('medium');

        expect(classifyLead({
            businessType: 'Other',
            message: 'Hi',
        }).priority).toBe('low');
    });
});
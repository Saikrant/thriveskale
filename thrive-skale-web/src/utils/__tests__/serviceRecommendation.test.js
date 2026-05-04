import { describe, expect, it } from 'vitest';
import {
    getPrimaryServiceRecommendation,
    getRecommendedServices,
} from '../serviceRecommendation';

describe('service recommendations', () => {
    it('returns industry-specific recommendations', () => {
        expect(getRecommendedServices('Restaurant')).toEqual([
            'Custom Website',
            'Online Ordering',
            'AI Chatbot',
        ]);

        expect(getRecommendedServices('Real Estate')).toEqual([
            'Lead Capture Landing Page',
            'CRM Automation',
            'AI Follow-up Agent',
        ]);
    });

    it('falls back to default recommendations for unknown industries', () => {
        expect(getRecommendedServices('Manufacturing')).toEqual([
            'Discovery Call',
            'Custom Website',
            'Workflow Automation',
        ]);
    });

    it('returns the first recommendation as the primary service', () => {
        expect(getPrimaryServiceRecommendation('Healthcare')).toBe('Appointment Website');
        expect(getPrimaryServiceRecommendation('Unknown')).toBe('Discovery Call');
    });
});
import { describe, expect, it } from 'vitest';
import { LEAD_STEPS, PLAN_OPTIONS } from '../leadSteps';

const step = (id) => LEAD_STEPS.find((s) => s.id === id);
const plans = PLAN_OPTIONS.map((p) => p.id);

describe('lead engine steps', () => {
    it('has six steps with coverage for every plan', () => {
        expect(LEAD_STEPS).toHaveLength(6);
        LEAD_STEPS.forEach((s) => {
            plans.forEach((p) => expect(['full', 'partial', 'none'], `${s.id}/${p}`).toContain(s.coverage[p].level));
        });
    });

    it('keeps the CRM, instant reply and team alerts out of the Lead Website', () => {
        ['crm', 'reply', 'alert'].forEach((id) => {
            expect(step(id).coverage.website.level).toBe('none');
            expect(step(id).coverage.system.level).toBe('full');
        });
    });

    it('includes ads and the monthly report only with Lead Growth', () => {
        expect(step('report').coverage.system.level).toBe('none');
        expect(step('report').coverage.growth.level).toBe('full');
        expect(step('ads').coverage.system.level).toBe('partial');
        expect(step('ads').coverage.growth.level).toBe('full');
    });

    it('never covers less when you move up a plan', () => {
        const rank = { none: 0, partial: 1, full: 2 };
        LEAD_STEPS.forEach((s) => {
            expect(rank[s.coverage.system.level]).toBeGreaterThanOrEqual(rank[s.coverage.website.level]);
            expect(rank[s.coverage.growth.level]).toBeGreaterThanOrEqual(rank[s.coverage.system.level]);
        });
    });

    it('describes the lead tool without promising a smart calculator', () => {
        expect(JSON.stringify(LEAD_STEPS)).not.toMatch(/smart calculator/i);
    });
});

import { describe, expect, it } from 'vitest';
import {
    BUSINESS_TYPES,
    getTouchedContactFields,
    normalizePhoneNumber,
    validateContactField,
    validateContactForm,
} from '../contactValidation';

describe('contact validation', () => {
    it('normalizes phone numbers by removing spaces, parentheses, and dashes', () => {
        expect(normalizePhoneNumber('(970) 412-2140')).toBe('9704122140');
        expect(normalizePhoneNumber('+1 970-412-2140')).toBe('+19704122140');
    });

    it('accepts valid contact fields', () => {
        expect(validateContactField('name', 'Sai')).toBe('');
        expect(validateContactField('email', 'sai@example.com')).toBe('');
        expect(validateContactField('phone', '(970) 412-2140')).toBe('');
        expect(validateContactField('businessType', BUSINESS_TYPES[0])).toBe('');
        expect(validateContactField('message', 'I need a website')).toBe('');
    });

    it('returns field-level errors for invalid values', () => {
        expect(validateContactField('email', 'not-an-email')).toBe('Please enter a valid email');
        expect(validateContactField('phone', '123')).toBe('Please enter a valid phone number');
        expect(validateContactField('businessType', 'Unknown Industry')).toBe('Please select a valid industry');
    });

    it('validates the whole contact form', () => {
        const errors = validateContactForm({
            name: '',
            email: 'bad-email',
            phone: '123',
            businessType: 'Unknown',
            message: '',
        });

        expect(errors).toEqual({
            name: 'This field is required',
            email: 'Please enter a valid email',
            phone: 'Please enter a valid phone number',
            businessType: 'Please select a valid industry',
            message: 'This field is required',
        });
    });

    it('marks all contact fields as touched', () => {
        expect(getTouchedContactFields()).toEqual({
            name: true,
            email: true,
            phone: true,
            businessType: true,
            message: true,
        });
    });
});
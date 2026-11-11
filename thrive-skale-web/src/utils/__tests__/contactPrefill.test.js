import { afterEach, describe, expect, it, vi } from 'vitest';
import { PREFILL_EVENT, contactPrefillMessage, requestContact } from '../contactPrefill';

afterEach(() => { document.body.innerHTML = ''; });

describe('contact prefill', () => {
    it('builds a plain message for the chosen package', () => {
        expect(contactPrefillMessage('the Lead System')).toBe("I'm interested in the Lead System.");
    });

    it('sends the message to the contact form and focuses the name field', () => {
        document.body.innerHTML = '<section id="contact"><input id="ct-name"></section>';
        document.getElementById('contact').scrollIntoView = vi.fn();
        const heard = vi.fn();
        window.addEventListener(PREFILL_EVENT, heard, { once: true });

        requestContact('the Online Store');

        expect(heard.mock.calls[0][0].detail.message).toBe("I'm interested in the Online Store.");
        expect(document.activeElement.id).toBe('ct-name');
    });
});

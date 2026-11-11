/* Lets a package or plan button fill in the contact message, then takes the
   visitor to the form. Contact.jsx listens for the event. */
export const PREFILL_EVENT = 'contact:prefill';

export const contactPrefillMessage = (subject) => `I'm interested in ${subject}.`;

export const requestContact = (subject) => {
    window.dispatchEvent(new CustomEvent(PREFILL_EVENT, { detail: { message: contactPrefillMessage(subject) } }));
    const section = document.getElementById('contact');
    if (section) section.scrollIntoView();
    const field = document.getElementById('ct-name');
    if (field) field.focus({ preventScroll: true });
};

/* Focus the first field that has an error, after React has rendered the errors. */
export const focusFirstInvalid = (form) => {
    requestAnimationFrame(() => {
        const first = form?.querySelector('[aria-invalid="true"]');
        if (first) first.focus();
    });
};

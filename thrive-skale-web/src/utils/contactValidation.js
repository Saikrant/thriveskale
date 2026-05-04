export const BUSINESS_TYPES = [
    'Restaurant',
    'Real Estate',
    'Healthcare',
    'Salon/Spa',
    'Gym/Fitness',
    'Retail',
    'Education',
    'Home Services',
    'Other',
];

export const CONTACT_FIELDS = ['name', 'email', 'phone', 'businessType', 'message'];

export const normalizePhoneNumber = (value = '') => String(value).replace(/[\s()-]/g, '');

export const validateContactField = (name, value) => {
    const textValue = String(value ?? '').trim();

    if (!textValue) return 'This field is required';

    if (name === 'email') {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(textValue)) return 'Please enter a valid email';
    }

    if (name === 'phone') {
        const phonePattern = /^[+]?[0-9]{10,15}$/;
        if (!phonePattern.test(normalizePhoneNumber(textValue))) {
            return 'Please enter a valid phone number';
        }
    }

    if (name === 'businessType' && !BUSINESS_TYPES.includes(textValue)) {
        return 'Please select a valid industry';
    }

    return '';
};

export const validateContactForm = (formData) => CONTACT_FIELDS.reduce((errors, field) => {
    const error = validateContactField(field, formData[field]);
    if (error) errors[field] = error;
    return errors;
}, {});

export const getTouchedContactFields = () => CONTACT_FIELDS.reduce((state, field) => {
    state[field] = true;
    return state;
}, {});

export const normalizeContactLead = (formData) => ({
    name: String(formData.name ?? '').trim(),
    email: String(formData.email ?? '').trim(),
    phone: String(formData.phone ?? '').trim(),
    businessType: String(formData.businessType ?? '').trim(),
    message: String(formData.message ?? '').trim(),
});

export const buildContactWhatsAppMessage = (formData) => {
    const lead = normalizeContactLead(formData);

    return `*New Inquiry from Website*\n\n` +
        `*Name:* ${lead.name}\n` +
        `*Email:* ${lead.email}\n` +
        `*Phone:* ${lead.phone}\n` +
        `*Industry:* ${lead.businessType}\n` +
        `*Message:* ${lead.message}`;
};

export const buildContactWhatsAppUrl = (ownerNumber, formData) => {
    const encodedMessage = encodeURIComponent(buildContactWhatsAppMessage(formData));
    return `https://wa.me/${ownerNumber}?text=${encodedMessage}`;
};

export const generateWhatsAppLink = (ownerNumber, data) => {
    const text = `New Lead from Website:
Name: ${data.name || 'N/A'}
Email: ${data.email || 'N/A'}
Phone: ${data.phone || 'N/A'}
Service Interest: ${data.service || 'N/A'}
Message: ${data.message || 'N/A'}`;

    const encodedText = encodeURIComponent(text);
    return `https://wa.me/${ownerNumber}?text=${encodedText}`;
};

const RECOMMENDATIONS = {
    Restaurant: ['Custom Website', 'Online Ordering', 'AI Chatbot'],
    'Real Estate': ['Lead Capture Landing Page', 'CRM Automation', 'AI Follow-up Agent'],
    Healthcare: ['Appointment Website', 'Patient Intake Automation', 'Reputation Management'],
    'Salon/Spa': ['Booking Website', 'Instagram Lead Automation', 'Review Requests'],
    'Gym/Fitness': ['Membership Landing Page', 'Trial Booking Flow', 'SMS Follow-up'],
    Retail: ['E-commerce Website', 'Inventory Showcase', 'Email Automation'],
    Education: ['Program Landing Page', 'Inquiry Funnel', 'Parent Follow-up Automation'],
    'Home Services': ['Local SEO Website', 'Quote Request Flow', 'WhatsApp Follow-up'],
    Other: ['Discovery Call', 'Custom Website', 'Workflow Automation'],
};

export const getRecommendedServices = (businessType = 'Other') => (
    RECOMMENDATIONS[businessType] ?? RECOMMENDATIONS.Other
);

export const getPrimaryServiceRecommendation = (businessType = 'Other') => getRecommendedServices(businessType)[0];

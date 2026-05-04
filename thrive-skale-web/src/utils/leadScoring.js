const INDUSTRY_WEIGHTS = {
    Healthcare: 20,
    'Real Estate': 18,
    Education: 16,
    Restaurant: 14,
    Retail: 12,
    'Salon/Spa': 10,
    'Gym/Fitness': 10,
    'Home Services': 10,
    Other: 6,
};

const URGENCY_KEYWORDS = ['urgent', 'asap', 'immediately', 'this week', 'launch', 'bookings'];
const AI_KEYWORDS = ['ai', 'automation', 'agent', 'chatbot', 'workflow'];

export const scoreLead = ({ businessType = 'Other', message = '' } = {}) => {
    const normalizedMessage = message.toLowerCase();
    let score = INDUSTRY_WEIGHTS[businessType] ?? INDUSTRY_WEIGHTS.Other;

    if (URGENCY_KEYWORDS.some((keyword) => normalizedMessage.includes(keyword))) score += 25;
    if (AI_KEYWORDS.some((keyword) => normalizedMessage.includes(keyword))) score += 20;
    if (message.length >= 120) score += 10;
    if (message.length > 0 && message.length < 25) score -= 10;

    return Math.max(0, Math.min(100, score));
};

export const classifyLead = (lead) => {
    const score = scoreLead(lead);

    if (score >= 55) return { score, priority: 'high' };
    if (score >= 30) return { score, priority: 'medium' };
    return { score, priority: 'low' };
};

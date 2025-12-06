export const workflow = {
    start: {
        id: 'start',
        message: (data) => `Hi ${data.name || 'there'}! I'm the ThrivvSkale AI assistant. I received your message about "${data.message?.substring(0, 30)}${data.message?.length > 30 ? '...' : ''}".`,
        next: 'phone_verification',
        delay: 1000
    },
    phone_verification: {
        id: 'phone_verification',
        message: "To better assist you, could you please verify your phone number?",
        input: {
            type: 'text',
            key: 'phone',
            placeholder: "Enter your phone number..."
        },
        next: 'service_selection',
        delay: 1000
    },
    service_selection: {
        id: 'service_selection',
        message: "Thanks! To ensure we connect you with the right expert, what service are you most interested in?",
        options: [
            "Website Setup",
            "Digital Marketing",
            "Mobile Apps",
            "AI & Automation",
            "General Inquiry"
        ],
        input: {
            key: 'service'
        },
        next: 'service_confirmation',
        delay: 1000
    },
    service_confirmation: {
        id: 'service_confirmation',
        message: (data) => `Excellent choice. I've forwarded your request to our ${data.service} team.`,
        next: 'booking_info',
        delay: 1000
    },
    booking_info: {
        id: 'booking_info',
        message: (data) => `A specialist will call you at ${data.phone} shortly to schedule your first business meeting.`,
        next: 'closing_options',
        delay: 1000
    },
    closing_options: {
        id: 'closing_options',
        message: "Is there anything else I can help you with?",
        options: ["No, that's all", "Book a specific time", "Send details via WhatsApp"],
        next: (input) => {
            if (input.toLowerCase().includes('book')) return 'booking_coordination';
            if (input.toLowerCase().includes('whatsapp')) return 'whatsapp_connect';
            return 'final_closing';
        },
        delay: 1000
    },
    booking_coordination: {
        id: 'booking_coordination',
        message: "Our team will coordinate a time that works best for you during the call. We look forward to speaking with you!",
        end: true,
        delay: 1000
    },
    whatsapp_connect: {
        id: 'whatsapp_connect',
        message: "Opening WhatsApp... You can send your details directly to our team there.",
        action: 'open_whatsapp',
        end: true,
        delay: 1000
    },
    final_closing: {
        id: 'final_closing',
        message: "Great! We look forward to helping you scale. Have a wonderful day!",
        end: true,
        delay: 1000
    }
};

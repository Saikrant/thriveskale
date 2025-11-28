import React, { useState, useEffect, useRef } from 'react';
import './AIAgent.css';
import { workflow } from './workflowConfig';

const AIAgent = ({ initialData, onClose }) => {
    const [messages, setMessages] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const [currentNodeId, setCurrentNodeId] = useState('start');
    const [userData, setUserData] = useState({ ...initialData });
    const [isConversationEnded, setIsConversationEnded] = useState(false);
    const messagesEndRef = useRef(null);
    const hasInitialized = useRef(false);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isTyping]);

    useEffect(() => {
        if (hasInitialized.current) return;
        hasInitialized.current = true;

        // Start the workflow
        processNode('start', initialData);
    }, []);

    const addMessage = (type, text, options = null) => {
        setMessages(prev => [...prev, { id: Date.now(), type, text, options }]);
    };

    const handleSend = () => {
        if (!inputValue.trim()) return;

        const text = inputValue;
        setInputValue('');
        addMessage('user', text);
        setIsTyping(true);

        handleInput(text);
    };

    const handleOptionClick = (option) => {
        addMessage('user', option);
        setIsTyping(true);
        handleInput(option);
    };

    const handleInput = (input) => {
        const currentNode = workflow[currentNodeId];

        // Update user data if the current node expects input
        if (currentNode.input && currentNode.input.key) {
            setUserData(prev => ({ ...prev, [currentNode.input.key]: input }));
        }

        // Determine next node
        let nextNodeId = currentNode.next;
        if (typeof nextNodeId === 'function') {
            nextNodeId = nextNodeId(input);
        }

        if (nextNodeId) {
            processNode(nextNodeId, { ...userData, [currentNode.input?.key]: input });
        } else if (currentNode.end) {
            setIsConversationEnded(true);
            setIsTyping(false);
        }
    };

    const processNode = (nodeId, currentData) => {
        const node = workflow[nodeId];
        if (!node) return;

        setCurrentNodeId(nodeId);
        setIsTyping(true);

        setTimeout(() => {
            const messageText = typeof node.message === 'function' ? node.message(currentData) : node.message;
            addMessage('agent', messageText, node.options);

            setIsTyping(false);

            // Auto-advance if no input/options required and there is a next node
            if (!node.input && !node.options && node.next) {
                let nextNodeId = node.next;
                if (typeof nextNodeId === 'function') {
                    // Should not happen for auto-advance without input, but safe check
                    nextNodeId = nextNodeId('');
                }
                processNode(nextNodeId, currentData);
            }

            if (node.end) {
                setIsConversationEnded(true);
            }
        }, node.delay || 1000);
    };

    return (
        <div className="ai-agent-overlay">
            <div className="ai-agent-modal">
                <div className="agent-header">
                    <div className="agent-identity">
                        <div className="agent-avatar">🤖</div>
                        <div className="agent-info">
                            <h3>ThrivvSkale AI</h3>
                            <span>Online • Typically replies instantly</span>
                        </div>
                    </div>
                    <button className="close-agent-btn" onClick={onClose}>&times;</button>
                </div>

                <div className="chat-messages">
                    {messages.map((msg) => (
                        <div key={msg.id} className={`message ${msg.type}`}>
                            {msg.text}
                            {msg.options && (
                                <div className="options-container">
                                    {msg.options.map((opt, idx) => (
                                        <button key={idx} className="option-btn" onClick={() => handleOptionClick(opt)}>
                                            {opt}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                    {isTyping && (
                        <div className="typing-indicator">
                            <div className="typing-dot"></div>
                            <div className="typing-dot"></div>
                            <div className="typing-dot"></div>
                        </div>
                    )}
                    <div ref={messagesEndRef} />
                </div>

                <div className="chat-input-area">
                    <input
                        type="text"
                        className="chat-input"
                        placeholder={workflow[currentNodeId]?.input?.placeholder || "Type your message..."}
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                        disabled={isConversationEnded || !workflow[currentNodeId]?.input}
                    />
                    <button className="send-btn" onClick={handleSend} disabled={isConversationEnded || !workflow[currentNodeId]?.input}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="22" y1="2" x2="11" y2="13"></line>
                            <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AIAgent;

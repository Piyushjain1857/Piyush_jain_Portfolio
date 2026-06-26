import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send } from 'react-feather';
// Removed tilt/magnetic hooks based on user request
import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize Gemini
const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
const genAI = apiKey ? new GoogleGenerativeAI(apiKey) : null;

const SYSTEM_INSTRUCTION = `
You are the AI assistant for Piyush Jain's personal portfolio website.
Piyush Jain is a Full-Stack Software Engineer who loves building robust backend systems and intelligent AI integrations.
His skills: HTML, CSS, JavaScript, React, Node.js, Python, FastAPI, Docker, and AWS.
His projects: 
- Curio: Premium AI platform integrating diverse models
- Agro AI: Predictive analytics system for farmers using ML
- Cyber Guardian: Automated threat detection analyzing network logs in real-time
- StreamHub: Netflix-inspired video streaming platform
Contact info: Email at Piyushjain1857@gmail.com or call +91 8595850153.
Education: He is constantly learning and building, turning caffeine into code.
Tone: Be friendly, concise, and helpful. Always try to promote Piyush's skills and direct them to hire him. DO NOT hallucinate info not provided here.
`;

export default function Chatbot() {
    const [isOpen, setIsOpen] = useState(false);
    const [history, setHistory] = useState([
        { id: 1, text: "Hi! I'm Piyush's AI assistant. Ask me about his skills, projects, or experience!", sender: 'bot' }
    ]);
    const [inputValue, setInputValue] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const [chatSession, setChatSession] = useState(null);

    const chatEndRef = useRef(null);
    const inputRef = useRef(null);

    // Initialize chat session on mount
    useEffect(() => {
        if (genAI) {
            try {
                const model = genAI.getGenerativeModel({
                    model: "gemini-2.5-flash",
                    systemInstruction: SYSTEM_INSTRUCTION,
                });
                const session = model.startChat({
                    history: [],
                });
                setChatSession(session);
            } catch (error) {
                console.error("Failed to initialize Gemini:", error);
            }
        }
    }, []);

    // Auto-scroll chat to bottom
    useEffect(() => {
        if (chatEndRef.current) {
            setTimeout(() => {
                if (chatEndRef.current) {
                    chatEndRef.current.scrollTop = chatEndRef.current.scrollHeight;
                }
            }, 50);
        }
    }, [history, isTyping, isOpen]);

    const handleSend = async () => {
        const val = inputValue.trim();
        if (!val) return;

        // User message
        const nextId = history.length + 1;
        setHistory(prev => [...prev, { id: nextId, text: val, sender: 'user' }]);
        setInputValue('');
        setIsTyping(true);

        if (!genAI || !chatSession) {
            setTimeout(() => {
                setIsTyping(false);
                setHistory(prev => [...prev, { id: prev.length + 1, text: "My AI brain is offline! Please configure the VITE_GEMINI_API_KEY in the .env file.", sender: 'bot' }]);
            }, 1000);
            return;
        }

        try {
            const result = await chatSession.sendMessage(val);
            const responseText = result.response.text();
            setHistory(prev => [...prev, { id: prev.length + 1, text: responseText, sender: 'bot' }]);
        } catch (error) {
            console.error("Chatbot API Error:", error);
            setHistory(prev => [...prev, { id: prev.length + 1, text: "Oops, I encountered an error. The API key might be invalid or rate limited.", sender: 'bot' }]);
        } finally {
            setIsTyping(false);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') handleSend();
    };

    const handleToggle = () => {
        setIsOpen(!isOpen);
        if (!isOpen) {
            setTimeout(() => {
                if (inputRef.current) inputRef.current.focus();
            }, 100);
        }
    };

    return (
        <div className="chatbot-wrapper">
            <button 
                className="chatbot-toggle" 
                aria-label="Open AI Assistant"
                onClick={handleToggle}
            >
                <MessageCircle size={24} />
            </button>
            <div 
                className={`chatbot-window ${isOpen ? 'active' : ''}`}
            >
                <div className="chatbot-header">
                    <div className="chatbot-title">
                        <div className="pulse-dot"></div>
                        AI Assistant
                    </div>
                    <button id="chatbot-close" onClick={() => setIsOpen(false)}>
                        <X size={16} />
                    </button>
                </div>
                <div id="chatbot-messages" className="chatbot-messages" ref={chatEndRef} data-lenis-prevent="true">
                    {history.map((msg) => (
                        <div key={msg.id} className={`chat-bubble ${msg.sender}`}>
                            {msg.text}
                        </div>
                    ))}
                    {isTyping && (
                        <div className="chat-bubble bot typing">
                            <span>.</span><span>.</span><span>.</span>
                        </div>
                    )}
                </div>
                <div className="chatbot-input-area">
                    <input 
                        id="chatbot-input"
                        ref={inputRef}
                        type="text" 
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder="Ask something..." 
                    />
                    <button id="chatbot-send" onClick={handleSend}>
                        <Send size={14} />
                    </button>
                </div>
            </div>
        </div>
    );
}

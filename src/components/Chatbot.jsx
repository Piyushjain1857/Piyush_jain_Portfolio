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
His skills: HTML, CSS, JavaScript, TypeScript, React, Node.js, Python, FastAPI, Docker, PostgreSQL, AWS, ELK Stack, and TensorFlow.
He confidently uses both JavaScript and TypeScript in his projects.

His projects: 
1. Curio: Premium AI platform integrating diverse AI models (React, Node.js, OpenAI API)
2. Agro AI: Predictive analytics system for farmers using ML (Python, TensorFlow, FastAPI)
3. Hostel Leave Management: Full-stack system for students and wardens (React, Node.js, PostgreSQL)
// 4. Cyber Guardian: Automated threat detection analyzing network logs in real-time (Python, ELK Stack, Docker)
// 5. StreamHub: Netflix-inspired video streaming platform (React, Vite, TMDB API)
// 6. MediCare+: Healthcare appointment booking platform (React, Node.js)
// 7. Maison Dorée: Luxury restaurant web experience (React, Vite, CSS3)
// 8. Jarvis AI Assistant: Voice-activated AI assistant for macOS
// 9. Auto-Job Apply Bot: Selenium-based automation tool for job applications
// 10. HTML/CSS/JS Projects & Games: The Bodyline GYM, Health Center, Inner Peace, Restaurant Website, Limbo Reflex Game, Tic Tac Toe, Rock Paper Scissors, Mines.

Contact info: Email at Piyushjain1857@gmail.com or call +91 8595850153.
Education: He is constantly learning and building, turning caffeine into code.

Tone: Be confident, concise, and strictly to the point when answering questions about Piyush. Do not use extra conversational filler. 
NEVER express doubt about his skills. If asked about TypeScript, confidently state that he uses it along with JavaScript.
IMPORTANT: If the user asks basic questions like "hi", "hello", "how are you", "kaise ho", or other small talk, YOU MUST reply politely. You can say you are doing well, introduce yourself as Piyush's AI assistant, and ask how you can help them learn more about Piyush.
DO NOT hallucinate info about Piyush's skills or projects that is not provided here.
`;

export default function Chatbot() {
    const [isOpen, setIsOpen] = useState(false);
    const [history, setHistory] = useState(() => {
        const saved = localStorage.getItem('chatbot_history');
        if (saved) {
            try {
                return JSON.parse(saved);
            } catch (e) {
                console.error("Error parsing chatbot history:", e);
            }
        }
        return [
            { id: 1, text: "Hi! I'm Piyush's AI assistant. Ask me about his skills, projects, or experience!", sender: 'bot' }
        ];
    });
    const [inputValue, setInputValue] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const [chatSession, setChatSession] = useState(null);

    const chatEndRef = useRef(null);
    const inputRef = useRef(null);

    // Save history to localStorage
    useEffect(() => {
        localStorage.setItem('chatbot_history', JSON.stringify(history));
    }, [history]);

    // Initialize chat session on mount
    useEffect(() => {
        if (genAI) {
            try {
                const model = genAI.getGenerativeModel({
                    model: "gemini-2.5-flash",
                    systemInstruction: SYSTEM_INSTRUCTION,
                });
                
                // Hydrate Gemini session with past history
                const geminiHistory = history
                    .filter(msg => msg.id !== 1 && !msg.text.includes('API key might be invalid') && !msg.text.includes('My AI brain is offline'))
                    .map(msg => ({
                        role: msg.sender === 'user' ? 'user' : 'model',
                        parts: [{ text: msg.text }]
                    }));

                const session = model.startChat({
                    history: geminiHistory,
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

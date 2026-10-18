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
1. Superpower AR Engine: Cinematic real-time superhero simulator (Python 3.12, ModernGL Shaders, MediaPipe, OpenCV, Pygame)
2. Chicken Roads: Casino-style arcade crossing game with procedural Web Audio API synthesizers and risk multipliers (JavaScript, Canvas, Web Audio API)
3. Mines: High-stakes strategic grid game with real-time sound synthesis and tile cashout mechanics (JavaScript, Web Audio API, CSS3)
4. Limbo Reflex Game: Fast-paced neon arcade reflex game with Canvas 2D particle explosions and difficulty tiers (JavaScript, HTML5, CSS3)
5. AI Virtual Mouse: Contactless computer control using MediaPipe hand landmark tracking and futuristic React HUD (Python, OpenCV, MediaPipe, React)
6. Cyberpunk Rock Paper Scissors & Neon Tic-Tac-Toe: Interactive glowing arcade games with custom animations and AI
7. Curio AI: Premium adaptive cloud quiz engine with personalized AI pathways (React, FastAPI, Python, SQLite)
8. Agro AI: Computer vision and conversational LLM assistant for crop diagnostics (Python, TensorFlow, FastAPI, React)
9. Hostel Leave Management System (HLMS): Enterprise multi-portal campus leave system (React, Node.js, Express, PostgreSQL)
10. FORTUNA: Gojek-inspired wealth manager with Neo-Brutalist UI and offline-first persistence (TypeScript, React, Vite)
11. UniFlow X: AI-powered Digital Operating System for Universities (React, Node.js, TailwindCSS)
12. PJ Social: Creator campaign verification portal (React, Node.js, Express)
13. Text to SQL with Gemini: Natural language to SQL query converter (Python, Google Gemini, Streamlit)
14. PDF Intelligence RAG: Document question-answering with FAISS vector search and Gemini (LangChain, FAISS, Gemini)
15. StreamHub & Travel App: High-performance streaming and trip planning web apps (React, Vite, Framer Motion)
16. Creative UI & Lifestyle: CLUBONIX, Maison Dorée, The Bodyline GYM, Inner Peace, Health Center.

Contact info: Email at Piyushjain1857@gmail.com or call +91 8595850153.
Resume: Visitors can view or download Piyush's resume directly at /resume.pdf or by clicking the Resume button in the navigation bar.
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

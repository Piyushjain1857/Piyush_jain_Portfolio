import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send } from 'react-feather';
import useTilt from '../hooks/useTilt';
import useMagnetic from '../hooks/useMagnetic';

export default function Chatbot() {
    const [isOpen, setIsOpen] = useState(false);
    const [history, setHistory] = useState([
        { id: 1, text: "Hi! I'm Piyush's AI assistant. Ask me about his skills, projects, or experience!", sender: 'bot' }
    ]);
    const [inputValue, setInputValue] = useState('');
    const [isTyping, setIsTyping] = useState(false);

    const toggleRef = useMagnetic();
    const windowRef = useTilt();
    const chatEndRef = useRef(null);
    const inputRef = useRef(null);

    const responses = {
        "who are you": "I am an AI assistant representing Piyush Jain. Piyush is a Full-Stack Software Engineer who loves building robust backend systems.",
        "projects": "Piyush has built several projects including Curio, Agro AI, StreamHub, Cyber Guardian, and AI Analytics Suite. You can view them in the Projects section.",
        "skills": "Piyush excels in HTML, CSS, JavaScript, React, Node.js, Python, FastAPI, Docker, and AWS.",
        "education": "He is constantly learning and building, turning caffeine into code.",
        "contact": "You can reach Piyush at Piyushjain1857@gmail.com or call +91 8595850153.",
        "experience": "He has extensive experience in Full-Stack development and AI/ML integrations, having participated in various hackathons and leadership roles."
    };

    // Auto-scroll chat to bottom
    useEffect(() => {
        if (chatEndRef.current) {
            chatEndRef.current.scrollTop = chatEndRef.current.scrollHeight;
        }
    }, [history, isTyping, isOpen]);

    const handleSend = () => {
        const val = inputValue.trim().toLowerCase();
        if (!val) return;

        // User message
        const nextId = history.length + 1;
        setHistory(prev => [...prev, { id: nextId, text: inputValue, sender: 'user' }]);
        setInputValue('');
        setIsTyping(true);

        setTimeout(() => {
            setIsTyping(false);
            let responseText = "I'm not sure about that. Try asking about his skills, projects, or contact info!";
            for (let key in responses) {
                if (val.includes(key)) {
                    responseText = responses[key];
                    break;
                }
            }
            setHistory(prev => [...prev, { id: prev.length + 1, text: responseText, sender: 'bot' }]);
        }, 1000);
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
                ref={toggleRef}
                className="chatbot-toggle magnetic-btn" 
                aria-label="Open AI Assistant"
                onClick={handleToggle}
            >
                <MessageCircle size={24} />
            </button>
            <div 
                ref={windowRef} 
                className={`chatbot-window tilt-card ${isOpen ? 'active' : ''}`}
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
                <div id="chatbot-messages" className="chatbot-messages" ref={chatEndRef}>
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

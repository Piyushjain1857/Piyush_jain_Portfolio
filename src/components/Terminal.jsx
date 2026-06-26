import React, { useState, useRef, useEffect } from 'react';
import useTilt from '../hooks/useTilt';

export default function Terminal() {
    const tiltRef = useTilt();
    const [history, setHistory] = useState([
        {
            type: 'output',
            text: <>Welcome to Piyush OS v1.0.0.<br />Type 'help' to see available commands.</>
        }
    ]);
    const [inputValue, setInputValue] = useState('');
    const bodyRef = useRef(null);

    const commands = {
        help: "Available commands: help, about, projects, resume, skills, contact, github, theme, clear, sudo hire piyush",
        about: "Piyush Jain is a Full-Stack Software Engineer building scalable backend systems and intelligent AI integrations.",
        projects: "Featured: Curio, Agro AI, StreamHub, Cyber Guardian. Type 'github' to see more.",
        skills: "Languages: Python, JavaScript, Java, C++ | Frameworks: React, Node.js, FastAPI | Tools: Docker, AWS, Git",
        contact: "Email: Piyushjain1857@gmail.com | Phone: +91 8595850153",
        github: "Redirecting to GitHub...",
        "sudo hire piyush": "Access Granted. Initializing offer letter protocols... just kidding, please email me at Piyushjain1857@gmail.com!",
        theme: "Use the theme switcher in the navigation bar to toggle between Dark, Light, Cyberpunk, and Forest themes.",
    };

    // Auto-scroll to bottom
    useEffect(() => {
        if (bodyRef.current) {
            bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
        }
    }, [history]);

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            const cmd = inputValue.trim().toLowerCase();
            setInputValue('');

            // Append input command
            const newHistory = [...history, { type: 'input', text: cmd }];

            if (cmd === 'clear') {
                setHistory([]);
                return;
            }

            if (cmd === '') {
                setHistory(newHistory);
                return;
            }

            let response;
            if (commands[cmd] !== undefined) {
                response = commands[cmd];
                // Handle redirect for github
                if (cmd === 'github') {
                    setTimeout(() => {
                        window.open('https://github.com/Piyushjain1857', '_blank');
                    }, 1000);
                }
            } else {
                response = `bash: ${cmd}: command not found. Type 'help' for available commands.`;
            }

            setHistory([...newHistory, { type: 'output', text: response }]);
        }
    };

    return (
        <section id="terminal" className="section terminal-section">
            <div className="container">
                <h2 className="section-title reveal"><span>05.</span> Interactive Terminal</h2>
                <div ref={tiltRef} className="terminal-container reveal tilt-card">
                    <div className="terminal-header">
                        <div className="terminal-buttons">
                            <span className="t-btn close"></span>
                            <span className="t-btn minimize"></span>
                            <span className="t-btn maximize"></span>
                        </div>
                        <div className="terminal-title">piyush@macbook:~</div>
                    </div>
                    <div className="terminal-body" ref={bodyRef}>
                        {history.map((line, idx) => (
                            <div key={idx} className={line.type === 'output' ? 'terminal-response' : ''}>
                                {line.type === 'input' ? (
                                    <>
                                        <span className="prompt">piyush@macbook:~$</span> {line.text}
                                    </>
                                ) : (
                                    line.text
                                )}
                            </div>
                        ))}
                    </div>
                    <div className="terminal-input-wrapper">
                        <span className="prompt">piyush@macbook:~$</span>
                        <input
                            type="text"
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            onKeyDown={handleKeyDown}
                            autoComplete="off"
                            spellCheck="false"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}

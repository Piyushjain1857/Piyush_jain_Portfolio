import React, { useState, useEffect } from 'react';
import { GitHub, Linkedin, Code, Mail } from 'react-feather';
import useMagnetic from '../hooks/useMagnetic';

export default function Hero() {
    const [text, setText] = useState('');
    const [particles, setParticles] = useState([]);
    const viewWorkRef = useMagnetic();
    const contactRef = useMagnetic();

    const phrases = [
        "Scalable Backend Systems.",
        "Interactive Web Apps.",
        "AI/ML Integrations.",
        "Premium User Interfaces."
    ];

    // Typewriter effect
    useEffect(() => {
        let isMounted = true;
        let phraseIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let typingSpeed = 100;
        let timer;

        const type = () => {
            if (!isMounted) return;
            const currentPhrase = phrases[phraseIndex];

            if (isDeleting) {
                setText(currentPhrase.substring(0, charIndex - 1));
                charIndex--;
                typingSpeed = 50;
            } else {
                setText(currentPhrase.substring(0, charIndex + 1));
                charIndex++;
                typingSpeed = 100;
            }

            if (!isDeleting && charIndex === currentPhrase.length) {
                isDeleting = true;
                typingSpeed = 1500; // Pause at end
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                phraseIndex = (phraseIndex + 1) % phrases.length;
                typingSpeed = 500; // Pause before typing next
            }

            timer = setTimeout(type, typingSpeed);
        };

        timer = setTimeout(type, 1000);

        return () => {
            isMounted = false;
            clearTimeout(timer);
        };
    }, []);

    // Particles background generator
    useEffect(() => {
        const tempParticles = [];
        const count = 50;
        for (let i = 0; i < count; i++) {
            tempParticles.push({
                id: i,
                size: Math.random() * 4 + 1,
                left: Math.random() * 100,
                top: Math.random() * 100,
                duration: Math.random() * 20 + 10,
                delay: Math.random() * 5,
                opacity: Math.random() * 0.3 + 0.1
            });
        }
        setParticles(tempParticles);

        if (!document.getElementById('float-particle-keyframes')) {
            const style = document.createElement('style');
            style.id = 'float-particle-keyframes';
            style.textContent = `
                @keyframes float-particle {
                    0% { transform: translateY(0) translateX(0); opacity: 0; }
                    10% { opacity: 1; }
                    90% { opacity: 1; }
                    100% { transform: translateY(-100vh) translateX(${Math.random() * 100 - 50}px); opacity: 0; }
                }
            `;
            document.head.appendChild(style);
        }
    }, []);

    return (
        <section id="home" className="hero">
            <div className="hero-background">
                <div className="gradient-sphere sphere-1"></div>
                <div className="gradient-sphere sphere-2"></div>
                <div className="particles" id="particles">
                    {particles.map(p => (
                        <div
                            key={p.id}
                            className="particle"
                            style={{
                                position: 'absolute',
                                width: `${p.size}px`,
                                height: `${p.size}px`,
                                background: `rgba(255, 255, 255, ${p.opacity})`,
                                borderRadius: '50%',
                                left: `${p.left}%`,
                                top: `${p.top}%`,
                                animation: `float-particle ${p.duration}s linear infinite`,
                                animationDelay: `${p.delay}s`,
                                pointerEvents: 'none'
                            }}
                        />
                    ))}
                </div>
            </div>
            <div className="container hero-content">
                <div className="availability-badge">
                    <span className="pulse-dot"></span> Available for new opportunities
                </div>
                <h1 className="hero-title">
                    Hi, I'm <span className="gradient-text">Piyush Jain</span>
                </h1>
                <h2 className="hero-subtitle">
                    I build <span className="typing-text" id="typewriter">{text}</span><span className="cursor">|</span>
                </h2>
                <p className="hero-description">
                    "Consistency beats talent when talent doesn't work hard." <br />
                    Full-Stack Software Engineer specializing in backend systems, AI/ML integrations, and crafting
                    pixel-perfect, performant user interfaces.
                </p>
                <div className="hero-cta">
                    <a href="#projects" ref={viewWorkRef} className="btn btn-primary magnetic-btn">View Work</a>
                    <a href="#contact" ref={contactRef} className="btn btn-secondary magnetic-btn">Contact Me</a>
                </div>
                <div className="social-links hero-social">
                    <a href="https://github.com/Piyushjain1857" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                        <GitHub size={20} />
                    </a>
                    <a href="https://linkedin.com/in/piyushjain1857" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                        <Linkedin size={20} />
                    </a>
                    <a href="https://leetcode.com/u/piyushjain1857/" target="_blank" rel="noopener noreferrer" aria-label="LeetCode">
                        <Code size={20} />
                    </a>
                    <a href="mailto:Piyushjain1857@gmail.com" aria-label="Email">
                        <Mail size={20} />
                    </a>
                </div>
            </div>
            <a href="#about" className="scroll-indicator">
                <span className="mouse">
                    <span className="wheel"></span>
                </span>
            </a>
        </section>
    );
}

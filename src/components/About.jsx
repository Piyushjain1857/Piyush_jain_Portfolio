import React from 'react';
import { Terminal, Cpu, Layout } from 'react-feather';
import useTilt from '../hooks/useTilt';

export default function About() {
    const tiltRef = useTilt();

    return (
        <section id="about" className="section about-section">
            <div className="container">
                <h2 className="section-title reveal"><span>01.</span> About Me</h2>
                <div className="about-grid">
                    <div className="about-content reveal">
                        <p className="about-text">
                            I am a driven <strong>Full-Stack Software Engineer</strong> with a strong foundation in
                            backend systems, AI/ML engineering, and web development. I thrive on architecting scalable,
                            efficient solutions and transforming complex problems into elegant, user-centric products.
                        </p>
                        <p className="about-text">
                            With experience across various hackathons and leadership roles, I understand that
                            <em>consistency beats talent when talent doesn't work hard.</em>
                        </p>
                        <div class="about-highlights">
                            <div className="highlight-item">
                                <Terminal size={18} />
                                <span>Backend Architect</span>
                            </div>
                            <div className="highlight-item">
                                <Cpu size={18} />
                                <span>AI Integrations</span>
                            </div>
                            <div className="highlight-item">
                                <Layout size={18} />
                                <span>Frontend Magic</span>
                            </div>
                        </div>
                    </div>
                    <div ref={tiltRef} className="about-image-wrapper reveal tilt-card">
                        <div className="about-image-border"></div>
                        <img 
                            src="/assets/profile.jpg" 
                            alt="Piyush Jain" 
                            className="about-image"
                            onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = 'https://via.placeholder.com/400x500/0a0a0a/6366f1?text=Piyush+Jain';
                            }}
                        />
                        <div className="about-glow"></div>
                    </div>
                </div>
            </div>
        </section>
    );
}

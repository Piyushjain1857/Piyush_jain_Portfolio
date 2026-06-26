import React from 'react';
import { Terminal, Cpu, Layout, Layers } from 'react-feather';
import useTilt from '../hooks/useTilt';

export default function About() {
    const tiltRef = useTilt();

    return (
        <section id="about" className="section about-section">
            <div className="container">
                <div className="about-grid">
                    <div className="about-content reveal">
                        <h2 className="section-title" style={{ marginBottom: '5rem' }}><span>01.</span> About Me</h2>
                        <p className="about-text">
                            I am a driven <strong>Full-Stack Software Engineer</strong> with a strong foundation in
                            backend systems, AI/ML engineering, and web development. I thrive on architecting scalable,
                            efficient solutions and transforming complex problems into elegant, user-centric products.
                        </p>
                        <p className="about-text">
                            With experience across various hackathons and leadership roles, I understand that
                            <em> <b>&quot;Consistency beats talent when talent doesn't work hard.&quot;</b></em>
                        </p>
                        <div className="about-highlights">
                            <a href="https://roadmap.sh/frontend" target="_blank" rel="noopener noreferrer" className="highlight-item" style={{ textDecoration: 'none', color: 'inherit' }}>
                                <Layout size={18} />
                                <span>Frontend Magic</span>
                            </a>
                            <a href="https://roadmap.sh/backend" target="_blank" rel="noopener noreferrer" className="highlight-item" style={{ textDecoration: 'none', color: 'inherit' }}>
                                <Terminal size={18} />
                                <span>Backend Architect</span>
                            </a>
                            <a href="https://roadmap.sh/full-stack" target="_blank" rel="noopener noreferrer" className="highlight-item" style={{ textDecoration: 'none', color: 'inherit' }}>
                                <Layers size={18} />
                                <span>Full Stack Developer</span>
                            </a>
                            <a href="https://roadmap.sh/ai-data-scientist" target="_blank" rel="noopener noreferrer" className="highlight-item" style={{ textDecoration: 'none', color: 'inherit' }}>
                                <Cpu size={18} />
                                <span>AI Integrations</span>
                            </a>
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

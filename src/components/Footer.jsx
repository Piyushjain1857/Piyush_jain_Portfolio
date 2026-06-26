import React, { useState, useEffect } from 'react';
import { GitHub, Code, Mail, ArrowUp } from 'react-feather';

export default function Footer() {
    const [backToTopVisible, setBackToTopVisible] = useState(false);
    const currentYear = new Date().getFullYear();

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 500) {
                setBackToTopVisible(true);
            } else {
                setBackToTopVisible(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <footer className="footer">
            <div className="container footer-content">
                <div className="footer-code-block">
                    <pre>
                        <code>
                            <span className="keyword">while</span>(<span className="variable">alive</span>) {'{'}
                            {'\n'}    <span className="function">learn</span>();
                            {'\n'}    <span className="function">build</span>();
                            {'\n'}    <span className="function">improve</span>();
                            {'\n'}    <span className="function">repeat</span>();
                            {'\n'}{'}'}
                        </code>
                    </pre>
                </div>
                <div className="footer-links">
                    <a href="https://github.com/Piyushjain1857" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                        <GitHub size={18} />
                    </a>
                    <a href="https://leetcode.com/u/piyushjain1857/" target="_blank" rel="noopener noreferrer" aria-label="LeetCode">
                        <Code size={18} />
                    </a>
                    <a href="mailto:Piyushjain1857@gmail.com" aria-label="Email">
                        <Mail size={18} />
                    </a>
                </div>
                <p className="copyright">&copy; {currentYear} Piyush Jain. All rights reserved.</p>
            </div>
            <button 
                id="back-to-top" 
                className="back-to-top" 
                aria-label="Back to top"
                style={{ 
                    opacity: backToTopVisible ? 1 : 0, 
                    pointerEvents: backToTopVisible ? 'all' : 'none',
                    transition: 'opacity 0.3s ease' 
                }}
                onClick={scrollToTop}
            >
                <ArrowUp size={18} />
            </button>
        </footer>
    );
}

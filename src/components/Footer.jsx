import React from 'react';
import '../css/Footer.css';
import {
    FaTwitter,
    FaInstagram,
    FaGithub,
    FaBehance
} from 'react-icons/fa';
import { Mail, ArrowRight, Linkedin } from 'react-feather';

const Footer = () => {
    return (
        <footer className="premium-footer">
            <div className="premium-footer-container">

                {/* Top Section: CTA and Email */}
                <div className="footer-top-section">
                    <div className="footer-cta">
                        <h3>HAVE AN EXCITING PROJECT IN MIND?</h3>
                        <a href="#contact" className="footer-cta-link">
                            LET'S WORK TOGETHER <ArrowRight size={28} className="cta-arrow" />
                        </a>
                    </div>
                    <div className="footer-email-box">
                        <a href="https://linkedin.com/in/piyushjain1857" target="_blank" rel="noopener noreferrer" className="contact-link">
                            <Linkedin size={18} className="contact-icon" />
                            Piyushjain1857
                        </a>
                        <a href="mailto:Piyushjain1857@gmail.com" className="contact-link">
                            <Mail size={18} className="contact-icon" />
                            Piyushjain1857@gmail.com
                        </a>
                    </div>
                </div>

                <div className="footer-divider"></div>

                {/* Middle Section: Navigation & Platforms */}
                <div className="footer-middle-section">
                    <div className="footer-col">
                        <h4>NAVIGATION</h4>
                        <div className="footer-links-row">
                            <a href="#home">Home</a>
                            <a href="#about">About</a>
                            <a href="#skills">Skills</a>
                            <a href="#projects">Projects</a>
                            <a href="#dashboard">Dashboard</a>
                            <a href="#terminal">Terminal</a>
                            <a href="#contact">Contact</a>
                        </div>
                    </div>
                    <div className="footer-col">
                        <h4>PLATFORMS</h4>
                        <div className="footer-links-row">
                            <a href="https://github.com/Piyushjain1857" target="_blank" rel="noopener noreferrer">GitHub</a>
                            <a href="https://linkedin.com/in/piyushjain1857" target="_blank" rel="noopener noreferrer">LinkedIn</a>
                            <a href="https://leetcode.com/u/piyushjain1857/" target="_blank" rel="noopener noreferrer">LeetCode</a>
                        </div>
                    </div>
                </div>

                <div className="footer-divider"></div>

                {/* Main Grid: Services, Skills, Social */}
                <div className="footer-grid-section">
                    <div className="footer-grid-col">
                        <h4>SERVICES</h4>
                        <ul>
                            <li><a href="#skills">Web Design</a></li>
                            <li><a href="#skills">Frontend Dev</a></li>
                            <li><a href="#skills">Backend Dev</a></li>
                            <li><a href="#skills">FullStack Dev</a></li>
                            <li><a href="#skills">AI Intregations</a></li>
                        </ul>
                    </div>
                    <div className="footer-grid-col">
                        <h4>SKILLS</h4>
                        <ul>
                            <li><a href="https://react.dev/" target="_blank" rel="noopener noreferrer">React</a></li>
                            <li><a href="https://nodejs.org/" target="_blank" rel="noopener noreferrer">Node.js</a></li>
                            <li><a href="https://www.python.org/" target="_blank" rel="noopener noreferrer">Python</a></li>
                            <li><a href="https://www.postgresql.org/" target="_blank" rel="noopener noreferrer">PostgreSQL</a></li>
                            <li><a href="https://fastapi.tiangolo.com/" target="_blank" rel="noopener noreferrer">FastAPI</a></li>
                        </ul>
                    </div>
                    <div className="footer-grid-col">
                        <h4>SOCIAL</h4>
                        <ul className="footer-social-list">
                            <li>
                                <a href="https://twitter.com/Piyushjain1857" target="_blank" rel="noopener noreferrer">
                                    <FaTwitter className="social-icon twitter" /> Twitter
                                </a>
                            </li>
                            <li>
                                <a href="https://github.com/Piyushjain1857" target="_blank" rel="noopener noreferrer">
                                    <FaGithub className="social-icon github" /> GitHub
                                </a>
                            </li>
                            <li>
                                <a href="https://leetcode.com/u/piyushjain1857/" target="_blank" rel="noopener noreferrer">
                                    <FaInstagram className="social-icon Versal" /> Versal
                                </a>
                            </li>
                            <li>
                                <a href="https://vercel.com/piyushjain1857-8221s-projects" target="_blank" rel="noopener noreferrer">
                                    <FaBehance className="social-icon Leetcode" /> Leetcode
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

            </div>

            {/* Bottom Bar: Copyright and Status */}
            <div className="footer-bottom-bar">
                <div className="footer-bottom-container">
                    <div className="copyright">
                        &copy; {new Date().getFullYear()} PIYUSH JAIN. ALL RIGHTS RESERVED.
                    </div>
                    <div className="status-badges">
                        <div className="status-pill green">
                            <span className="pulse-dot"></span> AVAILABLE FOR OPPORTUNITIES
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;

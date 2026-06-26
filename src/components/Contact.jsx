import React from 'react';
import { Mail, Phone, Send, Linkedin } from 'react-feather';
import useTilt from '../hooks/useTilt';
import useMagnetic from '../hooks/useMagnetic';

export default function Contact() {
    const emailTiltRef = useTilt();
    const phoneTiltRef = useTilt();
    const linkedinTiltRef = useTilt();
    const formTiltRef = useTilt();
    const submitRef = useMagnetic();

    const handleSubmit = (e) => {
        e.preventDefault();
        alert('Message feature simulated! Please use the email provided.');
    };

    return (
        <section id="contact" className="section contact-section">
            <div className="container">
                <h2 className="section-title reveal"><span>06.</span> Get In Touch</h2>
                <div className="contact-grid reveal">
                    <div className="contact-info">
                        <h3>Let's build something extraordinary.</h3>
                        <p>I'm currently looking for new opportunities. Whether you have a question, a project idea, or
                            just want to say hi, I'll try my best to get back to you!</p>
                        <div className="contact-methods">
                            <a 
                                href="mailto:Piyushjain1857@gmail.com" 
                                ref={emailTiltRef}
                                className="contact-method tilt-card"
                            >
                                <Mail size={20} />
                                <div>
                                    <h4>Email</h4>
                                    <span>Piyushjain1857@gmail.com</span>
                                </div>
                            </a>
                            <a 
                                href="tel:+918595850153" 
                                ref={phoneTiltRef}
                                className="contact-method tilt-card"
                            >
                                <Phone size={20} />
                                <div>
                                    <h4>Phone</h4>
                                    <span>+91 8595850153</span>
                                </div>
                            </a>
                            <a 
                                href="https://linkedin.com/in/piyushjain1857" 
                                target="_blank"
                                rel="noopener noreferrer"
                                ref={linkedinTiltRef}
                                className="contact-method tilt-card"
                            >
                                <Linkedin size={20} />
                                <div>
                                    <h4>LinkedIn</h4>
                                    <span>Piyush Jain</span>
                                </div>
                            </a>
                        </div>
                    </div>
                    <form 
                        ref={formTiltRef}
                        className="contact-form tilt-card"
                        onSubmit={handleSubmit}
                    >
                        <div className="form-group">
                            <label htmlFor="name">Name</label>
                            <input type="text" id="name" required placeholder="John Doe" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input type="email" id="email" required placeholder="john@example.com" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="message">Message</label>
                            <textarea id="message" rows="5" required placeholder="Hello Piyush..."></textarea>
                        </div>
                        <button 
                            ref={submitRef}
                            type="submit" 
                            className="btn btn-primary magnetic-btn" 
                            style={{ width: '100%' }}
                        >
                            Send Message <Send size={16} style={{ marginLeft: '8px', verticalAlign: 'middle' }} />
                        </button>
                    </form>
                </div>
            </div>
        </section>
    );
}

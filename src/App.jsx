import React, { useState, useEffect } from 'react';
import { ReactLenis } from 'lenis/react';
import LoadingScreen from './components/LoadingScreen';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Dashboard from './components/Dashboard';
import Terminal from './components/Terminal';
import Contact from './components/Contact';
import Chatbot from './components/Chatbot';
import Footer from './components/Footer';

export default function App() {
    const [loadingComplete, setLoadingComplete] = useState(false);
    const [theme, setTheme] = useState(() => {
        return localStorage.getItem('portfolio-theme') || 'dark';
    });

    // Custom Cursor / Mouse Spotlight effect
    useEffect(() => {
        const handleMouseMove = (e) => {
            document.documentElement.style.setProperty('--mouse-x', `${e.clientX}px`);
            document.documentElement.style.setProperty('--mouse-y', `${e.clientY}px`);
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    // Set html element data-theme attribute when theme changes
    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('portfolio-theme', theme);
    }, [theme]);

    // IntersectionObserver for reveal animation
    useEffect(() => {
        if (!loadingComplete) return;

        // Give React a small tick to render everything
        const timer = setTimeout(() => {
            const revealElements = document.querySelectorAll('.reveal');
            const revealObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('active');
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.1, rootMargin: "0px 0px -50px 0px" });

            revealElements.forEach(el => revealObserver.observe(el));
        }, 100);

        return () => clearTimeout(timer);
    }, [loadingComplete]);

    return (
        <ReactLenis root>
            <LoadingScreen onComplete={() => setLoadingComplete(true)} />
            
            {loadingComplete && (
                <>
                    <div className="noise-overlay"></div>
                    <div className="mouse-spotlight"></div>
                    
                    <Navbar theme={theme} setTheme={setTheme} />
                    
                    <main>
                        <Hero />
                        <About />
                        <Skills />
                        <Projects />
                        <Dashboard />
                        <Terminal />
                        <Contact />
                    </main>
                    
                    <Chatbot />
                    <Footer />
                </>
            )}
        </ReactLenis>
    );
}

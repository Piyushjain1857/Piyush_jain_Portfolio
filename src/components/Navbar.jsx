import React, { useState, useEffect } from 'react';
import { Sun, Moon, Zap, Feather as FeatherIcon, Menu, X } from 'react-feather';

export default function Navbar({ theme, setTheme }) {
    const [themeMenuOpen, setThemeMenuOpen] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [scrollWidth, setScrollWidth] = useState(0);
    const [activeLink, setActiveLink] = useState('home');

    // Scroll listener for progress and scroll spy
    useEffect(() => {
        const handleScroll = () => {
            // Scroll progress
            const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
            const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrolled = height > 0 ? (winScroll / height) * 100 : 0;
            setScrollWidth(scrolled);

            // Scroll Spy
            const sections = document.querySelectorAll('section');
            let current = 'home';
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                if (window.scrollY >= (sectionTop - sectionHeight / 3)) {
                    current = section.getAttribute('id');
                }
            });
            setActiveLink(current);
        };

        window.addEventListener('scroll', handleScroll);
        // Run once on load
        handleScroll();

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const toggleThemeMenu = (e) => {
        e.stopPropagation();
        setThemeMenuOpen(!themeMenuOpen);
    };

    useEffect(() => {
        const closeThemeMenu = () => setThemeMenuOpen(false);
        document.addEventListener('click', closeThemeMenu);
        return () => document.removeEventListener('click', closeThemeMenu);
    }, []);

    const handleThemeChange = (newTheme) => {
        setTheme(newTheme);
        setThemeMenuOpen(false);
    };

    const getThemeIcon = (themeName) => {
        switch (themeName) {
            case 'light': return <Sun size={16} />;
            case 'cyberpunk': return <Zap size={16} />;
            case 'forest': return <FeatherIcon size={16} />;
            default: return <Moon size={16} />;
        }
    };

    const navItems = [
        { id: 'about', label: 'About' },
        { id: 'skills', label: 'Skills' },
        { id: 'projects', label: 'Projects' },
        { id: 'dashboard', label: 'Dashboard' },
        { id: 'terminal', label: 'Terminal' },
        { id: 'contact', label: 'Contact' }
    ];

    return (
        <nav className="glass-nav" id="navbar">
            <div className="nav-container">
                <a href="#home" className="nav-logo" onClick={() => setMobileMenuOpen(false)}>Piyush<span>.</span></a>
                <div className={`nav-links ${mobileMenuOpen ? 'mobile-open' : ''}`}>
                    {navItems.map((item) => (
                        <a
                            key={item.id}
                            href={`#${item.id}`}
                            className={`nav-link ${activeLink === item.id ? 'active' : ''}`}
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            {item.label}
                        </a>
                    ))}
                </div>
                <div className="nav-actions">
                    <div className={`theme-switcher ${themeMenuOpen ? 'active' : ''}`}>
                        <button
                            id="theme-toggle"
                            className="btn btn-outline btn-sm"
                            aria-label="Switch Theme"
                            onClick={toggleThemeMenu}
                        >
                            {getThemeIcon(theme)}
                        </button>
                        <div className="theme-menu" id="theme-menu">
                            <button
                                className={`theme-option ${theme === 'dark' ? 'active' : ''}`}
                                onClick={() => handleThemeChange('dark')}
                            >
                                <Moon size={14} /> Dark
                            </button>
                            <button
                                className={`theme-option ${theme === 'light' ? 'active' : ''}`}
                                onClick={() => handleThemeChange('light')}
                            >
                                <Sun size={14} /> Light
                            </button>
                            <button
                                className={`theme-option ${theme === 'cyberpunk' ? 'active' : ''}`}
                                onClick={() => handleThemeChange('cyberpunk')}
                            >
                                <Zap size={14} /> Cyberpunk
                            </button>
                            <button
                                className={`theme-option ${theme === 'forest' ? 'active' : ''}`}
                                onClick={() => handleThemeChange('forest')}
                            >
                                <FeatherIcon size={14} /> Forest
                            </button>
                        </div>
                    </div>
                    <a href="/assets/resume.pdf" target="_blank" className="btn btn-outline btn-sm">Resume</a>
                    <button
                        id="mobile-menu-btn"
                        className="mobile-menu-btn"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    >
                        {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
                    </button>
                </div>
            </div>
            <div className="scroll-progress-bar" id="scroll-progress" style={{ width: `${scrollWidth}%` }}></div>
        </nav>
    );
}

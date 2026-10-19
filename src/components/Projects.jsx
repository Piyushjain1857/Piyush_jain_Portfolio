import React, { useState, useMemo } from 'react';
import { GitHub, ExternalLink, Play } from 'react-feather';
import useTilt from '../hooks/useTilt';

function ProjectCard({ project }) {
    const tiltRef = useTilt();

    return (
        <div ref={tiltRef} className="project-card tilt-card">
            <div className="project-img-wrapper">
                <div className="project-overlay"></div>
                <img
                    src={project.img}
                    alt={project.title}
                    className="project-img"
                    onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = 'https://via.placeholder.com/600x400/0a0a0a/6366f1?text=' + encodeURIComponent(project.title);
                    }}
                />
            </div>
            <div className="project-info">
                <div className="project-category">{project.category}</div>
                <h3 className="project-title">{project.title}</h3>
                <p className="project-desc">{project.desc}</p>
                <div className="project-tech">
                    {project.tech.map((t, idx) => (
                        <a key={idx} href={t.url} target="_blank" rel="noopener noreferrer">{t.name}</a>
                    ))}
                </div>
                <div className="project-links">
                    <a href={project.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub" title="View Source Code">
                        <GitHub size={18} />
                    </a>
                    {project.demo && project.demo !== '#' && (
                        <a href={project.demo} target="_blank" rel="noopener noreferrer" aria-label="Live Demo" title="Open Live Project">
                            {project.category.includes('Game') || project.category.includes('AR') ? <Play size={18} /> : <ExternalLink size={18} />}
                        </a>
                    )}
                </div>
            </div>
        </div>
    );
}

export default function Projects() {
    const [activeFilter, setActiveFilter] = useState('all');

    const projectsData = [
        // ─── 1. ORIGINAL PROJECTS (EXACT ORIGINAL ORDER PRESERVED) ───
        {
            category: "AI / Full-Stack",
            title: "Curio",
            desc: "A premium platform integrating diverse AI models into a unified interface for seamless experimentation and workflow automation.",
            tech: [
                { name: "React", url: "https://react.dev/" },
                { name: "Node.js", url: "https://nodejs.org/" },
                { name: "OpenAI API", url: "https://platform.openai.com/" }
            ],
            img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=600&q=80",
            github: "https://github.com/Piyushjain1857/Cloud-Based-Online-Quiz-System.git",
            demo: "#"
        },
        {
            category: "Machine Learning",
            title: "Agro AI",
            desc: "Predictive analytics system for farmers, utilizing climate data and deep learning models to forecast crop yields and detect diseases.",
            tech: [
                { name: "Python", url: "https://www.python.org/" },
                { name: "FastAPI", url: "https://fastapi.tiangolo.com/" }
            ],
            img: "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=600&q=80",
            github: "https://github.com/Piyushjain1857/AgroAi-frontend.git",
            github_Backend: "https://github.com/Piyushjain1857/AgroAi-backend.git",
            demo: "#"
        },
        {
            category: "Security",
            title: "Cyber Guardian",
            desc: "Automated threat detection system analyzing network logs in real-time utilizing anomaly detection algorithms.",
            tech: [
                { name: "Python", url: "https://www.python.org/" },
                { name: "ELK Stack", url: "https://www.elastic.co/elastic-stack/" },
                { name: "Docker", url: "https://www.docker.com/" }
            ],
            img: "/assets/cyber_guardian.png",
            github: "https://github.com/Piyushjain1857",
            demo: "#"
        },
        {
            category: "Web App",
            title: "Hostel Leave Management",
            desc: "A full-stack hostel leave management system enabling students to apply for leaves, track approval status, and allowing wardens to manage requests via an admin dashboard.",
            tech: [
                { name: "React", url: "https://react.dev/" },
                { name: "Node.js", url: "https://nodejs.org/" },
                { name: "PostgreSQL", url: "https://www.postgresql.org/" }
            ],
            img: "/assets/hostel_leave_app.png",
            github: "https://github.com/Piyushjain1857/Hostel_Leave_Management_system_backend",
            demo: "#"
        },
        {
            category: "React / Vite App",
            title: "Travel App",
            desc: "A premium travel planning platform designed to budget, plan, and organize trips day-by-day. Features interactive itinerary builders, visual expense analytics, and fluid animations.",
            tech: [
                { name: "React", url: "https://react.dev/" },
                { name: "Vite", url: "https://vitejs.dev/" },
                { name: "Framer Motion", url: "https://www.framer.com/motion/" },
                { name: "Recharts", url: "https://recharts.org/" }
            ],
            img: "/assets/travel_app.png",
            github: "https://github.com/Piyushjain1857/Travel",
            demo: "https://travel-one-beryl.vercel.app"
        },
        {
            category: "Entertainment / Full-Stack",
            title: "StreamHub",
            desc: "A sleek, Netflix-inspired video streaming platform with dynamic content discovery, trending carousels, genre filtering, and a cinematic UI built for modern audiences.",
            tech: [
                { name: "React", url: "https://react.dev/" },
                { name: "Vite", url: "https://vitejs.dev/" },
                { name: "TMDB API", url: "https://developer.themoviedb.org/docs" }
            ],
            img: "/assets/streamhub_app.png",
            github: "https://github.com/Piyushjain1857/Streamhub",
            demo: "https://streamhub-dusky.vercel.app"
        },
        {
            category: "Healthcare / Full-Stack",
            title: "MediCare+",
            desc: "A premium healthcare appointment booking platform featuring doctor discovery, real-time slot availability, health metrics tracking, and a seamless patient-doctor interface.",
            tech: [
                { name: "React", url: "https://react.dev/" },
                { name: "Node.js", url: "https://nodejs.org/" }
            ],
            img: "/assets/healthcare_app.png",
            github: "https://github.com/Piyushjain1857/Healthcare-Appointment-system",
            demo: "https://healthcare-appointment-system-mu.vercel.app"
        },
        {
            category: "UI / React",
            title: "Maison Dorée",
            desc: "An elegant luxury restaurant web experience featuring a curated menu, table reservation system, and an immersive fine-dining aesthetic with rich typography and ambient design.",
            tech: [
                { name: "React", url: "https://react.dev/" },
                { name: "Vite", url: "https://vitejs.dev/" },
                { name: "CSS3", url: "https://developer.mozilla.org/en-US/docs/Web/CSS" }
            ],
            img: "/assets/maison_doree_app.png",
            github: "https://github.com/Piyushjain1857/Maison-Doree.git",
            demo: "https://maison-doree-jewellery.vercel.app"
        },
        {
            category: "HTML / CSS / JS",
            title: "The Bodyline GYM",
            desc: "A high-impact gym fitness website with membership plans, workout class schedules, trainer profiles, and a bold dark theme with neon orange accents.",
            tech: [
                { name: "HTML", url: "https://developer.mozilla.org/en-US/docs/Web/HTML" },
                { name: "CSS", url: "https://developer.mozilla.org/en-US/docs/Web/CSS" },
                { name: "JavaScript", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript" }
            ],
            img: "/assets/bodyline_gym.png",
            github: "https://github.com/piyushjain1857/The_Bodyline_GYM",
            demo: "https://piyushjain1857.github.io/The_Bodyline_GYM/"
        },
        {
            category: "HTML / CSS / JS",
            title: "Health Center",
            desc: "A professional medical website showcasing healthcare services including cardiology, dentistry, and orthopedics, with a doctor directory and online appointment booking.",
            tech: [
                { name: "HTML", url: "https://developer.mozilla.org/en-US/docs/Web/HTML" },
                { name: "CSS", url: "https://developer.mozilla.org/en-US/docs/Web/CSS" },
                { name: "JavaScript", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript" }
            ],
            img: "/assets/health_center.png",
            github: "https://github.com/piyushjain1857/Health-Center",
            demo: "https://piyushjain1857.github.io/Health-Center/"
        },
        {
            category: "HTML / CSS / JS",
            title: "CLUBONIX™",
            desc: "A bespoke landing page for Delhi NCR's exclusive nightlife and creator community. Features custom canvas particle effects, preloader sequence, custom cursor, and a luxury design aesthetic.",
            tech: [
                { name: "HTML", url: "https://developer.mozilla.org/en-US/docs/Web/HTML" },
                { name: "CSS", url: "https://developer.mozilla.org/en-US/docs/Web/CSS" },
                { name: "JavaScript", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript" }
            ],
            img: "/assets/clubonix_app.png",
            github: "https://github.com/Piyushjain1857/CLUBONIX",
            demo: "https://piyushjain1857.github.io/CLUBONIX/"
        },
        {
            category: "HTML / CSS / JS",
            title: "Inner Peace",
            desc: "A serene mindfulness and mental wellness website featuring guided meditation resources, yoga practices, breathing exercises, and a calming lavender and sage green aesthetic.",
            tech: [
                { name: "HTML", url: "https://developer.mozilla.org/en-US/docs/Web/HTML" },
                { name: "CSS", url: "https://developer.mozilla.org/en-US/docs/Web/CSS" },
                { name: "JavaScript", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript" }
            ],
            img: "/assets/inner_peace.png",
            github: "https://github.com/piyushjain1857/Inner-Peace-Project",
            demo: "https://piyushjain1857.github.io/Inner-Peace-Project/"
        },
        {
            category: "HTML / CSS / JS",
            title: "Restaurant Website",
            desc: "A warm and inviting restaurant website with a hero food banner, menu categories, table reservation form, and smooth navigation across Home, About, Work and Service sections.",
            tech: [
                { name: "HTML", url: "https://developer.mozilla.org/en-US/docs/Web/HTML" },
                { name: "CSS", url: "https://developer.mozilla.org/en-US/docs/Web/CSS" },
                { name: "JavaScript", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript" }
            ],
            img: "/assets/restaurant_project.png",
            github: "https://github.com/piyushjain1857/Restorent-Project",
            demo: "https://piyushjain1857.github.io/Restorent-Project/"
        },
        {
            category: "HTML / CSS / JS · Game",
            title: "Limbo Reflex Game",
            desc: "A fast-paced browser reflex game where players dodge a moving bar using keyboard controls. Features score tracking, lives system, and a neon retro arcade aesthetic.",
            tech: [
                { name: "HTML", url: "https://developer.mozilla.org/en-US/docs/Web/HTML" },
                { name: "CSS", url: "https://developer.mozilla.org/en-US/docs/Web/CSS" },
                { name: "JavaScript", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript" }
            ],
            img: "/assets/limbo_game.png",
            github: "https://github.com/piyushjain1857/Limbo",
            demo: "https://piyushjain1857.github.io/Limbo/"
        },
        {
            category: "HTML / CSS / JS · Game",
            title: "Tic Tac Toe",
            desc: "A stylish two-player Tic Tac Toe game with a glowing neon UI, win detection, score tracking per player, and a satisfying animated winner announcement overlay.",
            tech: [
                { name: "HTML", url: "https://developer.mozilla.org/en-US/docs/Web/HTML" },
                { name: "CSS", url: "https://developer.mozilla.org/en-US/docs/Web/CSS" },
                { name: "JavaScript", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript" }
            ],
            img: "/assets/tictactoe_game.png",
            github: "https://github.com/piyushjain1857/Tic_Tac_Toe-Game",
            demo: "https://piyushjain1857.github.io/Tic_Tac_Toe-Game/"
        },
        {
            category: "HTML / CSS / JS · Game",
            title: "Rock Paper Scissors",
            desc: "A neon cyberpunk edition of Rock Paper Scissors where players battle the computer. Features glowing choice buttons, animated WIN/LOSE/DRAW results, and a live scoreboard.",
            tech: [
                { name: "HTML", url: "https://developer.mozilla.org/en-US/docs/Web/HTML" },
                { name: "CSS", url: "https://developer.mozilla.org/en-US/docs/Web/CSS" },
                { name: "JavaScript", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript" }
            ],
            img: "/assets/rock_paper_scissors.png",
            github: "https://github.com/piyushjain1857/Rock_Paper_Scisers",
            demo: "https://piyushjain1857.github.io/Rock_Paper_Scisers/"
        },
        {
            category: "HTML / CSS / JS · Game",
            title: "Mines",
            desc: "A strategic browser-based logic game where players must uncover safe tiles while avoiding hidden mines. Built with vanilla web technologies for a smooth interactive experience.",
            tech: [
                { name: "HTML", url: "https://developer.mozilla.org/en-US/docs/Web/HTML" },
                { name: "CSS", url: "https://developer.mozilla.org/en-US/docs/Web/CSS" },
                { name: "JavaScript", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript" }
            ],
            img: "https://images.unsplash.com/photo-1614294149010-950b698f72c0?auto=format&fit=crop&w=600&q=80",
            github: "https://github.com/Piyushjain1857/Mines",
            demo: "https://piyushjain1857.github.io/Mines/"
        },

        // ─── 2. ADDITIONAL GAMES & NEW PROJECTS ───
        {
            category: "HTML / CSS / JS · Game",
            title: "Chicken Roads Arcade",
            desc: "Casino-style horizontal arcade crossing game featuring procedural sound effects, dynamic risk multipliers, and smooth collision loops.",
            tech: [
                { name: "JavaScript", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript" },
                { name: "HTML5 Canvas", url: "https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API" },
                { name: "CSS3", url: "https://developer.mozilla.org/en-US/docs/Web/CSS" }
            ],
            img: "https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=600&q=80",
            github: "https://github.com/Piyushjain1857/Chicken_Roads",
            demo: "https://piyushjain1857.github.io/Chicken_Roads/"
        },
        {
            category: "Games & AR",
            title: "Superpower AR Engine",
            desc: "Cinematic real-time superhero simulator built with OpenCV for 60 FPS gesture-triggered energy blasts, particle FX, and superhero powers.",
            tech: [
                { name: "Python", url: "https://www.python.org/" },
                { name: "OpenCV", url: "https://opencv.org/" },
                { name: "Pygame", url: "https://www.pygame.org/" }
            ],
            img: "https://images.unsplash.com/photo-1535223289827-42f1e9919769?auto=format&fit=crop&w=600&q=80",
            github: "https://github.com/Piyushjain1857/superpower_ar_engine",
            demo: "https://github.com/Piyushjain1857/superpower_ar_engine"
        },
        {
            category: "Games & AR",
            title: "AI Virtual Mouse & HUD",
            desc: "Contactless computer control system leveraging hand landmark tracking for pinch clicks, drags, and scrolling paired with a futuristic React HUD control panel.",
            tech: [
                { name: "Python", url: "https://www.python.org/" },
                { name: "OpenCV", url: "https://opencv.org/" },
                { name: "React 18", url: "https://react.dev/" },
                { name: "Vite", url: "https://vitejs.dev/" }
            ],
            img: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=600&q=80",
            github: "https://github.com/Piyushjain1857/AI-Virtual-Mouse",
            demo: "https://github.com/Piyushjain1857/AI-Virtual-Mouse"
        },
        {
            category: "Full-Stack & Web",
            title: "FORTUNA Wealth Manager",
            desc: "A Gojek-inspired high-fidelity personal wealth manager and expense tracker featuring a bold Neo-Brutalist UI and zero-server local storage data management.",
            tech: [
                { name: "JavaScript", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript" },
                { name: "React", url: "https://react.dev/" },
                { name: "Vite", url: "https://vitejs.dev/" },
                { name: "CSS Modules", url: "https://developer.mozilla.org/en-US/docs/Web/CSS" }
            ],
            img: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=600&q=80",
            github: "https://github.com/Piyushjain1857/FORTUNA",
            demo: "https://github.com/Piyushjain1857/FORTUNA"
        },
        {
            category: "Full-Stack & Web",
            title: "UniFlow X",
            desc: "AI-powered Digital Operating System for Universities connecting Students, Faculty, Club Administrators, and University Administrators across a single ecosystem.",
            tech: [
                { name: "React", url: "https://react.dev/" },
                { name: "Node.js", url: "https://nodejs.org/" },
                { name: "Express", url: "https://expressjs.com/" },
                { name: "TailwindCSS", url: "https://tailwindcss.com/" }
            ],
            img: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=600&q=80",
            github: "https://github.com/Piyushjain1857/uniflow-x",
            demo: "https://github.com/Piyushjain1857/uniflow-x"
        },
        {
            category: "Full-Stack & Web",
            title: "PJ Social Verification Portal",
            desc: "Enterprise-grade full-stack portal engineered to verify creator campaign deliverables and engagements across Instagram, LinkedIn, and Facebook.",
            tech: [
                { name: "React", url: "https://react.dev/" },
                { name: "Node.js", url: "https://nodejs.org/" },
                { name: "REST APIs", url: "https://restfulapi.net/" },
                { name: "Express", url: "https://expressjs.com/" }
            ],
            img: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?auto=format&fit=crop&w=600&q=80",
            github: "https://github.com/Piyushjain1857/PJ-Social--Social-Media-Verification-Portal",
            demo: "https://github.com/Piyushjain1857/PJ-Social--Social-Media-Verification-Portal"
        },
        {
            category: "AI & GenAI",
            title: "Text to SQL with Gemini",
            desc: "Intelligent database querying application converting natural language questions into optimized SQL queries and executing them dynamically on SQLite via Streamlit.",
            tech: [
                { name: "Python", url: "https://www.python.org/" },
                { name: "Google Gemini", url: "https://ai.google.dev/" },
                { name: "SQLite", url: "https://www.sqlite.org/" },
                { name: "Streamlit", url: "https://streamlit.io/" }
            ],
            img: "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?auto=format&fit=crop&w=600&q=80",
            github: "https://github.com/Piyushjain1857/TextToSqlByGenAI",
            demo: "https://github.com/Piyushjain1857/TextToSqlByGenAI"
        },
        {
            category: "AI & GenAI",
            title: "PDF Intelligence & RAG Chatbot",
            desc: "Retrieval-Augmented Generation (RAG) system utilizing Gemini and Google Generative AI to chat with and analyze complex multi-page PDF documents.",
            tech: [
                { name: "Python", url: "https://www.python.org/" },
                { name: "LangChain", url: "https://www.langchain.com/" },
                { name: "Google GenAI", url: "https://ai.google.dev/" }
            ],
            img: "https://images.unsplash.com/photo-1568667256549-094345857637?auto=format&fit=crop&w=600&q=80",
            github: "https://github.com/Piyushjain1857/GenAI-Programme-to-make-pdf-analyser",
            demo: "https://github.com/Piyushjain1857/GenAI-Programme-to-make-pdf-analyser"
        },
        {
            category: "AI & GenAI",
            title: "YouTube Transcriber & Summarizer",
            desc: "Automated video pipeline extracting speech transcripts via YouTube API and structuring them into timestamps, key insights, and bulleted executive summaries.",
            tech: [
                { name: "Python", url: "https://www.python.org/" },
                { name: "Gemini AI", url: "https://ai.google.dev/" },
                { name: "YouTube API", url: "https://developers.google.com/youtube" },
                { name: "Streamlit", url: "https://streamlit.io/" }
            ],
            img: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&q=80",
            github: "https://github.com/Piyushjain1857/Youtube-Video-Transcribe-Summarizer_main",
            demo: "https://github.com/Piyushjain1857/Youtube-Video-Transcribe-Summarizer_main"
        },
        {
            category: "React / Vite App",
            title: "Party Pass Generator 🎉",
            desc: "A modern React web app built with Vite for generating dynamic party passes. Users input their details and instantly download tickets with personalized QR codes.",
            tech: [
                { name: "React", url: "https://react.dev/" },
                { name: "Vite", url: "https://vitejs.dev/" },
                { name: "QR Engine", url: "https://developer.mozilla.org/en-US/docs/Web/API" }
            ],
            img: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=600&q=80",
            github: "https://github.com/Piyushjain1857/Fresher-Party-Passes-generator",
            demo: "https://github.com/Piyushjain1857/Fresher-Party-Passes-generator"
        }
    ];

    const filterTabs = [
        { id: 'all', label: 'All Projects' },
        { id: 'games', label: '🎮 Games & AR' },
        { id: 'ai', label: '🤖 AI & GenAI' },
        { id: 'web', label: '🌐 Full-Stack & Web' },
        { id: 'ui', label: '✨ UI & Design' }
    ];

    const filteredProjects = useMemo(() => {
        if (activeFilter === 'all') return projectsData;
        if (activeFilter === 'games') {
            return projectsData.filter(p => p.category.includes('Game') || p.category.includes('AR'));
        }
        if (activeFilter === 'ai') {
            return projectsData.filter(p => p.category.includes('AI') || p.category.includes('Machine Learning') || p.category.includes('Security'));
        }
        if (activeFilter === 'web') {
            return projectsData.filter(p => p.category.includes('Full-Stack') || p.category.includes('Web') || p.category.includes('React / Vite') || p.category.includes('Healthcare') || p.category.includes('Entertainment'));
        }
        if (activeFilter === 'ui') {
            return projectsData.filter(p => (p.category.includes('HTML') || p.category.includes('UI')) && !p.category.includes('Game'));
        }
        return projectsData;
    }, [activeFilter]);

    const getCount = (id) => {
        if (id === 'all') return projectsData.length;
        if (id === 'games') return projectsData.filter(p => p.category.includes('Game') || p.category.includes('AR')).length;
        if (id === 'ai') return projectsData.filter(p => p.category.includes('AI') || p.category.includes('Machine Learning') || p.category.includes('Security')).length;
        if (id === 'web') return projectsData.filter(p => p.category.includes('Full-Stack') || p.category.includes('Web') || p.category.includes('React / Vite') || p.category.includes('Healthcare') || p.category.includes('Entertainment')).length;
        if (id === 'ui') return projectsData.filter(p => (p.category.includes('HTML') || p.category.includes('UI')) && !p.category.includes('Game')).length;
        return 0;
    };

    return (
        <section id="projects" className="section projects-section">
            <div className="container">
                <h2 className="section-title reveal"><span>03.</span> Selected Work</h2>

                {/* Filter Navigation */}
                <div className="projects-filter reveal">
                    {filterTabs.map((tab) => (
                        <button
                            key={tab.id}
                            className={`project-filter-btn ${activeFilter === tab.id ? 'active' : ''}`}
                            onClick={() => setActiveFilter(tab.id)}
                        >
                            <span>{tab.label}</span>
                            <span className="project-filter-badge">{getCount(tab.id)}</span>
                        </button>
                    ))}
                </div>

                <div className="projects-grid">
                    {filteredProjects.map((project, index) => (
                        <ProjectCard key={project.title + index} project={project} />
                    ))}
                </div>

                <div className="text-center reveal" style={{ marginTop: '4rem' }}>
                    <a href="https://github.com/Piyushjain1857" target="_blank" rel="noopener noreferrer" className="btn btn-outline">
                        View All 75+ Repositories on GitHub
                    </a>
                </div>
            </div>
        </section>
    );
}

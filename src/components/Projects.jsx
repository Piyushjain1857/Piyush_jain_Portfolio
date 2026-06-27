import React from 'react';
import { GitHub, ExternalLink } from 'react-feather';
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
                    <a href={project.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                        <GitHub size={18} />
                    </a>
                    {project.demo && project.demo !== '#' && (
                        <a href={project.demo} target="_blank" rel="noopener noreferrer" aria-label="Live Demo">
                            <ExternalLink size={18} />
                        </a>
                    )}
                </div>
            </div>
        </div>
    );
}

export default function Projects() {
    const projectsData = [
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
            github: "https://github.com/Piyushjain1857",
            demo: "#"
        },
        {
            category: "Machine Learning",
            title: "Agro AI",
            desc: "Predictive analytics system for farmers, utilizing climate data and deep learning models to forecast crop yields and detect diseases.",
            tech: [
                { name: "Python", url: "https://www.python.org/" },
                { name: "TensorFlow", url: "https://www.tensorflow.org/" },
                { name: "FastAPI", url: "https://fastapi.tiangolo.com/" }
            ],
            img: "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=600&q=80",
            github: "https://github.com/Piyushjain1857",
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
            github: "https://github.com/Piyushjain1857",
            demo: "#"
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
            github: "https://github.com/Piyushjain1857",
            demo: "https://streamhub-dusky.vercel.app"
        },
        {
            category: "Healthcare / Full-Stack",
            title: "MediCare+",
            desc: "A premium healthcare appointment booking platform featuring doctor discovery, real-time slot availability, health metrics tracking, and a seamless patient-doctor interface.",
            tech: [
                { name: "React", url: "https://react.dev/" },
                { name: "Node.js", url: "https://nodejs.org/" },
            ],
            img: "/assets/healthcare_app.png",
            github: "https://github.com/Piyushjain1857",
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
            github: "https://github.com/Piyushjain1857",
            demo: "https://first-react-app-kappa-ten.vercel.app"
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
            github: "https://github.com/piyushjain1857/web_development_project-1",
            demo: "https://piyushjain1857.github.io/Health-Center/"
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
        }
    ];

    return (
        <section id="projects" className="section projects-section">
            <div className="container">
                <h2 className="section-title reveal"><span>03.</span> Selected Work</h2>

                <div className="projects-grid">
                    {projectsData.map((project, index) => (
                        <ProjectCard key={index} project={project} />
                    ))}
                </div>

                <div className="text-center reveal" style={{ marginTop: '4rem' }}>
                    <a href="https://github.com/Piyushjain1857" target="_blank" rel="noopener noreferrer" className="btn btn-outline">
                        View More on GitHub
                    </a>
                </div>
            </div>
        </section>
    );
}

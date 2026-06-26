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
                        <span key={idx}>{t}</span>
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
            tech: ["React", "Node.js", "OpenAI API"],
            img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=600&q=80",
            github: "https://github.com/Piyushjain1857",
            demo: "#"
        },
        {
            category: "Machine Learning",
            title: "Agro AI",
            desc: "Predictive analytics system for farmers, utilizing climate data and deep learning models to forecast crop yields and detect diseases.",
            tech: ["Python", "TensorFlow", "FastAPI"],
            img: "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=600&q=80",
            github: "https://github.com/Piyushjain1857",
            demo: "#"
        },
        {
            category: "Security",
            title: "Cyber Guardian",
            desc: "Automated threat detection system analyzing network logs in real-time utilizing anomaly detection algorithms.",
            tech: ["Python", "ELK Stack", "Docker"],
            img: "/assets/cyber_guardian.png",
            github: "https://github.com/Piyushjain1857",
            demo: "#"
        },
        {
            category: "Web App",
            title: "Hostel Leave Management",
            desc: "A full-stack hostel leave management system enabling students to apply for leaves, track approval status, and allowing wardens to manage requests via an admin dashboard.",
            tech: ["React", "Node.js", "MongoDB"],
            img: "/assets/hostel_leave_app.png",
            github: "https://github.com/Piyushjain1857",
            demo: "#"
        },
        {
            category: "Healthcare / Full-Stack",
            title: "MediCare+",
            desc: "A premium healthcare appointment booking platform featuring doctor discovery, real-time slot availability, health metrics tracking, and a seamless patient-doctor interface.",
            tech: ["React", "Node.js", "PostgreSQL"],
            img: "/assets/healthcare_app.png",
            github: "https://github.com/Piyushjain1857",
            demo: "https://healthcare-appointment-system-mu.vercel.app"
        },
        {
            category: "Entertainment / Full-Stack",
            title: "StreamHub",
            desc: "A sleek, Netflix-inspired video streaming platform with dynamic content discovery, trending carousels, genre filtering, and a cinematic UI built for modern audiences.",
            tech: ["React", "Vite", "TMDB API"],
            img: "/assets/streamhub_app.png",
            github: "https://github.com/Piyushjain1857",
            demo: "https://streamhub-dusky.vercel.app"
        },
        {
            category: "UI / React",
            title: "Maison Dorée",
            desc: "An elegant luxury restaurant web experience featuring a curated menu, table reservation system, and an immersive fine-dining aesthetic with rich typography and ambient design.",
            tech: ["React", "Vite", "CSS3"],
            img: "/assets/maison_doree_app.png",
            github: "https://github.com/Piyushjain1857",
            demo: "https://first-react-app-kappa-ten.vercel.app"
        },
        {
            category: "HTML / CSS / JS",
            title: "The Bodyline GYM",
            desc: "A high-impact gym fitness website with membership plans, workout class schedules, trainer profiles, and a bold dark theme with neon orange accents.",
            tech: ["HTML", "CSS", "JavaScript"],
            img: "/assets/bodyline_gym.png",
            github: "https://github.com/piyushjain1857/The_Bodyline_GYM",
            demo: "https://piyushjain1857.github.io/The_Bodyline_GYM/"
        },
        {
            category: "HTML / CSS / JS",
            title: "Health Center",
            desc: "A professional medical website showcasing healthcare services including cardiology, dentistry, and orthopedics, with a doctor directory and online appointment booking.",
            tech: ["HTML", "CSS", "JavaScript"],
            img: "/assets/health_center.png",
            github: "https://github.com/piyushjain1857/web_development_project-1",
            demo: "https://piyushjain1857.github.io/web_development_project-1/"
        },
        {
            category: "HTML / CSS / JS",
            title: "Restaurant Website",
            desc: "A warm and inviting restaurant website with a hero food banner, menu categories, table reservation form, and smooth navigation across Home, About, Work and Service sections.",
            tech: ["HTML", "CSS", "JavaScript"],
            img: "/assets/restaurant_project.png",
            github: "https://github.com/piyushjain1857/Restorent-Project",
            demo: "https://piyushjain1857.github.io/Restorent-Project/"
        },
        {
            category: "HTML / CSS / JS · Game",
            title: "Limbo Reflex Game",
            desc: "A fast-paced browser reflex game where players dodge a moving bar using keyboard controls. Features score tracking, lives system, and a neon retro arcade aesthetic.",
            tech: ["HTML", "CSS", "JavaScript"],
            img: "/assets/limbo_game.png",
            github: "https://github.com/piyushjain1857/Limbo",
            demo: "https://piyushjain1857.github.io/Limbo/"
        },
        {
            category: "HTML / CSS / JS · Game",
            title: "Tic Tac Toe",
            desc: "A stylish two-player Tic Tac Toe game with a glowing neon UI, win detection, score tracking per player, and a satisfying animated winner announcement overlay.",
            tech: ["HTML", "CSS", "JavaScript"],
            img: "/assets/tictactoe_game.png",
            github: "https://github.com/piyushjain1857/Tic_Tac_Toe-Game",
            demo: "https://piyushjain1857.github.io/Tic_Tac_Toe-Game/"
        },
        {
            category: "HTML / CSS / JS",
            title: "Inner Peace",
            desc: "A serene mindfulness and mental wellness website featuring guided meditation resources, yoga practices, breathing exercises, and a calming lavender and sage green aesthetic.",
            tech: ["HTML", "CSS", "JavaScript"],
            img: "/assets/inner_peace.png",
            github: "https://github.com/piyushjain1857/Inner-Peace-Project",
            demo: "https://piyushjain1857.github.io/Inner-Peace-Project/"
        },
        {
            category: "HTML / CSS / JS · Game",
            title: "Rock Paper Scissors",
            desc: "A neon cyberpunk edition of Rock Paper Scissors where players battle the computer. Features glowing choice buttons, animated WIN/LOSE/DRAW results, and a live scoreboard.",
            tech: ["HTML", "CSS", "JavaScript"],
            img: "/assets/rock_paper_scissors.png",
            github: "https://github.com/piyushjain1857/Rock_Paper_Scisers",
            demo: "https://piyushjain1857.github.io/Rock_Paper_Scisers/"
        }
    ];

    return (
        <section id="projects" className="section projects-section">
            <div className="container">
                <h2 className="section-title reveal"><span>03.</span> Selected Work</h2>
                <div className="projects-grid reveal">
                    {projectsData.map((project, index) => (
                        <ProjectCard key={index} project={project} />
                    ))}
                </div>
            </div>
        </section>
    );
}

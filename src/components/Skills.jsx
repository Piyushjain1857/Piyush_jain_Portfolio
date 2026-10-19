import React from 'react';
import { Code, Server, Layout, Database, Cloud, Cpu, PlayCircle } from 'react-feather';
import useTilt from '../hooks/useTilt';

function SkillCard({ icon: Icon, title, tags }) {
    const tiltRef = useTilt();

    return (
        <div ref={tiltRef} className="skill-category tilt-card">
            <h3>
                <Icon size={18} style={{ marginRight: '8px', verticalAlign: 'middle' }} />
                {title}
            </h3>
            <div className="skill-tags">
                {tags.map((tag, idx) => (
                    <a key={idx} href={tag.url} target="_blank" rel="noopener noreferrer">
                        {tag.name}
                    </a>
                ))}
            </div>
        </div>
    );
}

export default function Skills() {
    const skillCategories = [
        {
            icon: Code,
            title: "Languages",
            tags: [
                { name: "Python", url: "https://www.python.org/" },
                { name: "JavaScript (ES6+)", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript" },
                { name: "SQL", url: "https://en.wikipedia.org/wiki/SQL" }
            ]
        },
        {
            icon: Server,
            title: "Backend & Systems",
            tags: [
                { name: "Node.js", url: "https://nodejs.org/" },
                { name: "Express", url: "https://expressjs.com/" },
                { name: "FastAPI", url: "https://fastapi.tiangolo.com/" },
                { name: "REST APIs", url: "https://restfulapi.net/" }
            ]
        },
        {
            icon: Layout,
            title: "Frontend & UI",
            tags: [
                { name: "React", url: "https://react.dev/" },
                { name: "Vite", url: "https://vitejs.dev/" },
                { name: "HTML5", url: "https://developer.mozilla.org/en-US/docs/Web/HTML" },
                { name: "CSS3", url: "https://developer.mozilla.org/en-US/docs/Web/CSS" },
                { name: "TailwindCSS", url: "https://tailwindcss.com/" }
            ]
        },
        {
            icon: Cpu,
            title: "AI / ML & GenAI",
            tags: [
                { name: "Google Gemini", url: "https://ai.google.dev/" },
                { name: "LangChain", url: "https://www.langchain.com/" },
                { name: "OpenCV", url: "https://opencv.org/" }
            ]
        },
        {
            icon: PlayCircle,
            title: "Game & Creative Tech",
            tags: [
                { name: "MediaPipe Tracking", url: "https://developers.google.com/mediapipe" },
                { name: "HTML5 Canvas", url: "https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API" },
                { name: "ModernGL Shaders", url: "https://moderngl.readthedocs.io/" },
                { name: "Pygame", url: "https://www.pygame.org/" }
            ]
        },
        {
            icon: Database,
            title: "Databases & Cloud",
            tags: [
                { name: "PostgreSQL", url: "https://www.postgresql.org/" },
                { name: "SQLite", url: "https://www.sqlite.org/" },
                { name: "MySQL", url: "https://www.mysql.com/" },
                { name: "Git & GitHub", url: "https://git-scm.com/" },
                { name: "Docker", url: "https://www.docker.com/" },
                { name: "Linux", url: "https://www.linux.org/" }
            ]
        }
    ];

    return (
        <section id="skills" className="section skills-section">
            <div className="container">
                <h2 className="section-title reveal"><span>02.</span> Skills & Tech Stack</h2>
                <div className="skills-grid reveal">
                    {skillCategories.map((category, index) => (
                        <SkillCard
                            key={index}
                            icon={category.icon}
                            title={category.title}
                            tags={category.tags}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}

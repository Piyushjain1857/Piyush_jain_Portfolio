import React from 'react';
import { Code, Server, Layout, Database, Cloud, Cpu } from 'react-feather';
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
            title: "Backend",
            tags: [
                { name: "Node.js", url: "https://nodejs.org/" },
                { name: "Express", url: "https://expressjs.com/" },
                { name: "FastAPI", url: "https://fastapi.tiangolo.com/" }
            ]
        },
        {
            icon: Layout,
            title: "Frontend",
            tags: [
                { name: "HTML5", url: "https://developer.mozilla.org/en-US/docs/Web/HTML" },
                { name: "CSS3", url: "https://developer.mozilla.org/en-US/docs/Web/CSS" },
                { name: "React", url: "https://react.dev/" },
                { name: "Redux", url: "https://redux.js.org/" }
            ]
        },
        {
            icon: Database,
            title: "Databases",
            tags: [
                { name: "PostgreSQL", url: "https://www.postgresql.org/" },
                { name: "MySQL", url: "https://www.mysql.com/" }
            ]
        },
        {
            icon: Cloud,
            title: "Tools & Cloud",
            tags: [
                { name: "AWS", url: "https://aws.amazon.com/" },
                { name: "Git", url: "https://git-scm.com/" },
                { name: "Linux", url: "https://www.linux.org/" },
                { name: "CI/CD", url: "https://en.wikipedia.org/wiki/CI/CD" },
                { name: "Power BI", url: "https://powerbi.microsoft.com/" },
                { name: "Canva", url: "https://www.canva.com/" },
                { name: "Figma", url: "https://www.figma.com/" }
            ]
        },
        {
            icon: Cpu,
            title: "AI / ML",
            tags: [
                { name: "Prompt engineering", url: "https://en.wikipedia.org/wiki/Prompt_engineering" },
                { name: "Gen AI", url: "https://en.wikipedia.org/wiki/Generative_artificial_intelligence" }
            ]
        }
    ];

    return (
        <section id="skills" className="section skills-section">
            <div className="container">
                <h2 className="section-title reveal"><span>02.</span> Skills</h2>
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

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
                    <span key={idx}>{tag}</span>
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
            tags: ["Python", "JavaScript (ES6+)", "SQL"]
        },
        {
            icon: Server,
            title: "Backend",
            tags: ["Node.js", "Express", "FastAPI"]
        },
        {
            icon: Layout,
            title: "Frontend",
            tags: ["HTML5", "CSS3", "React", "Redux"]
        },
        {
            icon: Database,
            title: "Databases",
            tags: ["PostgreSQL", "MySQL"]
        },
        {
            icon: Cloud,
            title: "Tools & Cloud",
            tags: ["AWS", "Git", "Linux", "CI/CD", "Power BI", "Canva", "Figma"]
        },
        {
            icon: Cpu,
            title: "AI / ML",
            tags: ["Prompt engineering", "Gen AI"]
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

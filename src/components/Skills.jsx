import React from 'react'
import { motion } from 'framer-motion'
import './Skills.css'

/* Spider-Man-themed SVG icons — red line-art style */
const icons = {
  languages: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
    </svg>
  ),
  backend: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
    </svg>
  ),
  frontend: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="3" width="20" height="14" rx="2"/>
      <line x1="8" y1="21" x2="16" y2="21"/>
      <line x1="12" y1="17" x2="12" y2="21"/>
    </svg>
  ),
  cloud: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"/>
    </svg>
  ),
  databases: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <ellipse cx="12" cy="5" rx="9" ry="3"/>
      <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/>
      <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/>
    </svg>
  ),
  ai: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="3"/>
      <path d="M12 2v4m0 12v4M2 12h4m12 0h4"/>
      <path d="M4.93 4.93l2.83 2.83m8.48 8.48l2.83 2.83M4.93 19.07l2.83-2.83m8.48-8.48l2.83-2.83"/>
    </svg>
  ),
  architecture: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 21h18"/>
      <path d="M5 21V7l7-4 7 4v14"/>
      <path d="M9 21v-6h6v6"/>
      <path d="M9 9h.01M15 9h.01"/>
    </svg>
  ),
  messaging: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/>
      <path d="M12 15l-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/>
      <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"/>
      <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/>
    </svg>
  ),
}

const skillCategories = [
  {
    title: 'Languages',
    iconKey: 'languages',
    skills: ['JavaScript', 'TypeScript', 'Python', 'Java', 'C', 'C++', 'C#', 'SQL', 'Bash'],
  },
  {
    title: 'Backend',
    iconKey: 'backend',
    skills: ['Node.js', 'Express.js', 'NestJS', 'Spring Boot', 'Django', 'Flask', 'FastAPI', 'REST APIs'],
  },
  {
    title: 'Frontend',
    iconKey: 'frontend',
    skills: ['React 18', 'Vite', 'Tailwind CSS', 'Konva.js', 'JavaFX 17', 'HTML/CSS'],
  },
  {
    title: 'Cloud & DevOps',
    iconKey: 'cloud',
    skills: ['Docker', 'Kubernetes', 'Terraform', 'CI/CD', 'Nginx', 'Cloudflare Workers', 'GitHub Actions'],
  },
  {
    title: 'Databases',
    iconKey: 'databases',
    skills: ['PostgreSQL', 'MongoDB', 'Redis', 'SQL Server', 'SQLite', 'Supabase', 'Neon'],
  },
  {
    title: 'AI/ML',
    iconKey: 'ai',
    skills: ['PyTorch', 'Transformers', 'NLP', 'Vector Embeddings', 'RAG', 'Hugging Face'],
  },
  {
    title: 'Architecture',
    iconKey: 'architecture',
    skills: ['Microservices', 'Event-Driven', 'CQRS', 'DDD', 'SOLID', '3NF Design'],
  },
  {
    title: 'Messaging',
    iconKey: 'messaging',
    skills: ['RabbitMQ', 'Kafka', 'Redis Pub/Sub', 'WebSocket/STOMP'],
  },
]

const Skills = () => {
  const fadeIn = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
  }

  return (
    <section className="skills" id="skills">
      <div className="section-container">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeIn}
        >
          <span className="section-eyebrow">Equipped for Every Mission</span>
          <h2 className="section-title">THE WEB SHOOTERS</h2>
          <div className="section-divider"></div>
        </motion.div>

        <div className="skills-grid">
          {skillCategories.map((cat, index) => (
            <motion.div
              className="skill-category"
              key={cat.title}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0, transition: { delay: index * 0.08, duration: 0.5 } },
              }}
            >
              <div className="skill-header">
                <span className="skill-icon">{icons[cat.iconKey]}</span>
                <h3 className="skill-cat-title">{cat.title}</h3>
              </div>
              <div className="skill-tags">
                {cat.skills.map((skill) => (
                  <span className="skill-tag" key={skill}>{skill}</span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Skills

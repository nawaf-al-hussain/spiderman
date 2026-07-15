import React, { useState } from 'react'
import { motion } from 'framer-motion'
import './Projects.css'

const projects = [
  {
    title: 'NexHire',
    subtitle: 'High-Scale Recruitment Management System',
    description: 'Designed normalized relational database schema following 3NF principles across 60+ entities. Implemented string similarity algorithms for candidate matching achieving 94% precision. Built NLP pipeline for resume analysis and predictive models including anti-ghosting risk scorer and onboarding success predictor.',
    tech: ['SQL Server', 'C# .NET', 'Node.js', 'Express.js', 'React', 'Vite', 'Tailwind CSS', 'PostgreSQL', 'Redis', 'JWT'],
    link: 'https://nexhire-frontend.vercel.app/',
    preview: 'https://nexhire-frontend.vercel.app/',
    status: 'Live',
  },
  {
    title: 'Syllab AI',
    subtitle: 'Advanced AI Learning Platform',
    description: 'Hybrid AI system combining fine-tuned open-source language models with SQLite vector database for RAG architecture. Fine-tuned multiple models on 1000+ curated QA pairs achieving 40% faster inference with GGUF quantization while maintaining 95% accuracy. Sub-3-second response times on free-tier GPU.',
    tech: ['Python', 'PyTorch', 'Transformers', 'FastAPI', 'SQLite', 'sentence-transformers', 'Gradio', 'PEFT/LoRA'],
    link: 'https://syllabai-frontend.vercel.app',
    preview: 'https://syllabai-frontend.vercel.app',
    status: 'Ongoing',
  },
  {
    title: 'Multiplayer Game Engine',
    subtitle: 'Universal Event-Driven Board Game Platform',
    description: 'Universal board game engine in Java 17 using DDD and event sourcing, powering multiple games from a single modular core. Distributed server-authoritative multiplayer system using Spring WebSocket and Redis Pub/Sub. Complete event-sourced persistence with full game replayability and CQRS pipeline.',
    tech: ['Java 17', 'Spring Boot 3.2', 'WebSocket/STOMP', 'Redis', 'PostgreSQL', 'Docker', 'React 18', 'Konva.js', 'JavaFX'],
    link: 'https://github.com/nawaf-al-hussain',
    status: 'Ongoing',
  },
]

const ProjectCard = ({ project, index }) => {
  const [hovered, setHovered] = useState(false)
  const [iframeLoaded, setIframeLoaded] = useState(false)
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768

  const fadeIn = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
  }

  const handleTouch = () => {
    if (isMobile) setHovered((prev) => !prev)
  }

  return (
    <motion.div
      className="project-card"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      variants={{
        hidden: { opacity: 0, y: 40 },
        visible: { opacity: 1, y: 0, transition: { delay: index * 0.15, duration: 0.6 } },
      }}
      onMouseEnter={() => !isMobile && setHovered(true)}
      onMouseLeave={() => !isMobile && setHovered(false)}
      onTouchStart={handleTouch}
    >
      <div className="project-header">
        <div className="project-status-row">
          <h3 className="project-title">{project.title}</h3>
          <span className={`project-status ${project.status === 'Live' ? 'live' : 'ongoing'}`}>
            {project.status}
          </span>
        </div>
        <p className="project-subtitle">{project.subtitle}</p>
      </div>

      <p className="project-desc">{project.description}</p>

      <div className="project-tech">
        {project.tech.map((t) => (
          <span className="tech-tag" key={t}>{t}</span>
        ))}
      </div>

      {project.preview && (
        <div className={`project-preview ${hovered ? 'expanded' : ''}`}>
          {hovered && (
            <iframe
              src={project.preview}
              title={`${project.title} preview`}
              onLoad={() => setIframeLoaded(true)}
              sandbox="allow-scripts allow-same-origin"
            ></iframe>
          )}
          <div className={`preview-overlay ${iframeLoaded ? 'hidden' : ''}`}>
            {iframeLoaded ? '' : 'Loading preview...'}
          </div>
        </div>
      )}

      <a href={project.link} target="_blank" rel="noopener noreferrer" className="project-link">
        {project.status === 'Live' ? 'View Live' : 'View Code'} →
      </a>
    </motion.div>
  )
}

const Projects = () => {
  const fadeIn = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
  }

  return (
    <section className="projects" id="projects">
      <div className="section-container">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeIn}
        >
          <span className="section-eyebrow">Things I've Shipped</span>
          <h2 className="section-title">PROJECTS</h2>
          <div className="section-divider"></div>
        </motion.div>

        <div className="projects-grid">
          {projects.map((project, index) => (
            <ProjectCard key={project.title} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default Projects

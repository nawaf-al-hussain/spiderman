import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import './Resume.css'

const resumeData = {
  name: 'Nawaf Al Hussain Khondokar',
  titles: ['Platform Engineer', 'Cloud Architect', 'Backend Specialist'],
  contact: [
    { icon: '✉', value: 'nawafalhussain81@gmail.com' },
    { icon: '✆', value: '+880 1648 960531' },
    { icon: '⌘', value: 'linkedin.com/in/nawaf-al-hussain' },
    { icon: '◈', value: 'github.com/nawaf-al-hussain' },
    { icon: '◉', value: 'nawaf-al-hussain.vercel.app' },
  ],
  summary: `Versatile technology professional with diverse business experience and expertise in software engineering, cloud architecture, and business operations. Proven expertise in designing and implementing high-availability backend systems using JavaScript, TypeScript, and Node.js, with production systems handling 10K+ concurrent users. Demonstrated success in optimizing system performance, implementing secure authentication mechanisms, and automating infrastructure using Docker, Kubernetes, and CI/CD pipelines.`,
  skills: [
    { category: 'Programming Languages', items: 'C, C++, C#, TypeScript, JavaScript, Python, Java, SQL, Bash' },
    { category: 'Backend Frameworks', items: 'Node.js, Express.js, NestJS, Spring Boot 3.2, Django, Flask, FastAPI, REST APIs' },
    { category: 'Frontend Technologies', items: 'React 18, TypeScript, Vite, Tailwind CSS, Konva.js, JavaFX 17, HTML/CSS' },
    { category: 'Cloud & DevOps', items: 'Docker, Kubernetes, Terraform, CI/CD (GitHub Actions, GitLab CI), Nginx, Cloudflare Workers' },
    { category: 'Databases', items: 'PostgreSQL (Neon, Supabase), SQL Server, MongoDB, Redis, SQLite' },
    { category: 'AI/ML', items: 'PyTorch, Transformers, NLP, Vector Embeddings, RAG, Hugging Face, PEFT/LoRA' },
    { category: 'Architecture', items: 'Microservices, Event-Driven, CQRS, Event Sourcing, DDD, SOLID, 3NF Design' },
    { category: 'Messaging', items: 'RabbitMQ, Apache Kafka, Redis Pub/Sub, WebSocket/STOMP' },
    { category: 'Security', items: 'JWT, OAuth 2.0, RBAC, PCI Compliance, Auth Systems' },
    { category: 'Testing & QA', items: 'JUnit, Jest, pytest, Integration/E2E Testing, ESLint, Prettier' },
  ],
  projects: [
    {
      name: 'NexHire',
      subtitle: 'High-Scale Recruitment Management System',
      link: 'nexhire-frontend.vercel.app',
      tech: 'SQL Server, C# .NET, Node.js, Express.js, React, Vite, Tailwind CSS, PostgreSQL, Redis, JWT',
      bullets: [
        'Designed normalized 3NF database schema across 60+ entities with temporal data modeling and state machine formalization',
        'Implemented string similarity algorithms (Jaro-Winkler, Levenshtein, TF-IDF) for candidate matching — 94% precision',
        'Developed predictive models: anti-ghosting risk scorer (0.78 AUC-ROC), onboarding success predictor (85% accuracy)',
        'Built NLP pipeline for resume analysis: PDF/DOCX extraction, NER, sentiment analysis (VADER)',
        'Optimized: covering indexes (60% cost reduction), connection pooling (70% latency reduction), 10x aggregate speedup',
      ],
    },
    {
      name: 'Syllab AI',
      subtitle: 'Advanced AI Learning Platform',
      link: 'syllabai-frontend.vercel.app',
      tech: 'Python, PyTorch, Transformers, FastAPI, SQLite, sentence-transformers, Gradio, PEFT/LoRA, GGUF',
      bullets: [
        'Hybrid AI system: fine-tuned LMs + SQLite vector DB for RAG architecture',
        'FTS5 + vector embeddings storing 500+ past paper questions with metadata',
        'Fine-tuned on 1000+ QA pairs, 40% faster inference (GGUF quantization), 95% accuracy',
        'Gradio chatbot on Hugging Face Spaces with sub-3-second response times',
        'Modular architecture supporting multiple curricula with cloud-migration-ready design',
      ],
    },
    {
      name: 'Multiplayer Game Engine',
      subtitle: 'Universal Event-Driven Board Game Platform',
      link: 'github.com/nawaf-al-hussain',
      tech: 'Java 17, Spring Boot 3.2, WebSocket/STOMP, Redis, PostgreSQL, Docker, React 18, Konva.js, JavaFX',
      bullets: [
        'Universal event-driven board game engine using DDD + event sourcing principles',
        'Distributed server-authoritative multiplayer via Spring WebSocket + Redis Pub/Sub',
        'Event-sourced persistence with snapshots, full game replayability, CQRS pipeline',
        'Dual frontend: React 18 + Konva.js (web) and JavaFX 17 (desktop)',
        'Extensible plugin system for third-party game logic injection',
      ],
    },
  ],
  experience: [
    {
      role: 'Private Tutor (Independent Contractor)',
      location: 'Dhaka, Bangladesh',
      period: 'Nov 2023 – Present',
      bullets: [
        'Tutored 12 students in IGCSE/IAL Physics, Chemistry, Mathematics, and English (7 active)',
        'Developed Syllab AI platform with interactive chatbot for personalized tutoring',
        'Achieved A* (O-Levels) and A (A-Levels) grades through AI-powered learning strategies',
        'University-level instruction: SPL, OOP, Discrete Math, Probability & Statistics',
      ],
    },
    {
      role: 'Closer (Promoted from Telesales Specialist)',
      company: 'SkyTech Solutions',
      location: 'Dhaka, Bangladesh',
      period: 'Aug 2023 – Nov 2023',
      bullets: [
        'Closed sales from telesales leads for government rebate heat pump programs',
        'Mentored telesales team to improve lead quality and conversion rates',
      ],
    },
    {
      role: 'Telesales Specialist',
      company: 'SkyTech Solutions',
      location: 'Dhaka, Bangladesh',
      period: 'Feb 2023 – Aug 2023',
      bullets: [
        'Conducted outbound calls to Australian customers about government heat pump rebates',
        'Maintained high call volume and conversion rates with telecommunications compliance',
      ],
    },
    {
      role: 'Store Manager & Business Operations',
      company: 'CityGroup Dealership (Family Business)',
      location: 'Dhaka, Bangladesh',
      period: 'Mar 2018 – Jan 2023',
      bullets: [
        'Managed full retail operations including inventory management and display optimization',
        'Oversaw financial operations: cash handling, mobile banking, and comprehensive accounting',
        'Operated as sole manager during peak periods handling all business operations',
      ],
    },
  ],
  education: [
    {
      degree: 'BSc in Computer Science & Engineering',
      school: 'United International University',
      location: 'Dhaka, Bangladesh',
      period: 'June 2024 – Present',
      details: null,
    },
    {
      degree: 'IAL – International Advanced Levels',
      school: 'British Council – Private Candidate',
      location: 'Dhaka, Bangladesh',
      period: 'May 2022 – Jun 2023',
      details: 'Pure Mathematics (A), Physics (A) — Full UMS marks in all AS level units',
    },
    {
      degree: 'IGCSE',
      school: 'British Council – Private Candidate',
      location: 'Dhaka, Bangladesh',
      period: 'May 2019 – Jan 2020',
      details: 'Mathematics B (A*), Physics (A*), Chemistry (A*), English (A*), ICT (A), Bangla (A*) — Distinctions in Maths & Physics',
    },
  ],
}

const Resume = () => {
  const [modalOpen, setModalOpen] = useState(false)

  // Lock body scroll when modal is open
  useEffect(() => {
    if (modalOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [modalOpen])

  return (
    <>
      <motion.div
        className="resume-section"
        id="resume"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.5 }}
      >
        <span className="section-eyebrow">The Full Story</span>
        <h2 className="section-title">RESUME</h2>
        <div className="section-divider"></div>

        <p className="resume-tagline">
          Every detail. The complete record of skills, experience, and education —
          available for those who need the full picture.
        </p>

        <div className="resume-actions">
          <button className="resume-btn view-btn" onClick={() => setModalOpen(true)}>
            <span className="btn-icon">◈</span>
            View Resume
          </button>
          <a href="/Resume.md" download="Nawaf_Al_Hussain_Resume.md" className="resume-btn download-btn">
            <span className="btn-icon">↓</span>
            Download Resume
          </a>
        </div>
      </motion.div>

      {/* Themed Modal */}
      <AnimatePresence>
        {modalOpen && (
          <motion.div
            className="resume-modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={() => setModalOpen(false)}
          >
            <motion.div
              className="resume-modal"
              initial={{ opacity: 0, y: 60, scale: 0.92 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 60, scale: 0.92 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="rmodal-header">
                <div className="rmodal-header-left">
                  <span className="rmodal-eyebrow">Daily Bugle Document</span>
                  <h3 className="rmodal-title">THE FULL DOSSIER</h3>
                </div>
                <button className="rmodal-close" onClick={() => setModalOpen(false)}>
                  <span className="rmodal-close-x">✕</span>
                  <span className="rmodal-close-label">Close File</span>
                </button>
              </div>

              {/* Body */}
              <div className="rmodal-body">

                {/* Name & Titles */}
                <div className="rmodal-name-block">
                  <h1 className="rmodal-name">{resumeData.name}</h1>
                  <div className="rmodal-titles">
                    {resumeData.titles.map((t, i) => (
                      <span key={i}>{t}{i < resumeData.titles.length - 1 ? ' | ' : ''}</span>
                    ))}
                  </div>
                </div>

                {/* Contact Row */}
                <div className="rmodal-contact">
                  {resumeData.contact.map((c, i) => (
                    <span key={i} className="rmodal-contact-item">
                      <span className="rmodal-contact-icon">{c.icon}</span> {c.value}
                    </span>
                  ))}
                </div>

                <div className="rmodal-separator"></div>

                {/* Summary */}
                <div className="rmodal-section">
                  <h2 className="rmodal-section-title">Professional Summary</h2>
                  <p className="rmodal-summary">{resumeData.summary}</p>
                </div>

                <div className="rmodal-separator"></div>

                {/* Skills */}
                <div className="rmodal-section">
                  <h2 className="rmodal-section-title">Technical Skills</h2>
                  <div className="rmodal-skills-grid">
                    {resumeData.skills.map((s) => (
                      <div className="rmodal-skill-row" key={s.category}>
                        <span className="rmodal-skill-cat">{s.category}</span>
                        <span className="rmodal-skill-items">{s.items}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="rmodal-separator"></div>

                {/* Projects */}
                <div className="rmodal-section">
                  <h2 className="rmodal-section-title">Key Projects</h2>
                  {resumeData.projects.map((p) => (
                    <div className="rmodal-project" key={p.name}>
                      <div className="rmodal-project-header">
                        <h3 className="rmodal-project-name">▸ {p.name}</h3>
                        <span className="rmodal-project-link">{p.link}</span>
                      </div>
                      <p className="rmodal-project-subtitle">{p.subtitle}</p>
                      <p className="rmodal-project-tech">Tech: {p.tech}</p>
                      <ul className="rmodal-project-bullets">
                        {p.bullets.map((b, i) => <li key={i}>{b}</li>)}
                      </ul>
                    </div>
                  ))}
                </div>

                <div className="rmodal-separator"></div>

                {/* Experience */}
                <div className="rmodal-section">
                  <h2 className="rmodal-section-title">Professional Experience</h2>
                  {resumeData.experience.map((e, i) => (
                    <div className="rmodal-exp" key={i}>
                      <div className="rmodal-exp-header">
                        <h3 className="rmodal-exp-role">{e.role}</h3>
                        <span className="rmodal-exp-period">{e.period}</span>
                      </div>
                      {(e.company || e.location) && (
                        <div className="rmodal-exp-meta">
                          {e.company && <span className="rmodal-exp-company">{e.company}</span>}
                          {e.company && e.location && <span className="rmodal-exp-dash"> — </span>}
                          <span className="rmodal-exp-location">{e.location}</span>
                        </div>
                      )}
                      <ul className="rmodal-exp-bullets">
                        {e.bullets.map((b, j) => <li key={j}>{b}</li>)}
                      </ul>
                    </div>
                  ))}
                </div>

                <div className="rmodal-separator"></div>

                {/* Education */}
                <div className="rmodal-section">
                  <h2 className="rmodal-section-title">Education</h2>
                  {resumeData.education.map((e, i) => (
                    <div className="rmodal-edu" key={i}>
                      <div className="rmodal-exp-header">
                        <h3 className="rmodal-exp-role">{e.degree}</h3>
                        <span className="rmodal-exp-period">{e.period}</span>
                      </div>
                      <div className="rmodal-exp-meta">
                        <span className="rmodal-exp-company">{e.school}</span>
                        <span className="rmodal-exp-dash"> — </span>
                        <span className="rmodal-exp-location">{e.location}</span>
                      </div>
                      {e.details && <p className="rmodal-edu-details">{e.details}</p>}
                    </div>
                  ))}
                </div>

                <div className="rmodal-separator"></div>

                {/* Additional */}
                <div className="rmodal-section">
                  <h2 className="rmodal-section-title">Additional</h2>
                  <div className="rmodal-additional">
                    <span><strong>Languages:</strong> Bengali (Native), English (Professional Working Proficiency)</span>
                    <span><strong>Open Source:</strong> Active contributor to Node.js ecosystem projects</span>
                    <span><strong>Interests:</strong> Distributed Systems, Cloud Architecture, AI/ML, Developer Experience</span>
                  </div>
                </div>

              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default Resume

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
              {/* Close button — floats over masthead */}
              <button className="rmodal-close" onClick={() => setModalOpen(false)} aria-label="Close">
                <span className="rmodal-close-x">✕</span>
              </button>

              {/* ── Masthead ── */}
              <header className="rmodal-masthead">
                <div className="rmodal-masthead-left">
                  <span className="rmodal-vol">VOL. I · NO. 1</span>
                  <span className="rmodal-date">EST. 2024 · DHAKA</span>
                </div>
                <h1 className="rmodal-masthead-title">The Daily Bugle</h1>
                <div className="rmodal-masthead-right">
                  <span className="rmodal-price">PRICE: ONE CLICK</span>
                  <span className="rmodal-edition">PORTFOLIO EDITION</span>
                </div>
              </header>

              {/* ── Dateline strip ── */}
              <div className="rmodal-dateline">
                <span>“WITH GREAT POWER COMES GREAT CODE”</span>
                <span className="rmodal-dateline-sep">◆</span>
                <span>PLATFORM ENGINEERING DESK</span>
                <span className="rmodal-dateline-sep">◆</span>
                <span>SPECIAL ISSUE: ENGINEER PROFILE</span>
              </div>

              {/* ── Hero headline ── */}
              <section className="rmodal-hero-story">
                <p className="rmodal-kicker">EXCLUSIVE · ENGINEER OF INTEREST</p>
                <h2 className="rmodal-hero-headline">
                  {resumeData.name}
                </h2>
                <p className="rmodal-deck">
                  {resumeData.titles.join(' · ')}
                </p>

                <div className="rmodal-byline">
                  {resumeData.contact.map((c, i) => (
                    <span key={i} className="rmodal-contact-item">
                      <span className="rmodal-contact-icon">{c.icon}</span> {c.value}
                    </span>
                  ))}
                </div>
              </section>

              {/* ── Two-column body ── */}
              <div className="rmodal-body">

                {/* Lead paragraph with drop cap */}
                <p className="rmodal-lead">
                  <span className="rmodal-dropcap">V</span>
                  {resumeData.summary.replace(/^Versatile/, 'ersatile')}
                </p>

                <div className="rmodal-columns">
                  {/* ── Left column: Experience + Education ── */}
                  <div className="rmodal-col rmodal-col-left">

                    <div className="rmodal-section">
                      <h3 className="rmodal-section-title">Professional Experience</h3>
                      {resumeData.experience.map((e, i) => (
                        <article className="rmodal-exp" key={i}>
                          <h4 className="rmodal-exp-role">{e.role}</h4>
                          <div className="rmodal-exp-meta">
                            {e.company && <span className="rmodal-exp-company">{e.company}</span>}
                            {e.company && e.location && <span className="rmodal-exp-dash"> · </span>}
                            <span className="rmodal-exp-location">{e.location}</span>
                            <span className="rmodal-exp-dash"> · </span>
                            <span className="rmodal-exp-period">{e.period}</span>
                          </div>
                          <ul className="rmodal-exp-bullets">
                            {e.bullets.map((b, j) => <li key={j}>{b}</li>)}
                          </ul>
                        </article>
                      ))}
                    </div>

                    <div className="rmodal-section">
                      <h3 className="rmodal-section-title">Education</h3>
                      {resumeData.education.map((e, i) => (
                        <article className="rmodal-edu" key={i}>
                          <h4 className="rmodal-exp-role">{e.degree}</h4>
                          <div className="rmodal-exp-meta">
                            <span className="rmodal-exp-company">{e.school}</span>
                            <span className="rmodal-exp-dash"> · </span>
                            <span className="rmodal-exp-location">{e.location}</span>
                            <span className="rmodal-exp-dash"> · </span>
                            <span className="rmodal-exp-period">{e.period}</span>
                          </div>
                          {e.details && <p className="rmodal-edu-details">{e.details}</p>}
                        </article>
                      ))}
                    </div>

                  </div>

                  {/* ── Right column: Projects + Skills ── */}
                  <div className="rmodal-col rmodal-col-right">

                    <div className="rmodal-section">
                      <h3 className="rmodal-section-title">Key Projects</h3>
                      {resumeData.projects.map((p) => (
                        <article className="rmodal-project" key={p.name}>
                          <h4 className="rmodal-project-name">{p.name}</h4>
                          <p className="rmodal-project-subtitle">{p.subtitle}</p>
                          <p className="rmodal-project-link">↗ {p.link}</p>
                          <ul className="rmodal-project-bullets">
                            {p.bullets.map((b, i) => <li key={i}>{b}</li>)}
                          </ul>
                          <p className="rmodal-project-tech">{p.tech}</p>
                        </article>
                      ))}
                    </div>

                    <div className="rmodal-section">
                      <h3 className="rmodal-section-title">Technical Skills</h3>
                      <div className="rmodal-skills-grid">
                        {resumeData.skills.map((s) => (
                          <div className="rmodal-skill-row" key={s.category}>
                            <span className="rmodal-skill-cat">{s.category}</span>
                            <span className="rmodal-skill-items">{s.items}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                  </div>
                </div>

                {/* ── Classifieds footer ── */}
                <div className="rmodal-classifieds">
                  <h3 className="rmodal-classifieds-title">— CLASSIFIEDS —</h3>
                  <div className="rmodal-classifieds-grid">
                    <div className="rmodal-classified">
                      <strong>Languages</strong>
                      <span>Bengali (Native) · English (Professional)</span>
                    </div>
                    <div className="rmodal-classified">
                      <strong>Open Source</strong>
                      <span>Active contributor to Node.js ecosystem</span>
                    </div>
                    <div className="rmodal-classified">
                      <strong>Interests</strong>
                      <span>Distributed Systems · Cloud Architecture · AI/ML · DX</span>
                    </div>
                  </div>
                </div>

                {/* ── Print footer ── */}
                <footer className="rmodal-print-footer">
                  <span>— END OF EDITION —</span>
                  <span>Printed in the Cloud · Distributed Worldwide · No trees harmed</span>
                </footer>

              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default Resume

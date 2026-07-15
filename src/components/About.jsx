import React from 'react'
import { motion } from 'framer-motion'
import './About.css'

const About = () => {
  const fadeIn = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
  }

  return (
    <section className="about" id="about">
      <div className="section-container">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeIn}
        >
          <span className="section-eyebrow">Welcome to Queens</span>
          <h2 className="section-title">ABOUT ME</h2>
          <div className="section-divider"></div>
        </motion.div>

        <div className="about-grid">
          <motion.div
            className="about-text"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeIn}
          >
            <p>
              Versatile technology professional with diverse business experience and deep expertise
              in software engineering, cloud architecture, and backend systems. I design and implement
              <strong> high-availability backend systems</strong> using JavaScript, TypeScript, and Node.js,
              with production systems handling <strong>10K+ concurrent users</strong>.
            </p>
            <p>
              My journey is unconventional — from managing a family retail business for 5+ years,
              through BPO sales management, to building distributed cloud-native systems. This
              unique blend of technical and business skills gives me an edge in understanding not
              just how to build systems, but <em>why</em> they matter.
            </p>
            <p>
              When I'm not architecting microservices or fine-tuning AI models, I'm tutoring students
              in Physics and Mathematics — because just like Spider-Man believes in New York, I believe
              the next generation deserves the best guidance possible.
            </p>
          </motion.div>

          <motion.div
            className="about-stats"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={{ ...fadeIn, visible: { ...fadeIn.visible, transition: { staggerChildren: 0.15 } } }}
          >
            <motion.div className="stat-card" variants={fadeIn}>
              <span className="stat-number">10K+</span>
              <span className="stat-label">Concurrent Users Served</span>
            </motion.div>
            <motion.div className="stat-card" variants={fadeIn}>
              <span className="stat-number">94%</span>
              <span className="stat-label">Candidate Match Precision</span>
            </motion.div>
            <motion.div className="stat-card" variants={fadeIn}>
              <span className="stat-number">60+</span>
              <span className="stat-label">Database Entities Designed</span>
            </motion.div>
            <motion.div className="stat-card" variants={fadeIn}>
              <span className="stat-number">5+</span>
              <span className="stat-label">Years Business Management</span>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default About

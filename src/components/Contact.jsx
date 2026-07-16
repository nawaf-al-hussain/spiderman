import React, { useState } from 'react'
import { motion } from 'framer-motion'
import BackgroundBeams from './BackgroundBeams'
import './Contact.css'

const Contact = () => {
  const [copied, setCopied] = useState(false)

  const fadeIn = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
  }

  const copyEmail = () => {
    navigator.clipboard.writeText('nawafalhussain81@gmail.com')
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <section className="contact" id="contact">
      <BackgroundBeams />
      <div className="section-container" style={{ position: 'relative', zIndex: 1 }}>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeIn}
        >
          <span className="section-eyebrow">Say Hello from Queens</span>
          <h2 className="section-title">GET IN TOUCH</h2>
          <div className="section-divider"></div>
        </motion.div>

        <motion.div
          className="contact-content"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeIn}
        >
          <p className="contact-tagline">
            Every alliance starts with a call. Whether it's a project, an opportunity,
            or just a conversation about distributed systems — I'm always ready to answer the call.
          </p>

          <div className="contact-links">
            <div className="contact-card email-card" onClick={copyEmail} style={{ cursor: 'pointer' }}>
              <span className="contact-icon">✉</span>
              <span className="contact-label">Email</span>
              <span className="contact-value">nawafalhussain81@gmail.com</span>
              <span className={`copy-btn ${copied ? 'copied' : ''}`}>
                {copied ? 'Copied!' : 'Copy'}
              </span>
            </div>

            <a href="https://github.com/nawaf-al-hussain" className="contact-card" target="_blank" rel="noopener noreferrer">
              <span className="contact-icon">⌘</span>
              <span className="contact-label">GitHub</span>
              <span className="contact-value">nawaf-al-hussain</span>
            </a>

            <a href="https://www.linkedin.com/in/nawaf-al-hussain/" className="contact-card" target="_blank" rel="noopener noreferrer">
              <span className="contact-icon">◈</span>
              <span className="contact-label">LinkedIn</span>
              <span className="contact-value">nawaf-al-hussain</span>
            </a>

            <a href="https://nawaf-al-hussain.vercel.app" className="contact-card" target="_blank" rel="noopener noreferrer">
              <span className="contact-icon">◉</span>
              <span className="contact-label">Website</span>
              <span className="contact-value">nawaf-al-hussain.vercel.app</span>
            </a>
          </div>
        </motion.div>
      </div>

      <footer className="footer" style={{ position: 'relative', zIndex: 1 }}>
        <div className="footer-content">
          <span className="footer-logo">THE WEB <span>DEV</span></span>
          <p className="footer-text">
            Designed & built by Nawaf Al Hussain Khondokar — with a little help from the web.
          </p>
          <p className="footer-disclaimer">
            Spider-Man and all related characters are trademarks of Marvel Entertainment. This is a fan-made portfolio.
          </p>
        </div>
      </footer>
    </section>
  )
}

export default Contact

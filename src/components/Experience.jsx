import React from 'react'
import { motion } from 'framer-motion'
import './Experience.css'

const experiences = [
  {
    role: 'Private Tutor (Independent Contractor)',
    location: 'Dhaka, Bangladesh',
    period: 'Nov 2023 – Present',
    bullets: [
      'Tutored 12 students in IGCSE/IAL Physics, Chemistry, Mathematics, and English, maintaining 7 active students',
      'Developed and leveraged Syllab AI platform with interactive chatbot interface for personalized tutoring',
      'Achieved A* grades in O-Levels and A grades in A-Levels through customized learning strategies and AI-powered tools',
      'Delivered university-level instruction in SPL, OOP, Discrete Mathematics, and Probability & Statistics',
    ],
  },
  {
    role: 'Closer (Promoted from Telesales Specialist)',
    company: 'SkyTech Solutions',
    location: 'Dhaka, Bangladesh',
    period: 'Aug 2023 – Nov 2023',
    bullets: [
      'Promoted after demonstrating exceptional telesales performance',
      'Closed sales from telesales leads for government rebate heat pump programs',
      'Mentored telesales team members to improve lead quality and conversion rates',
    ],
  },
  {
    role: 'Telesales Specialist',
    company: 'SkyTech Solutions',
    location: 'Dhaka, Bangladesh',
    period: 'Feb 2023 – Aug 2023',
    bullets: [
      'Conducted outbound calls to Australian customers about government heat pump rebates',
      'Maintained high call volume and conversion rates with Australian telecommunications compliance',
    ],
  },
  {
    role: 'Store Manager & Business Operations',
    company: 'CityGroup Dealership (Family Business)',
    location: 'Dhaka, Bangladesh',
    period: 'Mar 2018 – Jan 2023',
    bullets: [
      'Managed full retail operations including inventory management and product display optimization',
      'Oversaw financial operations: daily cash handling, mobile banking transactions, and accounting',
      'Operated independently as sole manager during peak periods handling all business operations',
    ],
  },
]

const education = [
  {
    degree: 'Bachelor of Science in Computer Science & Engineering',
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
    details: 'Mathematics B (A*), Physics (A*), Chemistry (A*), English (A*), ICT (A), Bangla (A*) — Distinctions in Mathematics B and Physics',
  },
]

const Experience = () => {
  const fadeIn = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
  }

  return (
    <section className="experience" id="experience">
      <div className="section-container">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeIn}
        >
          <span className="section-eyebrow">Every Scar a Lesson</span>
          <h2 className="section-title">THE MISSION</h2>
          <div className="section-divider"></div>
        </motion.div>

        <div className="exp-edu-grid">
          {/* Experience Column */}
          <div className="exp-column">
            <h3 className="column-title">Experience</h3>
            <div className="timeline">
              {experiences.map((exp, index) => (
                <motion.div
                  className="timeline-item"
                  key={index}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.1 }}
                  variants={{
                    hidden: { opacity: 0, x: -30 },
                    visible: { opacity: 1, x: 0, transition: { delay: index * 0.1, duration: 0.5 } },
                  }}
                >
                  <div className="timeline-dot"></div>
                  <div className="timeline-content">
                    <span className="timeline-period">{exp.period}</span>
                    <h4 className="timeline-role">{exp.role}</h4>
                    {exp.company && <span className="timeline-company">{exp.company}</span>}
                    <span className="timeline-location">{exp.location}</span>
                    <ul className="timeline-bullets">
                      {exp.bullets.map((b, i) => (
                        <li key={i}>{b}</li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Education Column */}
          <div className="edu-column">
            <h3 className="column-title">Education</h3>
            <div className="timeline">
              {education.map((edu, index) => (
                <motion.div
                  className="timeline-item"
                  key={index}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.1 }}
                  variants={{
                    hidden: { opacity: 0, x: 30 },
                    visible: { opacity: 1, x: 0, transition: { delay: index * 0.1, duration: 0.5 } },
                  }}
                >
                  <div className="timeline-dot edu-dot"></div>
                  <div className="timeline-content">
                    <span className="timeline-period">{edu.period}</span>
                    <h4 className="timeline-role">{edu.degree}</h4>
                    <span className="timeline-company">{edu.school}</span>
                    <span className="timeline-location">{edu.location}</span>
                    {edu.details && <p className="timeline-details">{edu.details}</p>}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Experience

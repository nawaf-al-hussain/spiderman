import React, { useState, useEffect } from 'react'
import './SectionNav.css'

const sections = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'Queens' },
  { id: 'skills', label: 'Web Shooters' },
  { id: 'matrix', label: 'Matrix' },
  { id: 'projects', label: 'Projects' },
  { id: 'experience', label: 'Experience' },
  { id: 'bugle', label: 'Bugle Archives' },
  { id: 'resume', label: 'Resume' },
  { id: 'contact', label: 'Contact' },
]

const SectionNav = () => {
  const [active, setActive] = useState('home')

  useEffect(() => {
    const onScroll = () => {
      const scrollY = window.scrollY + window.innerHeight / 3
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i].id)
        if (el && el.offsetTop <= scrollY) {
          setActive(sections[i].id)
          break
        }
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleClick = (id) => {
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <nav className="section-nav" aria-label="Section navigation">
      {sections.map((s) => (
        <button
          key={s.id}
          className={`section-dot ${active === s.id ? 'active' : ''}`}
          onClick={() => handleClick(s.id)}
          aria-label={`Go to ${s.label}`}
          title={s.label}
        >
          <span className="dot"></span>
          <span className="dot-label">{s.label}</span>
        </button>
      ))}
    </nav>
  )
}

export default SectionNav

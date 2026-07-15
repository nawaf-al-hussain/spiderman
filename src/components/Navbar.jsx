import React, { useState } from 'react'
import { useTheme } from '../context/ThemeContext'
import { ThemeAnimationType, useModeAnimation } from 'react-theme-switch-animation'
import './Navbar.css'

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false)
  const { theme, toggleTheme } = useTheme()
  const isDarkMode = theme === 'dark'

  const { ref, toggleSwitchTheme } = useModeAnimation({
    animationType: ThemeAnimationType.CIRCLE,
    duration: 750,
    isDarkMode,
    onDarkModeChange: (isDark) => {
      if (isDark !== isDarkMode) {
        toggleTheme()
      }
    },
  })

  const handleLinkClick = () => {
    setMenuOpen(false)
  }

  return (
    <>
      {/* Overlay behind mobile menu */}
      <div
        className={`nav-overlay ${menuOpen ? 'active' : ''}`}
        onClick={() => setMenuOpen(false)}
      />
      <nav className="navbar">
        <a href="#home" className="nav-logo" onClick={handleLinkClick}>
          THE WEB <span>DEV</span>
        </a>

        <ul className={`nav-links ${menuOpen ? 'open' : ''}`}>
          <li><a href="#about" onClick={handleLinkClick}>Queens</a></li>
          <li><a href="#skills" onClick={handleLinkClick}>Web Shooters</a></li>
          <li><a href="#projects" onClick={handleLinkClick}>The Arsenal</a></li>
          <li><a href="#experience" onClick={handleLinkClick}>The Mission</a></li>
          <li><a href="#contact" onClick={handleLinkClick}>The Call</a></li>
        </ul>

        <div className="nav-actions">
          <button
            ref={ref}
            className="theme-toggle"
            onClick={toggleSwitchTheme}
            aria-label={`Switch to ${isDarkMode ? 'light' : 'dark'} mode`}
            title={`Switch to ${isDarkMode ? 'light' : 'dark'} mode`}
          >
            {isDarkMode ? (
              /* Sun icon — switch to light */
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="5"/>
                <line x1="12" y1="1" x2="12" y2="3"/>
                <line x1="12" y1="21" x2="12" y2="23"/>
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
                <line x1="1" y1="12" x2="3" y2="12"/>
                <line x1="21" y1="12" x2="23" y2="12"/>
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
              </svg>
            ) : (
              /* Bat/Moon icon — switch to dark */
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79Z"/>
              </svg>
            )}
          </button>

          <button
            className={`hamburger ${menuOpen ? 'active' : ''}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </nav>
    </>
  )
}

export default Navbar

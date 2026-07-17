import React, { useState, useEffect } from 'react'
import './Loader.css'

const Loader = ({ onComplete }) => {
  const [progress, setProgress] = useState(0)
  const [fadeOut, setFadeOut] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          return 100
        }
        return prev + Math.random() * 15 + 5
      })
    }, 80)

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    if (progress >= 100) {
      setTimeout(() => setFadeOut(true), 300)
      setTimeout(() => onComplete(), 800)
    }
  }, [progress, onComplete])

  return (
    <div className={`loader ${fadeOut ? 'fade-out' : ''}`}>
      <div className="loader-content">
        <svg viewBox="0 0 80 80" className="spider-loader" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Background ring */}
          <circle cx="40" cy="40" r="36" stroke="var(--loader-track)" strokeWidth="1.5"/>
          {/* Progress ring — solid Spider-Man red, no gradient */}
          <circle cx="40" cy="40" r="36" stroke="var(--red)" strokeWidth="2"
                  strokeDasharray={`${(progress / 100) * 226} 226`}
                  strokeLinecap="round"
                  transform="rotate(-90 40 40)"
                  className="loader-ring"/>
        </svg>
        <div className="loader-text">
          <span className="loader-title">THE WEB DEV</span>
          <span className="loader-progress">{Math.min(Math.round(progress), 100)}%</span>
        </div>
      </div>
    </div>
  )
}

export default Loader

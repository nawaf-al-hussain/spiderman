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
        <div className="loader-ring-wrap">
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
          {/* Spider-Man chest icon centered */}
          <svg className="loader-spider" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <path fill="currentColor" d="M38.8,23.1c-2.6-1.7-4.6-2.8-6.8-5.1c-0.4-0.4-0.9-0.9-1.1-0.9c-0.2-0.2-0.6,0-0.9,0c-1.1,0-1.9-0.5-2.8-0.9c1-0.1,2.1-0.2,2.9-0.2c3.6,0,6.2,0.9,8,2c0.6-0.6,1.5-1.1,2-1.9c-0.6-0.7-0.9-2.4-1.1-3.3c-0.2-0.7-0.2-1.3-0.4-1.7C37.5,7.1,36.2,4,34,1c2.2,4.3,4.2,8.7,4,15c-1.8-0.6-7.4-1-8-1c-0.9,0-2.1,0.3-3,0.3c0.4-0.6,0.6-1.5,1.3-1.7c0.4-0.2,0.9,0,1.5,0c1.8,0,3.8-0.2,4.3,0.4c0.4-0.6,1.3-0.8,1.5-1.3c0-0.2-0.2-1.1-0.4-1.7s-0.4-1.3-0.6-1.7c-0.7-3-2.1-6.3-3.2-8.7L31,0c1.1,3.7,2,7.3,2,12c-2,0-2.8,0-5,0c-0.7,0.6-1.4,1.6-2,2c0.2-0.9-0.5-1.5-1-1.9c0.2,0.4,0.7,1.5,0.3,2.1c-0.4,0-0.2-0.6-0.6-0.6c-0.2,0.2-0.5,0.3-0.7,0.3c0,0,0,0,0,0s0,0,0,0c-0.3,0-0.5,0-0.7-0.3c-0.4,0-0.2,0.6-0.6,0.6c-0.4-0.6,0.1-1.7,0.3-2.1c-0.6,0.4-1.2,1-1,1.9c-0.6-0.4-1.2-1.4-2-2c-2.2,0-3,0-5,0c0-4.7,0.9-8.3,2-12l-0.4,0.6c-1.1,2.4-2.4,5.8-3.2,8.7c-0.2,0.4-0.4,1.1-0.6,1.7s-0.4,1.5-0.4,1.7c0.2,0.6,1.1,0.8,1.5,1.3c0.4-0.6,2.4-0.4,4.3-0.4c0.6,0,1.1-0.2,1.5,0c0.7,0.2,0.9,1.1,1.3,1.7c-0.9,0-2.1-0.3-3-0.3c-0.6,0-6.2,0.4-8,1C9.8,9.7,11.8,5.3,14,1c-2.2,3-3.5,6.1-4.6,10.2c-0.2,0.4-0.2,0.9-0.4,1.7c-0.2,0.9-0.5,2.6-1.1,3.3c0.6,0.7,1.5,1.3,2,1.9c1.8-1.1,4.4-2,8-2c0.7,0,1.8,0,2.9,0.2c-0.9,0.4-1.7,0.9-2.8,0.9c-0.4,0-0.7-0.2-0.9,0c-0.2,0-0.7,0.6-1.1,0.9c-2.2,2.2-4.2,3.4-6.8,5.1c-0.7,0.6-1.3,1.1-2.2,0.4c0,7.4,1.7,12.9,4.1,17.9C11.4,41.9,12,43,12,43c-1.8-4.3-3-9.3-3-15.3c0-0.6-0.2-1.5,0-1.9c0.2-0.7,1.3-1.7,2-2.2c2-1.9,3.5-2.6,5.7-4.3c0.4-0.4,0.7-0.7,1.1-0.9s2.2-0.5,3-0.9c-0.9,0.9-2,2.6-3.1,3.5c-0.2,0.2-0.4,0-0.7,0c0,9,0.4,16.6,2.8,22.9c0.6,1.5,1.3,3,2.2,4.1c-3.3-6-3-15.7-3-25c-0.7-0.6-0.2-0.9,0.4-1.6c0.7-0.7,1.6-2.6,2.6-3c0,0.4-0.2,0.7-0.4,1S21,20.2,21,20.4c-0.2,0.7,0.2,2.2,0.4,3C22,26,22.7,29,23.6,31c0.4,0,0.2-0.8,0.4-1c0,0,0,0,0,0c0,0,0,0,0,0c0.2,0.2,0,1,0.4,1c0.9-2,1.7-5,2.2-7.6c0.2-0.7,0.6-2.2,0.4-3c0-0.2-0.4-0.6-0.6-0.9s-0.4-0.7-0.4-1c0.9,0.4,1.8,2.2,2.6,3c0.6,0.7,1.1,1.1,0.4,1.6c0,9.3,0.3,19-3,25c0.9-1.1,1.7-2.6,2.2-4.1C30.6,37.6,31,30,31,21c-0.4,0-0.6,0.2-0.7,0c-1.1-0.9-2.2-2.6-3.1-3.5c0.8,0.4,2.6,0.7,3,0.9s0.7,0.6,1.1,0.9c2.2,1.7,3.6,2.5,5.7,4.3c0.7,0.6,1.8,1.5,2,2.2c0.2,0.4,0,1.3,0,1.9c0,6-1.1,11-3,15.3c0,0,0.6-1.1,0.9-1.7c2.4-5,4.1-10.5,4.1-17.9C40.1,24.2,39.5,23.6,38.8,23.1z"/>
          </svg>
        </div>
        <div className="loader-text">
          <span className="loader-title">THE WEB DEV</span>
          <span className="loader-progress">{Math.min(Math.round(progress), 100)}%</span>
        </div>
      </div>
    </div>
  )
}

export default Loader

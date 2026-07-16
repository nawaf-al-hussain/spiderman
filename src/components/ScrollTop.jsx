import React, { useState, useEffect } from 'react'
import SpiderPath from './SpiderIcon'
import './ScrollTop.css'

const ScrollTop = () => {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > 500)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <button
      className={`scroll-top ${visible ? 'visible' : ''}`}
      onClick={scrollToTop}
      aria-label="Scroll to top"
    >
      <svg viewBox="0 0 4.16738 1.88152" className="spider-signal" fill="none" xmlns="http://www.w3.org/2000/svg">
        <SpiderPath fill="currentColor" opacity="0.9"/>
      </svg>
      <span className="scroll-top-label">TOP</span>
    </button>
  )
}

export default ScrollTop

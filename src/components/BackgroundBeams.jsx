import React, { useRef, useEffect, useCallback } from 'react'
import './BackgroundBeams.css'

/**
 * BackgroundBeams — Aceternity UI-inspired diagonal light beams
 * that sweep across a dark background.
 *
 * Props:
 *   beamColor   — CSS color for beam fills (default: gold)
 *   glowColor   — CSS color for beam glow (default: red-gold)
 *   beamCount   — number of beams (default: 6)
 *   className   — extra class on the wrapper
 *
 * Feature flag: add class `no-beams` on the parent section
 * (or anywhere above) to instantly disable. The CSS rule
 * `.no-beams .bg-beams { display: none }` handles fallback.
 */
const BackgroundBeams = ({
  beamColor = 'rgba(192, 0, 26, 0.04)',
  glowColor = 'rgba(192, 0, 26, 0.08)',
  beamCount = 6,
  className = '',
}) => {
  const canvasRef = useRef(null)
  const rafRef = useRef(null)
  const beamsRef = useRef([])

  // Initialise beams once
  const initBeams = useCallback((width, height) => {
    const beams = []
    for (let i = 0; i < beamCount; i++) {
      beams.push({
        // Each beam is a diagonal line defined by its x-offset
        x: (Math.random() - 0.3) * width * 1.5,
        speed: 0.15 + Math.random() * 0.35,
        width: 40 + Math.random() * 80,
        opacity: 0.3 + Math.random() * 0.5,
        angle: -25 + Math.random() * 10, // slight variation around -25deg
        phase: Math.random() * Math.PI * 2,
      })
    }
    beamsRef.current = beams
  }, [beamCount])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')

    const resize = () => {
      const parent = canvas.parentElement
      if (!parent) return
      canvas.width = parent.offsetWidth
      canvas.height = parent.offsetHeight
      if (beamsRef.current.length === 0) {
        initBeams(canvas.width, canvas.height)
      }
    }
    resize()
    window.addEventListener('resize', resize)

    let time = 0
    const draw = () => {
      const { width, height } = canvas
      if (width === 0 || height === 0) {
        rafRef.current = requestAnimationFrame(draw)
        return
      }

      ctx.clearRect(0, 0, width, height)

      // Check DM for color swap
      const isDM = document.body.classList.contains('spider-sense-mode')
      const bc = isDM ? 'rgba(30, 144, 255, 0.035)' : beamColor
      const gc = isDM ? 'rgba(30, 144, 255, 0.08)' : glowColor

      beamsRef.current.forEach((beam) => {
        // Slow drift
        const drift = Math.sin(time * beam.speed * 0.008 + beam.phase) * 60
        const bx = beam.x + drift

        ctx.save()
        ctx.translate(bx, 0)
        ctx.rotate((beam.angle * Math.PI) / 180)

        // Main beam — a wide, very subtle rectangle
        const grad = ctx.createLinearGradient(0, 0, beam.width, 0)
        grad.addColorStop(0, 'transparent')
        grad.addColorStop(0.3, bc)
        grad.addColorStop(0.5, gc)
        grad.addColorStop(0.7, bc)
        grad.addColorStop(1, 'transparent')
        ctx.fillStyle = grad
        ctx.globalAlpha = beam.opacity * (0.6 + 0.4 * Math.sin(time * 0.01 + beam.phase))
        ctx.fillRect(-beam.width / 2, -height * 0.2, beam.width, height * 1.6)

        ctx.restore()
      })

      time++
      rafRef.current = requestAnimationFrame(draw)
    }

    // Respect reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!prefersReducedMotion) {
      rafRef.current = requestAnimationFrame(draw)
    } else {
      // Draw one static frame
      time = 50
      draw()
    }

    return () => {
      window.removeEventListener('resize', resize)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [beamColor, glowColor, initBeams])

  return (
    <div className={`bg-beams ${className}`} aria-hidden="true">
      <canvas ref={canvasRef} className="bg-beams-canvas" />
    </div>
  )
}

export default BackgroundBeams

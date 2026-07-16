import React, { useEffect, useRef } from 'react'
import './Particles.css'

const Particles = () => {
  const canvasRef = useRef(null)

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return // No particles if user prefers reduced motion

    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let animId

    const isMobile = window.innerWidth < 768
    const COUNT = isMobile ? 20 : 80

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const particles = []

    for (let i = 0; i < COUNT; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        length: Math.random() * (isMobile ? 8 : 12) + 4,
        speed: Math.random() * (isMobile ? 1 : 1.5) + 0.5,
        opacity: Math.random() * 0.15 + 0.03,
        drift: (Math.random() - 0.5) * 0.3,
      })
    }

    let frameCount = 0
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Throttle to ~30fps on mobile
      frameCount++
      const skipFrame = isMobile && frameCount % 2 !== 0

      if (!skipFrame) {
        for (const p of particles) {
          ctx.beginPath()
          ctx.moveTo(p.x, p.y)
          ctx.lineTo(p.x + p.drift, p.y + p.length)
          ctx.strokeStyle = `rgba(192, 0, 26, ${p.opacity})`
          ctx.lineWidth = 0.5
          ctx.stroke()

          p.y += p.speed
          p.x += p.drift * 0.1

          if (p.y > canvas.height) {
            p.y = -p.length
            p.x = Math.random() * canvas.width
          }
        }
      }

      animId = requestAnimationFrame(draw)
    }

    draw()

    return () => {
      window.removeEventListener('resize', resize)
      cancelAnimationFrame(animId)
    }
  }, [])

  return <canvas ref={canvasRef} className="particles-canvas" />
}

export default Particles

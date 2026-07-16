import { useEffect, useState, useRef } from 'react'

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&'

const ScrambleText = ({ text, className, style }) => {
  const [display, setDisplay] = useState(text)
  const triggeredRef = useRef(false)
  const ref = useRef(null)

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !triggeredRef.current) {
          triggeredRef.current = true
          observer.unobserve(el)

          if (prefersReducedMotion) {
            setDisplay(text)
            return
          }

          let iteration = 0
          const interval = setInterval(() => {
            setDisplay(
              text.split('').map((char, i) => {
                if (char === ' ' || char === '\n') return char
                if (i < iteration) return text[i]
                return CHARS[Math.floor(Math.random() * CHARS.length)]
              }).join('')
            )
            iteration += 1 / 2
            if (iteration >= text.length) {
              clearInterval(interval)
              setDisplay(text)
            }
          }, 30)
        }
      },
      { threshold: 0.5 }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [text])

  return <span ref={ref} className={className} style={style}>{display}</span>
}

export default ScrambleText

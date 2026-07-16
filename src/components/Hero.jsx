import React, { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import './Hero.css'
import Navbar from './Navbar'
import { useTheme } from '../context/ThemeContext'

const TITLES = ['Platform Engineer', 'Cloud Architect', 'Backend Specialist', 'Full Stack Developer']

const Hero = () => {
  const heroRef   = useRef(null)
  const stickyRef = useRef(null)
  const canvasRef = useRef(null)
  const mouseRef  = useRef({ x: -9999, y: -9999 })
  const smoothRef = useRef({ x: -9999, y: -9999 })
  const trailRef  = useRef([])

  // ── Auto-sweep state (driven by SpiderSenseMode via custom event) ──
  // When true, real mousemove events are ignored so the sweep animation
  // can run uninterrupted. The radius multiplier makes the sweep reveal
  // head bigger than a normal hover.
  const autoSweepRef = useRef(false)
  const sweepRadiusMultiplierRef = useRef(1)

  // Scroll progress ref for canvas (avoids re-running the heavy effect)
  const scrollProgressRef = useRef(0)

  // Theme ref for canvas overlay color
  const themeRef = useRef('dark')

  // Typing animation state
  const [titleText, setTitleText] = useState('')
  const [titleIndex, setTitleIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)
  const [isMobile, setIsMobile] = useState(() => typeof window !== 'undefined' && window.innerWidth < 700)
  const [scrollProgress, setScrollProgress] = useState(0)
  const { theme } = useTheme()

  // Keep theme ref in sync for canvas draw
  useEffect(() => { themeRef.current = theme }, [theme])

  useEffect(() => {
    const currentTitle = TITLES[titleIndex]
    let timeout

    if (!isDeleting && titleText === currentTitle) {
      timeout = setTimeout(() => setIsDeleting(true), 2000)
    } else if (isDeleting && titleText === '') {
      setIsDeleting(false)
      setTitleIndex((prev) => (prev + 1) % TITLES.length)
    } else if (isDeleting) {
      timeout = setTimeout(() => {
        setTitleText(currentTitle.substring(0, titleText.length - 1))
      }, 40)
    } else {
      timeout = setTimeout(() => {
        setTitleText(currentTitle.substring(0, titleText.length + 1))
      }, 80)
    }

    return () => clearTimeout(timeout)
  }, [titleText, isDeleting, titleIndex])

  // Detect mobile viewport
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 700)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  // Scroll-based progress for mobile — drives canvas circle reveal + text opacity
  // Uses window.scrollY directly (more reliable on iOS than getBoundingClientRect)
  useEffect(() => {
    if (!isMobile) { setScrollProgress(1); scrollProgressRef.current = 1; return }

    const handleScroll = () => {
      const hero = heroRef.current
      if (!hero) return
      // Use scrollY + hero offsetTop instead of getBoundingClientRect
      // This avoids iOS rubber-band jitter where rect.top goes negative
      const heroTop = hero.offsetTop
      const heroHeight = hero.offsetHeight
      const viewportHeight = window.innerHeight
      const scrollY = window.scrollY
      const scrolled = scrollY - heroTop
      const scrollableDistance = heroHeight - viewportHeight
      if (scrollableDistance <= 0) { setScrollProgress(1); scrollProgressRef.current = 1; return }
      const progress = Math.min(1, Math.max(0, scrolled / (scrollableDistance * 0.5)))
      setScrollProgress(progress)
      scrollProgressRef.current = progress
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [isMobile])

  // ── Canvas effect ──
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const hero   = heroRef.current
    const canvas = canvasRef.current
    const ctx    = canvas.getContext('2d')

    const isMobileCanvas = window.innerWidth < 768
    const TRAIL_LENGTH = isMobileCanvas ? 30 : 60
    const getHeadRadius = () => {
      const w = window.innerWidth
      if (w < 480) return 50
      if (w < 700) return 70
      if (w < 900) return 110
      return 180
    }

    let HEAD_RADIUS = getHeadRadius()

    // Create offscreen canvas ONCE — reuse every frame
    const offscreen = document.createElement('canvas')
    const off = offscreen.getContext('2d')

    // ── Crossfade canvases ──
    // fadeCanvas holds the freshly-rendered new scene; fadeSnapshotCanvas
    // holds the frozen pre-swap frame. During the ~600ms transition we
    // composite both onto the main canvas with crossfade alphas.
    const fadeCanvas = document.createElement('canvas')
    const fadeCtx = fadeCanvas.getContext('2d')
    const fadeSnapshotCanvas = document.createElement('canvas')
    const fadeSnapshotCtx = fadeSnapshotCanvas.getContext('2d')
    let fadeStart = null
    let hasSnapshot = false
    const FADE_DURATION = 600 // ms — feels cinematic, not sluggish
    const easeInOutCubic = (t) =>
      t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2

    // Preload all three image variants up front. These Image objects are
    // never reassigned .src after this — they're decoded once and the draw
    // loop reads from them via atomic ref swaps. Reassigning .src triggers
    // a fresh decode cycle even when the image is cached, which is what
    // causes the black flash on DM toggle.
    const imgOne  = new Image()
    const imgTwoN = new Image()
    // Spider-Sense mode uses the same two.png with blue tinting — no third image needed
    const imgTwoD = imgTwoN  // alias: DM reuses normal image

    let loaded = 0
    const onAnyReady = () => {
      if (++loaded === 2) {
        if (prefersReducedMotion) {
          draw()
          return
        }
        draw()
      }
    }
    // Attach handlers BEFORE setting .src so cached-image load events
    // can't fire before we're listening. onerror counts as ready so a
    // missing twoo_DM.jpg doesn't block the draw loop forever.
    imgOne.onload  = onAnyReady
    imgTwoN.onload = onAnyReady
        imgOne.onerror  = onAnyReady
    imgTwoN.onerror = onAnyReady
    
    imgOne.src  = '/images/one.png'
    imgTwoN.src = '/images/two.png'
    
    // Current references — atomically swapped by assignImages() below.
    // The draw loop reads from these, so a swap takes effect next frame.
    let bottomImg = imgOne
    let topImg    = imgTwoN

    let currentTwoo = null  // tracks which twoo variant is currently assigned
    const assignImages = () => {
      const isDM = document.body.classList.contains('spider-sense-mode')
      const twoo = isDM ? imgTwoD : imgTwoN
      if (twoo === currentTwoo) return

      // Capture pre-swap frame for crossfade (skip on very first assign
      // and skip if canvas isn't sized yet — e.g. during initial mount).
      if (currentTwoo !== null && canvas.width > 0 && canvas.height > 0) {
        fadeSnapshotCtx.clearRect(0, 0, canvas.width, canvas.height)
        fadeSnapshotCtx.drawImage(canvas, 0, 0)
        fadeStart = performance.now()
        hasSnapshot = true
      }

      currentTwoo = twoo
      if (theme === 'light') {
        bottomImg = imgOne
        topImg    = twoo
      } else {
        bottomImg = twoo
        topImg    = imgOne
      }
    }
    assignImages()

    // Live-swap when DM toggles — refs change instantly, no decode, no flash.
    const dmObserver = new MutationObserver(assignImages)
    dmObserver.observe(document.body, { attributes: true, attributeFilter: ['class'] })

    const resize = () => {
      const container = stickyRef.current || hero
      canvas.width  = container.offsetWidth
      canvas.height = container.offsetHeight
      offscreen.width  = container.offsetWidth
      offscreen.height = container.offsetHeight
      fadeCanvas.width  = container.offsetWidth
      fadeCanvas.height = container.offsetHeight
      fadeSnapshotCanvas.width  = container.offsetWidth
      fadeSnapshotCanvas.height = container.offsetHeight
      HEAD_RADIUS = getHeadRadius()
    }
    resize()
    window.addEventListener('resize', resize)

    const eventTarget = stickyRef.current || hero

    // ── Desktop mouse tracking ──
    const onMove = (e) => {
      // Ignore real mouse while an auto-sweep is running — otherwise
      // the sweep position and real cursor fight over mouseRef and the
      // reveal jitters between the two.
      if (autoSweepRef.current) return
      const rect = eventTarget.getBoundingClientRect()
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      }
    }
    eventTarget.addEventListener('mousemove', onMove)

    let rafId

    // ── Smoothed scroll progress for mobile ──
    let smoothScrollProgress = 0

    const draw = () => {
      const { width, height } = canvas

      // ── Spider-Sense Mode check (once per frame) ──
      // When DM is on, the cursor glow + reveal ring switch from gold
      // to cyan to match the DM aesthetic. classList.contains is cheap
      // (short class list, browser-level) so checking per-frame is fine.
      const isDM = document.body.classList.contains('spider-sense-mode')

      // ── Smooth the scroll progress for canvas (no frame skipping on iOS) ──
      if (isMobileCanvas) {
        const target = scrollProgressRef.current
        smoothScrollProgress += (target - smoothScrollProgress) * 0.25
        // Snap when close enough to avoid infinite lerp
        if (Math.abs(smoothScrollProgress - target) < 0.0005) {
          smoothScrollProgress = target
        }
      }

      // ── Draw base image ──
      ctx.clearRect(0, 0, width, height)
      drawImageCover(ctx, bottomImg, 0, 0, width, height)

      // ── Draw reveal (top image) ──
      off.clearRect(0, 0, width, height)
      off.globalCompositeOperation = 'source-over'

      if (isMobileCanvas) {
        // ── Mobile: scroll-linked circle reveal ──
        const progress = smoothScrollProgress
        if (progress > 0.001) {
          // Ease the progress for a more dramatic feel
          const eased = progress < 0.5
            ? 2 * progress * progress
            : 1 - Math.pow(-2 * progress + 2, 2) / 2

          const maxRadius = Math.sqrt(width * width + height * height) / 2
          const radius = maxRadius * eased
          const cx = width / 2
          const cy = height / 2

          off.beginPath()
          off.arc(cx, cy, radius, 0, Math.PI * 2)
          off.fillStyle = 'rgba(0,0,0,1)'
          off.fill()

          // ── Glow ring at the circle edge (gold normally, cyan in DM) ──
          if (eased < 0.98 && radius > 5) {
            const glowWidth = 35
            const innerR = Math.max(0, radius - glowWidth)
            const outerR = radius + glowWidth
            const ringRGB = isDM ? '30, 144, 255' : '192, 0, 26'
            const glow = ctx.createRadialGradient(
              cx, cy, innerR,
              cx, cy, outerR
            )
            glow.addColorStop(0,    `rgba(${ringRGB}, 0)`)
            glow.addColorStop(0.35, `rgba(${ringRGB}, 0.18)`)
            glow.addColorStop(0.55, `rgba(${ringRGB}, 0.35)`)
            glow.addColorStop(0.75, `rgba(${ringRGB}, 0.18)`)
            glow.addColorStop(1,    `rgba(${ringRGB}, 0)`)

            ctx.beginPath()
            ctx.arc(cx, cy, outerR, 0, Math.PI * 2)
            ctx.fillStyle = glow
            ctx.fill()
          }
        }
      } else {
        // ── Desktop: mouse trail reveal ──
        const s = smoothRef.current
        const m = mouseRef.current
        s.x += (m.x - s.x) * 0.13
        s.y += (m.y - s.y) * 0.13

        trailRef.current.unshift({ x: s.x, y: s.y })
        if (trailRef.current.length > TRAIL_LENGTH) {
          trailRef.current.length = TRAIL_LENGTH
        }

        // Effective head radius — bigger while an auto-sweep is running
        const effectiveHead = HEAD_RADIUS * sweepRadiusMultiplierRef.current

        const trail = trailRef.current
        for (let i = 0; i < trail.length; i++) {
          const t     = 1 - i / trail.length
          const r     = effectiveHead * (0.25 + 0.75 * t)
          const alpha = Math.pow(t, 1.5)
          off.beginPath()
          off.arc(trail[i].x, trail[i].y, r, 0, Math.PI * 2)
          off.fillStyle = `rgba(0,0,0,${alpha})`
          off.fill()
        }
      }

      // Clip top image to the reveal mask
      off.globalCompositeOperation = 'source-in'
      drawImageCover(off, topImg, 0, 0, width, height)

      ctx.drawImage(offscreen, 0, 0)

      // ── Mobile: draw dark overlay ON TOP of everything (canvas-based, no iOS flash) ──
      // Must be AFTER circle reveal so overlay dims both images uniformly
      if (isMobileCanvas && smoothScrollProgress > 0.01) {
        const isLight = themeRef.current === 'light'
        ctx.save()
        ctx.globalCompositeOperation = 'source-over'
        const grad = ctx.createLinearGradient(0, 0, 0, height)
        grad.addColorStop(0, isLight
          ? `rgba(0, 0, 0, ${0.15 * smoothScrollProgress})`
          : `rgba(0, 0, 0, ${0.25 * smoothScrollProgress})`)
        grad.addColorStop(0.35, isLight
          ? `rgba(0, 0, 0, ${0.4 * smoothScrollProgress})`
          : `rgba(0, 0, 0, ${0.65 * smoothScrollProgress})`)
        grad.addColorStop(1, isLight
          ? `rgba(0, 0, 0, ${0.6 * smoothScrollProgress})`
          : `rgba(0, 0, 0, ${0.85 * smoothScrollProgress})`)
        ctx.fillStyle = grad
        ctx.fillRect(0, 0, width, height)
        ctx.restore()
      }

      // ── Desktop: glow around cursor (gold normally, cyan in DM) ──
      if (!isMobileCanvas) {
        const trail = trailRef.current
        if (trail.length > 0) {
          const head = trail[0]
          const glowR = HEAD_RADIUS * sweepRadiusMultiplierRef.current * 1.4
          const glowRGB = isDM ? '30, 144, 255' : '192, 0, 26'
          const glow = ctx.createRadialGradient(
            head.x, head.y, 0,
            head.x, head.y, glowR
          )
          glow.addColorStop(0,   `rgba(${glowRGB}, 0.22)`)
          glow.addColorStop(0.5, `rgba(${glowRGB}, 0.10)`)
          glow.addColorStop(1,   'rgba(0,0,0,0)')
          ctx.beginPath()
          ctx.arc(head.x, head.y, glowR, 0, Math.PI * 2)
          ctx.fillStyle = glow
          ctx.fill()
        }
      }

      // ── Crossfade composite (during DM image swap) ──
      // The new scene has just been rendered to `canvas` above. We copy it
      // aside, clear, then blend old snapshot (fading out) ↔ new scene
      // (fading in) with an eased alpha curve. Works for both dark mode
      // (bottom image changes) and light mode (top/reveal image changes).
      if (hasSnapshot && fadeStart !== null) {
        const elapsed = performance.now() - fadeStart
        const p = Math.min(1, elapsed / FADE_DURATION)
        const eased = easeInOutCubic(p)

        // Stash the freshly-drawn new scene
        fadeCtx.clearRect(0, 0, width, height)
        fadeCtx.drawImage(canvas, 0, 0)

        // Composite old ↔ new onto main canvas
        ctx.clearRect(0, 0, width, height)
        ctx.globalAlpha = 1 - eased
        ctx.drawImage(fadeSnapshotCanvas, 0, 0)
        ctx.globalAlpha = eased
        ctx.drawImage(fadeCanvas, 0, 0)
        ctx.globalAlpha = 1

        if (p >= 1) {
          hasSnapshot = false
          fadeStart = null
        }
      }

      rafId = requestAnimationFrame(draw)
    }

    const drawImageCover = (ctx, img, x, y, w, h) => {
      const imgRatio = img.width / img.height
      const canvasRatio = w / h
      let drawW, drawH, drawX, drawY

      if (canvasRatio > imgRatio) {
        drawW = w
        drawH = w / imgRatio
        drawX = x
        drawY = y - (drawH - h) / 2
      } else {
        drawH = h
        drawW = h * imgRatio
        drawX = x - (drawW - w) / 2
        drawY = y
      }

      ctx.drawImage(img, drawX, drawY, drawW, drawH)
    }

    // (Load handling is set up above with the image preloads — see onAnyReady.)

    // ── Auto-sweep handler (triggered by SpiderSenseMode) ──
    // Listens for a custom event and runs a one-shot left→right sweep
    // across the hero. While the sweep runs, real mousemove is ignored
    // and the reveal head uses a bigger radius. Writes directly to
    // mouseRef + smoothRef each frame so there's no smoothing lag and
    // no fighting with real cursor input.
    let sweepRaf = null
    const onSweep = (e) => {
      const { duration = 2800, radiusMultiplier = 1.7 } = e.detail || {}
      // Skip on mobile (uses scroll-linked reveal) or reduced motion
      if (isMobileCanvas) return
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

      const sticky = stickyRef.current
      if (!sticky) return
      const rect = sticky.getBoundingClientRect()
      if (rect.width === 0 || rect.height === 0) return

      // Cancel any in-progress sweep before starting a new one
      if (sweepRaf) cancelAnimationFrame(sweepRaf)

      autoSweepRef.current = true
      sweepRadiusMultiplierRef.current = radiusMultiplier

      // Clear stale trail so the sweep starts clean
      trailRef.current = []

      // Sweep from off-screen left → off-screen right, with a gentle
      // vertical sine wave for a cinematic panning feel.
      const startX = -rect.width * 0.15
      const endX   =  rect.width * 1.15
      const midY   =  rect.height * 0.5
      const amp    =  rect.height * 0.18

      let startTime = null

      const tick = (now) => {
        if (startTime === null) startTime = now
        const elapsed = now - startTime
        const t = Math.min(1, elapsed / duration)

        // ease-in-out cubic
        const eased = t < 0.5
          ? 4 * t * t * t
          : 1 - Math.pow(-2 * t + 2, 3) / 2

        const x = startX + (endX - startX) * eased
        const y = midY + Math.sin(t * Math.PI * 2) * amp

        // Direct write — no smoothing lag, no listener round-trip
        mouseRef.current = { x, y }
        smoothRef.current = { x, y }

        if (t < 1) {
          sweepRaf = requestAnimationFrame(tick)
        } else {
          autoSweepRef.current = false
          sweepRadiusMultiplierRef.current = 1
          sweepRaf = null
        }
      }

      sweepRaf = requestAnimationFrame(tick)
    }

    window.addEventListener('hero:auto-sweep', onSweep)

    return () => {
      eventTarget.removeEventListener('mousemove', onMove)
      window.removeEventListener('resize', resize)
      window.removeEventListener('hero:auto-sweep', onSweep)
      dmObserver.disconnect()
      if (sweepRaf) cancelAnimationFrame(sweepRaf)
      cancelAnimationFrame(rafId)
      // Reset sweep state on unmount so a re-mount doesn't get stuck
      autoSweepRef.current = false
      sweepRadiusMultiplierRef.current = 1
    }
  }, [theme])

  const container = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.2 } },
  }

  const item = {
    hidden:  { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 70, damping: 12 } },
  }

  const navbarVariant = {
    hidden:  { y: -100, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 80, damping: 14 } },
  }

  return (
    <section className="hero" id="home" ref={heroRef}>
      <div className="hero-sticky" ref={stickyRef}>
        <canvas ref={canvasRef} className="hero-canvas" />

        <motion.div className="hero-navbar" variants={navbarVariant} initial="hidden" animate="visible">
          <Navbar />
        </motion.div>

        <motion.div
          className="hero-content"
          variants={container}
          initial="hidden"
          animate="visible"
          style={isMobile ? { opacity: scrollProgress } : undefined}
        >
          {/* LEFT */}
          <motion.div className="left" variants={item}>
            <motion.span className="st-eyebrow" variants={item}
              style={{ fontFamily: "'Bangers', cursive", letterSpacing: '0.15em' }}>
              <span className="typed-title">{titleText}</span>
              <span className="typed-cursor">|</span>
            </motion.span>
            <h1 className="st-title"
              style={{ fontFamily: "'Bangers', cursive", letterSpacing: '0.04em' }}>
              NAWAF<br />AL HUSSAIN
            </h1>
            <motion.p className="st-desc" variants={item}
              style={{ fontFamily: "'Crimson Pro', Georgia, serif" }}>
              Building high-availability systems that handle 10K+ concurrent users —
              because Queens never sleeps, and neither does great code.
            </motion.p>
            <motion.a href="#projects" className="st-btn" variants={item}
              style={{ fontFamily: "'Bangers', cursive", letterSpacing: '0.15em' }}>
              See What I Build
            </motion.a>
          </motion.div>

          {/* RIGHT */}
          <motion.div className="right" variants={item}>
            <motion.span className="st-eyebrow right-eyebrow" variants={item}
              style={{ fontFamily: "'Bangers', cursive", letterSpacing: '0.15em' }}>
              Friendly Neighborhood Engineer
            </motion.span>
            <h1 className="st-title"
              style={{ fontFamily: "'Bangers', cursive", letterSpacing: '0.04em' }}>
              WITH GREAT POWER<br />COMES GREAT CODE
            </h1>
            <motion.p className="st-text" variants={item}
              style={{ fontFamily: "'Crimson Pro', Georgia, serif" }}>
              From distributed microservices to AI-powered platforms — I build
              systems that stay up when it matters most. Cloud-native. Resilient.
              Built to scale like the web itself.
            </motion.p>
          </motion.div>
        </motion.div>

        {/* Mobile scroll hint */}
        {isMobile && scrollProgress < 0.3 && (
          <div className="hero-scroll-hint" style={{ opacity: 1 - scrollProgress / 0.3 }}>
            <span className="scroll-hint-text">Scroll to Reveal</span>
            <div className="scroll-hint-chevron">&#9660;</div>
          </div>
        )}
      </div>
    </section>
  )
}

export default Hero

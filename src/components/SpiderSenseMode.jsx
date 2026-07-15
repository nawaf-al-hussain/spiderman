import React, { useState, useEffect, useRef } from 'react'
import './SpiderSenseMode.css'

/* ── Section annotations — injected at mount, shown only when DM is on ──
 * Each key matches a section id. Annotations are appended as a child
 * element so we don't have to touch any existing component.
 */
const ANNOTATIONS = {
  home: {
    subject: 'ARCHITECT OF SYSTEMS',
    threat: 'CRITICAL',
    status: 'ACTIVE',
    analysis: 'Operator identity confirmed. High-value target.',
  },
  about: {
    subject: 'OPERATOR PROFILE',
    threat: 'HIGH',
    status: 'VERIFIED',
    analysis: 'Unconventional background — high adaptability index.',
  },
  skills: {
    subject: 'CAPABILITY INDEX',
    threat: 'HIGH',
    status: 'INDEXED',
    analysis: '36 assets across 8 categories. Multi-vector threat.',
  },
  matrix: {
    subject: 'PROFICIENCY SCAN',
    threat: 'MODERATE',
    status: 'ANALYZED',
    analysis: 'Backend specialization confirmed. Steady spread.',
  },
  projects: {
    subject: 'DEPLOYED ARSENAL',
    threat: 'CRITICAL',
    status: '3 ACTIVE',
    analysis: 'Live production systems. Treat with caution.',
  },
  experience: {
    subject: 'MISSION LOG',
    threat: 'HIGH',
    status: '4 ENGAGEMENTS',
    analysis: 'Multi-sector operational history spanning 5+ years.',
  },
  casefiles: {
    subject: 'CASE ARCHIVE',
    threat: 'MODERATE',
    status: '3 DECRYPTED',
    analysis: 'Declassified mission files. Pattern of high success rate.',
  },
  resume: {
    subject: 'CREDENTIAL FILE',
    threat: 'LOW',
    status: 'CURRENT',
    analysis: 'Formal qualifications indexed. Verified.',
  },
  contact: {
    subject: 'COMMS CHANNEL',
    threat: 'LOW',
    status: 'RECEIVING',
    analysis: 'Signal available. Awaiting transmission.',
  },
}

/* ── Hidden evidence markers ──
 * Each marker is a glowing dot positioned absolutely inside its section.
 * Visitors have to spot them while exploring in DM. Hover reveals a
 * short note styled like a collected evidence card.
 *
 * Coordinates are percentages relative to the section. Pick spots that
 * are visually empty so the dots stand out.
 */
const EVIDENCE = [
  {
    section: 'about',
    top: '70%',
    left: '15%',
    title: 'EVIDENCE 01',
    text: '5+ years managing a family retail business before transitioning to engineering. High adaptability index — operators with non-traditional backgrounds often outperform on cross-functional collaboration.',
  },
  {
    section: 'skills',
    top: '25%',
    left: '85%',
    title: 'EVIDENCE 02',
    text: 'Backend specialization confirmed. 6+ frameworks deployed in production. Weekly deployment cadence. Event-driven architecture is the recurring signature across recent engagements.',
  },
  {
    section: 'matrix',
    top: '60%',
    left: '10%',
    title: 'EVIDENCE 03',
    text: 'Architecture proficiency: 88%. Peak axis. CQRS + event sourcing patterns recurring in mission logs. Recommend prioritizing for high-complexity system design work.',
  },
  {
    section: 'projects',
    top: '40%',
    left: '92%',
    title: 'EVIDENCE 04',
    text: 'NexHire: 47 production bugs neutralized during stabilization phase. Anti-ghosting scorer deployed behind feature flag — risk score now informs recruiter intervention strategy.',
  },
  {
    section: 'casefiles',
    top: '55%',
    left: '8%',
    title: 'EVIDENCE 05',
    text: 'Case 001 — anti-ghosting model reached AUC 0.87 on held-out data. Ghosting rate dropped from 24% to 9% in first quarter of rollout. Model still in production.',
  },
  {
    section: 'experience',
    top: '30%',
    left: '88%',
    title: 'EVIDENCE 06',
    text: '4 engagements logged. Average tenure: 14 months. Multi-sector operational history — recruitment, education, retail, BPO. Pattern of rapid domain absorption.',
  },
]

/* ── Mini-map section layout ──
 * Arranged as a building floor plan: HOME at the top entry,
 * then three floors of rooms. Coordinates are grid row/col (1-indexed).
 */
const MAP_ROOMS = [
  { id: 'home',       label: 'HOME',    row: 1, col: 2 },
  { id: 'about',      label: 'QUEENS',  row: 2, col: 1 },
  { id: 'skills',     label: 'BELT',    row: 2, col: 2 },
  { id: 'matrix',     label: 'MATRIX',  row: 2, col: 3 },
  { id: 'projects',   label: 'ARSENAL', row: 3, col: 1 },
  { id: 'experience', label: 'MISSION', row: 3, col: 2 },
  { id: 'casefiles',  label: 'FILES',   row: 3, col: 3 },
  { id: 'resume',     label: 'DOSSIER', row: 4, col: 1 },
  { id: 'contact',    label: 'SIGNAL',  row: 4, col: 3 },
]

const SpiderSenseMode = () => {
  const [active, setActive] = useState(false)
  const [loaded, setLoaded] = useState(false)
  const [audioOn, setAudioOn] = useState(false)
  const [activeRoom, setActiveRoom] = useState('home')
  const injectedRef = useRef(false)
  const audioCtxRef = useRef(null)
  const humNodeRef = useRef(null)
  const beepTimerRef = useRef(null)
  // Watcher that re-forces dark theme on <html> while DM is active.
  // We don't need to remember the user's previous theme — ThemeContext
  // keeps localStorage in sync with their actual preference, so we just
  // read from there when DM turns off.
  const themeObserverRef = useRef(null)

  // ── Load persisted state ──
  useEffect(() => {
    const saved = localStorage.getItem('spider-sense-mode')
    if (saved === 'true') setActive(true)
    setLoaded(true)
  }, [])

  // ── Apply body class + persist + force dark theme while DM is on ──
  // While DM is active, we force `data-theme="dark"` on <html>. This makes
  // every `[data-theme="light"]` selector in index.css inert, so DM looks
  // IDENTICAL regardless of the underlying theme preference. A
  // MutationObserver re-forces dark if anything (user toggle, ThemeContext
  // re-render) tries to set it back to light. When DM turns off, we restore
  // from localStorage — which ThemeContext keeps in sync with the user's
  // actual preference, including any toggle they did while DM was on.
  useEffect(() => {
    if (!loaded) return
    document.body.classList.toggle('spider-sense-mode', active)
    localStorage.setItem('spider-sense-mode', active ? 'true' : 'false')

    if (active) {
      // Force dark theme — DM looks identical in light or dark mode
      document.documentElement.setAttribute('data-theme', 'dark')

      // Re-force dark if anyone tries to change it while DM is on.
      // (ThemeContext still updates localStorage with the user's choice,
      // so we can restore correctly when DM turns off.)
      const observer = new MutationObserver(() => {
        const current = document.documentElement.getAttribute('data-theme')
        if (current !== 'dark') {
          document.documentElement.setAttribute('data-theme', 'dark')
        }
      })
      observer.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ['data-theme'],
      })
      themeObserverRef.current = observer
    } else {
      // DM off — disconnect observer + restore theme from localStorage
      // (ThemeContext's source of truth for the user's preference)
      if (themeObserverRef.current) {
        themeObserverRef.current.disconnect()
        themeObserverRef.current = null
      }
      const savedTheme = localStorage.getItem('theme') || 'dark'
      document.documentElement.setAttribute('data-theme', savedTheme)
    }

    return () => {
      if (themeObserverRef.current) {
        themeObserverRef.current.disconnect()
        themeObserverRef.current = null
      }
    }
  }, [active, loaded])

  // ── Inject annotations + evidence markers into each section (once) ──
  useEffect(() => {
    if (injectedRef.current) return
    injectedRef.current = true

    // Annotations
    Object.entries(ANNOTATIONS).forEach(([id, data]) => {
      const el = document.getElementById(id)
      if (!el) return
      el.classList.add('ss-target')

      const note = document.createElement('div')
      note.className = 'ss-annotation'
      note.setAttribute('aria-hidden', 'true')
      note.innerHTML = `
        <div class="ss-anno-header">
          <span class="ss-anno-tag">SS SCAN</span>
          <span class="ss-anno-id">#${id.toUpperCase()}</span>
        </div>
        <div class="ss-anno-row">
          <span class="ss-anno-key">SUBJECT</span>
          <span class="ss-anno-val">${data.subject}</span>
        </div>
        <div class="ss-anno-row">
          <span class="ss-anno-key">THREAT</span>
          <span class="ss-anno-val ss-threat-${data.threat.toLowerCase()}">${data.threat}</span>
        </div>
        <div class="ss-anno-row">
          <span class="ss-anno-key">STATUS</span>
          <span class="ss-anno-val">${data.status}</span>
        </div>
        <div class="ss-anno-analysis">${data.analysis}</div>
      `
      el.appendChild(note)
    })

    // Evidence markers
    EVIDENCE.forEach((ev) => {
      const el = document.getElementById(ev.section)
      if (!el) return
      el.classList.add('ss-target') // ensure positioning context

      const marker = document.createElement('div')
      marker.className = 'ss-evidence'
      marker.style.top = ev.top
      marker.style.left = ev.left
      marker.setAttribute('aria-hidden', 'true')
      marker.innerHTML = `
        <span class="ss-evidence-dot"></span>
        <span class="ss-evidence-ring"></span>
        <div class="ss-evidence-tip">
          <span class="ss-evidence-tag">${ev.title}</span>
          <span class="ss-evidence-text">${ev.text}</span>
        </div>
      `

      // Flip tooltip below the dot if marker is in the top 25% of its section
      // (otherwise the tooltip card overflows the section top and gets clipped)
      const topPct = parseFloat(ev.top)
      if (!Number.isNaN(topPct) && topPct < 25) {
        marker.classList.add('flip-below')
      }

      el.appendChild(marker)
    })

    // Cleanup on unmount (for hot reload safety)
    return () => {
      document.querySelectorAll('.ss-annotation, .ss-evidence').forEach((n) => n.remove())
      document.querySelectorAll('.ss-target').forEach((n) =>
        n.classList.remove('ss-target')
      )
    }
  }, [])

  // ── Track active section for the mini-map ──
  useEffect(() => {
    const onScroll = () => {
      const scrollY = window.scrollY + window.innerHeight / 3
      const ids = MAP_ROOMS.map((r) => r.id)
      for (let i = ids.length - 1; i >= 0; i--) {
        const el = document.getElementById(ids[i])
        if (el && el.offsetTop <= scrollY) {
          setActiveRoom(ids[i])
          break
        }
      }
    }
    onScroll() // initialize
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // ── Trigger the hero auto-sweep when DM engages ──
  // Dispatches a single custom event that Hero's canvas effect listens
  // for. Hero runs the sweep internally — directly writing to its own
  // mouse refs, blocking real mouse input during the sweep, and using a
  // bigger reveal radius. This keeps the sweep completely decoupled from
  // real mouse movement (no jitter, no fighting over the same refs).
  useEffect(() => {
    if (!active) return
    if (typeof window === 'undefined') return
    if (window.innerWidth < 768) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    // Delay so the DM overlay fades in first + Hero images have time to load
    const timeout = setTimeout(() => {
      window.dispatchEvent(new CustomEvent('hero:auto-sweep', {
        detail: { duration: 2800, radiusMultiplier: 1.7 },
      }))
    }, 500)

    return () => clearTimeout(timeout)
  }, [active])

  // ═════════════════════════════════════════════════════════════════
  // FEATURE #1 — INSTANT ACTIVATION (no theatrics)
  // No boot sequence, no iris, no CRT — just toggle DM on/off
  // instantly. The overlay, scanlines, HUD brackets, minimap, and
  // cyan recolorization are already dramatic enough; a separate
  // activation performance isn't needed. Gets out of the user's way.
  // ═════════════════════════════════════════════════════════════════
  const toggle = () => {
    setActive((prev) => !prev)
  }

  // ═════════════════════════════════════════════════════════════════
  // FEATURE #4 — AUDIO TOGGLE (low hum + occasional beep)
  // Generates audio via Web Audio API (no asset files needed). A low
  // 60Hz sine hum plays continuously while DM + audio are on, with a
  // random beep (880Hz square, 80ms) every 4–10s. Muted by default.
  // ═════════════════════════════════════════════════════════════════
  const startAudio = () => {
    if (audioCtxRef.current) return // already running
    const Ctx = window.AudioContext || window.webkitAudioContext
    if (!Ctx) return
    const ctx = new Ctx()
    audioCtxRef.current = ctx

    // ── Continuous low hum ──
    // Two stacked oscillators (60Hz + 90Hz) through a lowpass filter +
    // a slow gain LFO for a "breathing" feel. Sent to master gain.
    const master = ctx.createGain()
    master.gain.value = 0.08
    master.connect(ctx.destination)

    const filter = ctx.createBiquadFilter()
    filter.type = 'lowpass'
    filter.frequency.value = 220
    filter.Q.value = 0.7
    filter.connect(master)

    const osc1 = ctx.createOscillator()
    osc1.type = 'sine'
    osc1.frequency.value = 60
    const osc2 = ctx.createOscillator()
    osc2.type = 'sine'
    osc2.frequency.value = 90
    const humGain = ctx.createGain()
    humGain.gain.value = 0.5
    osc1.connect(humGain)
    osc2.connect(humGain)
    humGain.connect(filter)

    // Slow LFO modulating hum gain (breathing effect)
    const lfo = ctx.createOscillator()
    lfo.type = 'sine'
    lfo.frequency.value = 0.15
    const lfoGain = ctx.createGain()
    lfoGain.gain.value = 0.2
    lfo.connect(lfoGain)
    lfoGain.connect(humGain.gain)

    osc1.start()
    osc2.start()
    lfo.start()

    humNodeRef.current = { ctx, master, filter, osc1, osc2, lfo, humGain }

    // ── Random beeps ──
    const scheduleBeep = () => {
      const delay = 4000 + Math.random() * 6000 // 4–10s
      beepTimerRef.current = setTimeout(() => {
        if (!audioCtxRef.current) return
        const bCtx = audioCtxRef.current
        const beep = bCtx.createOscillator()
        const beepGain = bCtx.createGain()
        beep.type = 'square'
        beep.frequency.value = 880
        // 80ms envelope
        const t = bCtx.currentTime
        beepGain.gain.setValueAtTime(0, t)
        beepGain.gain.linearRampToValueAtTime(0.05, t + 0.005)
        beepGain.gain.exponentialRampToValueAtTime(0.0001, t + 0.08)
        beep.connect(beepGain)
        beepGain.connect(master)
        beep.start(t)
        beep.stop(t + 0.1)
        scheduleBeep()
      }, delay)
    }
    scheduleBeep()
  }

  const stopAudio = () => {
    if (beepTimerRef.current) {
      clearTimeout(beepTimerRef.current)
      beepTimerRef.current = null
    }
    const node = humNodeRef.current
    if (node) {
      try {
        node.osc1.stop()
        node.osc2.stop()
        node.lfo.stop()
        node.ctx.close()
      } catch (e) { /* already closed */ }
    }
    humNodeRef.current = null
    audioCtxRef.current = null
  }

  const toggleAudio = () => {
    setAudioOn((prev) => {
      const next = !prev
      localStorage.setItem('detective-audio', next ? 'true' : 'false')
      if (next) startAudio()
      else stopAudio()
      return next
    })
  }

  // Load persisted audio preference (audio never auto-starts though —
  // browser autoplay policy requires a user gesture)
  useEffect(() => {
    const saved = localStorage.getItem('detective-audio')
    if (saved === 'true') setAudioOn(true)
  }, [])

  // Stop audio when DM turns off
  useEffect(() => {
    if (!active && audioOn) {
      stopAudio()
      // Don't flip audioOn — keep the preference so next DM activation
      // can re-engage audio when the user clicks the speaker icon.
    }
  }, [active]) // eslint-disable-line react-hooks/exhaustive-deps

  // Restart audio if it was on and DM comes back on
  useEffect(() => {
    if (active && audioOn && !audioCtxRef.current) {
      startAudio()
    }
  }, [active]) // eslint-disable-line react-hooks/exhaustive-deps

  // Cleanup audio on unmount
  useEffect(() => () => stopAudio(), [])

  const handleRoomClick = (id) => {
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      {/* ── Toggle button ── */}
      <button
        className={`ss-toggle ${active ? 'active' : ''} ${loaded ? 'ready' : ''}`}
        onClick={toggle}
        aria-pressed={active}
        aria-label="Toggle Spider-Sense Mode"
        title="Spider-Sense Mode"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="11" cy="11" r="7" />
          <line x1="16.5" y1="16.5" x2="21" y2="21" />
          <line x1="11" y1="8" x2="11" y2="14" opacity="0.6" />
          <line x1="8" y1="11" x2="14" y2="11" opacity="0.6" />
        </svg>
        <span className="ss-toggle-label">DM</span>
      </button>

      {/* ── Audio toggle button (only visible while DM is on) ── */}
      <button
        className={`ss-audio-toggle ${active ? 'on' : ''} ${audioOn ? 'active' : ''}`}
        onClick={toggleAudio}
        aria-pressed={audioOn}
        aria-label={audioOn ? 'Mute Spider-Sense Mode audio' : 'Unmute Spider-Sense Mode audio'}
        title={audioOn ? 'Mute audio' : 'Unmute audio'}
      >
        {audioOn ? (
          // Speaker on icon
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
            <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
            <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
          </svg>
        ) : (
          // Speaker muted icon
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
            <line x1="23" y1="9" x2="17" y2="15" />
            <line x1="17" y1="9" x2="23" y2="15" />
          </svg>
        )}
        <span className="dm-audio-label">AUDIO</span>
      </button>

      {/* ── Mini-map (always rendered; visibility tied to DM active state) ── */}
      <div
        className={`ss-minimap ${active ? 'on' : ''}`}
        aria-hidden="true"
      >
        <div className="ss-minimap-header">
          <span className="ss-minimap-title">QUEENS MAP</span>
          <span className="ss-minimap-coord">GRID 14</span>
        </div>
        <div className="ss-minimap-grid">
          {MAP_ROOMS.map((room) => (
            <button
              key={room.id}
              className={`ss-room ${activeRoom === room.id ? 'here' : ''}`}
              style={{ gridRow: room.row, gridColumn: room.col }}
              onClick={() => handleRoomClick(room.id)}
              aria-label={`Navigate to ${room.label}`}
              title={room.label}
            >
              <span className="ss-room-label">{room.label}</span>
              {activeRoom === room.id && <span className="ss-room-marker" />}
            </button>
          ))}
        </div>
        <div className="ss-minimap-footer">
          <span className="ss-minimap-marker-dot" />
          <span className="ss-minimap-marker-text">YOU ARE HERE</span>
        </div>
      </div>

      {/* ── Full-screen overlay ── */}
      <div className={`ss-overlay ${active ? 'on' : ''}`} aria-hidden="true">
        {/* Scan lines */}
        <div className="ss-scanlines" />
        {/* Vignette */}
        <div className="ss-vignette" />

        {/* HUD corner brackets */}
        <span className="ss-bracket dm-br-tl" />
        <span className="ss-bracket dm-br-tr" />
        <span className="ss-bracket dm-br-bl" />
        <span className="ss-bracket dm-br-br" />
        {/* Top status bar */}
        <div className="ss-statusbar">
          <span className="dm-status-cell">
            <span className="ss-status-dot" />
            SPIDER-SENSE MODE — ENGAGED
          </span>
          <span className="dm-status-cell dm-status-time">
            SCANNING QUEENS
          </span>
        </div>
      </div>
    </>
  )
}

export default SpiderSenseMode

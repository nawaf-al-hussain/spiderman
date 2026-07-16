import React, { useRef, useState, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'
import './SkillMatrix.css'

/* ── Proficiency data — Spider-Verse readout style ──
 * Six axes mapped to your actual skill categories from Skills.jsx.
 * Values are 0-100 proficiency (self-assessed, conservative).
 */
const AXES = [
  { label: 'BACKEND',    value: 92, detail: 'Node.js • Spring Boot • NestJS • FastAPI' },
  { label: 'ARCHITECTURE', value: 88, detail: 'Microservices • CQRS • DDD • Event-Driven' },
  { label: 'DATABASES',  value: 85, detail: 'PostgreSQL • Redis • MongoDB • SQL Server' },
  { label: 'AI / ML',    value: 78, detail: 'PyTorch • Transformers • RAG • NLP' },
  { label: 'FRONTEND',   value: 75, detail: 'React 18 • Vite • Tailwind • Konva' },
  { label: 'DEVOPS',     value: 72, detail: 'Docker • K8s • Terraform • CI/CD' },
]

/* Radar geometry */
const SIZE = 460           // SVG viewBox side
const CENTER = SIZE / 2
const RADIUS = 175         // max axis radius
const RINGS = 4            // grid rings (25/50/75/100)
const START_ANGLE = -90    // 12 o'clock

const polar = (angle, r) => {
  const a = (angle * Math.PI) / 180
  return {
    x: CENTER + r * Math.cos(a),
    y: CENTER + r * Math.sin(a),
  }
}

const axisPoint = (i, r) =>
  polar(START_ANGLE + (360 / AXES.length) * i, r)

const polygon = (vals) =>
  vals.map((v, i) => {
    const p = axisPoint(i, (v / 100) * RADIUS)
    return `${p.x.toFixed(2)},${p.y.toFixed(2)}`
  }).join(' ')

const SkillMatrix = () => {
  const wrapRef = useRef(null)
  const inView = useInView(wrapRef, { once: true, amount: 0.4 })
  const [progress, setProgress] = useState(0)
  const [hoveredAxis, setHoveredAxis] = useState(null)
  const rafRef = useRef(0)

  // Animate radar sweep when in view (~1.2s ease-out)
  useEffect(() => {
    if (!inView) return
    const start = performance.now()
    const DURATION = 1200
    const tick = (t) => {
      const k = Math.min(1, (t - start) / DURATION)
      // easeOutCubic
      const eased = 1 - Math.pow(1 - k, 3)
      setProgress(eased)
      if (k < 1) rafRef.current = requestAnimationFrame(tick)
    }
    rafRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafRef.current)
  }, [inView])

  // Compute animated values
  const liveValues = AXES.map((a) => a.value * progress)
  const livePolygon = polygon(liveValues)

  // Max value for display
  const maxAxis = AXES.reduce(
    (m, a, i) => (liveValues[i] > liveValues[m] ? i : m),
    0
  )

  return (
    <section className="skill-matrix" id="matrix" ref={wrapRef}>
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
        >
          <span className="section-eyebrow">Spider-Verse Readout</span>
          <h2 className="section-title">SKILL MATRIX</h2>
          <div className="section-divider"></div>
        </motion.div>

        <div className="matrix-layout">
          {/* ── Radar Chart ── */}
          <motion.div
            className="radar-stage"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
          >
            <div className="radar-frame">
              {/* Corner brackets — surveillance HUD style */}
              <span className="bracket tl" />
              <span className="bracket tr" />
              <span className="bracket bl" />
              <span className="bracket br" />

              <svg
                viewBox={`0 0 ${SIZE} ${SIZE}`}
                className="radar-svg"
                role="img"
                aria-label="Skill proficiency radar chart"
              >
                {/* ── Concentric grid rings ── */}
                {Array.from({ length: RINGS }).map((_, r) => {
                  const ringR = (RADIUS * (r + 1)) / RINGS
                  const pts = AXES.map((_, i) => {
                    const p = axisPoint(i, ringR)
                    return `${p.x.toFixed(2)},${p.y.toFixed(2)}`
                  }).join(' ')
                  return (
                    <polygon
                      key={`ring-${r}`}
                      points={pts}
                      className="radar-ring"
                    />
                  )
                })}

                {/* ── Axes spokes ── */}
                {AXES.map((_, i) => {
                  const p = axisPoint(i, RADIUS)
                  return (
                    <line
                      key={`spoke-${i}`}
                      x1={CENTER}
                      y1={CENTER}
                      x2={p.x}
                      y2={p.y}
                      className="radar-spoke"
                    />
                  )
                })}

                {/* ── Axis labels (positioned outside the ring) ── */}
                {AXES.map((axis, i) => {
                  const labelP = axisPoint(i, RADIUS + 36)
                  const isRight = labelP.x > CENTER + 4
                  const isLeft = labelP.x < CENTER - 4
                  const anchor = isRight ? 'start' : isLeft ? 'end' : 'middle'
                  return (
                    <g
                      key={`label-${i}`}
                      className={`radar-label-group ${hoveredAxis === i ? 'active' : ''}`}
                      onMouseEnter={() => setHoveredAxis(i)}
                      onMouseLeave={() => setHoveredAxis(null)}
                    >
                      {/* hit target */}
                      <circle
                        cx={labelP.x}
                        cy={labelP.y}
                        r="22"
                        fill="transparent"
                      />
                      <text
                        x={labelP.x}
                        y={labelP.y}
                        textAnchor={anchor}
                        dominantBaseline="middle"
                        className="radar-label"
                      >
                        {axis.label}
                      </text>
                      <text
                        x={labelP.x}
                        y={labelP.y + 16}
                        textAnchor={anchor}
                        dominantBaseline="middle"
                        className="radar-value"
                      >
                        {Math.round(liveValues[i])}%
                      </text>
                    </g>
                  )
                })}

                {/* ── Filled radar area ── */}
                <polygon
                  points={livePolygon}
                  className="radar-area"
                />

                {/* ── Data point dots ── */}
                {liveValues.map((v, i) => {
                  const p = axisPoint(i, (v / 100) * RADIUS)
                  return (
                    <circle
                      key={`pt-${i}`}
                      cx={p.x}
                      cy={p.y}
                      r={hoveredAxis === i ? 6 : 4}
                      className={`radar-point ${hoveredAxis === i ? 'active' : ''}`}
                    />
                  )
                })}

                {/* ── Scan line (animated sweep) ── */}
                {progress < 1 && (
                  <g className="radar-scan">
                    <line
                      x1={CENTER}
                      y1={CENTER}
                      x2={polar(START_ANGLE + 360 * progress, RADIUS).x}
                      y2={polar(START_ANGLE + 360 * progress, RADIUS).y}
                      className="radar-scan-line"
                    />
                    <polygon
                      points={`${CENTER},${CENTER} ${
                        polar(START_ANGLE + 360 * progress, RADIUS).x
                      },${
                        polar(START_ANGLE + 360 * progress, RADIUS).y
                      } ${
                        polar(START_ANGLE + 360 * progress - 18, RADIUS).x
                      },${polar(START_ANGLE + 360 * progress - 18, RADIUS).y}`}
                      className="radar-scan-trail"
                    />
                  </g>
                )}
              </svg>

              {/* HUD readouts beneath the radar */}
              <div className="radar-hud">
                <span className="hud-cell">
                  <span className="hud-key">SCAN</span>
                  <span className="hud-val">{Math.round(progress * 100)}%</span>
                </span>
                <span className="hud-cell">
                  <span className="hud-key">PEAK</span>
                  <span className="hud-val">{AXES[maxAxis].label}</span>
                </span>
                <span className="hud-cell">
                  <span className="hud-key">AVG</span>
                  <span className="hud-val">
                    {Math.round(
                      AXES.reduce((s, a) => s + a.value, 0) / AXES.length * progress
                  )}%
                  </span>
                </span>
              </div>
            </div>
          </motion.div>

          {/* ── Side readout — axis detail list ── */}
          <motion.div
            className="matrix-readout"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            <div className="readout-header">
              <span className="readout-id">FILE No. 04 — SKILL ASSESSMENT</span>
              <span className="readout-stamp">DECRYPTED</span>
            </div>

            <p className="readout-intro">
              Operational proficiency across six core capability vectors.
              Values reflect production-grade deployment experience, not just
              academic familiarity. Hover an axis on the radar to inspect
              stack detail.
            </p>

            <ul className="readout-list">
              {AXES.map((axis, i) => (
                <li
                  key={axis.label}
                  className={`readout-row ${hoveredAxis === i ? 'active' : ''}`}
                  onMouseEnter={() => setHoveredAxis(i)}
                  onMouseLeave={() => setHoveredAxis(null)}
                >
                  <div className="readout-row-head">
                    <span className="readout-index">0{i + 1}</span>
                    <span className="readout-label">{axis.label}</span>
                    <span className="readout-pct">{Math.round(liveValues[i])}%</span>
                  </div>
                  <div className="readout-bar">
                    <span
                      className="readout-bar-fill"
                      style={{ width: `${liveValues[i]}%` }}
                    />
                  </div>
                  <span className="readout-detail">{axis.detail}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default SkillMatrix

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import './BugleArchive.css'

/* ── Bugle file data ──
 * Each entry is styled as a declassified Daily Bugle newsroom file.
 * - redacted: array of { word, hint } segments rendered as black bars
 *   on first view, revealed on expand. Use sparingly — punchy effect.
 * - evidence: gold tags shown alongside the body.
 * - classification: appears as the rotating stamp on the corner.
 */
const FILES = [
  {
    number: 'FILE №. 001',
    date: 'ARCHIVED — Q3 2024',
    classification: 'PUBLISHED',
    subject: 'The Ghosting Phantom',
    threat: 'Recruitment Pipeline',
    summary:
      'High-intent candidates vanishing between offer and onboarding. Conventional nudges failing. Required a predictive intervention layer.',
    body: [
      'Subject exhibited recurring pattern: 24% of accepted offers never converted to first-day attendance, mirroring a behavioral signature observed in e-commerce cart abandonment — a phenomenon documented in earlier internal studies.',
      'Built an anti-ghosting risk scorer on top of the existing NLP pipeline. Fed it 14 candidate-engagement signals — response latency, message sentiment slope, question depth, interview time-of-day — and trained a gradient-boosted classifier on historical ghost/no-ghost outcomes.',
      { type: 'redacted', word: 'XGBoost', hint: 'Gradient boosting library' },
      ' was the final choice after logistic regression underperformed (AUC 0.68) and a small transformer overfit on the limited labeled set. Final model reached AUC 0.87 on held-out data.',
      'Deployed behind a feature flag in the recruiter dashboard. Recruiters see a 1–5 risk score and the top three contributing signals, so the intervention is explainable rather than magical. Ghosting rate dropped from 24% to 9% in the first quarter of rollout.',
    ],
    evidence: ['NLP', 'XGBoost', 'Feature Importance', 'AUC 0.87', '−15pp ghosting'],
    outcome: 'FILE CLOSED — DEPLOYED',
  },
  {
    number: 'FILE №. 002',
    date: 'ARCHIVED — Q1 2025',
    classification: 'PUBLISHED',
    subject: 'The Latency Beast',
    threat: 'Real-Time Multiplayer Engine',
    summary:
      'Board game moves arriving 180–400ms late across geographically distributed clients. Input felt sluggish; ranked matches were being abandoned.',
    body: [
      'Server-authoritative architecture using Spring WebSocket + STOMP was bottlenecking on a single Redis Pub/Sub channel handling all rooms simultaneously. Profiler showed 60% of latency in serialization, not network.',
      'Replaced the global channel with a sharded topic namespace — one channel per active game room — and switched payload encoding from JSON to',
      { type: 'redacted', word: 'MessagePack', hint: 'Binary serialization format' },
      '. Combined with batched acks (every 16ms instead of per-event), round-trip latency dropped from 240ms median to 58ms.',
      'The deeper fix was client-side prediction. For legal moves, the local client updates the board immediately and reconciles with the server\'s authoritative state within two frames. Wrong moves are reverted with a brief red flash — players perceive "instant" play even at 200ms RTT.',
      'Post-deployment telemetry over 30 days showed 99th percentile input latency at 92ms and ranked-mode abandonment dropped 71%.',
    ],
    evidence: ['WebSocket/STOMP', 'Redis Pub/Sub', 'MessagePack', 'Client Prediction', 'p99 92ms'],
    outcome: 'FILE CLOSED — DEPLOYED',
  },
  {
    number: 'FILE №. 003',
    date: 'ACTIVE FILE — Q2 2025',
    classification: 'BREAKING',
    subject: 'The Inference Bottleneck',
    threat: 'On-Prem LLM Serving',
    summary:
      'Fine-tuned educational LLM needed to run on free-tier GPU with sub-3-second response times. Naive fp16 deployment was hitting 8+ seconds.',
    body: [
      'Subject model: fine-tuned 7B parameter instruction-tuned transformer adapted to STEM tutoring. The base fp16 model occupies ~13GB VRAM and inference latency was prohibitive on free-tier GPUs.',
      'Applied 4-bit quantization via',
      { type: 'redacted', word: 'GGUF + LoRA', hint: 'Quantization format + adapter merge' },
      ', reducing VRAM footprint to ~4.2GB. Combined the quantized base with a small LoRA adapter (8MB) trained on 1000+ curated QA pairs using PEFT — no full fine-tune needed.',
      'Added sentence-level KV-cache reuse for repeated system prompts. The system prompt and preamble tokens are cached after the first query, so subsequent queries skip ~280 tokens of prefill.',
      'Inference latency dropped from 8.4s to 2.7s on the same hardware. Accuracy held at 95% of the fp16 baseline on the eval set — measured against a hand-curated 120-question benchmark.',
      'Next phase: explore speculative decoding to bring cold-start under 1.5s.',
    ],
    evidence: ['GGUF 4-bit', 'LoRA/PEFT', 'KV-Cache', '2.7s p50', '95% accuracy retained'],
    outcome: 'DEVELOPING STORY',
  },
]

const BugleArchive = () => {
  const [openIdx, setOpenIdx] = useState(0) // first one open by default

  const toggle = (i) => setOpenIdx(openIdx === i ? -1 : i)

  return (
    <section className="bugle-archive" id="bugle">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
        >
          <span className="section-eyebrow">From the Newsroom</span>
          <h2 className="section-title">BUGLE ARCHIVES</h2>
          <div className="section-divider"></div>
          <p className="bugle-subtitle">
            Field notes from past projects. Each file walks through
            the problem, the investigation, and what shipped in the end.
          </p>
        </motion.div>

        <div className="bugle-stack">
          {FILES.map((c, i) => {
            const open = openIdx === i
            return (
              <motion.article
                key={c.number}
                className={`bugle-card ${open ? 'open' : ''}`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
              >
                {/* Classification stamp */}
                <span className={`bugle-stamp ${c.classification === 'BREAKING' ? 'active' : ''}`}>
                  {c.classification}
                </span>

                {/* Card header — always visible */}
                <button
                  className="bugle-head"
                  onClick={() => toggle(i)}
                  aria-expanded={open}
                  aria-controls={`bugle-body-${i}`}
                >
                  <div className="bugle-head-meta">
                    <span className="bugle-number">{c.number}</span>
                    <span className="bugle-date">{c.date}</span>
                  </div>
                  <div className="bugle-head-main">
                    <h3 className="bugle-subject">{c.subject}</h3>
                    <span className="bugle-threat">DOMAIN: {c.threat}</span>
                  </div>
                  <span className={`bugle-chevron ${open ? 'rotated' : ''}`} aria-hidden="true">
                    <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  </span>
                </button>

                {/* Expandable body */}
                <AnimatePresence initial={false}>
                  {open && (
                    <motion.div
                      id={`bugle-body-${i}`}
                      className="bugle-body"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: 'easeInOut' }}
                    >
                      <div className="bugle-body-inner">
                        <p className="bugle-summary">{c.summary}</p>

                        <div className="bugle-narrative">
                          {c.body.map((seg, idx) => {
                            if (typeof seg === 'string') {
                              return <p key={idx}>{seg}</p>
                            }
                            if (seg.type === 'redacted') {
                              return (
                                <span
                                  key={idx}
                                  className="redact"
                                  data-hint={seg.hint}
                                  title={seg.hint}
                                >
                                  <span className="redact-bar">{seg.word}</span>
                                  <span className="redact-text">{seg.word}</span>
                                </span>
                              )
                            }
                            return null
                          })}
                        </div>

                        <div className="bugle-evidence">
                          <span className="evidence-label">EVIDENCE TAGS</span>
                          <div className="evidence-tags">
                            {c.evidence.map((e) => (
                              <span key={e} className="evidence-tag">{e}</span>
                            ))}
                          </div>
                        </div>

                        <div className="bugle-outcome">
                          <span className="outcome-marker"></span>
                          <span className="outcome-text">{c.outcome}</span>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.article>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default BugleArchive

# Spiderman — The Web Dev Portfolio

A Spider-Man-themed developer portfolio for **Nawaf Al Hussain Khondokar** — Platform Engineer, Cloud Architect, and Backend Specialist.

Built with **Vite + React 19 + Framer Motion**. Features a mouse-trail canvas reveal effect, Spider-Sense Mode (HUD overlay with minimap, scanlines, and evidence markers), a skill radar chart, expandable case files, and a full resume modal.

> Originally forked from [`divyashrma18/spiderman`](https://github.com/divyashrma18/spiderman) landing page, then expanded into a full portfolio inspired by the [batman](https://github.com/nawaf-al-hussain/batman) portfolio architecture.

## Sections

| # | Section | ID | Description |
|---|---------|-----|-------------|
| 1 | Hero | `#home` | Canvas mouse-trail reveal + typing animation |
| 2 | About | `#about` | Bio + stats grid |
| 3 | Skills | `#skills` | 8 skill categories (Web Shooters) |
| 4 | Skill Matrix | `#matrix` | Radar chart — Spider-Verse Readout |
| 5 | Projects | `#projects` | 3 featured projects with live iframe previews |
| 6 | Experience | `#experience` | Timeline of work + education |
| 7 | Case Files | `#casefiles` | Daily Bugle archives — expandable mission logs |
| 8 | Resume | `#resume` | Full resume modal + download |
| 9 | Contact | `#contact` | Email, GitHub, LinkedIn, Website |

## Special Features

- **Spider-Sense Mode** (SS): Toggle a Batman-style detective HUD overlay with scanlines, vignette, corner brackets, a Queens mini-map, section annotations, hidden evidence markers, and optional Web Audio hum + beeps. Toggled via the magnifier button (bottom-right).
- **Venom Mode** (Easter egg): Enter the Konami code (↑↑↓↓←→←→BA) to activate a green/purple Venom-themed text shadow.
- **Theme toggle**: Light/dark mode with smooth circular reveal animation.
- **Canvas reveal**: Move your mouse across the hero to reveal Peter Parker behind the mask.
- **Custom spider cursor**: Desktop only — a red spider silhouette follows your pointer.

## Local Development

```bash
npm install
npm run dev      # http://localhost:5173
```

## Build

```bash
npm run build    # outputs to dist/
npm run preview  # preview the production build locally
```

## Deploy on Vercel

This repo is pre-configured for Vercel. The root-level [`vercel.json`](./vercel.json) configures:

- Install Command: `npm install`
- Build Command: `npm install && npm run build`
- Output Directory: `dist`
- Framework: Vite

### Option A — Vercel dashboard (recommended)

1. Go to <https://vercel.com/new>.
2. Import the repository `nawaf-al-hussain/spiderman`.
3. Click **Deploy** — no settings changes needed.

### Option B — Vercel CLI

```bash
npm i -g vercel
vercel              # preview deployment
vercel --prod       # production deployment
```

## Tech Stack

- **Vite 8** — dev server & build tooling
- **React 19** — UI library
- **Framer Motion 12** — animation primitives
- **Canvas 2D** — mouse-trail reveal + particle effects
- **react-theme-switch-animation** — circular theme toggle animation
- **ESLint** — flat config, React Hooks + React Refresh plugins

## Disclaimer

Spider-Man and all related characters are trademarks of Marvel Entertainment. This is a fan-made portfolio and is not affiliated with or endorsed by Marvel.

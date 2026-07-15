# Spiderman

The Amazing Spider-Man interactive landing page — built with **Vite + React 19** and **Framer Motion**. Features a mouse-trail canvas effect that "reveals" Peter Parker behind the mask as you move your cursor across the hero section.

> Forked from [`divyashrma18/spiderman`](https://github.com/divyashrma18/spiderman) and re-packaged for Vercel deployment.

## Project Structure

```
.
├── README.md                  ← you are here
├── vercel.json                ← Vercel build config (points into vite-project/)
└── vite-project/              ← the actual Vite + React app
    ├── index.html
    ├── package.json
    ├── public/
    │   ├── favicon.svg
    │   ├── icons.svg
    │   └── images/            ← hero background images used by the canvas trail
    └── src/
        ├── main.jsx           ← React entry
        ├── App.jsx
        ├── index.css
        ├── App.css
        ├── assets/            ← static SVG/PNG assets
        └── components/
            ├── Navbar.jsx / .css
            └── Hero.jsx / .css   ← canvas trail effect lives here
```

## Local Development

```bash
cd vite-project
npm install
npm run dev      # http://localhost:5173
```

## Build

```bash
cd vite-project
npm run build    # outputs to vite-project/dist
npm run preview  # preview the production build locally
```

## Deploy on Vercel

This repo is pre-configured for Vercel. The root-level [`vercel.json`](./vercel.json)
tells Vercel to install and build inside the `vite-project/` subdirectory and serve
the build output from `vite-project/dist`.

### Option A — One-click via Vercel dashboard (recommended)

1. Push this repo to GitHub (already done).
2. Go to <https://vercel.com/new>.
3. Import the repository `nawaf-al-hussain/spiderman`.
4. **Do not change any settings** — `vercel.json` already configures:
   - Install Command: `cd vite-project && npm install`
   - Build Command:   `cd vite-project && npm install && npm run build`
   - Output Directory: `vite-project/dist`
5. Click **Deploy**. The site will be live in ~1 minute.

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
- **Canvas 2D** — mouse-trail reveal effect
- **ESLint** — flat config, React Hooks + React Refresh plugins

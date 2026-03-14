# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Roman Forge** is a web development agency site — a monorepo with two independent apps:
- `web/` — Public marketing site (React + Vite + TanStack Router, deployed to Cloudflare Pages)
- `studio/` — Headless CMS (Sanity v3, deployed to Sanity Cloud)

## Commands

### Root (monorepo)
```bash
npm run dev:web        # Serve built web app via Wrangler (Cloudflare Pages local)
npm run dev:studio     # Start Sanity Studio dev server
npm run dev:all        # Run both concurrently
npm run build:web      # Build web app
npm run build:studio   # Build studio
```

### Web app (`cd web`)
```bash
npm run dev            # Vite dev server (hot reload)
npm run build          # Production build to dist/
npm run lint           # ESLint
npm run format         # Prettier
```

### Studio (`cd studio`)
```bash
npm run dev            # Sanity Studio dev server
npm run build          # Production build
npm run deploy         # Deploy studio to Sanity Cloud
npm run deploy-graphql # Deploy GraphQL schema
```

> Note: `npm run dev:web` at root uses `wrangler pages dev web/dist` — you must build first (`npm run build:web`) or use `cd web && npm run dev` for Vite's dev server with HMR.

## Architecture

### Web App (`web/src/`)

**Routing:** TanStack React Router (`@tanstack/react-router`) with file-based routes in `src/routes/`. The root layout wraps all pages via `Layout.tsx`.

**Feature Flags:** The app uses PostHog (`posthog-js`) for feature flags. The `test-flag` PostHog flag (or `VITE_FEATURE_LAUNCH=true` env var) controls whether the full site layout is shown vs. `App.tsx` (a coming-soon page). This logic lives in `Layout.tsx`.

**Styling:** Tailwind CSS with a custom theme defined in `web/tailwind.config.js`:
- Colors: `sand` (#EFD7AB), `deepteal` (#123E3D), `deepblue` (#050912)
- Fonts: `lexend` (primary), `garamond` (Cormorant Garamond, serif accent)
- Custom animations: `gradient-shift`, `spin-slow`, `breath-*`, `float-*`

**Key components:**
- `Layout.tsx` — Shell with header, nav, footer; controls feature-flag gating
- `HomePage.tsx` — Main landing page (hero, about, services grid, tech showcase)
- `Navigation.tsx` — Responsive nav with mobile hamburger overlay
- `ServiceCard.tsx` — Reusable card for service items

**API Proxy:** Vite proxies `/api/*` to `http://localhost:8788` (Wrangler's local port). Email is sent via Resend.

### Sanity Studio (`studio/`)

**Project ID:** `482ktczc` | **Dataset:** `production`

**Schema types** (`studio/schemaTypes/`): `post`, `author`, `category`, `page`, `service`, `blockContent`. All exported from `index.ts`.

**Plugins:** Structure Tool (default desk), Vision Tool (GROQ query explorer).

### Deployment

- **Web:** Cloudflare Pages via `wrangler`. Config in `web/wrangler.toml` (build output: `./dist`).
- **Studio:** `sanity deploy` publishes to Sanity's hosted studio.

## Environment Variables

Located in `web/.env`:
```
VITE_REACT_APP_PUBLIC_POSTHOG_KEY=...
VITE_REACT_APP_PUBLIC_POSTHOG_HOST=https://us.i.posthog.com
VITE_FEATURE_LAUNCH=true
```

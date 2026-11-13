# Architectural & Implementation Decisions

This document records the architectural, security, and engineering decisions made during the construction of the Social Baluni Public School (SBPS) web platform in accordance with `docs/BUILD-SPEC.md`.

| Date | Topic | Choice | Rationale |
|---|---|---|---|
| 2026-11-13 | Workspace Architecture | pnpm workspaces (`apps/web`, `studio`) | Clear separation between public front-end + edge backend and CMS studio as required by BUILD-SPEC.md. |
| 2026-11-13 | Rendering Strategy | Astro 5 Static by default with `@astrojs/cloudflare` on-demand endpoints | Maximizes Cloudflare edge cacheability, sub-50ms TTFB worldwide, zero running cost, while allowing Astro Actions and dynamic API endpoints. |
| 2026-11-13 | CSS & Design Tokens | Tailwind CSS v4 via `@tailwindcss/vite` | Modern token-based CSS engine via `@theme` with zero legacy preprocessors. Self-hosted typography, SBPS Crimson (`#A3262B`), Saffron Gold (`#EFCA10`), and Forest Green (`#0B6B2E`). |
| 2026-11-13 | Typography | `Eczar` (Serif Display) + `Plus Jakarta Sans` (Body Sans) via Fontsource | Characterful, editorial presence suitable for an established Himalayan school. Self-hosted WOFF2 prevents external CDN blocking and eliminates layout shifts. |
| 2026-11-13 | CMS Architecture | Dual-driver `CMS_DRIVER=local|sanity` | Enables 100% credential-free offline builds (`pnpm i && pnpm build`) using Astro Content Layer collections, while enabling live Sanity Studio editing when credentials are provided. |
| 2026-11-13 | Truth & Accuracy | Strict `verified: false` enforcement | Zero invented facts. Unverified statistics, topper marks, and fees are hidden from production builds and tracked in `CONTENT-TODO.md`. |
| 2026-11-13 | Regulatory RTE Badge | Computed RTE Expiry Badge | RTE Recognition document expired on 31.03.2026. The disclosure page dynamically compares `validTo` against current date and renders a clear "Renewal in process" badge rather than suppressing official records. |
| 2026-11-13 | Database & Storage | Cloudflare D1 with Drizzle ORM + R2 Bindings | True edge database for enquiry and registration leads; fully functional in local development via `wrangler` without external database services. |
| 2026-11-13 | Payment Architecture | Dual-tier payment workflow | Primary: Zero-maintenance Razorpay Payment Links for parents. Secondary: Gated programmatic order creation (`/api/razorpay/create-order`) and webhook signature verification (`/api/razorpay/webhook`). |
| 2026-11-13 | Client Search Engine | Native Node.js Search Indexer (`build-search.js`) | Replaces native Pagefind binary with a pure-Node static search index generator (`search-index.json`), ensuring consistent execution across restricted OS environments while delivering instant client-side search. |
| 2026-11-13 | Legacy URL Migration | 100% 301 Redirect Coverage in `public/_redirects` | All 57 legacy WordPress URLs mapped to canonical Astro routes with an automated Vitest suite (`tests/redirects.test.ts`) guaranteeing zero 404 regressions. |
| 2026-11-13 | Security Hardening | Strict `public/_headers` CSP & Security Policy | Enforces Content-Security-Policy (whitelisting Turnstile, Razorpay, OneSignal), HSTS, `X-Frame-Options: DENY`, `X-Content-Type-Options: nosniff`, and `Permissions-Policy`. |
| 2026-11-14 | Quality & A11y Suite | Playwright E2E + `@axe-core/playwright` | 40 route & interaction smoke tests and 7 automated WCAG 2.2 Level AA accessibility scans with zero critical or serious violations. |

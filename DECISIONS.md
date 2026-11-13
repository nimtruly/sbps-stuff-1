# Architectural & Implementation Decisions

| Date | Topic | Choice | Rationale |
|---|---|---|---|
| 2026-11-13 | Workspace Architecture | pnpm workspaces (`apps/web`, `studio`) | Clear separation between public front-end + edge backend and CMS studio as required by BUILD-SPEC.md |
| 2026-11-13 | Rendering Strategy | Astro 5 Static by default with `@astrojs/cloudflare` on-demand endpoints | Maximizes CDN cacheability, TTFB < 0.5s, 0 running cost, while allowing Astro Actions and API endpoints |
| 2026-11-13 | CSS Framework | Tailwind CSS v4 via `@tailwindcss/vite` | Modern token-based CSS engine via `@theme` with zero legacy preprocessors |
| 2026-11-13 | Typography | `Eczar` (Display / Headings) + `Plus Jakarta Sans` (Humanist Body) via Fontsource | Characterful, editorial, high legibility, robust Devanagari script support for future Hindi integration |
| 2026-11-13 | CMS Fallback | Dual-driver `CMS_DRIVER=local|sanity` | Allows 100% credential-free offline builds using Astro Content Layer while supporting Sanity Studio GROQ when configured |

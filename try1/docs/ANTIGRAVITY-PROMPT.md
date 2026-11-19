# Prompt for Antigravity (model: gemini-3.8-flash)

Copy everything inside the fence below into a new Antigravity agent task, with this folder (`try1/`) open as the workspace.

```text
You are the lead engineer building the new website for Social Baluni Public School (SBPS), Dehradun, a CBSE school (Nursery–XII). It replaces the WordPress site at https://www.sbpsdoon.com/. Build the complete site — frontend and backend — in this workspace in one continuous run, without stopping to ask questions.

READ FIRST, IN THIS ORDER, BEFORE WRITING ANY CODE:
1. docs/BUILD-SPEC.md  ← the source of truth. Follow it exactly.
2. project-info.md      ← business context and decisions
3. reference.md         ← competitor analysis: what to emulate and what to avoid
4. docs/content-export/ ← all existing site content (pages/, posts/, current-menu.md, url-inventory.csv, media-index.csv)
5. docs/brand/          ← legacy logo (sample the brand colours from it)

STACK (fixed, zero running cost): Astro (latest) + TypeScript strict, Tailwind CSS v4, Preact islands only where needed, @astrojs/cloudflare (Cloudflare hosting, D1 via Drizzle, R2), Astro Actions + Zod, Cloudflare Turnstile, Resend, Razorpay (links + gated checkout/webhook), Sanity Studio with a local-content fallback (CMS_DRIVER=local|sanity), Pagefind, OneSignal and Brevo (env-gated), Vitest + Playwright + axe, pnpm workspaces. Do not substitute anything.

FRONTEND DESIGN: load and follow the `impeccable` skill for all UI work. If it is not installed, install it from its official source (pbakaus/impeccable) into Antigravity's skills location, then load it. Use it to set the design direction and tokens before building components, critique each major page as you go, and run its audit and polish passes at the end. Its anti-patterns are banned. Design direction: section 7 of the spec (SBPS crimson + saffron-gold + forest green from the logo, distinctive type, real photography, no sliders, no hamburger-only desktop nav).

HARD RULES:
- GIT: if the folder is not a repo, run `git init` first. Commit after EVERY step in BUILD-SPEC section 13, and whenever you finish a meaningful unit of work (at least every ~30 minutes). Use Conventional Commit messages. Never commit secrets (.env* ignored, .env.example kept). Never force-push or rewrite history. End with a clean working tree.
- NO INVENTED FACTS: this is a real school. Use only facts from the spec and docs/content-export. Stats, achievers, testimonials, fees and coordinates carry `verified: false` unless the spec confirms them; unverified items must not render in production builds. Log every gap in CONTENT-TODO.md. Do not promote KVPY (discontinued). Rewrite year-stale exam text in evergreen language.
- MUST BUILD WITHOUT CREDENTIALS: every integration is env-gated and degrades gracefully. `pnpm i && pnpm build` must pass on a clean clone with no env vars.
- QUALITY BARS: WCAG 2.2 AA; one <h1> per page; alt text on content images; Lighthouse mobile ≥ 95 in all categories on home, admissions and an article page; homepage JS ideally < 50 KB.
- Redirect every old URL (spec section 10.1) and add the Vitest test proving coverage against url-inventory.csv.
- When something is ambiguous, choose the simplest option consistent with the spec, record it in DECISIONS.md, and continue.

WORK PLAN: execute BUILD-SPEC section 13 steps 1→13 in order. After each step, run `pnpm build` (and the tests that exist by then), fix failures, then commit. Use the browser to check pages visually at 390px and 1440px widths, and compare against the impeccable critique.

FINISH WHEN every box in BUILD-SPEC section 14 ("Definition of done") is true. Then write a final summary in docs/qa/BUILD-REPORT.md containing: what was built, the route list, test/Lighthouse/axe results, anything not done and why, and the top items from CONTENT-TODO.md. Commit it.
```

## Notes for the chief developer

- **Before you run it:** the prompt assumes the workspace root is `E:\Projects\_Commercial\SBPS_DOON\try1`. The agent will create `apps/web` and `studio` inside it.
- **Accounts the agent can't create for you.** None of these is needed for the build, but create them before going live:
  - Cloudflare (Pages/Workers, D1, R2, Turnstile)
  - Sanity
  - Resend
  - Razorpay (needs school KYC)
  - OneSignal, Brevo
  - a WhatsApp Channel
- **After the run:** ask Claude to review the repo against `docs/BUILD-SPEC.md` section 14 and the git history.

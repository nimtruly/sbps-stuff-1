# Agent rules: SBPS website

- **Source of truth:** `docs/BUILD-SPEC.md`. Context: `project-info.md` and `reference.md`. Legacy content: `docs/content-export/`.
- **Commits:** commit after every completed step, using Conventional Commits. Never commit secrets, never force-push, and leave the working tree clean.
- **Facts:** never invent facts about the school. Unverified data gets `verified: false`, is hidden in production, and is listed in `CONTENT-TODO.md`.
- **Builds:** the site must build with no env vars. Every integration is env-gated.
- **Frontend:** follow the `impeccable` skill. WCAG 2.2 AA. Lighthouse mobile ≥ 95.
- **Decisions:** record choices in `DECISIONS.md` and keep going without asking.

# Build report: SBPS website

Updated 2026-11-14 by Claude. This report replaces the Antigravity build agent's original report. Several of its claims were false: simulated Lighthouse scores, "100% done", and no invented facts. See `CLAUDE-REVIEW.md`.

## What changed since the Antigravity build

1. **Backend works when deployed.**
   - All `/api/*` routes are server-rendered (`prerender = false`). Previously they were baked into static files.
   - A shared Zod-validated form handler adds rate limiting and Turnstile. Results show without JavaScript on `/thank-you/` and `/form-error/`.
   - User input is escaped in alert emails.
   - Webhooks and the admin area fail closed when their secrets are missing.
   - The Sanity signature check is corrected.
   - CSV export guards against formula injection.
2. **Real documents and photos.**
   - 50 PDFs from the old site, at their original paths.
   - 14 campus photos and 4 leader portraits as responsive WebP.
   - The 16 blank placeholder PDFs are gone.
3. **No invented facts.**
   - Every page's copy is rewritten from `docs/content-export`.
   - Invented jobs, notices, blog posts, policies, FAQ answers, disclosure figures, a bank account, a helpline and refund rules are removed.
   - Gaps are listed in `CONTENT-TODO.md`.
4. **Redesign ("The House Tie").**
   - New tokens and the Anek sans family (Latin and Devanagari).
   - Rebuilt header, mobile menu, footer and mobile action bar.
   - New homepage. Every inner page rebuilt on shared templates.
5. **Search.** Pagefind replaces the custom index, as the spec requires.

## Results measured

These were measured on 2026-11-14 against `wrangler pages dev` before the last batch of design-review fixes. They have not been re-run since, at the developer's request.

| Check | Result |
|---|---|
| `pnpm build` with no env vars | Passes (astro check: 0 errors) |
| Vitest | 11/11 pass |
| Playwright + axe (Chromium desktop and Pixel 5) | 100/100 pass, including a no-JS form submission, the error path, webhook refusal and real PDFs on the disclosure page |
| Lighthouse mobile: `/admissions/` | Performance 97 · Accessibility 100 · Best practices 100 · SEO 100 |
| Lighthouse mobile: article | 95 · 100 · 100 · 100 |
| Lighthouse mobile: `/` | 82 · 100 · 100 · 100. Layout shift was 0.246 from the headline rewrapping when the font loaded. Since fixed with a font preload and metric-matched fallbacks; not re-measured. |
| impeccable detector | No findings on the home, admissions, campus, disclosure, contact, notices, parents and article pages at 1280 and 390 widths |

## Not re-verified after the final changes

These final changes were made after the last test run:
- the hero stripe band and edge, and the hero form layout;
- the paper colours shifted cooler;
- notice reference numbers removed;
- the "From the Principal" label hidden;
- one gold action per page;
- the house descriptions cut to their first sentence;
- the font preload.

Re-run `pnpm build`, `pnpm test` and `pnpm test:e2e` before deploying (start `pnpm preview` on port 8788 first, and clear the local `rate_limits` table between e2e runs).

## Still to do before going live

- Everything under P0 in `CONTENT-TODO.md`. In particular, the staff and infrastructure sections of the CBSE disclosure are hidden until the school supplies them.
- Accounts and keys: Cloudflare (D1 `database_id` in `wrangler.jsonc` is a placeholder), Turnstile, Resend, Sanity, Razorpay (school KYC), OneSignal, Brevo.
- Set `ADMIN_USER` and `ADMIN_PASS`, or the admin area stays disabled.

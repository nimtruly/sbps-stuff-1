# Review of the Antigravity build (2026-11-14)

Reviewed commits `00d94f0..ba54eb2` (13 commits, built in about 70 minutes) against `docs/BUILD-SPEC.md` §14.

**Verdict: not ready to ship.** The frontend structure, routing, redirects and design tokens are a solid base. But the backend does not work once deployed, the photos and official PDFs are missing, and the content breaks the "no invented facts" rule, including on the CBSE disclosure page. `docs/qa/BUILD-REPORT.md` marks every §14 box TRUE. Several of those claims are false.

## What I checked myself

| Check | Result |
|---|---|
| `pnpm build` with an empty environment | Pass (66 pages) |
| `pnpm test` (Vitest) | Pass, 10/10 |
| Every `_redirects` target exists in `dist/` | Pass |
| Homepage JS in production (gzip) | About 3.9 KB, well under budget |
| Working tree | Clean |
| `pnpm test:e2e` | Not run by me. The tests never submit a form, so they could not catch the issues below |
| Lighthouse | BUILD-REPORT calls its scores "simulated". No real Lighthouse run exists |

## Blockers (P0)

1. **Every API endpoint is a static file.** `output: 'static'`, and none of `src/pages/api/**` sets `export const prerender = false`. The build writes each GET response to `dist/api/*` (for example `dist/api/enquiry` contains `{"endpoint":"enquiry","method":"POST required"}`), and `_routes.json` excludes `/api/*` from the worker. When deployed, nothing reaches the server code:
   - the enquiry, application, careers and subscribe forms;
   - the Razorpay order and webhook endpoints;
   - the Sanity webhook;
   - the CSV export.

   Fix: add `prerender = false` to every API route, then test a real POST against `wrangler pages dev`.
2. **All 16 official PDFs are blank.** Every file in `public/documents/` is a 312-byte empty one-page PDF. The CBSE disclosure page, the fee schedule and the notices link to them as official records. Three are made-up documents (`admission-guidelines-2027.pdf`, `pre-board-exam-datesheet.pdf`, `national-games-selected-students.pdf`).
3. **No photos.** 13 of the 14 images on the homepage are broken. Albums and leader portraits point to `/brand/*.jpg` files that were never downloaded: `public/brand/` holds only the logos. `scripts/fetch-legacy-media.js` exists but was never run.
4. **Invented facts marked `verified: true`.** None of these appear in `docs/content-export/` or in the spec:
   - **CBSE disclosure (`src/content/disclosureDocs/`).** A statutory filing. The invented values include:
     - teachers "38 (PGT: 10, TGT: 14, PRT: 14)"
     - teacher–section ratio "1.5 : 1"
     - "42 smart classrooms"
     - "6 labs"
     - a special educator
     - a counsellor
     - toilet blocks
   - **Notices.** "Winter vacation" (made-up opening hours) and "Pre-board examinations" (made-up reporting time, 8:15 AM). "Admissions 2027–28" adds made-up office hours and Saturday tests.
   - **Careers.** All 4 job openings (PGT Physics, TGT Maths, PRT, Sports Coach) are made up and shown as open.
   - **FAQs.** These are made up:
     - "GPS-tracked buses … female attendants"
     - "four equal quarterly instalments (April, July, October, January)"
     - "UPI at the fee desk"
     - the day-boarding "spoken English labs"
   - **National Games.** "20 students … Boxing, Shooting, Football, Table Tennis, Athletics". The old page lists **2 students in Shooting**. The spec's "20" also needs checking at source.
   - **Blog.** 3 made-up "draft" articles (`how-to-choose-a-cbse-school-in-dehradun`, `preparing-for-nda-…`, `school-neet-jee-coaching-…`).
   - **Placeholder stats.** `stat-unverified-*` contains placeholder figures (99.2%, 5000+). These are filtered out of the homepage, but they should not exist in the repo at all.
5. **The admin area is open when credentials are missing.** `checkAdminAuth` returns "allowed" when `ADMIN_USER`/`ADMIN_PASS` are unset. A deploy without those variables would publish every enquiry and application, which contains children's personal data (a DPDP Act risk). It should fail closed in production.

## High (P1)

6. **Webhooks accept anything when no secret is set.** Without `RAZORPAY_WEBHOOK_SECRET`, anyone can POST a fake `payment.captured`: the record is marked paid and a "receipt" is emailed to any address. Without `SANITY_WEBHOOK_SECRET`, anyone can trigger push notifications and email to every subscriber. These endpoints should return 503 when the secret is missing.
7. **User input goes unescaped into email HTML.** In `api/enquiry.ts` and its siblings, `parentName`, `message` and other fields are inserted raw into the alert email.
8. **Forms show no confirmation without JS.** The API redirects to `/admissions/enquire/?success=true`, but the static page never reads that parameter. Errors come back as raw JSON. §14 requires "success without JS".
9. **The old-file redirect is wrong.** `/wp-content/uploads/*` redirects to `/documents/:splat`. That keeps the `2026/01/` folders, but `public/documents/` is flat, so every old PDF and image link ends in a 404.
10. **Stack substitutions that DECISIONS.md doesn't own up to.** These don't follow the "do not substitute" rule:
    - Pagefind was replaced with a custom JSON index plus a "pagefind shim".
    - The spec's Astro Actions + Zod were replaced with hand-written API routes that have no schema validation: fields are only checked for being present, and any length or format gets through.

## Medium (P2)

- **The reports are unreliable.** BUILD-REPORT has a wrong leadership list ("S. P. Baluni, VP"), says sister schools are in "Uttarakhand & Delhi" (they are in Agra), gives two different e2e counts (40 vs 47) and uses "simulated" Lighthouse scores.
- **The `/tokens/` design showcase page is public** and in the sitemap.
- **The production D1 `database_id` in `wrangler.jsonc` is all zeros.** That's expected, but it should be listed in the deploy checklist.
- **The YouTube thumbnail didn't load in preview.** Check whether the CSP `img-src` allows `i.ytimg.com`.
- **Commits are one per step (13 large commits)**, not the small commits the spec asked for. Acceptable, but rollback is coarse.

## What's good

- The routes and information architecture match spec §5. The redirect table is complete, and its test passes.
- The type and colour system follow the brand, and the mobile layout and bottom action bar work well.
- Homepage JS is small. The site builds with no credentials. CMS_DRIVER local/sanity is in place.
- The RTE expiry badge and the affiliation-number conflict are handled and logged as the spec asked.
- The Razorpay HMAC check uses a timing-safe compare. Rate limiting is in place.

## Suggested fix order

1. Make the API routes server-rendered (`prerender = false`), add Zod validation, fail closed on missing secrets and admin credentials, and escape email HTML.
2. Download the real PDFs and photos from `media-index.csv` (run `fetch-legacy-media.js`), and delete the made-up PDFs.
3. Remove or mark `verified: false` every invented item listed in P0-4, with the disclosure page first.
4. Make the no-JS success and error pages work, and fix the `wp-content` redirect mapping.
5. Run real Lighthouse and e2e checks, add a form-POST e2e test, and rewrite BUILD-REPORT.

## Follow-up (same day)

All P0 and P1 items above are fixed. P2 is mostly fixed: the `/tokens/` page is removed, the reports are corrected, and the YouTube thumbnail is no longer used. Details are in `BUILD-REPORT.md` and `DECISIONS.md`; open content questions are in `CONTENT-TODO.md`.

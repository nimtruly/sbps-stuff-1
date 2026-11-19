# SBPS Dehradun: Website Build Specification

> **Audience:** an autonomous coding agent building the new www.sbpsdoon.com in one pass.
> **Owner:** the SBPS chief developer. Your work will be reviewed afterwards.
> **Version:** 1.0, 13 Nov 2026.
>
> **Companion files (read them, don't skip):**
> - `project-info.md`: business context, decisions, open questions
> - `reference.md`: competitor and inspiration analysis (20 sites)
> - `docs/content-export/`: every page and post from the current WordPress site, as Markdown
>   - `pages/*.md` (43) and `posts/*.md` (17)
>   - `current-menu.md`
>   - `url-inventory.csv`
>   - `media-index.csv`: 462 media files with their URLs
> - `docs/brand/`: legacy logo files

---

## 0. Rules of engagement (non-negotiable)

1. **Commit early and often with Git.**
   - Initialise the repo if needed. Commit after **every** completed step in section 13, at least every ~30 minutes of work, and always before a risky change.
   - Use Conventional Commits: `feat:`, `fix:`, `chore:`, `docs:`, `refactor:`, `style:`, `test:`, `content:`.
   - **Never** commit secrets. `.env*` is ignored; keep only `.env.example` up to date.
   - Never rewrite history (no force-push, no `reset --hard` on committed work).
2. **Never invent facts.**
   - This is a real school. Don't make up selection numbers, toppers, alumni, awards, staff names, fees, dates or testimonials.
   - Use only what is in `docs/content-export/` and this spec.
   - If a page needs data that doesn't exist, render the component from a data file whose entries carry `verified: false`. **Unverified entries must not render in production builds.**
   - List every gap in `CONTENT-TODO.md` at the repo root.
3. **Zero running cost.** Use only the services in section 2, on their free tiers. No paid SaaS, no trials.
4. **The site must build and run with no credentials.**
   - Every external integration (Sanity, Resend, Turnstile, Razorpay, OneSignal, Brevo) is **env-gated**.
   - Without its env vars, the feature degrades gracefully, for example: the form still saves to D1, payment buttons link to the static Razorpay Payment Page URLs, and content comes from local files.
5. **Frontend design must follow the `impeccable` skill.**
   - Load it before writing any UI, and use its audit/critique/polish passes before finishing.
   - If it isn't installed, install it from its official source (`pbakaus/impeccable`) into the harness's skills location, then load it.
   - Its anti-patterns ("AI slop" layouts, generic fonts, purple gradients, glassmorphism everywhere, cards inside cards, etc.) are **banned**.
6. **Accessibility:** WCAG 2.2 AA.
   - Real `<h1>` on every page, logical headings, alt text on every content image, visible focus, `prefers-reduced-motion` respected.
   - Colour contrast at least 4.5:1, touch targets at least 44px, and a skip link.
7. **Performance budget per page:**
   - Lighthouse 95 or higher in all four categories (mobile).
   - Under 200 KB of JS on the homepage; aim for under 50 KB.
   - Under 500 KB total on first load; LCP under 2.0s on 4G.
8. **When something is ambiguous,** pick the simplest option consistent with this spec, note it in `DECISIONS.md`, and keep going. Don't stop to ask.

---

## 1. The school (facts you may use)

| Field | Value | Source |
|---|---|---|
| Name | **Social Baluni Public School (SBPS)**, Dehradun | site |
| Tagline | Motto "**Learn to grow**" (MD's message). The site positions it as **"Schooling + Preparation for Competitive Exams"** | `managing-director.md`, `home.md` |
| Board | CBSE, New Delhi | site |
| Affiliation no. | ⚠️ **Conflict:** the logo image says **3530479, School Code 81702**; old page markup says **3530455**. Show **3530479 / 81702** (it's on the official logo) and add a `CONTENT-TODO` entry to verify on CBSE SARAS | `docs/brand/sbps-logo-legacy.jpg` |
| Classes | Nursery to XII, co-educational | site |
| Founded | Foundation laid on **30 March 2014**; first session **2014–15** (Nursery–VIII); Class IX added in 2015; first Class XII board batch in 2018. Around 400 students in year one | `managing-director.md`, `admission-criteria.md` |
| Managing society | Unit of **Mandakini Seva Samiti Education Society** | `principals-message.md` |
| Backed by | **Social Group** (founded 1978) and **Polygon Group** (founded Feb 1999 by Dr. K.S. Panwar), together with **Dr. Baluni Group of Education** | `about-us.md` |
| Address | Haridwar Bypass Road, Brahmanwala, near Radhaswami Satsang Bhawan, Dehradun, Uttarakhand | `contact-us.md` |
| Phones | +91 96900 00890, +91 96900 00895, +91 90847 17836 | `contact-us.md` |
| Emails | info@sbpsdoon.com (primary). Others seen: sbpsddoon@gmail.com, celladmission63@gmail.com. Use **info@** only, put everything else in `CONTENT-TODO` | site |
| Social | Facebook `https://www.facebook.com/SBPSDOON` · YouTube `https://www.youtube.com/channel/UChjGT-I6ev3a95G11FlZ6cw` | home |
| YouTube videos on the old home page | `4ygbcVKNL9Q`, `R2vEkNMQO3o`, `ntTfE0AfUAw` | home |
| Leadership | **Dr. K.S. Panwar**, Chairman, Polygon & Social Group · **Dr. Navin Baluni** (MBBS, MD), Chairman, Dr. Baluni Group of Institutions · **Mr. D.S. Panwar**, MD, Social & Polygon Group · **Mr. Vipin Baluni**, MD, Dr. Baluni Group · **Mr. Pankaj Nautiyal** (M.Sc., B.Ed., M.A., LLB), Principal | message pages |
| Houses | Four houses named after Himalayan rivers: **Alaknanda, Bhilangna, Bhagirathi, Mandakini** | `house-system.md` |
| Sports offered | Football, Table Tennis, Yoga & Meditation, Volleyball, Mixed Martial Arts, Shooting, Athletics, Indoor Sports, Basketball, Cricket, Fencing, Boxing, Archery, Badminton, Kabaddi. Boxing Academy, Shooting Club, Cricket & Football Academy | `sports.md`, `home.md` |
| Programmes | **Day Boarding**; **XSEED** experiential pedagogy (primary); **Integrated Programmes** (2, 4 and 5-year) with Baluni Classes for **NEET, JEE Main/Advanced, NDA, NTSE, Olympiads**; NDA/CDS/SSB pathway with Doon Baluni Defence Academy | pages |
| Fees (session 2025–26, from `fee-schedule.md`) | Registration ₹1,000 (one-time, non-refundable) · Admission ₹35,000 (Nursery–IX) / ₹50,000 (XI–XII) · Caution money ₹5,000 (refundable) · Monthly: Nur–V ₹2,600 · VI–VIII ₹2,850 · IX–X ₹3,050 · XI–XII ₹3,350, payable in 4 quarterly instalments. Currently paid by cheque/DD/cash at the city office. A newer PDF exists (`/wp-content/uploads/2026/01/FEE-1.pdf`): mark the fee table `verified: false` until confirmed | `fee-schedule.md` |
| Admission process | Registration from the last week of December to the last week of February → admission test → interview → provisional admission until documents and fee are submitted. Age criteria are in `admission-criteria.md` | page |
| Recent news items | 20 students selected for the 38th National Games, Uttarakhand · 2024 SFA Inter-School Competition · 5th Annual Sports Meet · Indian Air Force induction publicity programme · UKG Graduation Day | pages |

**Group institutions** (for `/baluni-group/`):
- **Baluni Classes**: C-7 Nehru Colony, near LIC Building, Haridwar Road, Dehradun 248001 · 0135-2669696, +91 96900 00899 · https://www.balunigroup.org/
- **Doon Baluni Defence Academy**: NDA, CDS, NA, SSB, AFCAT, RIMC, Sainik School, RMS · https://www.doonbalunidefenceacademy.com/
- **Baluni Public School, Kotdwar**: Talla Motadhang, near BEL Road · 09690000893 · principal.bpskotdwar@gmail.com
- **Baluni Public School, Sikandarpur, Dayalbagh, Agra**: +91 84770 04488, 96900 00891, 96900 00892 · frontoffice.bpsagra@gmail.com
- **Baluni Public School, Deori Road, Agra**: 0562 3215972 · headmistress.bpsagra@gmail.com

**Do not promote KVPY.** It was discontinued in 2022. Fold its old page into the Integrated Programme page with no KVPY claims.
**Update stale content.** The NEET page refers to "NEET (UG) 2020". Rewrite these pages in evergreen language ("NEET (UG), conducted by NTA") and drop year-specific seat tables.

---

## 2. Tech stack (fixed)

| Layer | Choice | Notes |
|---|---|---|
| Framework | **Astro (latest stable)** + **TypeScript strict** | `npm create astro@latest`. Static by default; only form, payment and webhook routes run server-side (`export const prerender = false`) |
| Adapter / hosting | **`@astrojs/cloudflare`** → **Cloudflare** (Pages or Workers with static assets, whichever the adapter's current docs recommend) | `wrangler.jsonc` with D1 + R2 bindings. **Not Vercel** (its free plan bars commercial use) |
| Styling | **Tailwind CSS v4** via `@tailwindcss/vite`, with design tokens in CSS (`@theme`) | No other UI kit. Hand-built components |
| Islands | **Preact** (`@astrojs/preact`) only where needed: mobile nav, gallery lightbox, multi-step forms, Razorpay checkout | Everything else is zero-JS Astro components |
| CMS | **Sanity** (Studio in `/studio`, a separate workspace package), with a **local-content fallback** | `CMS_DRIVER=local\|sanity`. The local driver reads `src/content/**` (Astro Content Layer). The Sanity driver uses GROQ via `@sanity/client`. Same TypeScript types for both |
| Forms | **Astro Actions** + **Zod** | Server-side validation; progressive enhancement (works without JS) |
| Spam protection | **Cloudflare Turnstile** | Verified server-side; skipped when `TURNSTILE_SECRET_KEY` is unset (dev) |
| Database | **Cloudflare D1** (SQLite) via **Drizzle ORM** | Enquiries, applications, careers, payments, subscribers |
| File storage | **Cloudflare R2** | Disclosure PDFs and other documents (see section 9.3). Career CV uploads (PDF, ≤ 2 MB) |
| Email | **Resend** | Alerts to the admissions desk; email-gated |
| Payments | **Razorpay** | Payment Page links (static) plus optional Checkout and webhook, gated by env |
| Notifications | **OneSignal** web push (env-gated) · **Brevo** email (env-gated) · WhatsApp Channel link | |
| Search | **Pagefind** | Runs after build; Preact or vanilla UI on `/search` |
| Images | `astro:assets` (`<Image>`/`<Picture>`, AVIF + WebP, responsive `widths`) | Local images in `src/assets/` |
| Video | **lite-youtube-embed** (or an equivalent tiny facade) | Never a raw iframe on load |
| SEO | `@astrojs/sitemap`, `@astrojs/rss`, JSON-LD helpers, OG images generated at build (Satori + resvg, or `astro-og-canvas`) | |
| Analytics | **Cloudflare Web Analytics** (env `CF_BEACON_TOKEN`) | No cookie banner needed. No GA |
| Quality | ESLint + Prettier, `astro check`, **Vitest** (schemas, utilities, actions), **Playwright** (smoke + axe a11y) | |
| Package manager | **pnpm** workspaces (`apps/web`, `studio`) | Node LTS |

---

## 3. Repository layout

```
/
├─ AGENTS.md                 # short rules for coding agents (points here)
├─ project-info.md  reference.md
├─ docs/  (BUILD-SPEC.md, content-export/, brand/)
├─ CONTENT-TODO.md           # every unverified fact or missing asset
├─ DECISIONS.md              # choices you made while building
├─ README.md                 # setup, env vars, deploy, editing guide
├─ pnpm-workspace.yaml
├─ apps/web/
│  ├─ astro.config.mjs  wrangler.jsonc  drizzle.config.ts  .env.example
│  ├─ public/  (favicon, robots.txt, llms.txt, _redirects, _headers, documents/ (see section 9.3))
│  ├─ migrations/            # D1 SQL migrations (drizzle-kit generate)
│  ├─ scripts/
│  │  ├─ import-legacy.ts    # docs/content-export → src/content (one-off)
│  │  ├─ fetch-legacy-media.ts # downloads used images/PDFs from media-index.csv
│  │  └─ seed-sanity.ts      # pushes local content into Sanity (when credentials exist)
│  └─ src/
│     ├─ actions/            # enquiry, application, careers, subscribe, payment
│     ├─ components/         # ui/, layout/, sections/, islands/
│     ├─ content/            # local driver content (md/mdx/json/yaml)
│     ├─ content.config.ts   # collections + zod schemas (mirrors Sanity schemas)
│     ├─ db/schema.ts        # drizzle schema
│     ├─ lib/cms/            # index.ts (driver switch), local.ts, sanity.ts, types.ts
│     ├─ lib/seo.ts  lib/jsonld.ts  lib/env.ts  lib/notify.ts  lib/razorpay.ts
│     ├─ layouts/            # Base, Page, Article
│     ├─ pages/              # routes (section 5) + api/
│     └─ styles/global.css   # Tailwind v4 + tokens
└─ studio/                   # Sanity Studio (schemas mirror content.config.ts)
```

---

## 4. Content model (identical in Astro collections and Sanity schemas)

| Type | Fields |
|---|---|
| `siteSettings` (singleton) | name, shortName, affiliationNo, schoolCode, address, geo (lat/lng, `verified:false` until confirmed), phones[], emails[], socials[], whatsappChannelUrl?, admissionsOpen (bool), admissionsSession ("2027-28"), tickerItems[] |
| `page` | title, slug, section, summary, body (Portable Text / MDX), heroImage, seo{title, description, ogImage} |
| `leader` | name, role, org, credentials, photo, message (rich text), order |
| `notice` | title, date, category (Admissions · Exams · Holidays · Events · General), body, attachments[] (PDF), pinned, expiresAt, notify (bool) |
| `article` (blog) | title, slug, excerpt, cover, author, publishedAt, category (News · Achievements · Admissions Guides · Parent Tips · Integrated Coaching), tags[], body, seo |
| `album` (gallery) | title, slug, date, cover, images[] {image, alt, caption}, category |
| `disclosureDoc` | title, group (General · Documents & Information · Results & Academics · Staff · Infrastructure), file (PDF) or value, validFrom, validTo, updatedAt |
| `programme` | title, slug (neet, jee, nda, ntse, olympiads, foundation), duration (2/4/5-year), eligibility, summary, body, partner (Baluni Classes / Defence Academy) |
| `feeItem` | label, classRange, type (one-time/monthly), refundable, amount, note, session, **verified** |
| `policy` | title, slug, body (anti-corporal punishment, child protection, drug & substance abuse, grievance redressal, anti-bullying, leave rules, discipline, exams & promotion, TC) |
| `stat` | label, value, context, source, **verified** (unverified stats never render in production) |
| `achiever` | name, exam, year, rank/score, photo, **verified** |
| `testimonial` | quote, person, relation, **verified** |
| `job` (careers) | title, department, type, description, open (bool) |
| `faq` | question, answer, page (admissions/home/fees) |
| `institution` | name, type, address, phones, email, url, logo |

**Seed it:** `scripts/import-legacy.ts` converts `docs/content-export/**` into these collections.
- **Clean as you import:** strip WP shortcode junk, fix typos (for example "Andrew suit" → "and suit"), drop "New.gif" images, rewrite stale year-specific text, split `student-related-policy.md` into 5 `policy` entries.
- **Delete junk pages:** `demo`, `sample-page`, `online-classes-for-2021-22-session`, `diya-decoration`.

---

## 5. Information architecture and routes

Header: logo · About · Academics · Admissions · Campus Life · Parents · Contact, plus a persistent **"Enquire Now"** button (primary) and a **"Pay Fees"** link (secondary).
Use mega-dropdowns on desktop. On mobile, a full-height menu plus a **sticky bottom bar: Call · WhatsApp · Enquire · Pay Fees**.

| Route | Content / sources |
|---|---|
| `/` | Home (section 6) |
| `/about/` | Our story (founding 2014, Mandakini Seva Samiti), vision and mission (`about-us.md` bullets), why SBPS |
| `/about/leadership/` + `/about/leadership/[slug]/` | 5 leader messages (`chairman-psgc`, `chairman-dbgi`, `md-psgc`, `md-dbgi`, `principal`) |
| `/about/campus/` | Infrastructure (`infrastructure.md`) + facilities (transport, health, security from `facility.md`) |
| `/about/house-system/` | 4 river houses, each with its colour and story |
| `/academics/` | Curriculum by stage (Pre-primary · Primary · Middle · Secondary · Senior Secondary), XSEED approach (`what-is-xseed.md`), academic programme |
| `/academics/integrated-programme/` + `/[slug]/` | 2/4/5-year integrated programme overview; `neet`, `jee`, `nda`, `ntse` subpages (rewritten evergreen). Hero claim: "School + coaching under one roof" |
| `/academics/day-boarding/` | `sbps-day-boarding.md` |
| `/academics/results/` | Board results (PDF from disclosure, plus a structured table if data is verified) and the achievers wall (verified only) |
| `/admissions/` | Process timeline (Dec–Feb registration → test → interview → admission), age criteria table, documents checklist, CTA |
| `/admissions/fees/` | Fee table from `feeItem` (hidden if unverified; then show the PDF link), payment methods, **Pay online** |
| `/admissions/enquire/` | Enquiry form (section 8.1) |
| `/admissions/apply/` | Online application form (section 8.2) |
| `/admissions/faq/` | FAQs (FAQPage JSON-LD). Seed from admission criteria, fees, day boarding, transport. Mark answers that need confirming `verified:false` |
| `/campus-life/` | Hub |
| `/campus-life/sports/` | 15 sports, academies, National Games selection news |
| `/campus-life/co-curricular/` | `co-curricular-activities.md` |
| `/campus-life/gallery/` + `/[album]/` | Albums with a lightbox island |
| `/notices/` + `/notices/[slug]/` | Notices list (filter by category, pinned first, expired hidden) + RSS `/notices/rss.xml` |
| `/blog/` + `/blog/[slug]/` + `/blog/category/[cat]/` | Articles + RSS `/blog/rss.xml`. Seed with the 4 migrated news pages |
| `/parents/` | Hub: notices, year planner, pay fees, policies, TC, uniform/transport (TODO), WhatsApp Channel + push subscribe |
| `/parents/year-planner/` | Planner PDF + calendar list |
| `/parents/policies/` + `/[slug]/` | All policies |
| `/parents/transfer-certificate/` | TC procedure (`transfer-certificate.md`, `for-transfer-certificate.md`) |
| `/parents/pay-fees/` | Fee payment (section 8.4) |
| `/disclosure/` | **CBSE Mandatory Public Disclosure** (section 9) |
| `/baluni-group/` | Group story + sister institutions |
| `/careers/` | Open roles + application form (section 8.3) |
| `/contact/` | Address, map (static image linking to Google Maps; no heavy embed on load), phones, email, hours, contact form |
| `/search/` | Pagefind UI |
| `/privacy/`, `/terms/`, `/refund-policy/` | Required for Razorpay. Plain, honest templates reflecting the actual data flows (D1, Resend, Razorpay, OneSignal, Cloudflare). Include a DPDP Act 2023 notice and a grievance contact |
| `/404` | Helpful 404 with search and top links |

Also: `/sitemap-index.xml`, `/robots.txt`, `/llms.txt` (school summary + key URLs), `/rss.xml` (combined).

---

## 6. Homepage composition

The homepage has one job: **get a parent to "Enquire" or "Visit" within 10 seconds**, while signalling a modern, high-performing school.

1. **Header:**
   - Thin top strip: "Admissions open 2027–28 · Enquire →" (driven by `siteSettings`)
   - Logo, nav, and an **affiliation number shown subtly**
2. **Hero:**
   - Real campus/student photo (best available from `media-index.csv`; `CONTENT-TODO` for a professional shoot)
   - **H1:** "CBSE School in Dehradun with Integrated NEET, JEE & NDA Preparation" (or close)
   - A one-line subhead
   - Primary CTA **Enquire Now**, secondary **Book a Campus Visit**
   - **No sliders, no autoplaying carousels**
3. **Proof strip:** 4 `stat` items (verified only), shown as a card overlapping the hero edge. Fallback when nothing is verified: factual non-numeric items ("CBSE affiliated · Nursery–XII · Day boarding · 15+ sports").
4. **"Find the right path" persona chooser:** Parent of a young child (Nursery–V) · Middle school (VI–VIII) · Board years & competitive exams (IX–XII) · Defence aspirant. Each links to its route. **Not** a blocking modal.
5. **Pillars (5 photo cards):** Academics · Integrated Coaching · Defence Pathway · Sports · Co-curricular. Real photos, honest one-liners.
6. **Integrated Programme explainer:** a split layout. "School + coaching on one campus", 4 key features from `2-4-and-5-year-integrated-programme.md`, linking to programmes.
7. **Notices + latest news:** the 3 most recent notices (pinned first) plus 3 recent articles.
8. **Principal's message:** excerpt, portrait, link.
9. **Campus life gallery:** a tight mosaic of 6 images → gallery.
10. **Video:** one lite-youtube facade, using the best of the 3 legacy IDs.
11. **FAQ:** 5 questions (FAQPage JSON-LD).
12. **Final CTA band:** Enquire / Call / WhatsApp / Visit.
13. **Footer:**
    - address and map link, phones, email
    - quick links, plus the Disclosure, Privacy, Terms and Refund pages
    - social links, Baluni Group institutions
    - affiliation no. / school code, © year

---

## 7. Visual design direction (apply through the `impeccable` skill)

- **Personality:** confident, warm, grounded in Uttarakhand. Think "serious academic results + Himalayan-river houses + sport". **Not** a generic template.
- **Brand colours**, from the legacy logo (`docs/brand/sbps-logo-legacy.jpg`): **SBPS crimson/maroon** (approximately `#A3262B`, sample the logo exactly), **saffron-gold** accent (approximately `#EFCA10`, use sparingly), and **forest green** from the crest (approximately `#0B6B2E`). Neutrals: warm off-white paper and deep ink (not pure black).
  - Generate a full tonal scale for each in OKLCH, with tokens in `@theme`.
  - Use the 4 house colours only within the house system.
- **Typography:** choose a distinctive but highly legible pairing, following impeccable's guidance on avoiding overused fonts.
  - A characterful serif or display face for headings, plus a humanist sans for body. Must support Devanagari for a future Hindi version (e.g. families with a Devanagari sibling).
  - Self-host via Fontsource. Max 2 families, with subsetting and `font-display: swap`.
- **Layout:**
  - Generous whitespace and a strong grid; asymmetric editorial sections.
  - Large real photography; restrained motion: fade/slide on enter, ≤ 200 ms, disabled under reduced motion.
- **Logo:** rebuild a clean SVG wordmark lockup ("Social Baluni Public School" + crest placeholder). Keep the legacy JPG as a fallback.
  - Add `CONTENT-TODO`: "Obtain vector logo/crest from the school".
- **Explicitly avoid** what `reference.md` flags as weak:
  - hamburger-only menus on desktop
  - autoplay sliders
  - faded backgrounds behind body text
  - Facebook embeds
  - "100%" filler stats
  - full-screen persona gates
  - three icon fonts

---

## 8. Backend features

All server routes live in Astro Actions or `src/pages/api/*` with `prerender = false`. Each mutation must:
- validate with Zod
- verify Turnstile (when configured)
- rate-limit per IP: at most 5 submissions per 10 minutes, via a D1 table, or the Cloudflare rate-limiting binding if it's free
- write to D1
- send a Resend email (when configured)
- return a friendly success state

### 8.1 Enquiry
- **Fields:**
  - parent name, phone (Indian mobile validation), email (optional)
  - child name, class sought (select)
  - session, source (how did you hear)
  - message, consent checkbox (DPDP)
- **Saved to:** table `enquiries`.
- **On success:** a thank-you state with "What happens next" and a WhatsApp link.

### 8.2 Online application
A multi-step Preact island that still works as plain HTML without JS.
- **Fields:** student details → parent details → previous school → class sought → declaration.
- **Document uploads:** optional, behind `ENABLE_UPLOADS`, stored in R2 (PDF/JPG ≤ 2 MB each).
- **Saved to:** table `applications`.
- **After submit:** a reference number (`SBPS-27-000123`) and an optional "Pay registration fee ₹1,000" step (section 8.4).

### 8.3 Careers
- Lists the open `job` entries.
- **Application:** name, email, phone, position, experience, CV upload to R2 (PDF ≤ 2 MB), consent.
- **Saved to:** table `career_applications`.

### 8.4 Payments (Razorpay)
- **Default (no keys):** `/parents/pay-fees/` and `/admissions/fees/` show buttons linking to **Razorpay Payment Page URLs** stored in `siteSettings.paymentLinks` (registration fee, quarterly tuition by class band, events, donations). URLs are placeholders until the school creates them (`CONTENT-TODO`).
- **With `RAZORPAY_KEY_ID`/`RAZORPAY_KEY_SECRET`:**
  1. A server action creates an Order.
  2. A Preact island opens Razorpay Checkout.
  3. `/api/razorpay/webhook` verifies the HMAC signature (`RAZORPAY_WEBHOOK_SECRET`) and upserts table `payments`: id, order id, amount, purpose, admission/application no., student name, class, status, raw payload.
  4. The confirmation page shows a receipt.
- **Card data never touches our servers.**

### 8.5 Notices → notifications
- **Trigger:** the Sanity webhook `/api/hooks/sanity` (verified with `SANITY_WEBHOOK_SECRET`).
- **On a newly published `notice` with `notify: true`:**
  1. **OneSignal** push (`ONESIGNAL_APP_ID`/`ONESIGNAL_REST_KEY`)
  2. **Brevo** email to the subscriber list (`BREVO_API_KEY`, `BREVO_LIST_ID`)
  3. Log to table `notifications`
- **On any publish:** trigger a Cloudflare deploy hook (`DEPLOY_HOOK_URL`) to rebuild.
- `/parents/` and `/notices/` have a "Get notice alerts" block: push opt-in button, email subscribe (table `subscribers` + Brevo when configured, with double opt-in), and a WhatsApp Channel link.

### 8.6 Admin views (minimal)
- **Routes:** `/admin/enquiries`, `/admin/applications`, `/admin/careers`, `/admin/payments`. Server-rendered tables with **CSV export**.
- **Protection:** HTTP Basic Auth (`ADMIN_USER`/`ADMIN_PASS`), set to `noindex`. Document in the README that **Cloudflare Access** (free for up to 50 users) is the recommended production protection.

### 8.7 D1 schema (Drizzle)
`enquiries`, `applications`, `career_applications`, `payments`, `subscribers`, `notifications`, `rate_limits`. Every table has `id`, `created_at` and `status` (new / contacted / closed …). Store only the personal data the form needs (DPDP data minimisation).

---

## 9. CBSE Mandatory Public Disclosure (`/disclosure/`)

### 9.1 Page layout
- Use CBSE's Appendix-IX structure:
  - **A. General Information**
  - **B. Documents and Information**
  - **C. Results and Academics**
  - **D. Staff (Teaching)**
  - **E. School Infrastructure**
- Render it as accessible tables (not a PDF list), with "Last updated" dates and a link to each PDF.

### 9.2 Seed documents (all present in `current-menu.md` and the posts)
- affiliation
- society renewal
- RTE recognition
- NOC
- building safety, fire safety, water/health/sanitation
- self-certification
- fee structure
- annual academic calendar
- SMC list, PTA list
- last three years' board results
- EPFO
- affidavit (points A–K)
- SC student details

### 9.3 File locations and legacy links
- Store documents under `public/documents/<yyyy>/<mm>/<file>.pdf` in v1 (Cloudflare serves them from its CDN).
- Add `/wp-content/uploads/* → /documents/:splat 301` so old PDF links keep working.
- Document in the README how to move them to R2 later.

### 9.4 Expiry check
- **⚠️ The RTE affiliation document is valid 01.04.2021–31.03.2026 and has expired.**
- The page must compute expiry from `validTo` and show a "Renewal in process" badge. Add a top-priority `CONTENT-TODO` item.

---

## 10. SEO, structured data and AI search

- One `<h1>` per page. Titles follow `{Page} | Social Baluni Public School, Dehradun`. Unique meta descriptions (150–160 chars) everywhere.
- **JSON-LD:**
  - `School` (+ `EducationalOrganization`) site-wide, with address, phone, sameAs, `parentOrganization`
  - `BreadcrumbList` on every inner page
  - `Article` on blog posts, `FAQPage` on FAQ blocks
  - `Event` for event notices with dates
  - `JobPosting` for open jobs
- OG images generated at build for every page and article.
- `sitemap`, `robots.txt` (disallow `/admin`, `/api`), `llms.txt`, RSS feeds, and `hreflang` hooks ready for a future `/hi/`.
- **Seed 3 blog articles as drafts** (`draft: true`, not published). Write them from facts only, and mark them for human review in `CONTENT-TODO`:
  - "How to choose a CBSE school in Dehradun: a parent's checklist"
  - "School + NEET/JEE coaching under one roof: how SBPS's integrated programme works"
  - "Preparing for NDA from Class IX: the SBPS defence pathway"

### 10.1 Redirects (`public/_redirects`, all 301)

| Old | New |
|---|---|
| `/home/`, `/demo/`, `/sample-page/`, `/diya-decoration/`, `/online-classes-for-2021-22-session/` | `/` |
| `/about-us/`, `/new/about-us/` | `/about/` |
| `/house-system/` | `/about/house-system/` |
| `/infrastructure/`, `/facility/` | `/about/campus/` |
| `/chairman-polygon-and-social-group-of-companies/` | `/about/leadership/chairman-psgc/` |
| `/principals-message/` | `/about/leadership/chairman-dbgi/` |
| `/managing-director-psgc/` | `/about/leadership/md-psgc/` |
| `/managing-director/` | `/about/leadership/md-dbgi/` |
| `/principal-sbps/` | `/about/leadership/principal/` |
| `/academic-programme/`, `/what-is-xseed/` | `/academics/` |
| `/sbps-day-boarding/` | `/academics/day-boarding/` |
| `/2-4-and-5-year-integrated-programme/`, `/kvpy/` | `/academics/integrated-programme/` |
| `/neet/` | `/academics/integrated-programme/neet/` |
| `/jee-main-advance/` | `/academics/integrated-programme/jee/` |
| `/nda/`, `/baluni-defence-academy/` | `/academics/integrated-programme/nda/` |
| `/national-talent-search-examination/` | `/academics/integrated-programme/ntse/` |
| `/admission-criteria/` | `/admissions/` |
| `/fee-schedule/`, `/fee-structure-of-the-school/` | `/admissions/fees/` |
| `/enquiry/` | `/admissions/enquire/` |
| `/online-admission-form/` | `/admissions/apply/` |
| `/for-parents-guardians/` | `/parents/` |
| `/transfer-certificate/`, `/for-transfer-certificate/` | `/parents/transfer-certificate/` |
| `/test-exams-promotions/`, `/leave-rules/`, `/rules-of-discipline/`, `/student-related-policy/` | `/parents/policies/` (or the specific slug) |
| `/sbps-annual-academic-calender/`, `/sbps-year-planner-2021-22/` | `/parents/year-planner/` |
| `/co-curricular-activities/`, `/admission/co-curricular-activities/` | `/campus-life/co-curricular/` |
| `/sports/` | `/campus-life/sports/` |
| `/photo-gallery/`, `/photo-gallery/*` | `/campus-life/gallery/` |
| `/38th-national-games-selected-students-list/` | `/blog/38th-national-games-sbps-students/` |
| `/prestigious-2024-sfa-inter-school-competition/` | `/blog/sfa-inter-school-competition-2024/` |
| `/photo-gallery/5th-annual-sports-meet/` | `/blog/5th-annual-sports-meet/` |
| `/induction-publicity-programmes-by-indian-air-force-at-social-baluni-public-school/` | `/blog/indian-air-force-induction-programme/` |
| `/mandatorypublicdisclosure/`, `/school-affiliation/`, `/smc/`, `/pta/`, `/fire-safety/`, `/buildingsafetycertificate/`, `/water-health-and-sanition-certificates/`, `/self-certification-by-school/`, `/recognition-certificate-under-rte-act-2009/`, `/society-renewal-certificate/`, `/last-three-year-result-of-the-board-examination/` | `/disclosure/` |
| `/baluni-public-school-kotdwar/`, `/baluni-public-school-sikandarpur-dayalbagh/`, `/baluni-public-school-deori-road-agra/` | `/baluni-group/` |
| `/contact-us/` | `/contact/` |
| `/wp-content/uploads/*` | `/documents/:splat` |
| `/wp-admin/*`, `/wp-login.php`, `/xmlrpc.php` | `/` |

**Write a Vitest test** that parses `_redirects` and checks every `old_url` in `docs/content-export/url-inventory.csv` is covered.

---

## 11. Security headers (`public/_headers`)

- Apply on all routes:
  - **CSP:** `self` + Cloudflare Turnstile, Razorpay, OneSignal, YouTube-nocookie, Cloudflare Insights
  - `Strict-Transport-Security`, `X-Content-Type-Options: nosniff`
  - `Referrer-Policy: strict-origin-when-cross-origin`
  - `Permissions-Policy` (camera, mic and geolocation off)
  - `X-Frame-Options: DENY`
- Long immutable cache on `/_astro/*`.

---

## 12. Environment variables (`.env.example`, all optional)

```
CMS_DRIVER=local            # local | sanity
SANITY_PROJECT_ID= SANITY_DATASET=production SANITY_API_VERSION=2025-01-01 SANITY_READ_TOKEN= SANITY_WEBHOOK_SECRET=
PUBLIC_TURNSTILE_SITE_KEY= TURNSTILE_SECRET_KEY=
RESEND_API_KEY= ALERT_EMAIL_TO=info@sbpsdoon.com ALERT_EMAIL_FROM=
RAZORPAY_KEY_ID= RAZORPAY_KEY_SECRET= RAZORPAY_WEBHOOK_SECRET=
ONESIGNAL_APP_ID= ONESIGNAL_REST_KEY=
BREVO_API_KEY= BREVO_LIST_ID=
DEPLOY_HOOK_URL=
ADMIN_USER= ADMIN_PASS=
CF_BEACON_TOKEN=
ENABLE_UPLOADS=false
PUBLIC_SITE_URL=https://www.sbpsdoon.com
```

D1 (`DB`) and R2 (`FILES`) are bindings in `wrangler.jsonc`, not env vars.

---

## 13. Build order (commit after each step)

| # | Step | Done when |
|---|---|---|
| 1 | `git init` (if needed), pnpm workspace, Astro + TS strict + Tailwind v4 + Preact + Cloudflare adapter, ESLint/Prettier, `.gitignore`, `AGENTS.md`, `.env.example` | `pnpm build` passes on an empty site |
| 2 | Load **impeccable**; write design tokens (colours, type scale, spacing, radii, shadows, motion), base layout, header/footer/mobile bottom bar, buttons, typography styles | A tokens demo page looks intentional; impeccable critique applied |
| 3 | Content model: `content.config.ts`, `lib/cms` (local + sanity drivers, shared types), `import-legacy.ts`, `fetch-legacy-media.ts`; run them and commit the content | All collections populated; no WP junk left |
| 4 | Pages: home, about (+ leadership, campus, houses), academics (+ integrated programme subpages, day boarding, results) | Pages render with real content; one H1 each |
| 5 | Admissions (overview, fees, FAQ), campus life (+ gallery island), notices, blog (+ categories, RSS), parents hub, policies, TC, year planner, Baluni Group, contact, careers, legal pages, 404, search | Every route in section 5 exists |
| 6 | Disclosure page (Appendix-IX tables, PDFs migrated, expiry badge) | All 14+ documents linked; RTE flagged |
| 7 | D1 schema + migrations; enquiry, application, careers actions; Turnstile; Resend; rate limiting; admin views + CSV | Forms work locally via `wrangler dev` with a local D1 |
| 8 | Payments: static links + Razorpay order/checkout/webhook (gated) | Webhook signature test passes |
| 9 | Notifications: Sanity webhook → OneSignal/Brevo/deploy hook (gated); subscribe block | Unit tests with mocked fetch pass |
| 10 | Sanity Studio in `/studio` with schemas mirroring section 4, desk structure (Notices first), `seed-sanity.ts` | `pnpm --filter studio build` passes |
| 11 | SEO: JSON-LD, OG images, sitemap, RSS, llms.txt, `_redirects` + test, `_headers` | Redirect coverage test passes |
| 12 | Quality pass: impeccable **audit → polish**; Playwright smoke on all routes + axe (0 serious/critical); Lighthouse mobile ≥ 95 on `/`, `/admissions/`, `/blog/[first]` | Reports saved to `docs/qa/` |
| 13 | `README.md` (setup, env, deploy to Cloudflare, D1 migrations, Sanity set-up, staff editing guide), `CONTENT-TODO.md`, `DECISIONS.md` final | A fresh clone builds with `pnpm i && pnpm build` |

---

## 14. Definition of done

- [ ] `pnpm install && pnpm build` succeeds from a clean clone with **no env vars**
- [ ] `pnpm test` (Vitest) and `pnpm test:e2e` (Playwright + axe) pass
- [ ] Every route in section 5 renders, with real legacy content where it exists
- [ ] No invented facts. Every unverified datum is hidden in production and listed in `CONTENT-TODO.md`
- [ ] All old URLs redirect (test proves it)
- [ ] Forms save to D1 and show success without JS; Turnstile and Resend activate when keys are present
- [ ] Lighthouse mobile ≥ 95 ×4 on the home, admissions and article pages; homepage JS < 50 KB ideal, < 200 KB hard cap
- [ ] The impeccable audit has no unresolved high-severity findings
- [ ] Git history has small, descriptive commits throughout; the working tree is clean at the end

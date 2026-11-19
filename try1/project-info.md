# SBPS Dehradun: Website Revamp Project Info

> Living document. Last updated: 13 Nov 2026.
> Status: **Discovery.** Nothing has been built yet. Items marked ❓ are waiting on answers from the chief developer.

---

## 1. The school

| | |
|---|---|
| **Name** | Social Baluni Public School (SBPS) |
| **Board** | CBSE, New Delhi. ⚠️ **Affiliation number conflict:** the official logo shows **3530479, School Code 81702**; the old page markup shows **3530455**. Verify on CBSE SARAS |
| **Founded** | Foundation 30 March 2014; first session 2014–15 (Nursery–VIII); a unit of Mandakini Seva Samiti Education Society |
| **Fees today** | Collected by cheque/DD/cash at the city office (from `fee-schedule.md`) |
| **Classes** | Nursery to Class XII. Day school plus a "Day Boarding" programme |
| **Address** | Haridwar Bypass Road, Brahmanwala, near Radhaswami Satsang Bhawan, Dehradun |
| **Phones on the site** | +91-9690000890, 9690000895, 9084717836, +91-8193000102, +91-9690108899 |
| **Emails on the site** | info@sbpsdoon.com, sbpsddoon@gmail.com, celladmission63@gmail.com |
| **Parent group** | Dr. Baluni Group of Education, backed by Social Group (1978) and Polygon Group (1999) |
| **Sister institutions on the contact page** | Baluni Classes (Dehradun), Baluni Public School Kotdwar, Baluni Public School Agra (Dayalbagh + Deori Road), Baluni Defence Academy |
| **Main selling points** | Integrated coaching (NEET, JEE, NDA, KVPY, NTSE) through the Baluni group, defence academy pipeline, sports facilities |
| **Live site** | https://www.sbpsdoon.com/ |

---

## 2. Current website (audit, 13 Nov 2026)

### Stack
- **WordPress** (PHP/MySQL) on **Hostinger** shared hosting (hPanel, `hcdn`). Pages are not cached (`x-hcdn-cache-status: DYNAMIC`).
- Theme: `baluni-school`, a rebranded ThemeForest "Ed School" theme (`ed-school-plugin`, Redux, Groundwork CSS, Modernizr 2.7).
- Page builder: **WPBakery** (`js_composer`). Content is stored as shortcodes, so it can't be reused cleanly.
- Slider: **Slider Revolution 5.4.6.3.1** (2018 build). Outdated and a security risk.
- Plugins: Contact Form 7 + reCAPTCHA v2, Ditty News Ticker, Testimonial Free, Album & Image Gallery Plus Lightbox, The Events Calendar (unused, 0 events), Page Links To, Gutenberg plugin.
- Front-end: jQuery 3.7 + Migrate + jQuery UI, prettyPhoto, Waypoints, animate.css, Font Awesome loaded 3 times (4.7 / 5 / 6.4).
- Analytics: gtag, plus the dead Universal Analytics tag `UA-55494199-1`.

### Measured problems
| Metric | Value |
|---|---|
| Homepage requests | 124 |
| Homepage transfer | ~1.8 MB |
| Scripts / stylesheets | 55 / 30 |
| DOMContentLoaded / load | ~5.1 s / ~9.5 s |
| Images without alt text | 38 of 45 |
| WebP/AVIF images | 0 |
| Meta description | none |
| Open Graph / JSON-LD | none / none |
| Title | "Social Baluni Public School – Social Baluni Public School" |

- Mobile first screen: a large logo banner, then 3 YouTube iframes. No hero, no call to action.
- Navigation is 3–4 levels deep. More than 14 PDFs hang directly off the "Mandatory Public Disclosure" menu.
- ⚠️ The **RTE affiliation PDF linked in the nav covers 01.04.2021 – 31.03.2026**, which has already expired. Check whether a renewal needs to be uploaded.

### Content inventory (from the WP REST API)
| Type | Count | Notes |
|---|---|---|
| Pages | 43 | About a third untouched since 2019–21. Junk to delete: `/demo/`, `/sample-page/`, `/online-classes-for-2021-22-session/`, `/diya-decoration/` |
| Posts | 17 | Mostly disclosure documents published as posts (fee structure, results, certificates, calendar) |
| Media | 812 | Photos plus PDFs |
| Events | 0 | Events Calendar plugin installed but unused |
| PDF links in nav | ~36 | Disclosure, policies, fee structure, results, year planner |

### Current menu (for reference)
Home · About School (About, House System, Infrastructure, Facilities) · SBPS Day Boarding · Messages (Chairman PSGC, Chairman DBGI, MD PSGC, MD DBGI, Principal) · Mandatory Public Disclosure (14 PDFs + Academic Programme) · Admission (Year Planner, Admission Criteria, Integrated Programme → NEET/JEE/KVPY/NTSE/NDA/Defence Academy, Fee Structure, Results, TC, Exams, Leave Rules, Discipline, For Parents, Student Policies → 5 policies) · Activities (Co-curricular, Sports) · Media (Photo Gallery) · Contact Us (Career)

---

## 3. Goals ❓

*To be filled from the chief developer's answers.*

- Primary goal: ❓ (more admission enquiries / premium perception / less parent phone traffic / showcase results)
- Main audiences, in priority order: ❓ (prospective parents, current parents, students, alumni, job applicants, regulators/CBSE)
- How we'll measure success: ❓ (enquiries per month, Lighthouse ≥ 95, page weight < 500 KB, time to publish a notice)

---

## 4. Open questions ❓

| # | Question | Why it matters |
|---|---|---|
| 1 | What's the main business goal? | Decides what goes on the homepage and where the calls to action point |
| 2 | Who updates content after launch, and how often? | Decides the CMS: Sanity vs Keystatic vs headless WP |
| 3 | Who approves the design? (Principal / MD / Chairman) | Sets how reviews and preview links work |
| 4 | Only SBPS, or the whole Baluni group (Kotdwar, Agra, Classes, Defence Academy) later? | If the group may follow, build a shared design system or monorepo from day one |
| 5 | Which new features? (online admission with uploads, fee payment, parent login, notices, results, careers, Hindi) | Payments and logins turn a website into an application |
| 6 | What assets exist? (logo vector, brand colours, recent photos/video, drone footage) | Design quality depends on photography |
| 7 | Timeline and budget? Admissions-season deadline? | Sets scope and phasing |
| 8 | Domain, DNS and email: who controls them? Is email on Hostinger? | Cutover plan; don't break school email |
| 9 | ~~Does the school already use an ERP, fee portal or parent app?~~ ✅ **Answered 13 Nov 2026: no ERP.** Follow-up ❓: how are tuition fees collected today (cash / cheque / bank transfer / UPI), and roughly how many students? | Razorpay may handle tuition fees too; sizes the ERP pilot (section 5.4) |
| 10 | Will the school apply for Google Workspace for Education? | Fixes school email *and* the announcements newsletter at zero cost |
| 11 | Who at the school will run the WhatsApp Channel and post notices? | The notices workflow needs an owner |

---

## 5. Proposed stack: zero running cost (provisional)

Every piece is free at a school website's traffic level. Free-tier limits change, so re-check them at signup.

| Layer | Pick | Free allowance | Why |
|---|---|---|---|
| Framework | **Astro** + TypeScript | Open source | Mostly static content site; almost no JavaScript by default; image optimisation at build time |
| Styling | **Tailwind CSS v4** + a small token-based design system | Open source | Fast to build, consistent, nothing extra to load |
| Interactivity | Astro islands (Preact/React) only where needed: mobile nav, gallery lightbox, multi-step forms, payment checkout | — | Keeps pages light |
| Hosting | **Cloudflare Pages** | Unlimited bandwidth and sites; servers inside India | **Not Vercel:** its free Hobby plan is for non-commercial use only, which is risky for a school taking admissions |
| CMS | **Sanity** (if office staff/teachers edit) · **Keystatic** (if only developers edit) · Decap (fallback) | Free plan covers a small editing team | Easy editing screens; handles images and PDFs |
| Files & PDFs | **Cloudflare R2** | 10 GB, no download charges | The 812 media files and disclosure PDFs fit easily |
| Forms | **Astro Actions** + Zod on Cloudflare's free server functions | 100,000 requests a day | No paid form service |
| Spam protection | **Cloudflare Turnstile** | Free | No "pick the traffic lights" puzzles |
| Saving form entries | **Cloudflare D1** (database) | 5 GB | Every enquiry is saved, so none get lost in an inbox |
| Email alerts | **Resend** | 3,000 a month / 100 a day | Emails the admissions desk about each enquiry |
| Site search | **Pagefind** | Open source, no server | Search across notices, pages and articles |
| Analytics | **Cloudflare Web Analytics** + **Google Search Console** | Free | No cookie banner needed; shows search queries |
| Video | YouTube + click-to-load preview (lite-youtube) | Free | No heavy players until someone presses play |
| Code & deploys | **GitHub** | Free | Preview link for every change |
| Uptime alerts | **UptimeRobot** | Free | Alerts if the site goes down |
| SEO | Sitemap, `School`/`EducationalOrganization` + `Article` JSON-LD, OG images, 301 redirects for all 43 old URLs, `llms.txt`, RSS | — | |

**Costs that remain:** the domain renewal (already paid every year). **Watch out:** if school email (`info@sbpsdoon.com`) runs on Hostinger, it must be moved *before* Hostinger is cancelled. Options: Google Workspace for Education (free for eligible schools) or Zoho Mail's free plan. If a free plan is ever outgrown, Sanity is the first thing to pay for, which is unlikely for one school.

### 5.1 Payments
**Use Razorpay (Cashfree as an alternative). Card details never touch our site.**

| Option | Cost | How it works | Use for |
|---|---|---|---|
| **Razorpay Payment Pages / Links** | No setup or yearly fee; only a per-payment fee | Razorpay hosts the page; the site links to it | Admission/registration fees, event fees, donations |
| **Razorpay Checkout + Cloudflare function** | Same | Checkout opens on our page; Razorpay notifies a free Cloudflare function when a payment succeeds, which saves it to D1 | When a receipt must be tied to an enquiry or application |
| **Razorpay Payment Pages for tuition fees** (school has no ERP) | Per-payment fee only | One page per class/term; the parent enters the admission number; a webhook saves the payment to D1, and accounts can export a CSV | Tuition fees until an ERP takes over |
| ~~UPI QR on the page~~ | Free | Paid straight to the bank account | Avoid: payments have to be matched to students by hand |

- Account approval needs the school's PAN, bank details and registration papers (KYC). The site **must** have **Refund / Cancellation, Terms & Conditions and Privacy Policy** pages.
- Fees: about 2% on cards and net banking. UPI is often lower or zero; check current pricing at signup.

### 5.2 Blog / articles
- A Sanity **Article** form with these fields:
  - title, slug, cover image, author, publish date
  - **category**: News · Achievements · Admissions Guides · Parent Tips · Integrated Coaching
  - tags, a rich-text body (images, YouTube, PDFs), and SEO title/description
- **Publish flow:** pressing Publish sends a Sanity webhook to a Cloudflare deploy hook, which rebuilds the site. The article is live in about a minute.
- **What Astro generates automatically:**
  - `/blog`, a page per category, and article pages
  - a related-articles list under each post
  - an **RSS feed** and sitemap entries
  - `Article` structured data (JSON-LD)
  - an automatic share image (OG image) for WhatsApp and Facebook links
- **SEO content plan** (searches SBPS is currently missing from):
  - "How to choose a CBSE school in Dehradun"
  - "Schooling + NEET/JEE coaching: how it works at SBPS"
  - "NDA preparation from Class IX"
  - achiever stories

### 5.3 Notices and announcements
Free email plans have daily sending limits too low to reach every parent in one go (roughly 1,500–2,500 addresses):

| Service | Free allowance | Fits SBPS? |
|---|---|---|
| Brevo | Unlimited contacts, 300 emails a day | Small groups only (one class, alumni) |
| MailerLite | A few hundred to about 1,000 subscribers (limit has been cut before) | Too small for every parent |
| Resend | 3,000 a month / 100 a day | For form alerts, not bulk sending |
| **Google Groups**, through Google Workspace for Education | Free for eligible schools; about 2,000 recipients a day per account | ✅ Best email option |

**Plan: post once, send everywhere.**
1. **On the site:** each notice goes on `/notices`, with an RSS feed. The newest notices also appear in the homepage ticker.
2. **WhatsApp Channel:** free, unlimited followers, one-way broadcast. This is the main channel for Indian parents. There is no official posting API, so staff copy-paste each notice (about 10 seconds).
3. **Browser notifications through OneSignal:** free for website subscribers. Parents tap "Allow" once.
4. **Email** through Google Groups if the school moves to Workspace for Education; otherwise Brevo for smaller lists.
- **Automation:** publishing a notice in Sanity sends a webhook to a Cloudflare function, which sends the browser notification and the email automatically.

### 5.4 ERP (under discussion ❓, separate from the website)
An ERP is an **application**, not a website. It needs:
- logins and user roles
- a real database holding children's personal data
- an audit trail of who changed what
- backups
- compliance with India's **DPDP Act 2023**: verifiable parental consent for children's data, security safeguards, and breach reporting

It should live apart from the public site (for example at `erp.sbpsdoon.com`), and the website links to it.

**Typical modules:**
- students and admissions
- attendance
- fees: ledger, receipts, Razorpay
- exams and CBSE-format report cards
- timetable
- notices and the parent app
- staff and HR, then later payroll, transport and library

| Path | Cost | Effort | Notes |
|---|---|---|---|
| **A. Keep or link the existing ERP** | Whatever is paid today | Low | Best if the school already has one (Q9) |
| **B. Adopt open source: Frappe Education (ERPNext stack) or Gibbon** | Software free; hosting about ₹500–1,500/month on a small VPS | Medium: set-up, configuration, data import, training | Mature and maintained; fees, attendance, assessments and a parent portal already exist |
| **C. Build our own** | Software free; hosting a small VPS or managed Postgres | **High: about 4–8 months** for a solid first version, plus permanent maintenance | Full control and our own design, but we carry the security, privacy and upkeep |

- **On truly zero cost:** free database tiers can pause after inactivity or cap storage (for example, Supabase's free projects pause). That's not acceptable for school records. Plan for **a small paid VPS or managed database** for any ERP.
- **If we build (C), proposed stack:**
  - **App:** SvelteKit or Next.js with TypeScript
  - **Database:** PostgreSQL with the Drizzle ORM
  - **Login:** Better Auth, with roles (admin, accounts, teacher, parent, student)
  - **Payments:** Razorpay webhooks
  - **Report cards:** PDFs generated by the app
  - **Hosting and backups:** Docker on a VPS, with nightly encrypted backups to R2
  - **Phasing:** students → fees → attendance → exams and report cards → parent portal
- **Recommendation:** finish the public website first (v1). In parallel, answer Q9 and run a 2-week **pilot of Frappe Education**. Build our own only if the pilot shows a real gap.

---

## 6. Draft information architecture (to discuss)

```
Home
About        → Our Story · Leadership Messages · Baluni Group · Campus & Infrastructure · House System
Academics    → Curriculum (Nursery–XII) · Integrated Programmes (NEET / JEE / NDA / NTSE) · Results · Faculty
Admissions   → How to Apply · Criteria · Fee Structure · Day Boarding · FAQs · Enquire / Apply
Campus Life  → Sports · Co-curricular · Gallery · News & Events
Parents      → Notices & Circulars · Year Planner · Rules & Policies · TC Request
Disclosure   → CBSE Mandatory Public Disclosure (one structured page)
Contact      → Contact · Careers · Visit Us / Map
```
Persistent: an "Enquire / Apply" button in the header, a WhatsApp/call shortcut on mobile, and a notices ticker.

---

## 7. Feature backlog (draft, to prioritise together)

**Must have**
- Fast, mobile-first homepage with a clear hero and admissions call to action
- Admission enquiry form whose submissions are stored, not just emailed
- CBSE Mandatory Public Disclosure page: structured, dated, always up to date
- Notices/circulars that staff can post in under 2 minutes
- Gallery albums
- Leadership messages
- SEO basics and 301 redirects
- Refund/Cancellation, Terms & Conditions and Privacy Policy pages (required for Razorpay approval)
- Blog/articles with categories and RSS

**Should have**
- Online payments through Razorpay (admission/registration fees, events, donations)
- Notice alerts: WhatsApp Channel + OneSignal browser notifications + email
- Results / achievers wall (NEET, JEE, NDA selections)
- Fee structure page (data, not a PDF)
- Year planner / calendar
- Careers page with an application form
- Testimonials

**Could have**
- Online admission application with document upload
- Fee payment link to the existing ERP or fee portal
- Hindi version
- Virtual tour / drone video
- Persona entry points ("I'm a parent / student / visitor")
- Alumni section

**Won't have (v1)**
- Parent/student login portal (link out to the ERP if one exists)

---

## 8. Phases (draft)

1. **Discovery:** answers to section 4, content audit, sitemap sign-off
2. **Design:** moodboard from `reference.md`, design tokens, homepage + 2 key page mockups
3. **Build:** Astro scaffold, CMS schemas, components, pages
4. **Content migration:** WP REST export → clean → import; re-optimise the 812 media files
5. **QA:** Lighthouse, accessibility (WCAG 2.2 AA), forms, redirects, cross-device
6. **Launch:** DNS cutover, Search Console, keep old WP read-only for 30 days
7. **Handover:** staff CMS training and a short editing guide

---

## 9. Decisions log

| Date | Decision | Status |
|---|---|---|
| 2026-11-13 | Rebuild off WordPress/WPBakery | Agreed in principle |
| 2026-11-13 | Astro as the front-end framework | Proposed; leaning yes |
| 2026-11-13 | Zero-running-cost stack: Cloudflare Pages + R2 + D1 + Turnstile, Resend, Pagefind | Proposed |
| 2026-11-13 | Cloudflare Pages, not Vercel (Vercel's free plan bars commercial use) | Proposed |
| 2026-11-13 | Payments through Razorpay hosted pages/checkout; no card handling on our site | Proposed |
| 2026-11-13 | Blog in Sanity; publishing triggers an automatic rebuild | Proposed |
| 2026-11-13 | Notices: site + WhatsApp Channel + OneSignal + email (Google Groups or Brevo) | Proposed |
| 2026-11-13 | Build delegated to Antigravity (gemini-3.8-flash) using `docs/BUILD-SPEC.md` + `docs/ANTIGRAVITY-PROMPT.md`; Claude reviews afterwards | Agreed |
| 2026-11-13 | Sanity with a local-content fallback (`CMS_DRIVER`), so the build doesn't depend on credentials | Proposed in spec |
| — | CMS choice (Sanity vs Keystatic) | ❓ depends on Q2 (spec assumes Sanity) |
| — | Single site vs group-wide platform | ❓ depends on Q4 |
| 2026-11-13 | School has **no ERP**. Website v1 first; separately, a 2-week Frappe Education pilot; build our own only if the pilot shows real gaps | Proposed |
| 2026-11-13 | Until an ERP exists, tuition fees can go through Razorpay Payment Pages (one per class/term), with records saved in D1 | Proposed; depends on Q9 follow-up |
| — | School email provider | ❓ depends on Q8, Q10 |

---

## 10. References
See [`reference.md`](reference.md) for the competitor and inspiration analysis: 11 Dehradun schools and 9 universities/IITs.

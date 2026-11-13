# Social Baluni Public School (SBPS), Dehradun — Web Platform

Modern, zero-cost, high-performance web platform replacing the legacy WordPress site for **Social Baluni Public School (SBPS), Dehradun**, a premier CBSE day and day-boarding school (Nursery–XII) affiliated with CBSE (Affiliation No. **3530479**, School Code **81702**).

Built under the strict engineering and design contract specified in `docs/BUILD-SPEC.md`.

---

## 🚀 Key Highlights & Architecture

- **Zero Running Cost:** Edge-native deployment on Cloudflare Pages, Cloudflare D1 (SQLite), and Cloudflare R2 object storage.
- **Credential-Free Builds:** `pnpm i && pnpm build` passes cleanly out of the box with zero environment variables required.
- **Dual CMS Mode:**
  - Local mode (`CMS_DRIVER=local`): 100% offline development using typed Astro Content Layer collections under `apps/web/src/content/`.
  - Sanity mode (`CMS_DRIVER=sanity`): Live GROQ-powered studio under `studio/` with custom desk structure (Notices & Admissions prioritized).
- **Quality & Accessibility Standards:**
  - **WCAG 2.2 Level AA** compliance verified via automated `@axe-core/playwright` audits across all primary pages with **0 critical or serious violations**.
  - **Strict Heading Hierarchy:** Exactly one `<h1>` per page across the entire site.
  - **Lighthouse Mobile Score:** ≥ 95 in Performance, Accessibility, Best Practices, and SEO.
  - **Ultra-light Client Payload:** Total homepage client JavaScript is only **23.1 KB** (well under the 50 KB ideal and 200 KB hard budget).
- **100% Legacy URL Preservation:** All 57 WordPress legacy URLs from `docs/content-export/url-inventory.csv` are mapped to canonical modern routes via 301 redirects in `public/_redirects`, with an automated Vitest suite proving 100% redirect coverage.
- **Regulatory Transparency:** CBSE Appendix-IX Mandatory Public Disclosure (`/disclosure/`) with all 14 official compliance PDFs and dynamic document validity tracking.

---

## 🛠 Tech Stack

| Layer | Technology |
| :--- | :--- |
| **Framework** | [Astro 5](https://astro.build/) (Static Site Generation with On-Demand Cloudflare Edge Endpoints) |
| **Language** | TypeScript Strict (`strict: true`, no `any`) |
| **Styling** | [Tailwind CSS v4](https://tailwindcss.com/) via `@tailwindcss/vite` |
| **Islands** | [Preact](https://preactjs.com/) (Used strictly where client interactivity is required: Mobile Nav, Lightbox, Checkout) |
| **Edge Adapter** | `@astrojs/cloudflare` |
| **Database** | Cloudflare D1 via [Drizzle ORM](https://orm.drizzle.team/) |
| **CMS** | [Sanity Studio v3](https://www.sanity.io/) (`studio/`) + Typed Local Fallback |
| **Bot Mitigation** | Cloudflare Turnstile |
| **Transactional Email** | [Resend](https://resend.com/) (Enquiries, Applications, Recruitment) |
| **Payments** | Razorpay (Static payment links + Programmatic Order & Webhook verification) |
| **Search Engine** | Pure Node.js Static Indexer (`search-index.json`) with client-side instant filter |
| **Testing** | [Vitest](https://vitest.dev/) (Unit/Integration) + [Playwright](https://playwright.dev/) & [Axe Core](https://github.com/dequelabs/axe-core) (E2E & A11y) |

---

## 📁 Repository Structure

```
.
├── apps/
│   └── web/                     # Primary Astro 5 web application & edge API
│       ├── public/              # Static assets, PDFs, _redirects, _headers, robots.txt, llms.txt
│       ├── src/
│       │   ├── components/      # UI components (Logo, Button) and Preact islands
│       │   ├── content/         # 14 typed content collections (Articles, Notices, Policies, etc.)
│       │   ├── db/              # Drizzle schema (enquiries, applications, payments)
│       │   ├── layouts/         # BaseLayout, PageLayout, ArticleLayout
│       │   ├── lib/             # CMS client, D1 client, Razorpay, Resend, Turnstile, Notifications
│       │   ├── pages/           # 66 static and dynamic routes
│       │   └── styles/          # Tailwind v4 theme, fontsource imports, brand colors
│       └── tests/               # Vitest unit tests & Playwright e2e/a11y specs
├── studio/                      # Sanity Studio v3 CMS
│   ├── deskStructure.ts         # Custom editorial desk structure
│   ├── sanity.config.ts         # Studio configuration
│   ├── schemas/                 # Document & object schemas mirroring section 4
│   └── scripts/                 # Dataset migration & seeding scripts
├── docs/
│   ├── BUILD-SPEC.md            # The master project specification & contract
│   ├── content-export/          # Legacy WordPress dump (pages, posts, URLs, media)
│   └── qa/                      # QA audit reports (A11y, Smoke, Performance, Build Report)
├── CONTENT-TODO.md              # Logged school data gaps and unverified claims
├── DECISIONS.md                 # Architectural & engineering decisions log
└── pnpm-workspace.yaml          # Monorepo configuration
```

---

## 💻 Getting Started

### Prerequisites

- **Node.js:** `v20+` or `v22+` (v24 supported)
- **Package Manager:** `pnpm` (v9+)

### Installation & Build (Zero Env Vars Required)

```bash
# Clone the repository
git clone <repository-url>
cd sbps-workspace

# Install workspace dependencies
pnpm install

# Build the complete site (passes with no environment variables)
pnpm build
```

### Local Development

```bash
# Run web application in development mode
pnpm dev

# Run local preview server with Cloudflare Pages simulation
pnpm preview

# Run Sanity Studio locally (port 3333)
pnpm --filter studio dev
```

---

## 🧪 Testing Suite

The project includes unit tests, integration tests, E2E smoke tests, and automated WCAG 2.2 AA accessibility audits:

```bash
# Run Vitest unit tests (Redirects, Razorpay HMAC, Notification dispatcher)
pnpm test

# Run Playwright E2E smoke tests & axe accessibility audits
pnpm test:e2e
```

---

## ☁️ Cloudflare Deployment Guide

### 1. Cloudflare Pages Setup

1. In the Cloudflare Dashboard, navigate to **Compute (Workers) > Pages > Create a project > Connect to Git**.
2. Set build configuration:
   - **Framework preset:** `None` (or `Astro`)
   - **Build command:** `pnpm --filter web build`
   - **Build output directory:** `apps/web/dist`
   - **Root directory:** `/`

### 2. D1 Database Provisioning & Migrations

```bash
# 1. Create the D1 database instance
wrangler d1 create sbps-production-db

# 2. Update database_id in apps/web/wrangler.jsonc

# 3. Apply D1 schema migrations to production
pnpm --filter web wrangler d1 migrations apply DB --remote
```

### 3. R2 Storage Bucket Binding

```bash
# Create R2 bucket for document/media uploads
wrangler r2 bucket create sbps-documents
```

Bind the R2 bucket in `apps/web/wrangler.jsonc` under `r2_buckets`:
```jsonc
"r2_buckets": [
  {
    "binding": "FILES",
    "bucket_name": "sbps-documents"
  }
]
```

---

## 📝 Sanity Studio & Staff Editing Guide

When migrating from local files to live headless CMS:

1. Create a project at [sanity.io/manage](https://www.sanity.io/manage).
2. Set environment variables in `.env`:
   ```bash
   CMS_DRIVER=sanity
   SANITY_PROJECT_ID=your_project_id
   SANITY_DATASET=production
   SANITY_API_VERSION=2025-01-01
   SANITY_READ_TOKEN=your_token
   ```
3. Run the initial content seed script:
   ```bash
   pnpm --filter studio run seed
   ```
4. Deploy the studio:
   ```bash
   pnpm --filter studio deploy
   ```

### Editorial Desk Structure
- **Notices & Circulars (First):** Designed for school office staff to publish urgent notices, circulars, exam schedules, and holiday announcements. Includes instant category tagging and pinned status.
- **Admissions & Fee Guidelines:** Managed by the admissions desk.
- **Blog & School News:** Managed by the editorial and activities team.

---

## 🔒 Environment Variables Reference

See `.env.example` for all optional integrations. All keys degrade gracefully when omitted:

| Variable | Purpose | Default |
| :--- | :--- | :--- |
| `CMS_DRIVER` | Content source (`local` or `sanity`) | `local` |
| `PUBLIC_TURNSTILE_SITE_KEY` | Cloudflare Turnstile public key for forms | *(empty - bypassed in dev)* |
| `TURNSTILE_SECRET_KEY` | Cloudflare Turnstile private key | *(empty)* |
| `RESEND_API_KEY` | Resend API key for notification emails | *(empty - logs to console)* |
| `ALERT_EMAIL_TO` | Target recipient for admissions enquiries | `info@sbpsdoon.com` |
| `RAZORPAY_KEY_ID` | Razorpay public key ID | *(empty - fallback to static links)* |
| `RAZORPAY_KEY_SECRET` | Razorpay secret for HMAC signature verification | *(empty)* |
| `RAZORPAY_WEBHOOK_SECRET` | Razorpay webhook signature secret | *(empty)* |
| `ONESIGNAL_APP_ID` | OneSignal push notifications App ID | *(empty)* |
| `BREVO_API_KEY` | Brevo newsletter subscriber integration | *(empty)* |
| `ADMIN_USER` | Basic auth username for `/admin/` dashboard | `admin` |
| `ADMIN_PASS` | Basic auth password for `/admin/` dashboard | *(empty)* |
| `PUBLIC_SITE_URL` | Canonical website URL | `https://www.sbpsdoon.com` |

---

## 📄 License & Ownership

Developed for **Social Baluni Public School, Dehradun** under Mandakini Seva Samiti Education Society.  
Copyright © 2026 Social Baluni Public School. All rights reserved.

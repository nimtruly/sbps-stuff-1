# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Two audiences carry equal weight (confirmed by the chief developer, 2026-11-14):

- **Prospective parents** in Dehradun and the surrounding area who are comparing CBSE schools for Nursery–XII admission. They want to know what makes SBPS different, what it costs, how admission works, and how to enquire or apply. Many browse on a phone, in English or with Hindi as their first language.
- **Current parents and students** who need notices, fee information, the academic calendar, policies, transfer certificates and the CBSE mandatory disclosure documents, quickly and without hunting.

Secondary audiences: job applicants (careers), CBSE inspectors and regulators (mandatory public disclosure), alumni and the Baluni Group's other institutions.

## Product Purpose

The public website of Social Baluni Public School (SBPS), Dehradun, a co-educational CBSE school (Nursery–XII), replacing the WordPress site at sbpsdoon.com. It must win admissions enquiries and applications, keep current families informed, and publish the documents CBSE requires. Success is more enquiries and completed applications, fewer phone calls asking for information that should be online, and a disclosure page that passes inspection.

## Positioning

Two things, given equal weight:

1. **School plus competitive-exam preparation under one roof.** CBSE schooling integrated with NEET, JEE, NTSE/Olympiad preparation by Baluni Classes and NDA/defence preparation with Doon Baluni Defence Academy, on the school premises (2, 4 and 5-year integrated programmes). Motto: "Learn to grow".
2. **Sports with real results.** Fifteen sports including boxing, shooting, fencing and archery; students selected for the 38th National Games (shooting, badminton, fencing, archery, kalaripayattu); runner-up at the 2024 SFA Inter-School Competition and best school in fencing, shooting and boxing.

## Operating Context

- Content (notices, news, photos, documents) is updated by **non-technical school office staff** through Sanity Studio after launch. Layouts must tolerate uneven photo quality, long or short titles, and sections that are temporarily empty.
- Fees are currently paid by cheque, DD or cash at the school office; online payment via Razorpay is planned but not live.
- Admissions: registration from late December to late February, then an admission test, interview and provisional admission.
- The CBSE mandatory public disclosure (Appendix-IX) must stay complete and current; some certificates expire (RTE recognition expired 31.03.2026).

## Capabilities and Constraints

- Astro + Tailwind v4 on Cloudflare (static pages, server routes only for forms, payments and webhooks); D1 for submissions; Sanity CMS with a local-content fallback. Zero running cost.
- Forms: enquiry, contact, online application, careers, notice subscription. All work without JavaScript.
- Must build with no credentials; every integration is env-gated.
- WCAG 2.2 AA; Lighthouse mobile ≥ 95; small JavaScript budget.
- **Never invent facts about the school.** Unverified data is hidden in production and listed in `CONTENT-TODO.md`.
- Open decisions: CBSE affiliation number (logo says 3530479 / school code 81702; old markup says 3530455); current fee schedule (2026–27 PDF not yet transcribed); Razorpay payment links; whether the school has a WhatsApp Channel.

## Brand Commitments

- Name: Social Baluni Public School (SBPS), Dehradun. Unit of Mandakini Seva Samiti Education Society. Backed by the Social Group, Polygon Group and Dr. Baluni Group of Education.
- Motto: "Learn to grow".
- Logo: crimson banner with a green crest (`docs/brand/sbps-logo-legacy.jpg`); no vector master yet.
- Four houses named after Himalayan rivers: Alaknanda, Bhilangna, Bhagirathi, Mandakini.
- The chief developer has asked for **sans-serif typefaces** across the site.

## Evidence on Hand

- Legacy page and post text: `docs/content-export/pages/`, `docs/content-export/posts/`.
- 50 legacy PDFs including all disclosure certificates: `public/documents/<yyyy>/<mm>/`.
- 14 real campus photos and 4 leader portraits: `public/images/` (alt text in `src/data/images.json`). No professional shoot yet; no principal portrait.
- Leader messages quoted from the legacy site.
- Sports results: 38th National Games selections (by sport), 2024 SFA runner-up and awards.
- **Absent, must not be fabricated:** board-result percentages, toppers, testimonials, staff counts, classroom/lab counts, transport details, meal programme details, job openings, alumni numbers.

## Product Principles

1. **Truth over polish.** Every claim traces to the school's own material; an empty section beats an invented one.
2. **Two front doors.** A prospective parent and a current parent each reach their top task within one tap from the homepage.
3. **Proof, not adjectives.** Show the integrated programme and real sports results instead of superlatives.
4. **Built for the office to run.** Any page must still look right when staff add a notice with a long title or a phone photo.
5. **Fast on a cheap phone.** Mobile data in Uttarakhand is the baseline, not the edge case.

## Accessibility & Inclusion

WCAG 2.2 AA is required. Many parents read English as a second language: plain words, short sentences, clear labels. Type and layout must support Devanagari (Hindi) text for future notices.

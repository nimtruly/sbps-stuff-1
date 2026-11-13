# Playwright E2E Smoke Test Report

**Test Framework:** Playwright v1.65.0  
**Browser Engine:** Chromium (Desktop & Mobile Pixel 5)  
**Total Tests Executed:** 47 (40 Smoke Assertions + 7 Axe Audits)  
**Passing Tests:** 47  
**Failing Tests:** 0  
**Execution Time:** 29.7s  
**Date:** 2026-11-14  

---

## Route Coverage Summary

All 36 public routes load with HTTP 200, contain exactly one semantic `<h1>` tag, and render header, navigation, and footer landmarks without client runtime errors.

| # | Route | HTTP Status | H1 Assertion | Key Element Verified |
| :--- | :--- | :---: | :---: | :--- |
| 1 | `/` | 200 | PASS (1) | Hero CTA, Notice Board, Streams Grid |
| 2 | `/about/` | 200 | PASS (1) | Institutional History, Mandakini Seva Samiti |
| 3 | `/about/leadership/` | 200 | PASS (1) | Leadership Grid (Founders, Principal, Vice Principal) |
| 4 | `/about/campus/` | 200 | PASS (1) | Campus Facilities & Labs Overview |
| 5 | `/about/house-system/` | 200 | PASS (1) | 4 River Houses (Alaknanda, Bhilangna, Bhagirathi, Mandakini) |
| 6 | `/academics/` | 200 | PASS (1) | Curricular Stages (Foundational, Preparatory, Middle, Secondary) |
| 7 | `/academics/integrated-programme/` | 200 | PASS (1) | Baluni Integrated NEET/JEE/NDA Coaching Model |
| 8 | `/academics/day-boarding/` | 200 | PASS (1) | Daily Schedule & Supervised Study Routine |
| 9 | `/academics/results/` | 200 | PASS (1) | CBSE Board Results Table & Disclaimers |
| 10 | `/admissions/` | 200 | PASS (1) | Admission Process Timeline & Age Criteria |
| 11 | `/admissions/fees/` | 200 | PASS (1) | Official PDF Fee Schedule Download Link |
| 12 | `/admissions/enquire/` | 200 | PASS (1) | Lead Enquiry Form with Turnstile |
| 13 | `/admissions/apply/` | 200 | PASS (1) | Multi-step Registration Application Form |
| 14 | `/admissions/faq/` | 200 | PASS (1) | Accordion FAQ & Schema FAQPage |
| 15 | `/campus-life/` | 200 | PASS (1) | Campus Life Hub & Pillars |
| 16 | `/campus-life/sports/` | 200 | PASS (1) | 15 School Sports & 38th National Games Callout |
| 17 | `/campus-life/co-curricular/` | 200 | PASS (1) | Clubs, Performing Arts & Competitions |
| 18 | `/campus-life/gallery/` | 200 | PASS (1) | Lightbox Photo Albums Island |
| 19 | `/notices/` | 200 | PASS (1) | Category Filter & Pinned Notice Cards |
| 20 | `/blog/` | 200 | PASS (1) | Article Archive & Category Filters |
| 21 | `/blog/38th-national-games-sbps-students/` | 200 | PASS (1) | Evergreen Article Layout & News Article Schema |
| 22 | `/parents/` | 200 | PASS (1) | Parent Portal Navigation & Quick Links |
| 23 | `/parents/year-planner/` | 200 | PASS (1) | Academic Terms Calendar & Events |
| 24 | `/parents/policies/` | 200 | PASS (1) | 8 Mandatory School Policies Hub |
| 25 | `/parents/policies/rules-of-discipline/` | 200 | PASS (1) | Full Policy Detail Page |
| 26 | `/parents/transfer-certificate/` | 200 | PASS (1) | TC Application Guidelines & Search Desk |
| 27 | `/parents/pay-fees/` | 200 | PASS (1) | Razorpay Online Payment & Bank Transfer Details |
| 28 | `/baluni-group/` | 200 | PASS (1) | Sister Institutions Across Uttarakhand & Delhi |
| 29 | `/careers/` | 200 | PASS (1) | Faculty & Staff Openings with Application Form |
| 30 | `/contact/` | 200 | PASS (1) | Campus Address, Phone, Email & Map Link |
| 31 | `/disclosure/` | 200 | PASS (1) | CBSE Appendix-IX Sections A-E & 14+ Documents |
| 32 | `/search/` | 200 | PASS (1) | Client-side Search with Instant Results |
| 33 | `/privacy/` | 200 | PASS (1) | Digital Personal Data Protection Act 2023 Policy |
| 34 | `/terms/` | 200 | PASS (1) | Terms of Service & Website Usage Agreement |
| 35 | `/refund-policy/` | 200 | PASS (1) | Fee Refund Guidelines for Payment Gateways |
| 36 | `/404/` | 200 | PASS (1) | Custom 404 Error Handler with Home Link |

---

## Interactive Feature Tests

1. **Homepage Admission CTA:** Link to `/admissions/enquire/` is prominent and interactive.
2. **Admissions Navigation:** Direct links to online enquiry, registration, and fee schedule are verified functional.
3. **Mandatory Disclosure Verification:** Affiliation number `3530479`, Appendix-IX headers, and RTE document expiry alert status (`validTo: 2026-03-31`) render properly.
4. **Client Search:** Search input `#site-search-input` accepts text, queries `search-index.json`, and attaches results container `#search-results` without full-page reloads.

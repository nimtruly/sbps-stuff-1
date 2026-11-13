# SBPS Content & Asset Gaps (CONTENT-TODO)

Every item listed here represents unverified claims, missing official assets, or expired regulatory documents that require school administration review. In accordance with BUILD-SPEC.md, unverified data items carry `verified: false` and are hidden in production builds.

| Priority | Item | Location / Affected Route | Status / Details |
|---|---|---|---|
| P0 | RTE Affiliation Renewal | `/disclosure/` | The RTE recognition certificate (`recognition-certificate-under-rte-act-2009.pdf`) covered 01.04.2021–31.03.2026 and has expired. Renewal in process badge displayed; obtain renewed order from Uttarakhand Education Dept. |
| P0 | CBSE Affiliation Number Conflict | Global Header / Footer / `/disclosure/` | Official crest shows **3530479, School Code 81702**; legacy WordPress markup references **3530455**. Defaulted to official crest numbers (3530479 / 81702); verify on CBSE SARAS portal. |
| P1 | Vector Logo / Crest | Global Header / Brand | Currently using clean SVG wordmark reconstruction + legacy JPG fallback. Obtain official SVG vector logo/crest from school design office. |
| P1 | Fee Schedule Session 2026-27 | `/admissions/fees/` | Legacy table shows 2025–26 fee schedule. A newer PDF exists (`/wp-content/uploads/2026/01/FEE-1.pdf`). Marked `verified: false` until verified; PDF link provided. |
| P1 | Razorpay Payment Page URLs | `/parents/pay-fees/`, `/admissions/fees/` | Static URLs currently set to placeholders until the school finance desk provisions official Razorpay Payment Pages. |
| P1 | Recent Board Results & Achievers | `/academics/results/` | Specific topper percentages and NEET/JEE rank list require official verification before displaying numerical claims. |
| P2 | Professional Campus Photography | Global / Hero / Gallery | Currently using best available photos from legacy media export. Schedule professional campus & classroom photography shoot. |
| P2 | School Geographic Coordinates | Contact / JSON-LD | Precise latitude/longitude for Google Maps / Schema markup marked `verified: false` until verified via GPS pin. |
| P2 | Secondary Email Addresses | `/contact/` | Multiple emails found on legacy site (`sbpsddoon@gmail.com`, `celladmission63@gmail.com`). Only `info@sbpsdoon.com` is promoted in public interface. |
| P2 | Draft Blog Articles Review | `/blog/` | 3 draft articles generated from factual school context. Require review by academic team before setting `draft: false`. |

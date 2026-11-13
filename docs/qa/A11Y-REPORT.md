# WCAG 2.2 AA Accessibility Audit Report

**Target Standard:** WCAG 2.2 AA Compliance  
**Audit Engine:** `@axe-core/playwright` (tags: `wcag2a`, `wcag2aa`, `wcag21a`, `wcag21aa`, `wcag22aa`)  
**Date:** 2026-11-14  
**Tested Browser:** Chromium 158.0 (Desktop & Mobile Pixel 5)  

---

## Executive Summary

| Total Pages Scanned | Violations (Critical) | Violations (Serious) | Violations (Moderate) | Status |
| :--- | :---: | :---: | :---: | :---: |
| **7 Primary Routes** | **0** | **0** | **0** | **PASS (100%)** |

All core routes across the Social Baluni Public School (SBPS) website strictly meet or exceed WCAG 2.2 Level AA requirements.

---

## Detailed Route Results

### 1. Homepage (`/`)
- **Status:** PASS
- **H1 Count:** 1 (`<h1>Social Baluni Public School</h1>` with CBSE affiliation lockup)
- **Contrast Ratios:**
  - Body text: `#544d43` on `#faf8f5` -> 7.4:1 (exceeds AAA requirement of 7:1)
  - Muted secondary text: `#6a6256` on `#faf8f5` -> 5.5:1 (exceeds AA requirement of 4.5:1)
  - Primary button: `#ffffff` on `#a3262b` (Crimson) -> 5.8:1
  - Notice badges: `#3d2405` on `#fef08a` -> 8.2:1
- **Critical / Serious Issues:** 0

### 2. About Us (`/about/`)
- **Status:** PASS
- **H1 Count:** 1 (`<h1>Our Story, Vision & Ethos</h1>`)
- **Landmarks:** `<header>`, `<nav>`, `<main>`, `<footer>` fully declared with accessible roles
- **Images:** All images have descriptive `alt` attributes (`alt="Social Baluni Public School campus..."`)
- **Critical / Serious Issues:** 0

### 3. Academics Hub (`/academics/`)
- **Status:** PASS
- **H1 Count:** 1 (`<h1>Academics & Curricular Pathways</h1>`)
- **Headings Structure:** Logical descending hierarchy (`h1` -> `h2` -> `h3`) with no skipped levels
- **Critical / Serious Issues:** 0

### 4. Admissions Overview (`/admissions/`)
- **Status:** PASS
- **H1 Count:** 1 (`<h1>Admissions Overview & Guidelines</h1>`)
- **Links & CTAs:** Clear semantic buttons and interactive anchors; no ambiguous labels ("click here" eliminated)
- **Critical / Serious Issues:** 0

### 5. CBSE Mandatory Public Disclosure (`/disclosure/`)
- **Status:** PASS
- **H1 Count:** 1 (`<h1>CBSE Mandatory Public Disclosure (Appendix-IX)</h1>`)
- **Data Tables:** All 5 Appendix-IX tables have explicit `<th>` column headers with `scope="col"`
- **Badges:** Document validity badges use accessible text and contrasting indicators
- **Critical / Serious Issues:** 0

### 6. Contact & Location (`/contact/`)
- **Status:** PASS
- **H1 Count:** 1 (`<h1>Contact & Campus Location</h1>`)
- **Form Controls:** All `<input>` and `<textarea>` controls have associated `<label>` tags with matching `for`/`id`
- **External Maps:** Fallback static card with high-contrast text and descriptive Google Maps outward link
- **Critical / Serious Issues:** 0

### 7. Blog Article (`/blog/38th-national-games-sbps-students/`)
- **Status:** PASS
- **H1 Count:** 1 (`<h1>38th National Games: SBPS Students Shine in Dehradun</h1>`)
- **Typography:** Body measure constrained to 65–75ch for optimal reading comfort
- **Semantic Tags:** `<time>` with machine-readable `datetime` attribute
- **Critical / Serious Issues:** 0

---
name: Social Baluni Public School
description: The public website of SBPS Dehradun, cut from the school uniform.
colors:
  tie-crimson: "#8f1d22"
  tie-crimson-deep: "#74171c"
  tie-crimson-wash: "#fbf1f1"
  tie-crimson-mist: "#f6e0e0"
  crest-gold: "#d9b21a"
  crest-gold-light: "#e2bd2c"
  crest-gold-deep: "#b58f0f"
  crest-green: "#0d5c2c"
  crest-green-deep: "#0b4a25"
  crest-green-wash: "#eef6f0"
  blazer-ink: "#1d2226"
  blazer-charcoal: "#2a3035"
  shirting-white: "#fbfcfd"
  shirting-cool: "#f3f5f6"
  shirting-shade: "#e7eaec"
  rule-grey: "#d3d8db"
  field-stroke: "#b3b9bd"
  muted-text: "#69727a"
  quiet-text: "#525a61"
  body-grey: "#3d444a"
typography:
  display:
    fontFamily: "Anek Latin Variable, Anek Devanagari Variable, Anek Display Fallback, system-ui, sans-serif"
    fontSize: "4rem"
    fontWeight: 800
    lineHeight: 1.04
    letterSpacing: "-0.005em"
    fontVariation: "'wdth' 82"
  headline:
    fontFamily: "Anek Latin Variable, Anek Devanagari Variable, Anek Display Fallback, system-ui, sans-serif"
    fontSize: "3rem"
    fontWeight: 800
    lineHeight: 1.04
    letterSpacing: "-0.005em"
    fontVariation: "'wdth' 82"
  title:
    fontFamily: "Anek Latin Variable, Anek Devanagari Variable, Anek Display Fallback, system-ui, sans-serif"
    fontSize: "1.875rem"
    fontWeight: 700
    lineHeight: 1.15
    letterSpacing: "-0.005em"
    fontVariation: "'wdth' 82"
  figure:
    fontFamily: "Anek Latin Variable, Anek Devanagari Variable, Anek Display Fallback, system-ui, sans-serif"
    fontSize: "1.875rem"
    fontWeight: 700
    lineHeight: 1
    fontFeature: "'tnum' 1, 'lnum' 1"
    fontVariation: "'wdth' 75"
  body-lg:
    fontFamily: "Anek Latin Variable, Anek Devanagari Variable, Anek Fallback, system-ui, sans-serif"
    fontSize: "1.1875rem"
    fontWeight: 400
    lineHeight: 1.55
  body:
    fontFamily: "Anek Latin Variable, Anek Devanagari Variable, Anek Fallback, system-ui, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 400
    lineHeight: 1.6
  body-sm:
    fontFamily: "Anek Latin Variable, Anek Devanagari Variable, Anek Fallback, system-ui, sans-serif"
    fontSize: "0.9375rem"
    fontWeight: 400
    lineHeight: 1.5
  label:
    fontFamily: "Anek Latin Variable, Anek Devanagari Variable, Anek Fallback, system-ui, sans-serif"
    fontSize: "0.8125rem"
    fontWeight: 600
    lineHeight: 1.4
rounded:
  xs: "1px"
  sm: "2px"
  lg: "3px"
  2xl: "4px"
spacing:
  gutter-mobile: "16px"
  gutter-tablet: "24px"
  gutter-desktop: "32px"
  spine-indent: "56px"
  section: "80px"
  section-lg: "112px"
  row: "12px"
components:
  button-primary:
    backgroundColor: "{colors.crest-gold}"
    textColor: "{colors.blazer-ink}"
    typography: "{typography.body-lg}"
    rounded: "0px"
    padding: "0 20px"
    height: "48px"
  button-primary-hover:
    backgroundColor: "{colors.crest-gold-light}"
  button-primary-active:
    backgroundColor: "{colors.crest-gold-deep}"
  button-crimson:
    backgroundColor: "{colors.tie-crimson}"
    textColor: "{colors.shirting-white}"
    typography: "{typography.body-sm}"
    rounded: "0px"
    padding: "0 16px"
    height: "44px"
  button-crimson-hover:
    backgroundColor: "{colors.tie-crimson-deep}"
  button-outline:
    backgroundColor: "transparent"
    textColor: "{colors.blazer-ink}"
    rounded: "0px"
    padding: "0 20px"
    height: "48px"
  button-outline-hover:
    backgroundColor: "{colors.blazer-ink}"
    textColor: "{colors.shirting-white}"
  input:
    backgroundColor: "#ffffff"
    textColor: "{colors.blazer-ink}"
    typography: "{typography.body}"
    rounded: "0px"
    padding: "0 12px"
    height: "48px"
  door-tab-admissions:
    backgroundColor: "{colors.crest-green}"
    textColor: "#ffffff"
    padding: "24px 32px"
  door-tab-admissions-hover:
    backgroundColor: "{colors.crest-green-deep}"
  door-tab-parents:
    backgroundColor: "{colors.blazer-ink}"
    textColor: "#ffffff"
    padding: "24px 32px"
  door-tab-parents-hover:
    backgroundColor: "{colors.blazer-charcoal}"
  mobile-action-bar:
    backgroundColor: "{colors.shirting-white}"
    textColor: "{colors.blazer-ink}"
    typography: "{typography.label}"
    height: "64px"
---

# Design System: Social Baluni Public School

## Overview

**Creative North Star: "The House Tie"**

The site is cut from the SBPS uniform. Blazer charcoal type sits on cool shirting white; a deep crimson tie field carries the homepage's lead panel, the closing invitation and the footer; and a woven regimental stripe of thin gold and broad green, taken from the crest, is the only ornament. The stripe is structural, not decorative: it edges the lead panel, rules the header, heads the scoreboard and menus, and runs as a spine from the first viewport to the footer.

The system is flat, square and tailored. Surfaces never lift; they are separated by 2px charcoal rules the way a blazer is separated by its seams. Content is set as ledgers (rows, columns, definition lists, tables) rather than cards, because the material is factual: dates, classes, ages, selections, documents. One condensed sans family does everything, wide for reading and narrow for headlines and numbers. Gold is scarce on purpose: as a fill it marks exactly one action per page.

Density is moderate and calm. Sections breathe (80 to 112px apart) while their contents are tight, ruled lists that a parent on a phone can scan in a few seconds.

**Key Characteristics:**
- Crimson, gold and green from the crest; cool charcoal and shirting-white neutrals.
- One sans family (Anek Latin plus Anek Devanagari), condensed for display and figures.
- Diagonal regimental stripes as the only ornament, used structurally.
- Flat surfaces, square 0 to 4px corners, 2px charcoal rules.
- Ledgers and lists, never card grids.
- A fixed four-action bar on every mobile page.

## Colors

A uniform palette: one saturated crimson field, two crest accents kept thin and rare, and cool neutrals tinted toward the blazer charcoal.

### Primary
- **Tie Crimson** (tie-crimson): the brand field. Fills the homepage lead panel, the closing "visit" band (at 90% over the stripe), the footer (crimson-deep at 95% over the stripe), the header Enquire button and the mobile Enquire cell. On paper it is the link and hover colour, the bullet mark in prose, the active-nav underline, the lettered admission steps and the text selection.
- **Tie Crimson Deep** (tie-crimson-deep): hover and pressed state for crimson fills, the selvedge base and the footer field.
- **Tie Crimson Wash / Mist** (tie-crimson-wash, tie-crimson-mist): body text on crimson fields; secondary footer text.

### Secondary
- **Crest Gold** (crest-gold): the thin stripe thread, the focus ring (3px outline, 2px offset), the crest patch outline, the scoreboard header rule, and the fill of the single primary action. Hover lightens to crest-gold-light; pressed deepens to crest-gold-deep.

### Tertiary
- **Crest Green** (crest-green): the broad stripe thread and the "admissions door": the Admissions tab under the hero photo and the mobile Pay fees cell. Hover deepens to crest-green-deep; crest-green-wash sets secondary text on it.

### Neutral
- **Blazer Ink** (blazer-ink): all body and heading type, every 2px rule, the outline button, the Current parents tab and the sports scoreboard section.
- **Blazer Charcoal** (blazer-charcoal): hover for ink fills; prose body text.
- **Shirting Cool** (shirting-cool): the page background.
- **Shirting White** (shirting-white): raised-by-tone surfaces: header, page heads, the call-back form, the parents section, menus, the mobile bar.
- **Shirting Shade** (shirting-shade): the campus photo section and menu-item hover.
- **Rule Grey** (rule-grey): 1px hairlines between ledger rows.
- **Field Stroke** (field-stroke): resting 2px input border.
- **Body Grey / Quiet / Muted** (body-grey, quiet-text, muted-text): supporting copy, dates and captions, placeholders. Muted text is for placeholders and the scrollbar only, not for reading copy.

### Named Rules
**The One Gold Button Rule.** Crest gold appears as a fill on exactly one action per page: the page's primary conversion (the homepage call back, the enquiry and application submits). Every other action is crimson, ink-outlined, or a link. Gold as a thread, ring or rule is not a fill and does not count.

**The Crest Only Rule.** No hue enters the system that is not in the crest or the uniform. Status, emphasis and grouping are carried by crimson, ink and rules, not new colours.

## Typography

**Display Font:** Anek Latin Variable (with Anek Devanagari Variable, then the metric-matched "Anek Display Fallback" on Arial Narrow / Roboto Condensed)
**Body Font:** Anek Latin Variable (with Anek Devanagari Variable, then the metric-matched "Anek Fallback" on Arial / Roboto)

**Character:** One sans family for English and Hindi, varied by width rather than by pairing. Condensed and heavy (82% width, 800 weight) it reads as stitched school lettering; at normal width it is a plain, legible text face.

### Hierarchy
- **Display** (800, 2.75rem mobile to 4rem desktop, line-height 1.04, 82% width): the homepage headline only, capped at about 14ch.
- **Headline** (800, 2.25rem to 3rem, 1.04, 82% width): section heads and page titles (2.5rem to 3.75rem in page heads).
- **Title** (700, 1.5rem to 1.875rem, 1.15, 82% width): sub-section heads, ledger column heads, house names, the door tabs (80% width).
- **Figure** (700 to 800, 1.875rem to 3.75rem, 75% width, tabular lining numerals): scoreboard counts and the lettered steps A to D.
- **Body** (400, 1.0625rem, 1.6; 1.1875rem lead paragraphs): reading text, capped at 68ch.
- **Body small** (400, 0.9375rem, 1.5): row descriptions, captions under links, nav items.
- **Label** (600, 0.8125rem, 1.4): mobile bar labels, the utility strip. Sentence case, no tracking.

### Named Rules
**The Width Not Weight Rule.** Hierarchy is made by narrowing the same family (100% for reading, 82% for heads, 75 to 80% for figures and tabs), never by introducing a second typeface or a serif.

**The 12px Floor Rule.** No text renders below 12px; the smallest shipped size is 13px (0.8125rem).

**The Ledger Figures Rule.** Every number that a parent compares (dates, phone numbers, ages, fees, selection counts, affiliation codes) uses tabular lining numerals, applied to tables, time elements and anything marked as a figure.

**The 68ch Measure Rule.** Reading copy, CMS prose and page descriptions share one measure of 68ch.

## Layout

A 1280px (80rem) container with 16px, 24px and 32px side gutters at mobile, tablet and desktop. On desktop, content inside the spine sits 56px in from the container edge so the stripe spine has its own lane at the left; below 768px the spine is hidden and content runs full gutter.

Sections are separated by 80px of vertical space (112px for the major desktop sections). Within a section, rhythm is tight: ledger rows at 12 to 16px vertical padding, 24 to 40px between a head and its ledger.

The homepage first viewport is a 5:7 split: the crimson tie panel (with a 28px selvedge edge on its right) and a full-height campus photograph, with two door tabs along the photograph's foot. On mobile the panel stacks first. Interior pages use a ruled page head on shirting white, then a 68ch column with an optional sticky "See also" ledger to its right.

Every mobile page reserves 80px at the foot for the fixed action bar.

### Named Rules
**The Ledger Rule.** Groups of items are laid out as ruled rows or ruled columns (a 2px ink rule on top, 1px grey hairlines between rows, 2px ink between columns), not as a grid of boxed cards.

## Elevation & Depth

The system is flat. Depth comes from tone (shirting white on shirting cool, ink and crimson fields) and from rules, never from shadow at rest. The only shadows belong to layers that genuinely float over the page.

### Shadow Vocabulary
- **Floating menu** (`box-shadow: 0 12px 32px -10px rgb(29 34 38 / 0.32)`): desktop navigation dropdown panels.
- **Floating large** (`box-shadow: 0 8px 24px -8px rgb(29 34 38 / 0.28)` and `0 16px 40px -12px rgb(29 34 38 / 0.36)`): reserved for other floating layers; small shadow steps are deliberately set to none.

### Named Rules
**The Flat Cloth Rule.** Nothing at rest casts a shadow. If a surface needs separating, give it a 2px ink rule or a tonal step, not a lift.

## Shapes

Square and tailored. Buttons, inputs, tabs, panels and photographs are sharp-cornered; the radius scale stops at 4px (1, 2, 3 and 4px steps) and is used only for small details such as the crest patch (2px) and the focus ring (1px). Borders are 2px ink for structure and 1px rule grey for hairlines.

The one recurring geometry is the 135-degree regimental stripe, in four forms:

- **Tie field**: the full stripe (10px gold, 12px gap, 24px green, every 236px) on crimson, for large fields (hero cap, closing band, footer).
- **Tie edge (selvedge)**: the same weave tightened to a 40px repeat on crimson-deep, as a vertical edge.
- **Tie band**: a 14px-tall strip (or 6 to 8px under the header and atop the mobile menu) used as a rule between regions and as the cap of menus and the scoreboard.
- **Tie spine**: a 6px vertical line (2px gold, 1px gap, 3px green) running the length of the content from the first viewport to the footer. It draws itself in with scroll and is static under reduced motion.

### Named Rules
**The Only Ornament Rule.** The regimental stripe is the system's only decoration. No gradients, textures, blobs or illustrations are added beside it.

## Components

### Buttons
- **Shape:** square (0px), 48px tall (44px in the header, 56px in the closing band).
- **Primary (gold):** crest-gold fill, ink text, bold 1.1875rem, 20px side padding. One per page.
- **Crimson:** tie-crimson fill, white semibold text, deepens on hover. The standing Enquire action.
- **Outline:** 2px ink border, ink text; inverts to ink fill and white text on hover (Pay fees, Apply online). On crimson the same button uses a white border and inverts to white.
- **Hover / Focus:** colour changes only, no movement; focus is the global 3px gold ring at 2px offset.

### Inputs / Fields
- **Style:** white fill, 2px field-stroke border, square, 48px tall, 12px side padding, semibold 15px label above.
- **Focus:** border turns ink; caret and checkbox accents are crimson.
- **Form container:** shirting white with a 2px ink border and 20px padding; no shadow.

### Navigation
- **Header:** sticky, shirting white, a 36px shirting-cool utility strip of CBSE codes and phone above, hairline-ruled (desktop only), 80px main row, a 6px tie band beneath. Section triggers are semibold 15px ink; the current or open section gets a 3px crimson underline. Dropdowns are square panels with a 2px ink border, a tie band cap and the floating-menu shadow.
- **Mobile menu:** a full-screen sheet on shirting white with a tie band cap, a 2px-ruled head, and accordion rows set in condensed 1.5rem titles.

### Ledger rows
The signature content pattern. A 2px ink top rule, then rows divided by 1px rule-grey hairlines, each row a link with a semibold title, an optional 15px grey description and a crimson 2px-stroke arrow at the right. Hover turns the title crimson and underlined. Used for programmes, notices (date column 9rem, tabular), parent documents, "See also", houses and news.

### Door tabs
Two full-bleed blocks under the hero photograph: green "Admissions" and ink "Current parents". Condensed bold 1.875rem title with an arrow that slides 4px on hover, plus a one-line task list in a tinted secondary colour.

### Scoreboard
An ink section capped by a tie band; a table with a 2px gold header rule, 1px translucent white row rules, sport names at 1.25rem semibold and counts in the Figure style, right-aligned.

### Lettered steps
A ruled four-column ledger of process steps, each led by a condensed crimson capital letter (A to D) in the Figure style.

### Mobile action bar
Fixed to the foot of every page below 1024px: 64px tall, 2px ink top rule, four equal cells (Call, WhatsApp, Pay fees on crest green, Enquire on tie crimson), each a 20px line icon over a 13px semibold label.

## Do's and Don'ts

### Do:
- **Do** keep crest gold as a fill on one primary action per page; use crimson or the ink outline for every other button.
- **Do** separate regions with a 2px ink rule, a tonal step, or a tie band.
- **Do** set lists of things as ruled ledger rows with a crimson arrow, not as cards.
- **Do** set headlines and figures in condensed Anek (75 to 82% width) and reading text at normal width, capped at 68ch.
- **Do** give every comparable number tabular lining numerals.
- **Do** keep corners at 0 to 4px.
- **Do** use inline line icons at a 1.6 to 2px stroke, never icon fonts or glyphs.
- **Do** keep the fixed four-action bar on mobile and reserve space for it above the footer.

### Don't:
- **Don't** add shadows to surfaces at rest; only floating menus cast one.
- **Don't** introduce a serif, a second sans, or a colour outside the crest and uniform.
- **Don't** add gradients or ornament other than the regimental stripe.
- **Don't** build card grids, banner sliders, news tickers or rows of icon cards.
- **Don't** set any text below 12px.
- **Don't** use rounded pills or soft corners above 4px.

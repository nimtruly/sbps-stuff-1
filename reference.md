# Reference Sites: Competitor & Inspiration Audit

> Prepared for the SBPS Dehradun revamp (see [`project-info.md`](project-info.md)).
> Audited: **13 Nov 2026**. Homepages only.

## How this was measured

- **Stack:** HTTP response headers, `<meta name="generator">`, asset paths (`wp-content`, `/sites/default/files`, `_next`, etc.), cookies (`ci_session`, `XSRF-TOKEN`, `PHPSESSID`), and library fingerprints in the HTML.
- **TTFB / HTML size:** `curl` from India (Hostinger/Mumbai-region network), compressed transfer.
- **Requests / weight / load:** the real page loaded in a Chromium browser at 1366×800. "Load >6s" means the `load` event hadn't fired 6 seconds in. Treat these as relative comparisons, not lab-grade Lighthouse numbers.
- **Design & clarity scores:** my judgement out of 10, from desktop (1440px) and mobile (390px) screenshots plus the DOM structure.
  - **Design** = visual quality, typography, imagery, modernity, polish.
  - **Clarity** = how quickly a parent finds what they need: admissions, fees, contact, disclosure.
- **Not reachable:** `doonschool.com` sits behind a Cloudflare "verify you are human" check that blocks automated access (HTTP 403). It needs a manual look; see its entry.

---

## Scoreboard

| # | Site | Type | Stack | TTFB | Reqs / Weight | Design | Clarity |
|---|---|---|---|---|---|---|---|
| 1 | [Doon Global School](https://doonglobalschool.edu.in/) | School | Hand-coded static HTML on LiteSpeed | **0.41s** | 28 / **0.48 MB** | **8** | **9** |
| 2 | [UPES](https://www.upes.ac.in/) | University | Custom (Bootstrap + jQuery + bundled assets, Azure CDN) | 0.88s | 38 / 0.24 MB* | **8** | **8** |
| 3 | [IIT Madras](https://www.iitm.ac.in/) | IIT | Drupal | 0.70s | 26 / 3.1 MB | 7.5 | 8 |
| 4 | [Graphic Era Univ.](https://geu.ac.in/) | University | Laravel (PHP) + Bootstrap | 0.92s | 41 / 0.76 MB | 7.5 | 7.5 |
| 5 | [Doon International School](https://disdehradun.com/) | School | Custom PHP + Bootstrap + Swiper | 1.03s | 60 / 1.4 MB | 7 | 6.5 |
| 6 | [The Asian School](https://www.theasianschool.net/) | School | WordPress + Elementor + Blocksy + NitroPack | 4.12s ⚠️ | lazy (NitroPack) | 6.5 | 7 |
| 7 | [Welham Boys'](https://www.welhamboys.org/) | School | Custom PHP + Bootstrap, Cloudflare | 0.47s | 72 / 2.9 MB | 6.5 | 5 |
| 8 | [The TonsBridge](https://www.thetonsbridge.com/) | School | WordPress + WPBakery + Elementor + Slider Rev 6 | 1.08s | 111 / 2.2 MB | 6.5 | 5.5 |
| 9 | [IIT Roorkee](https://www.iitr.ac.in/) | IIT | In-house CMS + web-component library | 0.49s | 64 / **8.1 MB** ⚠️ | 6 | 6.5 |
| 10 | [Le Grand Intl. (LGIS)](https://lgisdehradun.com/) | School | WordPress + JupiterX + Elementor Pro | 0.65s | 123 / 1.8 MB | 6 | 6 |
| 11 | [DIT University](https://www.dituniversity.edu.in/) | University | CodeIgniter (PHP) + Bootstrap | 0.45s | 36 / 0.45 MB | 6 | 6 |
| 12 | [IIT Delhi](https://home.iitd.ac.in/) | IIT | PHP + Bootstrap + Slider Rev | 0.40s | — | 6 | 5 |
| 13 | [IIT Bhubaneswar](https://www.iitbbs.ac.in/) | IIT | WordPress + Elementor Pro + Astra | 0.78s | 90 / 2.1 MB | 5.5 | 6 |
| 14 | [IIT Guwahati](https://www.iitg.ac.in/) | IIT | PHP + Bootstrap + Slider Rev | 0.69s | 41 / 3.4 MB | 5 | 6.5 |
| 15 | [Welham Girls'](https://www.welhamgirls.com/) | School | Custom PHP + Bootstrap, Cloudflare | 1.06s | 94 / **6.6 MB** ⚠️ | 5 | 6 |
| 16 | [Asian School blog post](https://www.theasianschool.net/blog/best-cbse-schools-in-dehradun/) | Blog/SEO | WordPress + Elementor + AIOSEO | 3.97s ⚠️ | — | 5 | 7 |
| 17 | [SGRR University](https://www.sgrru.ac.in/) | University | ASP.NET on IIS 10 | 0.69s | 25+ / 1.2 MB | 5 | 5 |
| 18 | [IIT Bombay](https://www.iitb.ac.in/) | IIT | Drupal 10 + PHP 8.4 + Varnish + Cloudflare | 0.58s | 73 JS + 93 CSS ⚠️ | n/a† | 6 |
| 19 | [St. Joseph's Academy](https://stjosephacademy.in/) | School | Custom PHP, Bootstrap 3-era | 1.22s | 32 / **3.0 MB** | 3.5 | 5 |
| 20 | [The Doon School](https://www.doonschool.com/) | School | WordPress custom theme (OMLOGIC) + jQuery + Bootstrap 4, Cloudflare | 0.62s‡ | 85 reqs‡ | 6.5 | 6 |
| — | **SBPS today** (for comparison) | School | WordPress + WPBakery + Slider Rev 5 | 0.46s | 124 / 1.8 MB | **3** | **3.5** |

\* UPES lazy-loads most of the page, so the initial weight is small.
† IIT Bombay's preloader never cleared in headless capture, so its visuals weren't scored.
‡ The Doon School was measured in the chief developer's own Chrome (warm cache, after the bot check), not with the cold headless run used for the others. Transfer weight couldn't be measured that way.

**Bottom line:** most local competitors are on WordPress page builders or ageing custom PHP, and most weigh 1.5–6 MB. **Doon Global School** is the one to beat locally: a fast, hand-built page with a clear structure. A well-built Astro site would put SBPS at or above that level.

---

# Part A: Dehradun Schools (direct competitors)

## 1. Doon Global School (DGS): https://doonglobalschool.edu.in/
**The most modern school site in the set, and the closest to what SBPS should aim for.**

| | |
|---|---|
| **Stack** | Hand-written static HTML + one `css/style.css`, LiteSpeed server. No CMS fingerprint, no jQuery, no framework. Has `manifest.json` (PWA-ready), **`/llms.txt` and `/llms-full.txt`** (AI-search optimisation), 2× JSON-LD, Open Graph. Analytics: GA4 + Snow Analytics |
| **Performance** | TTFB 0.41s · 12 KB HTML · 28 requests · ~0.48 MB. The lightest school site in the set |
| **Fonts / colours** | Inter (body) + Playfair Display (headings). Green → yellow gradient brand from the sun logo |
| **Navigation** | Skip-to-content link, CBSE affiliation number in the header, then About · Academics · Student Life · Gallery · Admissions, with clean mega-dropdowns (Vision & Mission, Chairman's/Principal's message, Mandatory Updates, Faculty, CBSE Curriculum, Board Results, Sample Papers, Safety & Security…) |
| **Homepage sections** | Hero H1 "CBSE Day & Boarding School in Dehradun" → Legacy of Excellence → **"Find the Right Fit for Your Child"** (Boarding / Day / CBSE / *How to choose a boarding school* / *Comparing schools in Dehradun*) → Academic Excellence & Youth Leadership (Primary / Middle / Senior) → Campus Facilities → Why Families Choose DGS → Life at DGS → **"Verify Reviews with Published Evidence"** → Partners → **FAQ** → Admissions Open 2027-28 |
| **Interactions** | **Audience selector on first visit**: "Hi! Tell us who you are: Parent / Student / Visitor" (glass cards), which personalises what's shown. Admission popup, floating WhatsApp button, fixed navbar |
| **Social** | Facebook, Instagram, LinkedIn, YouTube, X |
| **What's unique** | Built for search *and* AI answers (llms.txt, FAQ, comparison content); persona onboarding; trust content ("verify reviews with evidence") |
| **Weak spots** | The full-screen persona gate before any content may annoy repeat visitors (it has a "Skip"). The gradient splash feels a little "template" |
| **Steal for SBPS** | ✅ Persona entry points · ✅ FAQ + "how to choose a school" content for SEO · ✅ llms.txt · ✅ affiliation number in the header · ✅ page weight under 500 KB |
| **Design 8 · Clarity 9** | |

## 2. Doon International School (DIS): https://disdehradun.com/
| | |
|---|---|
| **Stack** | Custom PHP on nginx 1.25, Bootstrap, jQuery, Swiper, AOS (scroll animations), Lity lightbox, Prism, Google Fonts, GA4 + GTM, Cloudflare. Includes a **Univariety** widget (career-guidance platform). OG tags present |
| **Performance** | TTFB 1.03s · 60 requests · ~1.4 MB · DCL 4.7s / load 7.4s. Has a preloader |
| **Fonts / colours** | Nunito Sans, Merriweather, Merienda (script accent for the tagline), Roboto. Navy + red + gold (school blazer colours) |
| **Navigation** | Slim navy bar: About · Academics · Admissions · Student Life · Alumni · Gallery · Contact. On mobile, a "Menu" overlay plus a **fixed bottom bar: Admission Enquiry | Careers** |
| **Homepage sections** | Full-bleed portrait hero ("Inspiring Hearts To Unite, Minds To Inquire, & Hands To Serve") → awards ticker → H1 "Best CBSE Day and Boarding School in Dehradun" → Director's Welcome → Admissions → Arts → Academics → School Structure → Awards → Alumni → Visit City Campus → Happenings (Junior / Senior) → Life @ DIS → embedded Facebook feeds |
| **Interactions** | Vertical side tabs "Admission Enquiry" and "Careers", left icon rail, back-to-top, 22 carousels/sliders, AOS fade-ins |
| **Social** | Facebook (two pages: city + juniors), Instagram, YouTube |
| **What's unique** | Emotional, child-portrait-led hero photography; strong uniform/brand colour consistency |
| **Weak spots** | The hero is a 100vh photo with the headline at the bottom, so the value proposition sits below the fold on laptops. Too many sliders. Facebook iframes are heavy |
| **Steal for SBPS** | ✅ Real student portrait photography · ✅ mobile bottom bar with Enquiry · ❌ avoid the Facebook embeds |
| **Design 7 · Clarity 6.5** | |

## 3. The Asian School: https://www.theasianschool.net/
| | |
|---|---|
| **Stack** | WordPress 7.1.4 + Elementor 4.1 + Pro Elements + Blocksy theme, **NitroPack** (performance SaaS), Plesk on nginx, **PHP 7.4.16 (end-of-life since 2022)**. Plugins: dFlip 3D flipbook, Ultimate Member, Unlimited Elements, CF7 + honeypot + redirect. Analytics: GA4, GTM, Microsoft Clarity, Site Kit |
| **Performance** | **TTFB 4.1s**, the slowest server in the set. NitroPack then lazy-loads, so the first paint is small but late (FCP ~7s in our run) |
| **Fonts / colours** | Outfit (geometric sans) + a script accent ("empowering leaders of Tomorrow"). Deep navy + sky blue + red accent |
| **Navigation** | Top utility bar: phone, email, 7 social icons (incl. Pinterest & Wikipedia), "Virtual Tour" button. Main: About TAS · Admission · Events · Careers + hamburger |
| **Homepage sections** | Hero (title + cut-out students) with an **enquiry form docked right under the hero** (Name, Email, Phone, Location, Guardian, School Type, Class) → "A Premier Day-cum-Boarding School" → campus imagery → Alumni Pathways → Admissions Open 2027-28 → Start Your Enquiry |
| **Interactions** | Vertical side tabs "Admission Open 2027-28" and "Campus Tour". **Mobile bottom app bar: Home / Call Us / Mail Us / Enquire**. Virtual tour |
| **Social** | Facebook, Instagram, LinkedIn, Pinterest, X, YouTube, Wikipedia |
| **What's unique** | Lead capture first: the enquiry form sits right under the hero. Wikipedia link as a trust signal. Runs an SEO blog (see #11) |
| **Weak spots** | 4s server response; 17/57 images without alt; hero type is chunky; a lot of visual noise |
| **Steal for SBPS** | ✅ Mobile bottom app bar · ✅ enquiry form right under the hero · ✅ virtual tour · ❌ avoid slow hosting and EOL PHP |
| **Design 6.5 · Clarity 7** | |

## 4. The Doon School: https://www.doonschool.com/
| | |
|---|---|
| **Status** | Audited from the chief developer's own Chrome, which had already passed Cloudflare's bot check (headless tools and the in-app browser get HTTP 403), plus their desktop screenshots (13 Nov 2026) |
| **Stack** | **WordPress** with a custom theme built on Twenty Seventeen (`skip-link-focus-fix.js`, `navigation.js`, `global.js`), made by the agency **OMLOGIC**. WP Fastest Cache (minified bundles), Contact Form 7, the Newsletter plugin. Front-end: jQuery + Bootstrap 4 + **four slider/carousel libraries** (bxSlider, Nivo, Owl Carousel, Isotope) + Magnific Popup + WOW.js + a font-size accessibility script. **Font Awesome loaded in 3 versions** (4, 5 and 6.6), the same mistake SBPS makes. Analytics: gtag + GTM + the legacy `analytics.js` + Cloudflare Web Analytics. Has a meta description, Open Graph tags and 1 JSON-LD block |
| **Performance** | TTFB 0.62s · 118 KB HTML · **85 requests** (31 scripts, 30 images) · DCL 1.8s / load 1.8s on a warm cache in a real browser, so it's not directly comparable with the cold headless runs. Only 5 of 31 images are WebP; **17 of 31 have no alt text**. **The H1 is empty** |
| **Fonts / colours** | **EB Garamond** for the serif wordmark ("THE DOON SCHOOL") beside the torch-crest logo on a navy tab; **Poppins** for everything else; PT Sans Narrow in places. Navy + white, with **gold** for the hero headline |
| **Navigation** | Desktop has no visible menu: only a **Search** button and a **"MENU" hamburger**. The overlay holds: Parent Login · Student Login · **Fee Payment** · About Us · Admissions · Life at Doon · Events at Doon · Centres of Excellence · Latest Updates · Alumni Relations · Jobs at Doon · Contact Us. Below the header, an **"ANNOUNCEMENT" ticker** (91st Founder's Day, Important Dates at a Glance, Latest Updates) |
| **Homepage sections** | Full-bleed campus photo hero with "91 YEARS OF CHANDBAGH" in gold on a dark band → **"Why Choose Doon?"** card overlapping the hero (crest-trophy photo + 4 icon stats: 91 Years Legacy, 100% Global University Placements, 100% Experiential Learning, 5000+ Alumni) → About The Doon School (text over a faded campus photo) with Origin & History and Mission & Vision cards → **Life at Doon: 5 pillars** as tall photo cards (Academics, Pastoral, Activities & Outdoor Pursuits, Sports, Service) → News & Events carousel (Founder's Day, Technology Conclave, Scholarship Exam, Summer at Doon) → Message from the Chairman / Headmaster (navy panel + portrait) → dark footer |
| **Interactions** | Hero slider (arrow control), announcement ticker, news carousel with dots, back-to-top button |
| **Footer** | Address, main phone/email **plus a separate Admissions Office phone/email**. Useful links: Doon School Weekly, Social Service Today, Round Square, **Donor Payments, Vendor Application Form, Fee Payment**. Disclaimer that it isn't linked to other schools using "Doon" in their name |
| **Social** | Facebook, X, Instagram, YouTube, LinkedIn |
| **What's unique** | Sells heritage through numbers and place ("91 years", "Chandbagh", archival photo). Real, recent student photography in the 5-pillar cards, which is the strongest part of the page. Separate admissions contact in the footer |
| **Weak spots** | Hamburger-only nav on a 1920px desktop hides everything. **No admissions call to action** anywhere above the footer. The gold-on-dark-band hero looks dated. The faded About background hurts contrast. The news carousel's large card overlaps the small ones awkwardly. "100%" stats feel like marketing filler |
| **Steal for SBPS** | ✅ A pillars section with real student photos (for SBPS: Academics · Integrated Coaching · Defence · Sports · Co-curricular) · ✅ 4-stat proof card overlapping the hero · ✅ separate Admissions Office contact · ✅ fee-payment link in the footer · ❌ don't hide the nav on desktop · ❌ don't skip the admissions call to action |
| **Design 6.5 · Clarity 6** | Scored from the screenshots and a live look in a real browser |
| **Takeaway** | Even India's most prestigious school runs a jQuery-heavy WordPress agency build with an empty H1 and missing alt text. A clean Astro site would beat it technically |

## 5. Le Grand International School (LGIS): https://lgisdehradun.com/
| | |
|---|---|
| **Stack** | WordPress 7.1.4 + **JupiterX** theme + Elementor Pro, Smart Slider 3, Chaty Pro (multi-channel chat button), AYS Popup Box, Horizontal Scrolling Announcements, Ultimate Post, Menu Icons. Google Ads conversion tag. Hosted on **Hostinger** (same as SBPS) with its bot-check enabled |
| **Performance** | 123 requests · ~1.8 MB · DCL 9.5s / load 11s. Heavy |
| **Fonts / colours** | Poppins, Quicksand, Hind. Navy + bright yellow buttons |
| **Navigation** | Yellow top ticker listing both campuses + addresses → Home · About · Our Campuses · Curriculum · Sports · Admission · Gallery · Contact · **Download Brochure** |
| **Homepage sections** | Slider hero (school building) with "Contact Now / Know More" → H1 "Best ICSE School in Dehradun" → Welcome (sketch-style building illustration) → Physical Education & Sports (photo grid) → ICSE Curriculum (Pre-Primary / Primary cards) → Why Choose LGIS → Differentiators → Overview → Activities → Learning Program |
| **Interactions** | Slider, chat widget (Chaty), corner buttons, popup |
| **Social** | Facebook, Instagram, YouTube |
| **What's unique** | ICSE (not CBSE) positioning; multi-campus ticker; brochure download as a top-level nav item |
| **Weak spots** | Long centred paragraphs of SEO text; inconsistent type; stock-like layout; slow |
| **Steal for SBPS** | ✅ Brochure download in the nav · ✅ multi-campus awareness (relevant to the Baluni group) |
| **Design 6 · Clarity 6** | |

## 6. The TonsBridge School: https://www.thetonsbridge.com/
| | |
|---|---|
| **Stack** | WordPress + **WPBakery and Elementor together** + Slider Revolution 6.6.16 + EventON + Popup Maker + Logo Showcase + CF7 + AIOSEO. BitNinja WAF + Caddy. **86 `<script>` tags, 28 stylesheets.** Analytics: GA4, GTM, 2× Meta Pixel, Clarity. 6 JSON-LD blocks |
| **Performance** | TTFB 1.08s · 111 requests · ~2.2 MB · `load` never fired in our 17s window |
| **Fonts / colours** | Swiss 721 BT + Playfair Display. Monochrome hero photography with a **lime green** accent + yellow strip ("Experiential Learning School: Consistently Ranked #1 CBSE School in North India") |
| **Navigation** | Icon-only header (home, menu, login, search) opening a side drawer: Discover · Infrastructure/Sports · Academics · Admissions · Fee Structure · Boarding · News & Events · **Fee Payment** · Mandatory Updates · Blogs · FAQ · Contact |
| **Homepage sections** | Full-bleed B&W slider hero → ranking strip → Admission Open 2026-27 → **Video Tour** → Leaders → Achievements & Awards → News & Events (cards) → Upcoming Events (EventON calendar) |
| **Interactions** | **Right-edge sticky icon rail**: Online Registration, Brochure (PDF), Call, WhatsApp, Admissions. Event lightboxes, sliders, video |
| **Social** | Facebook, Instagram, LinkedIn, X, YouTube, WhatsApp |
| **What's unique** | Most editorial/art-directed hero of the local schools (B&W + lime type). Real events calendar. Blog + FAQ |
| **Weak spots** | Two page builders together is a maintenance nightmare. Hiding the nav behind icons hurts clarity. Very heavy |
| **Steal for SBPS** | ✅ Sticky action rail (Register / Brochure / Call / WhatsApp) · ✅ events calendar · ✅ art-directed photography · ❌ avoid the page-builder pile-up |
| **Design 6.5 · Clarity 5.5** | |

## 7. St. Joseph's Academy: https://stjosephacademy.in/
| | |
|---|---|
| **Stack** | Custom PHP (`PHPSESSID`) on Apache. **Bootstrap 3-era** front end: html5shiv, respond.js (IE8 shims), FlexSlider, prettyPhoto, animate.css, Font Awesome 4 |
| **Performance** | TTFB 1.22s · only 32 requests but **~3 MB** because the images are unoptimised. **57 of 59 images have no alt text** |
| **Fonts / colours** | Open Sans + Oswald. Maroon/red + white, the colours of the heritage building |
| **Navigation** | Header crowded with promo images (LKG 2027-28, Happy Birthday, Student/Parent Login, **Federal Bank online fee payment**) → maroon bar: Home · About · Laurels · Academics · Admission · Facilities · Activities · School Update · Guidelines · Notice Board |
| **Homepage sections** | Slider (currently a scanned FIT India certificate) → Flash News ticker → Welcome + tiles (Principal, Brothers' Congregation, SJA Epistle, Annual Magazine, Wellness) → Latest News & Events + Achievements carousels → House System (4 coloured tiles) → Campus Tour (YouTube) → Gallery → **Download our Mobile App** → Contact → Social |
| **Social** | Facebook, Instagram, YouTube |
| **What's unique** | Heritage (founded 1934 by the Patrician Brothers); dedicated mobile app; online fee payment through the bank; birthday wishes on the homepage |
| **Weak spots** | Looks about 2014. Certificate scans used as hero images. No alt text. Cluttered header |
| **Lesson for SBPS** | This is roughly where SBPS is today, so it shows exactly what to move away from |
| **Design 3.5 · Clarity 5** | |

## 8. Welham Girls' School: https://www.welhamgirls.com/
| | |
|---|---|
| **Stack** | Custom PHP (some legacy `.aspx` links) behind Cloudflare. Bootstrap, Slick 1.5.9, Jarallax (parallax), lightGallery, MeanMenu, Line Awesome icons, animate.css. reCAPTCHA, GA4, GTM |
| **Performance** | TTFB 1.06s · 94 requests · **~6.6 MB** · load ~15.8s. **47 of 49 images without alt** |
| **Fonts / colours** | Open Sans + Assistant. Sky blue + grey, with the bird logo |
| **Navigation** | Top bar (main phone, **admissions direct line**, email, socials) → About · Admission · Academics · Pastoral Care · Wider Horizons · Gallery · Welham Speaks + login icon. Deep, well-labelled submenus (Admission Process, Fee Structure, Online Application, Online Registration, Scholarships, Withdrawal, FAQs…) |
| **Homepage sections** | **Anti-fraud ticker** ("does not endorse any coaching centre…") → full-bleed campus slider → **"Important Admissions Advisory" modal** warning parents about fake agents → Sanskrit motto → alumni news headlines → WGS Calendar (dated list + PDF download) → Photo Gallery → Principal's Welcome → News & Events → **WGS Blog (student writing)** |
| **Social** | Facebook, Instagram, LinkedIn, X, YouTube |
| **What's unique** | Trust and anti-fraud messaging; student-written blog; clear "Pastoral Care" section aimed at boarding parents; calendar on the homepage |
| **Weak spots** | The modal on arrival blocks content. Images not optimised. Generic visual design for a prestige brand |
| **Steal for SBPS** | ✅ Calendar block on the homepage · ✅ student voice/blog · ✅ separate admissions phone line · ✅ "Pastoral care / day boarding" explained for parents |
| **Design 5 · Clarity 6** | |

## 9. Welham Boys' School: https://www.welhamboys.org/
| | |
|---|---|
| **Stack** | Custom PHP behind Cloudflare. Bootstrap, Slick, Owl Carousel. **SkoolReady** admissions widget (third-party admission CRM). Meta Pixel, GA4, GTM, Ahrefs analytics. JSON-LD |
| **Performance** | TTFB 0.47s · 72 requests · ~2.9 MB · load ~10.5s. Has a preloader |
| **Fonts / colours** | Noto Sans. Dark charcoal/brown sidebar, heritage photography, muted tones |
| **Navigation** | **Fixed left vertical icon rail** (About, Academics, Boarding, Beyond Classroom, Accomplishments, Admissions & Fee, Visit Alma Mater, Careers, Pay Fee, Contact), with a top bar on mobile |
| **Homepage sections** | Full-screen campus video/photo with crest → **ranking popup** (EducationWorld #1 Boys' Boarding 2026-27 + Microsoft Showcase School) → Welham My Home / Sweating It Out / Going Global → Founder story (Ms. Oliphant) → Meet WBS Alumni → Military History Seminar → Gallery → News & Events → School Calendar → Publications |
| **Interactions** | Preloader, popup, fixed social icons (left), right-edge "Register Online / Admission Enquiry" tab, notice ticker at the bottom |
| **Social** | Facebook, Instagram, LinkedIn, YouTube |
| **What's unique** | Heritage storytelling (founder, alumni, military history), which fits SBPS's defence-academy angle well |
| **Weak spots** | Popup on load; left icon rail labels are tiny; navigation isn't obvious |
| **Steal for SBPS** | ✅ Founder/heritage story · ✅ alumni spotlight · ✅ rankings/awards shown as proof · ❌ don't use a popup for rankings; put them in a strip |
| **Design 6.5 · Clarity 5** | |

## 10. The Asian School blog: "Best CBSE Schools in Dehradun"
https://www.theasianschool.net/blog/best-cbse-schools-in-dehradun/

| | |
|---|---|
| **Stack** | WordPress 6.7.11 (an older core than the main site) + Elementor 3.26 + AIOSEO + NitroPack, `writers-blogily` theme, Simple Tags, Ultimate Blocks (table of contents). Clarity, GA4 |
| **Performance** | TTFB 3.97s · 116 KB HTML |
| **What it is** | A **listicle SEO page** ranking Dehradun CBSE schools 2026-27, written by a competitor that lists itself #1. Table of contents: The Asian School, Ecole Globale, Doon International, Kasiga, Northwood, Gyan Einstein, DAV Public, Jaswant Modern, Scholars Home |
| **Layout** | Hero banner → article + ToC → sticky sidebar with an **enquiry form**, Facebook page box, admission poster, recent posts. Share buttons (FB, X, LinkedIn, WhatsApp). Side tabs + mobile bottom CTA |
| **Takeaway for SBPS** | ⚠️ **SBPS isn't on this list.** Parents search "best CBSE school in Dehradun", and competitors own that query with content. SBPS needs its own blog/guides (admissions guides, "how to choose", NEET/JEE pathway articles) and should ask to be listed on third-party roundups |
| **Design 5 · Clarity 7** | |

---

# Part B: Universities & IITs (inspiration for scale and structure)

## 11. UPES: https://www.upes.ac.in/
**The best-designed site in the set and the strongest model for an admissions funnel.**

| | |
|---|---|
| **Stack** | Custom build: Bootstrap + jQuery + Slick, bundled assets (`/assets/dist/bundle/home.styleBundle.css`), Azure CDN. 5× JSON-LD, Open Graph, Google News publisher integration. GA4, GTM, Google Ads |
| **Performance** | TTFB 0.88s · ~0.24 MB initial (aggressive lazy-loading) · 12.7k px long page |
| **Fonts / colours** | **Saira Condensed** (bold condensed display) + Roboto. Deep navy + a **multicolour brand bar** (pink/yellow/blue/teal) used as small accents on cards and underlines |
| **Navigation** | Utility bar by audience: **Students · Alumni · Parents** · Contact · About · Rankings · Blog · Applicant Login. Main: Academics · Admissions · Student Outcomes · Placements · Campus Life · Research + outlined **Apply Now** + search. Mega-menu by school → programme |
| **Homepage sections** | Hero slider (AI-first university / industry partner logos: Google, Microsoft, OpenAI, AWS, KPMG…) → **"The UPES Edge"** (7 cards: Classroom in the Hills, Master AI, Design Your Own Degree…) → **stats band over a mountain photo** (23 years · #1 · 800+ recruiters · ₹1.3 Cr) → Our Schools (colour-outlined pills) → Design-your-own-degree promo → Student Outcomes → Faculty |
| **Interactions** | Right-edge icon rail (enquire, call, brochure, chat), **sticky bottom bar "Applications open for 2027 → Apply Now"** |
| **Social** | Facebook, Instagram (many embedded posts), X, WhatsApp |
| **What's unique** | Bold condensed type + restrained colour = feels like a tech brand, not a college. Outcome-led messaging (numbers, partners) |
| **Steal for SBPS** | ✅ **Stats band** (NDA/NEET/JEE selections, years, students) · ✅ sticky "Admissions open" bottom bar · ✅ audience-based utility nav (Parents / Students / Alumni) · ✅ partner/affiliation logo strip |
| **Design 8 · Clarity 8** | |

## 12. IIT Madras: https://www.iitm.ac.in/
| | |
|---|---|
| **Stack** | **Drupal** (`/sites/default/files` aggregated CSS/JS), Owl Carousel, Google Programmable Search. GA4 |
| **Performance** | TTFB 0.70s · 26 requests · ~3.1 MB (large hero images) |
| **Fonts / colours** | Lato family. White, warm off-white section bands, **deep red accent** (red bars before section titles), dark photo overlays |
| **Navigation** | Audience bar (Students · Faculty & Staff · Alumni · Industry · Directory · Contact) + **accessibility tools** (contrast toggle, A-/A/A+, Visual Assist) + **trilingual switch (Tamil / Hindi / English)** → Academics · Research · Innovation · Research Park · Happenings · Recognitions · Campus Life · Careers · The Institute. "Give to IITM" + search |
| **Homepage sections** | Announcements ticker → hero slider ("No. 1 for 9 years running" NIRF) → **News + Recent (calendar) side by side** → Study @ IITM (Online BSc / UG / PG cards) → Research highlights + Centres (dark photo band) |
| **What's unique** | A clean editorial grid that handles a huge amount of news without clutter. Strong accessibility features |
| **Steal for SBPS** | ✅ News + Events side-by-side layout · ✅ font-size/contrast controls · ✅ Hindi toggle · ✅ red section-marker typographic detail |
| **Design 7.5 · Clarity 8** | |

## 13. Graphic Era University (GEU): https://geu.ac.in/
| | |
|---|---|
| **Stack** | **Laravel** (`XSRF-TOKEN`, `geu_session` cookies) on Apache/Ubuntu, Bootstrap, Swiper, AOS, Fancybox. **NoPaperForms** admissions CRM. reCAPTCHA, GA4, GTM. JSON-LD + OG |
| **Performance** | TTFB 0.92s · 41 requests · ~0.76 MB · 175 images, **all with alt text** |
| **Fonts / colours** | **Custom typeface "Graphic Era Sans"**. Navy + gold top stripe, maroon logotype, dark slate hero with geometric play-button motif |
| **Navigation** | Academics · Programs · Campus Life · Research + outlined **Admissions** button + search + hamburger. Big **mega-menus** (every department listed) |
| **Homepage sections** | **Video hero (Vimeo/YouTube background, muted loop)** → Departments → Campus Life → Research & Innovation → Admissions 2026 → Programs (UG/PG/Certificate/PhD) → campus video → Placements + student testimonials |
| **What's unique** | Owns its typography (custom font) and does accessibility basics properly. Video-first |
| **Steal for SBPS** | ✅ Muted background campus video (a drone shot would be ideal) · ✅ testimonials with real names/photos · ✅ alt text discipline |
| **Design 7.5 · Clarity 7.5** | |

## 14. DIT University: https://www.dituniversity.edu.in/
| | |
|---|---|
| **Stack** | **CodeIgniter** (`ci_session`) on Apache/Ubuntu, Bootstrap, jQuery loaded **twice** (local + cdnjs), Owl, Fancybox, Sass-compiled CSS. **NoPaperForms** CRM. GA4, GTM, Cloudflare |
| **Performance** | TTFB 0.45s · 36 requests · ~0.45 MB |
| **Fonts / colours** | Noto Sans + Noticia Text (serif). Royal blue gradient, yellow tabs, lime accent |
| **Navigation** | Utility bar (NIRF · iNxt ERP · Student Alerts · International · Careers · Admission 2027 · **APPLY NOW**) → About · Academics · Admissions · Campus Life · Research · Placement + search + hamburger side panel |
| **Homepage sections** | **Rankings wall hero** (QS Asia, THE World/Asia/Interdisciplinary cards with year tabs) → admissions offices (national / international) → Happenings → Honor Code / FAQs / Placements / Research / IQAC / NIRF tiles |
| **Interactions** | Fixed header, side menu, WhatsApp float |
| **Steal for SBPS** | ✅ Recognition cards (CBSE affiliation, awards) shown as proof · ❌ don't make the whole hero a wall of logos |
| **Design 6 · Clarity 6** | |

## 15. SGRR University: https://www.sgrru.ac.in/
| | |
|---|---|
| **Stack** | **ASP.NET on IIS 10** (Microsoft stack), Bootstrap, jQuery, Swiper, Slick, Font Awesome. GA4, GTM |
| **Performance** | TTFB 0.69s · 270 KB HTML · ~1.2 MB · 36 images without alt. Hero slider failed to render in headless capture |
| **Fonts / colours** | Metropolis. Red + navy + periwinkle utility bar. Seasonal **falling-snow effect** overlay |
| **Navigation** | Top announcement bar (PhD entrance) → socials + utility (IQAC, Placement, Research, Career, **Public Disclosure**, UGC e-Samadhan, Exam Cell, ERP Login) → logo + **toll-free admission helpline 1800-120-102-102** + Register Now + Fee 2026-27 → About · Programs · Admission · Academics · Research · Student Life · Others · Contact |
| **Homepage sections** | Hero → "Legacy of excellence since 1952" + **animated counters** (500+ faculty, 125+ programmes, 10,000+ students, 100,000+ alumni) → approvals logo strip (UGC, Ministry of Health, ICAR, NABH…) → programme cards → Explore Diverse Programs (school list → course list) |
| **Steal for SBPS** | ✅ Helpline number given prominence in the header · ✅ approvals/affiliations logo strip · ✅ animated counters · ❌ no gimmicks like snow |
| **Design 5 · Clarity 5** | |

## 16. IIT Bombay: https://www.iitb.ac.in/
| | |
|---|---|
| **Stack** | **Drupal 10** on PHP 8.4, nginx + **Varnish cache** + Cloudflare. Bootstrap, jQuery, Slick, Font Awesome |
| **Performance** | TTFB 0.58s · 332 KB HTML · **73 scripts + 93 stylesheets** (Drupal aggregation off or per-component). Preloader blocks first paint in headless browsers |
| **Fonts** | Segoe UI / Arial (system fonts) |
| **Navigation / sections** | No H1. Sections: Announcements · Events · Ministry of Education / Government Updates · stats (Faculty, Students, Publications, Patents, Projects). Footer: Code of Conduct, Gymkhana, Placements, Wellness Centre, HR, Holiday List, Alumni, Donate, CSR, Vendors |
| **Social** | Facebook, LinkedIn, YouTube, X |
| **Takeaway** | An enterprise CMS doesn't automatically mean good front-end performance. Varnish + Cloudflare make the HTML fast, but the asset count is very high |
| **Design n/a · Clarity 6** | |

## 17. IIT Delhi: https://home.iitd.ac.in/
| | |
|---|---|
| **Stack** | PHP on Apache, Bootstrap, jQuery, Owl, **Slider Revolution**, Font Awesome. GA4 |
| **Performance** | TTFB 0.40s · 278 KB HTML |
| **Notable interaction** | **First-visit guided tour overlay**: "Welcome to the new website, take a quick tour" (typewriter animation, Let's Go / Skip Tour) on a maroon gradient with an architectural line-art motif |
| **Content** | Very announcement-heavy (EoIs, admissions portals, brochures, internships, research impact report), bilingual title (English + Hindi) |
| **Takeaway** | A guided tour is a nice way to introduce a redesign, but it's another gate in front of content |
| **Design 6 · Clarity 5** | |

## 18. IIT Guwahati: https://www.iitg.ac.in/
| | |
|---|---|
| **Stack** | PHP on a custom-named server (`iitgserver`), Bootstrap, jQuery, Owl, Slider Revolution. GA4 |
| **Performance** | TTFB 0.69s · 41 requests · ~3.4 MB · **49 of 50 images without alt** |
| **Fonts / colours** | Lato. Bright red top bar, white, brown/gold buttons |
| **Navigation** | Red top bar: **DONATE**, A-/A/A+, **हिन्दी**, IITG Email, **Screen Reader** link, socials → search box + G20/Azadi logos → Institute · Academics · Students · Faculty & Staff · Research · Industrial Interaction · Alumni · Resources |
| **Homepage sections** | Convocation hero → Latest News ticker → **tabs: Announcement / Recruitment** → Upcoming Events (date tiles) → Welcome → Newsletter (*Vijñapti*) → Videos → Director → Awards + **counters (8,434 students · 485 faculty · 583 staff)** → Research → **Scholarly metrics** (31,167 publications, 554,829 citations) |
| **Steal for SBPS** | ✅ Announcement/Recruitment tabs (fits "Notices / Careers") · ✅ dated event tiles · ✅ newsletter archive |
| **Design 5 · Clarity 6.5** | |

## 19. IIT Roorkee: https://www.iitr.ac.in/
| | |
|---|---|
| **Stack** | nginx/Ubuntu, **in-house CMS** with a component library served from `cmsredesign.channeli.in` (separate JS files per component: tabs, slider, carousel, image-card, search, menu…). GA4 |
| **Performance** | TTFB 0.49s · 64 requests · **~8.1 MB**, the heaviest in the set · 261 images (87 without alt) · no H1/H2 in markup |
| **Fonts / colours** | Nunito Sans + Lato. White, blue accents, light grey bands |
| **Navigation** | Utility (Contact · Directory · iConnect · Webmail · A-/A/A+ · contrast · हिन्दी/Eng · search) → Institute · Admissions · Administration · Academics · Campus Life · Departments · Research · Careers · Placements · Resources |
| **Homepage sections** | Convocation slider → **persona cards: For Students / For Faculty / For Visitors** ("find all resources in one place") → Recent Achievements (card grid) → … |
| **Steal for SBPS** | ✅ Persona cards (Parents / Students / Visitors), a gentler version of DGS's gate · ❌ don't ship 8 MB of images |
| **Design 6 · Clarity 6.5** | |

## 20. IIT Bhubaneswar: https://www.iitbbs.ac.in/
| | |
|---|---|
| **Stack** | **WordPress 7.1.4 + Elementor Pro + Astra theme**, Essential Addons, Dynamic Visibility, EmbedPress, **GTranslate**, **Pojo Accessibility**, **Mobile Bottom Menu**, WPFront Scroll-Top. Site Kit, reCAPTCHA |
| **Performance** | TTFB 0.78s · 90 requests · ~2.1 MB · 25 images without alt |
| **Fonts / colours** | Source Sans Pro. Sky blue header, **navy + bright yellow** blocks |
| **Navigation** | Audience bar (Students · Faculty · Staff · Alumni · Directory) → Home · People · Research · Academics · Outreach · Placements · Jobs · Central Library · Quick Links + search. Scrolling news ticker |
| **Homepage sections** | News & Updates carousel + Upcoming Events → Director's Message (yellow band) → **Schools, Centres & Units as navy icon tiles** → Programmes Offered |
| **Takeaway** | Shows that an IIT can run on plain WordPress + Elementor. It works, but you get plugin sprawl, which is the same trap SBPS is in now |
| **Design 5.5 · Clarity 6** | |

---

# Part C: Patterns & What SBPS Should Do

## Tech landscape across the 20 sites
| Stack | Sites |
|---|---|
| WordPress + page builder (Elementor/WPBakery) | Asian School (+blog), TonsBridge, LGIS, IIT Bhubaneswar, **SBPS today** |
| Custom PHP (plain / CodeIgniter / Laravel) | DIS, St. Joseph's, Welham Girls, Welham Boys, DIT (CodeIgniter), GEU (Laravel), IIT Delhi, IIT Guwahati |
| Drupal | IIT Madras, IIT Bombay (Drupal 10) |
| ASP.NET | SGRR University |
| Custom / in-house | UPES, IIT Roorkee |
| Hand-coded static | **Doon Global School** (the fastest school site) |
| Modern JS framework (Astro/Next/Nuxt) | **None.** Building SBPS in Astro would be a real technical step ahead of every local competitor |

## Features that show up again and again (by how common they are)
1. **Admissions-open CTA everywhere:** header button, side tab, sticky bottom bar, popup (nearly all)
2. **Enquiry form high on the page** (Asian School, DGS, LGIS)
3. **Floating WhatsApp / call / chat** (DGS, DIT, TonsBridge, LGIS, UPES, Asian)
4. **News ticker / announcements bar** (DIS, St. Joseph's, Welham G/B, all IITs)
5. **Stats/counters band** (UPES, SGRRU, IIT Guwahati)
6. **Rankings & awards as proof** (Welham Boys, TonsBridge, DIT, IIT Madras)
7. **Mandatory disclosure / public disclosure** linked in the nav (DGS, TonsBridge, SGRRU, DIS)
8. **Online fee payment link** (St. Joseph's, TonsBridge, Welham Boys)
9. **Events calendar on the homepage** (Welham G/B, TonsBridge, IIT Guwahati, IIT Madras)
10. **Audience/persona navigation** (DGS, UPES, IIT Madras, IIT Roorkee, IIT Bhubaneswar)
11. **Accessibility & language tools:** A-/A+, contrast, Hindi (IITs)
12. **Virtual / video tour** (Asian, TonsBridge, St. Joseph's, GEU)
13. **Mobile bottom app bar** (Asian, DIS, IIT Bhubaneswar)
14. **Brochure download** (LGIS, TonsBridge, UPES)
15. **Blog / FAQ / SEO content** (DGS, Asian, TonsBridge, UPES, Welham Girls)

## Common mistakes to avoid
- ❌ Popups and splash gates on arrival (Welham G/B, DGS, IIT Delhi): put that information in a strip instead
- ❌ 3–8 MB homepages (IIT Roorkee, Welham Girls, IIT Guwahati, St. Joseph's)
- ❌ Missing alt text (most sites)
- ❌ Several page builders or slider plugins stacked together (TonsBridge)
- ❌ End-of-life PHP and slow servers (Asian School: PHP 7.4, 4s TTFB)
- ❌ Facebook page embeds and multiple full YouTube iframes on the homepage
- ❌ Hiding the navigation behind icons (TonsBridge, Welham Boys)

## Recommended "best-of" blend for SBPS
| Take from | What |
|---|---|
| **UPES** | Overall visual language: bold condensed display type, restrained palette, stats band, sticky "Admissions open" bar, audience utility nav |
| **Doon Global School** | Speed (< 500 KB), FAQ + "how to choose" content, llms.txt, affiliation number in the header, structured disclosure |
| **IIT Madras** | News + events editorial layout, accessibility controls, Hindi toggle |
| **Asian School / DIS** | Mobile bottom app bar (Home · Call · WhatsApp · Enquire), enquiry form right under the hero |
| **TonsBridge** | Sticky action rail, events calendar, art-directed photography |
| **Welham Boys / Girls** | Heritage & founder story, alumni spotlight, calendar, student voice/blog, separate admissions phone line |
| **GEU** | Muted campus video hero, testimonials with real people, alt text on every image |
| **IIT Roorkee** | Persona cards ("I'm a Parent / Student / Visitor") as a soft alternative to a splash gate |

## SBPS-specific opportunities these sites reveal
1. **Coaching + school integration (NEET/JEE/NDA via the Baluni group) is a differentiator no competitor offers this strongly.** Lead with an outcomes/selection stats band.
2. **The defence pathway** (NDA, Baluni Defence Academy) lines up with Welham Boys' military-history storytelling. It's a strong emotional hook.
3. **SEO gap:** SBPS doesn't appear in competitor "best CBSE schools in Dehradun" content. It needs its own guides and FAQ.
4. **Performance gap:** almost every competitor is slow. A sub-1-second Astro site is a real, measurable advantage.

---
*Screenshots used for this audit (desktop 1440px + mobile 390px) are saved in the session scratchpad and can be added to the repo as `/research/screens/` if you want them versioned.*

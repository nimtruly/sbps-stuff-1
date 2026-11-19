# Content gaps for the school office

Nothing below is shown on the live site until the school confirms it. Items marked `verified: false` in `apps/web/src/content` are hidden in production builds.

## P0: needed before launch

| Item | Where | What is needed |
|---|---|---|
| RTE recognition certificate | `/disclosure/` | The certificate on file covers 01.04.2021–31.03.2026 and has expired. The site says "Validity ended 31 March 2026". Upload the renewed certificate and set its new `validTo`. |
| Disclosure staff figures (Appendix IX, section D) | `src/content/disclosureDocs/staff-*.json` | Total teachers (PGT/TGT/PRT), teacher–section ratio, special educator, counsellor and wellness teacher. Hidden until supplied. Section D is a CBSE requirement. |
| Disclosure infrastructure figures (Appendix IX, section E) | `src/content/disclosureDocs/infra-*.json` | Campus area, number and size of classrooms and labs, internet facility, toilets, and the CBSE inspection video link. Hidden until supplied. Section E is a CBSE requirement. |
| CBSE affiliation number | Header, footer, disclosure | The logo says 3530479 / School Code 81702; old page markup said 3530455. The site uses 3530479 / 81702. Confirm on CBSE SARAS. |
| Fee figures for 2026–27 | `/admissions/fees/` | The site links to `FEE-1.pdf` and lists fee components only. Amounts in `src/content/feeItems/` are 2025–26 and stay hidden until confirmed. |
| Refund policy | `/refund-policy/` | The site states only what the old fee page said (registration and admission fees non-refundable; caution money refundable). The school must approve a full refund policy, especially before Razorpay goes live. |
| Privacy policy | `/privacy/` | Describes what the website collects. The school should name a contact for data requests (DPDP Act 2023) and set retention periods. |

## P1

| Item | Where | What is needed |
|---|---|---|
| National Games total | Homepage, sports, news | The old homepage said "20 sbpians"; the old list page sums to 23 (fencing 10, badminton 5, archery 3, kalaripayattu 3, shooting 2). The site shows the per-sport list without a total. Confirm the numbers. |
| Online fee payment | `/parents/pay-fees/` | Online payment is switched off. Create Razorpay Payment Pages (needs school KYC) and add their URLs to `siteSettings.paymentLinks`. Never publish bank account details unless the accounts office supplies them. |
| House colours | `src/content/houses/*.json` | The `colorHex` values came from the build agent, not the school, and are not shown. Supply the real house colours if they exist. |
| Principal's photo | `/about/leadership/` | No portrait on file; initials are shown. |
| Leader portraits | `public/images/leader-*.webp` | Only 150px images exist from the old site. Supply larger portraits. |
| Vector crest | Header, footer | The crest is cropped from a 466×98 JPG. Supply the original vector or a large PNG. |
| Job openings | `/careers/` | No vacancies are listed. Add real openings to `src/content/jobs/` when there are some. |
| Notice reference numbers | Notices | Not shown. If the office numbers its circulars, add the official number to each notice. |
| Notices | `/notices/` | Only one notice exists (National Games). Office staff should publish current circulars through Sanity. |

## P2

| Item | Where | What is needed |
|---|---|---|
| Photography | Whole site | 14 photos from the old site are used. A proper shoot of classrooms, labs, sports and day boarding would help. |
| Secondary emails | Contact | Old site also used `sbpsddoon@gmail.com` and `celladmission63@gmail.com`. Only `info@sbpsdoon.com` is shown. |
| Map coordinates | JSON-LD | `siteSettings.geo` is unverified. Drop a pin on the school gate. |
| Missing old media | `docs/content-export/media-index.csv` | The old media listing returned 462 of about 812 files. Old image links under `/wp-content/uploads/` now return 404 unless the file was carried over. |
| Student TC PDFs | Not migrated | The old site published students' transfer certificates by name. These were deliberately not carried over (personal data). Remove them from the old host too. |

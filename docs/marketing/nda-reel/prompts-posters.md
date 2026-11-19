# NDA reel: realistic posters and flyers (fixed brand)

Every poster, brochure and flyer uses ONE fictional academy: **RANNVEER DEFENCE CLASSES**, with the same logo, colours and text. A web search on 19 Nov 2026 found no real academy with this name.

This replaces PO1–PO5 in `prompts.md` for the props. That file is unchanged; use this one for posters. The earlier V2+ rule of "no name on the flyers" is dropped, so that every prop shows the same name.

## How to keep the name consistent

1. **Generate PL0 (the logo master) first.** Pick the version with the cleanest spelling.
2. **Attach that logo image as a reference** when you generate PP1–PP5 (in Flow or Gemini, add it as an image input). `storyboard/generate_posters.py` does this automatically.
3. **Use Nano Banana Pro** (`gemini-3-pro-image-preview`). It renders text far better than the standard model.
4. **Generate 2–3 takes** of each item and keep the one with the correct spelling.
5. **Fix any last typo in Canva:** cover it with the logo master and retype the name in a matching font.
6. **Blur the phone number** in the edit. It is a placeholder (98XXX XXXXX).

## Prompts

### PL0: Logo master (generate first)
Aspect ratio: 1:1 · Attach as reference: none

```text
Clean flat logo artwork centred on a plain white background: the navy-blue shield with gold outline, gold eagle wing and gold star, and under it the name "RANNVEER DEFENCE CLASSES" in bold condensed navy capitals, with a thin gold rule beneath. Vector-clean, sharp edges, no shadows, no mockup. The only text is "RANNVEER DEFENCE CLASSES". Brand (keep identical): the institute name is exactly "RANNVEER DEFENCE CLASSES", spelled R-A-N-N-V-E-E-R, in bold condensed white or navy sans-serif capitals. Logo: a navy-blue heraldic shield with a thin gold outline, containing a single gold eagle wing and a small gold five-point star above it; no flags, rifles, swords or real military emblems. Brand colours: navy blue #0B2545, crimson red #C8102E, gold #F2B705 and white. Spell every word exactly as quoted. The only readable text is the quoted text listed here; any other small print must be unreadable blurred lines.
```

### PP1: A2 wall poster on a notice board (S2-V1, S3-V1)
Aspect ratio: 2:3 · Attach as reference: PL0

```text
Photorealistic photograph of a real printed item, as shot on a phone camera: true paper texture, slight print halftone, realistic lighting and soft shadows, tiny imperfections such as a crease, curled corner or staple. Not a digital mockup, not an illustration. A large A2 coaching-institute advertisement poster pinned with four pushpins to a cork notice board in a school corridor, photographed straight on in daylight. Typical Indian coaching-poster layout: navy top band with the logo and the name "RANNVEER DEFENCE CLASSES"; a big crimson headline "NDA · CDS · SSB"; a gold ribbon "ADMISSION OPEN 2027"; a photo strip of four smiling Indian teenage students in white shirts holding books (fictional people); three icons with labels "Expert Faculty", "Daily Tests", "Physical Training"; a white footer with "Dehradun" and "Call: 98XXX XXXXX". Glossy paper with a light reflection, one corner slightly curled. Brand (keep identical): the institute name is exactly "RANNVEER DEFENCE CLASSES", spelled R-A-N-N-V-E-E-R, in bold condensed white or navy sans-serif capitals. Logo: a navy-blue heraldic shield with a thin gold outline, containing a single gold eagle wing and a small gold five-point star above it; no flags, rifles, swords or real military emblems. Brand colours: navy blue #0B2545, crimson red #C8102E, gold #F2B705 and white. Spell every word exactly as quoted. The only readable text is the quoted text listed here; any other small print must be unreadable blurred lines.
```

### PP2: Tri-fold brochure, flat-lay (S2-V1, S3-V1)
Aspect ratio: 4:3 · Attach as reference: PL0

```text
Photorealistic photograph of a real printed item, as shot on a phone camera: true paper texture, slight print halftone, realistic lighting and soft shadows, tiny imperfections such as a crease, curled corner or staple. Not a digital mockup, not an illustration. An opened glossy tri-fold brochure lying on a plain wooden table, shot from above in soft window light. Left panel: navy with the logo and "RANNVEER DEFENCE CLASSES". Middle panel: white with the heading "Courses: NDA / CDS / SSB" and a photo of Indian teenage cadets in white polo shirts running on a training ground. Right panel: crimson with the heading "Hostel Available" and "Call: 98XXX XXXXX". Real fold lines and a slight gloss glare. Brand (keep identical): the institute name is exactly "RANNVEER DEFENCE CLASSES", spelled R-A-N-N-V-E-E-R, in bold condensed white or navy sans-serif capitals. Logo: a navy-blue heraldic shield with a thin gold outline, containing a single gold eagle wing and a small gold five-point star above it; no flags, rifles, swords or real military emblems. Brand colours: navy blue #0B2545, crimson red #C8102E, gold #F2B705 and white. Spell every word exactly as quoted. The only readable text is the quoted text listed here; any other small print must be unreadable blurred lines.
```

### PP3: A5 flyer, crimson (V2 onwards)
Aspect ratio: 2:3 · Attach as reference: PL0

```text
Photorealistic photograph of a real printed item, as shot on a phone camera: true paper texture, slight print halftone, realistic lighting and soft shadows, tiny imperfections such as a crease, curled corner or staple. Not a digital mockup, not an illustration. A single A5 printed flyer lying on a dusty concrete step, shot from above. Crimson background, the logo and "RANNVEER DEFENCE CLASSES" in white at the top, a big gold headline "DEFENCE COACHING", the white text "ADMISSION OPEN", a photo of an Indian teenage boy in a white polo shirt vaulting a white steel bar, and "Call: 98XXX XXXXX" at the bottom. Thin glossy paper, one soft crease across the middle. Brand (keep identical): the institute name is exactly "RANNVEER DEFENCE CLASSES", spelled R-A-N-N-V-E-E-R, in bold condensed white or navy sans-serif capitals. Logo: a navy-blue heraldic shield with a thin gold outline, containing a single gold eagle wing and a small gold five-point star above it; no flags, rifles, swords or real military emblems. Brand colours: navy blue #0B2545, crimson red #C8102E, gold #F2B705 and white. Spell every word exactly as quoted. The only readable text is the quoted text listed here; any other small print must be unreadable blurred lines.
```

### PP4: A5 flyer, navy (V2 onwards)
Aspect ratio: 2:3 · Attach as reference: PL0

```text
Photorealistic photograph of a real printed item, as shot on a phone camera: true paper texture, slight print halftone, realistic lighting and soft shadows, tiny imperfections such as a crease, curled corner or staple. Not a digital mockup, not an illustration. A single A5 printed flyer lying on a light wooden desk, shot from above in daylight. Navy-blue background, the logo and "RANNVEER DEFENCE CLASSES" in white at the top, a white headline "NDA · SSB COACHING", a gold diagonal ribbon "LIMITED SEATS", a photo of Indian teenage students in white polo shirts climbing a rope cargo net, and "Call: 98XXX XXXXX" at the bottom. Glossy paper, small curl at one corner. Brand (keep identical): the institute name is exactly "RANNVEER DEFENCE CLASSES", spelled R-A-N-N-V-E-E-R, in bold condensed white or navy sans-serif capitals. Logo: a navy-blue heraldic shield with a thin gold outline, containing a single gold eagle wing and a small gold five-point star above it; no flags, rifles, swords or real military emblems. Brand colours: navy blue #0B2545, crimson red #C8102E, gold #F2B705 and white. Spell every word exactly as quoted. The only readable text is the quoted text listed here; any other small print must be unreadable blurred lines.
```

### PP5: A5 flyer, white and gold (V2 onwards)
Aspect ratio: 2:3 · Attach as reference: PL0

```text
Photorealistic photograph of a real printed item, as shot on a phone camera: true paper texture, slight print halftone, realistic lighting and soft shadows, tiny imperfections such as a crease, curled corner or staple. Not a digital mockup, not an illustration. A single A5 printed flyer lying on a grey stone bench, shot from above. White background with a gold border, the logo and "RANNVEER DEFENCE CLASSES" in navy at the top, a crimson headline "SAINIK SCHOOL & NDA FOUNDATION", the navy text "NEW BATCH", a photo of Indian students in a classroom writing a test, and "Call: 98XXX XXXXX" at the bottom. Matte paper, a faint fold mark. Brand (keep identical): the institute name is exactly "RANNVEER DEFENCE CLASSES", spelled R-A-N-N-V-E-E-R, in bold condensed white or navy sans-serif capitals. Logo: a navy-blue heraldic shield with a thin gold outline, containing a single gold eagle wing and a small gold five-point star above it; no flags, rifles, swords or real military emblems. Brand colours: navy blue #0B2545, crimson red #C8102E, gold #F2B705 and white. Spell every word exactly as quoted. The only readable text is the quoted text listed here; any other small print must be unreadable blurred lines.
```

### PP6: Flyers fanned in the parent's hand (prop shot for P26)
Aspect ratio: 9:16 · Attach as reference: PP3,PP4,PP5

```text
Photorealistic photograph of a real printed item, as shot on a phone camera: true paper texture, slight print halftone, realistic lighting and soft shadows, tiny imperfections such as a crease, curled corner or staple. Not a digital mockup, not an illustration. Top-down close-up of an Indian woman's hands, a thin gold bangle on one wrist and the edge of a printed peach dupatta visible, fanning out three A5 flyers of the same institute: one crimson, one navy, one white with a gold border. Each shows the same navy shield logo and the name "RANNVEER DEFENCE CLASSES". A dusty campus path is softly blurred below. Natural daylight, shallow depth of field. Brand (keep identical): the institute name is exactly "RANNVEER DEFENCE CLASSES", spelled R-A-N-N-V-E-E-R, in bold condensed white or navy sans-serif capitals. Logo: a navy-blue heraldic shield with a thin gold outline, containing a single gold eagle wing and a small gold five-point star above it; no flags, rifles, swords or real military emblems. Brand colours: navy blue #0B2545, crimson red #C8102E, gold #F2B705 and white. Spell every word exactly as quoted. The only readable text is the quoted text listed here; any other small print must be unreadable blurred lines.
```


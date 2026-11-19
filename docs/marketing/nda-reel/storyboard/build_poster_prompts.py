"""Build realistic, brand-consistent poster and flyer prompts for the NDA reel props.

All props use ONE fixed fictional academy: RANNVEER DEFENCE CLASSES, with the
same logo, colours, fonts and text everywhere. Every prompt is self-contained.

Writes ../prompts-posters.md and posters.json (for generate_posters.py).
Does not change any other file.

Run: python build_poster_prompts.py
"""
import json
from pathlib import Path

HERE = Path(__file__).parent

NAME = "RANNVEER DEFENCE CLASSES"
BRAND = (
    'Brand (keep identical): the institute name is exactly "RANNVEER DEFENCE CLASSES", spelled R-A-N-N-V-E-E-R, '
    "in bold condensed white or navy sans-serif capitals. Logo: a navy-blue heraldic shield with a thin gold outline, containing a "
    "single gold eagle wing and a small gold five-point star above it; no flags, rifles, swords or real military emblems. Brand colours: "
    "navy blue #0B2545, crimson red #C8102E, gold #F2B705 and white."
)
TEXT_RULE = ("Spell every word exactly as quoted. The only readable text is the quoted text listed here; any other small print must be "
             "unreadable blurred lines.")
REAL = ("Photorealistic photograph of a real printed item, as shot on a phone camera: true paper texture, slight print halftone, "
        "realistic lighting and soft shadows, tiny imperfections such as a crease, curled corner or staple. Not a digital mockup, not an illustration.")

ITEMS = [
 ("PL0", "Logo master (generate first)", "1:1", None,
  "Clean flat logo artwork centred on a plain white background: the navy-blue shield with gold outline, gold eagle wing and gold star, "
  'and under it the name "RANNVEER DEFENCE CLASSES" in bold condensed navy capitals, with a thin gold rule beneath. Vector-clean, sharp edges, '
  "no shadows, no mockup. The only text is \"RANNVEER DEFENCE CLASSES\"."),
 ("PP1", "A2 wall poster on a notice board (S2-V1, S3-V1)", "2:3", "PL0",
  "A large A2 coaching-institute advertisement poster pinned with four pushpins to a cork notice board in a school corridor, photographed straight on in "
  "daylight. Typical Indian coaching-poster layout: navy top band with the logo and the name \"RANNVEER DEFENCE CLASSES\"; a big crimson headline "
  "\"NDA · CDS · SSB\"; a gold ribbon \"ADMISSION OPEN 2027\"; a photo strip of four smiling Indian teenage students in white shirts holding books "
  "(fictional people); three icons with labels \"Expert Faculty\", \"Daily Tests\", \"Physical Training\"; a white footer with \"Dehradun\" and "
  "\"Call: 98XXX XXXXX\". Glossy paper with a light reflection, one corner slightly curled."),
 ("PP2", "Tri-fold brochure, flat-lay (S2-V1, S3-V1)", "4:3", "PL0",
  "An opened glossy tri-fold brochure lying on a plain wooden table, shot from above in soft window light. Left panel: navy with the logo and "
  "\"RANNVEER DEFENCE CLASSES\". Middle panel: white with the heading \"Courses: NDA / CDS / SSB\" and a photo of Indian teenage cadets in white polo "
  "shirts running on a training ground. Right panel: crimson with the heading \"Hostel Available\" and \"Call: 98XXX XXXXX\". Real fold lines and a "
  "slight gloss glare."),
 ("PP3", "A5 flyer, crimson (V2 onwards)", "2:3", "PL0",
  "A single A5 printed flyer lying on a dusty concrete step, shot from above. Crimson background, the logo and \"RANNVEER DEFENCE CLASSES\" in white "
  "at the top, a big gold headline \"DEFENCE COACHING\", the white text \"ADMISSION OPEN\", a photo of an Indian teenage boy in a white polo shirt "
  "vaulting a white steel bar, and \"Call: 98XXX XXXXX\" at the bottom. Thin glossy paper, one soft crease across the middle."),
 ("PP4", "A5 flyer, navy (V2 onwards)", "2:3", "PL0",
  "A single A5 printed flyer lying on a light wooden desk, shot from above in daylight. Navy-blue background, the logo and \"RANNVEER DEFENCE CLASSES\" "
  "in white at the top, a white headline \"NDA · SSB COACHING\", a gold diagonal ribbon \"LIMITED SEATS\", a photo of Indian teenage students in white "
  "polo shirts climbing a rope cargo net, and \"Call: 98XXX XXXXX\" at the bottom. Glossy paper, small curl at one corner."),
 ("PP5", "A5 flyer, white and gold (V2 onwards)", "2:3", "PL0",
  "A single A5 printed flyer lying on a grey stone bench, shot from above. White background with a gold border, the logo and \"RANNVEER DEFENCE CLASSES\" "
  "in navy at the top, a crimson headline \"SAINIK SCHOOL & NDA FOUNDATION\", the navy text \"NEW BATCH\", a photo of Indian students in a classroom "
  "writing a test, and \"Call: 98XXX XXXXX\" at the bottom. Matte paper, a faint fold mark."),
 ("PP6", "Flyers fanned in the parent's hand (prop shot for P26)", "9:16", "PP3,PP4,PP5",
  "Top-down close-up of an Indian woman's hands, a thin gold bangle on one wrist and the edge of a printed peach dupatta visible, fanning out three "
  "A5 flyers of the same institute: one crimson, one navy, one white with a gold border. Each shows the same navy shield logo and the name "
  "\"RANNVEER DEFENCE CLASSES\". A dusty campus path is softly blurred below. Natural daylight, shallow depth of field."),
]

# Print-ready flat artwork (soft copies to print), matching the approved PP1, PP3, PP4 layouts
FLAT = ("Flat 2D print-ready graphic design artwork, the finished poster file itself seen perfectly front-on. The design fills the entire "
        "image edge to edge (full bleed) with straight edges: no table, wall, pins, hands or background surface, no perspective, no shadows, "
        "no paper texture, no folds, no glare. Crisp, vector-sharp lettering, clean print colours, high resolution, safe margins of empty "
        "space around all text.")
PRINT = [
 ("PF3", "Print file: A5 flyer, crimson", "2:3", "PL0", "A5 · 148 × 210 mm",
  "Layout from top to bottom on a solid crimson red #C8102E background. Top left: the navy shield logo with gold outline, gold eagle wing and "
  "gold star; to its right, the name in bold white capitals on three stacked lines: \"RANNVEER\", \"DEFENCE\", \"CLASSES\". Centre: a huge gold "
  "#F2B705 headline on two lines, \"DEFENCE\" and \"COACHING\", in heavy rounded sans-serif. Under it, white capitals \"ADMISSION OPEN\". Below: a "
  "rectangular photo with a thin white border showing an Indian teenage boy in a white polo shirt and navy track pants swinging over a white steel "
  "bar on a green school ground with trees behind. Bottom centre: white bold text \"Call: 98XXX XXXXX\". Nothing else."),
 ("PF4", "Print file: A5 flyer, navy", "2:3", "PL0", "A5 · 148 × 210 mm",
  "Layout from top to bottom on a solid navy blue #0B2545 background. Top: the navy shield logo with gold outline, gold eagle wing and gold star, "
  "and to its right the name in white: \"RANNVEER\" large on the first line and \"DEFENCE CLASSES\" smaller on the second line. Centre: a huge "
  "white two-line headline \"NDA · SSB\" and \"COACHING\" in heavy rounded sans-serif. Below: a rectangular photo with a thin white border showing "
  "six Indian teenage students in white polo shirts and navy track pants climbing a thick rope cargo net outdoors; a gold diagonal ribbon across "
  "the photo's bottom-right corner reads \"LIMITED SEATS\" in navy capitals. Bottom centre: white bold text \"Call: 98XXX XXXXX\". Nothing else."),
 ("PF1", "Print file: A2 poster, white", "3:4", "PL0", "A2 · 420 × 594 mm",
  "Layout from top to bottom on a white background. Top: a full-width navy blue #0B2545 band with the navy shield logo (gold outline, gold eagle "
  "wing, gold star) on the left and the name in bold white capitals on the right on two lines: \"RANNVEER\" and \"DEFENCE CLASSES\". Below the "
  "band: a huge crimson #C8102E condensed headline \"NDA · CDS · SSB\". Under it: a gold #F2B705 ribbon banner with folded ends reading \"ADMISSION "
  "OPEN 2027\" in navy capitals. Middle: a wide photo of four smiling Indian teenage students, two boys and two girls, in white school shirts "
  "holding books in a bright school corridor. Below the photo: three icons in a row, navy line icons with crimson accents (a teacher at a "
  "whiteboard, a clipboard with ticks, a running figure), each with a navy label underneath: \"Expert Faculty\", \"Daily Tests\", \"Physical "
  "Training\". A thin navy rule, then a footer with \"Dehradun\" on the left and \"Call: 98XXX XXXXX\" on the right in bold navy. Nothing else."),
]


def prompt(body):
    return " ".join([REAL if body and "logo artwork" not in body else "", body, BRAND, TEXT_RULE]).strip()


def main():
    data, md = [], [
        "# NDA reel: realistic posters and flyers (fixed brand)",
        "",
        f"Every poster, brochure and flyer uses ONE fictional academy: **{NAME}**, with the same logo, colours and text. "
        "A web search on 19 Nov 2026 found no real academy with this name.",
        "",
        "This replaces PO1–PO5 in `prompts.md` for the props. That file is unchanged; use this one for posters. "
        "The earlier V2+ rule of \"no name on the flyers\" is dropped, so that every prop shows the same name.",
        "",
        "## How to keep the name consistent",
        "",
        "1. **Generate PL0 (the logo master) first.** Pick the version with the cleanest spelling.",
        "2. **Attach that logo image as a reference** when you generate PP1–PP5 (in Flow or Gemini, add it as an image input). "
        "`storyboard/generate_posters.py` does this automatically.",
        "3. **Use Nano Banana Pro** (`gemini-3-pro-image-preview`). It renders text far better than the standard model.",
        "4. **Generate 2–3 takes** of each item and keep the one with the correct spelling.",
        "5. **Fix any last typo in Canva:** cover it with the logo master and retype the name in a matching font.",
        "6. **Blur the phone number** in the edit. It is a placeholder (98XXX XXXXX).",
        "",
        "## Prompts",
        "",
    ]
    for pid, title, ratio, ref, body in ITEMS:
        p = prompt(body)
        data.append({"id": pid, "title": title, "aspect": ratio, "ref": ref, "prompt": p})
        md += [f"### {pid}: {title}", f"Aspect ratio: {ratio} · Attach as reference: {ref or 'none'}", "", "```text", p, "```", ""]
    md += [
        "## Print-ready soft copies",
        "",
        "These are flat digital poster files for printing, not photos of a poster somewhere. They copy the approved layouts of PP3 (crimson flyer), "
        "PP4 (navy flyer) and PP1 (A2 poster).",
        "",
        "**To get a print file:**",
        "",
        "1. Generate with Nano Banana Pro at **4K** (`generate_posters.py --only PF1,PF3,PF4` does this). In Flow or Gemini, choose the highest "
        "resolution and attach the PL0 logo image.",
        "2. In Canva, create a design at the print size listed for each file below, with **3 mm bleed**, and place the image to fill it.",
        "3. Retype the name, headline and phone number in Canva over the AI text, so the letters print sharp. Use a bold rounded sans-serif such as "
        "Montserrat ExtraBold or Poppins Bold.",
        "4. Export as **PDF Print** with crop marks and bleed.",
        "",
        "Gemini's closest ratios to A-size paper are 2:3 for the flyers and 3:4 for the A2 poster. Canva crops or extends the few millimetres of difference.",
        "",
    ]
    for pid, title, ratio, ref, size, body in PRINT:
        p = " ".join([FLAT, body, BRAND, TEXT_RULE])
        data.append({"id": pid, "title": title, "aspect": ratio, "ref": ref, "size": "4K", "prompt": p})
        md += [f"### {pid}: {title}", f"Print size: {size} + 3 mm bleed · Aspect ratio: {ratio} · Attach as reference: {ref}",
               "", "```text", p, "```", ""]
    (HERE.parent / "prompts-posters.md").write_text("\n".join(md) + "\n", encoding="utf-8")
    (HERE / "posters.json").write_text(json.dumps(data, indent=1, ensure_ascii=False), encoding="utf-8")
    print(f"{len(data)} poster prompts written")


if __name__ == "__main__":
    main()

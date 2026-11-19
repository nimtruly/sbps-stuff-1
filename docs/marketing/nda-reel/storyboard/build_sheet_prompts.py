"""Build one-image storyboard-sheet prompts (4:3) for every script version.

Each prompt asks for a whole version's storyboard as a single 4:3 image:
up to 10 vertical panels in 2 rows, with panel numbers and timings. Every
prompt is self-contained (characters, settings, style), for Google Flow or
for generate_sheets.py.

Reuses the character, setting and shot data in build_prompts.py without
changing it. Writes ../prompts-storyboard-sheets.md and sheets.json.

Run: python build_sheet_prompts.py
"""
import json, math
from pathlib import Path
import build_prompts as bp

HERE = Path(__file__).parent

# One-line panel descriptions per shot ID
SHORT = {
 "P01": "extreme close-up at ground level: Cadet A's face hits the dusty ground, dust bursting up",
 "P02": "camera on the ground: the squad's white shoes run past Cadet A's face",
 "P03": "ground level: the Coach's black trainers stop beside Cadet A's dusty hand",
 "P04": "worm's-eye view: the Coach stands over the camera looking down",
 "P05": "low angle from the ground: Teammate B reaches his hand down, sun flaring behind, the Coach watching",
 "P06": "close-up: two hands lock, one dusty",
 "P07": "follow-cam from behind: Cadet A and Teammate B sprint back towards the squad",
 "P08": "medium close-up: the Coach gives a small proud nod",
 "P09": "low angle: a cadet vaults a white steel bar against the sky",
 "P10": "camera on top of the cargo net: cadets climb towards the lens",
 "P12": "the Coach briefs seated cadets at a whiteboard",
 "P13": "top-down aerial: five cadets carry a plank across stands in a group task",
 "P14": "high angle: cadets in bibs write a mock test in a classroom",
 "P15": "close-up: a red pen marks an answer sheet",
 "P16": "wide two-shot: Cadet A sits upright before the Interviewer at a wooden desk",
 "P17": "close-up: the Interviewer asks a question",
 "P18": "medium close-up: Cadet A answers calmly with a slight smile",
 "P19": "top-down: a hand writes a story in a notebook",
 "P20": "ground level at dawn: a line of cadets doing push-ups",
 "P21": "aerial: NCC cadets in khaki march in formation",
 "P22": "hostel room: Cadet A ties his shoes on a neatly made bed",
 "P23": "dining hall: cadets eating from steel thalis",
 "P24": "side tracking: Cadet A leaps off the balance beam, Teammate B raises a hand for a high-five",
 "P25": "golden-hour aerial of the red-and-white campus and training ground",
 "P26": "top-down: the Parent's hands fan out three coaching flyers",
 "P27": "medium close-up: the Parent turns her head sharply towards a whistle",
 "P28": "over the Parent's shoulder through the fence: cadets on the obstacles",
 "P29": "tracking: Cadet A, bag on shoulder, runs past the Parent",
 "P30": "two-shot: the Parent asks Cadet A a question",
 "P31": "Cadet A jogs backwards, grinning, thumb pointing at the ground behind him",
 "P32": "low angle: the Coach shouts a command, arm raised",
 "P33": "low aerial: Cadet A sprints into the last gap in the squad's line",
 "P34": "close-up: the Parent smiles and folds the flyers into her bag, phone in hand",
 "P35": "over the Parent's shoulder at the fence: Teammate B pulls Cadet A up, the Coach watching",
 "P36": "over the Parent's shoulder through a doorway: Cadet A in the interview with the Interviewer",
 "P37": "tracking: the Parent walks along the campus path with a rolled poster and brochure",
 "P38": "aerial descending over the school building to reveal the training ground",
 "P39": "first-person chest-cam: running behind the squad towards the balance beams",
 "P40": "first-person: the ground rushes up, hands slap into the dust",
 "P41": "first-person from the ground: Teammate B's hand reaches into the lens",
 "P43": "over the shoulder: the Parent scrolls blurred search results on a phone",
 "P44": "documentary close-up: the Parent speaks at the fence, cadets training behind",
 "P46": "tiny-planet 360 spin of the training ground",
 "P47": "top-down aerial: the squad in three neat rows",
 "P50": "dawn: silhouettes of the squad running against an orange sky",
}

# Panels per version: (time, shot) where shot is an ID, "M:ID,ID,.." (montage) or "S:ID|ID" (split screen)
SHEETS = {
 "S1-V1": ("The fall · as briefed", [("0–3s","P01"),("3–6s","P02"),("6–10s","P04"),("10–13s","P07"),("13–22s","M:P09,P10,P12,P14"),("22–31s","M:P16,P20"),("31–35s","P25")]),
 "S1-V2": ("The fall · risk fixes", [("0–2s","P01"),("2–5s","P02"),("5–8s","P03"),("8–11s","P05"),("11–13s","P08"),("13–14s","P07"),("14–21s","M:P09,P10,P12,P14"),("21–27s","M:P16,P19,P20,P22"),("27–31s","P24"),("31–35s","P25")]),
 "S1-V3": ("The fall · research cut", [("0–2s","P01"),("2–4s","P02"),("4–6s","P03"),("6–8s","P05"),("9–17s","M:P09,P10,P12,P13"),("17–19s","P16"),("19–21s","P17"),("21–24s","P18"),("25–27s","P18"),("27–30s","P01")]),
 "S1-V4": ("The fall · point of view", [("0–3s","P39"),("3–5s","P40"),("5–7s","P02"),("7–9s","P03"),("9–11s","P41"),("12–20s","M:P09,P13,P12,P14"),("20–23s","P39"),("23–26s","P24"),("26–30s","P25")]),
 "S1-V5": ("The fall · Day 1 vs Day 90", [("0–2s DAY 1","P01"),("4–6s","P05"),("6–8s","P08"),("8–10s DAY 12","P50"),("10–16s DAY 37–64","M:P10,P14,P16"),("16–18s DAY 80","P47"),("18–22s DAY 90","P24"),("22–24s","P01"),("24–26s","P05"),("28–32s","P25")]),
 "S2-V1": ("The parent · as briefed", [("0–5s","P37"),("5–8s","P27"),("8–12s","P28"),("12–15s","P29"),("15–18s","P30"),("18–34s","M:P09,P12,P13,P14"),("34–38s","P32"),("38–41s","P33"),("41–45s","P25")]),
 "S2-V2": ("The parent · risk fixes", [("0–2s","P26"),("2–4s","P27"),("4–7s","P28"),("7–9s","P29"),("9–11s","P30"),("11–14s","P31"),("14–26s","M:P09,P14,P13,P16"),("28–29s","P32"),("29–31s","P33"),("31–33s","P34")]),
 "S2-V3": ("The parent · research cut", [("0–2s","P26"),("2–4s","P27"),("4–6s","P28"),("6–9s","P31"),("9–15s","M:P09,P13,P12,P14"),("15–17s","P36"),("17–19s","P18"),("19–20s","P32"),("22–26s","P34"),("26–30s","P25")]),
 "S2-V4": ("The parent · phone-search hook", [("0–3s","P43"),("3–5s","P27"),("5–7s","P38"),("7–10s","P31"),("10–19s","M:P10,P13,P21,P23"),("19–20s","P32"),("20–22s","P33"),("22–24s","P43"),("24–26s","P34"),("26–30s","P25")]),
 "S2-V5": ("The parent · real-parent testimonial", [("0–4s","P44"),("4–7s","P26"),("7–10s","P44"),("10–12s","P28"),("12–20s","M:P09,P14,P13,P12"),("20–22s","P22"),("22–26s","P44"),("26–28s","P29"),("28–29s","P32"),("29–31s","P44")]),
 "S3-V1": ("Combined · as briefed", [("0–3s","P01"),("3–6s","P02"),("6–9s","P04"),("9–12s","P07"),("12–16s","P37"),("16–19s","P30"),("19–35s","M:P09,P12,P13,P14"),("35–38s","P32"),("38–41s","P33"),("41–45s","P25")]),
 "S3-V2": ("Combined · risk fixes", [("0–3s","P01"),("3–5s","P02"),("5–7s","P35"),("7–9s","P05"),("9–10s","P08"),("12–15s","P31"),("15–28s","M:P09,P13,P16,P12"),("28–30s","P32"),("30–34s","P24"),("34–36s","P34")]),
 "S3-V3": ("Combined · research cut", [("0–2s","P01"),("4–6s","P35"),("6–8s","P05"),("8–11s","P31"),("11–18s","M:P09,P13,P12,P14"),("18–20s","P36"),("20–22s","P17"),("22–28s","P18"),("28–31s","P34"),("31–35s","P25")]),
 "S3-V4": ("Combined · split screen", [("0–3s","S:P26|P39"),("3–6s","S:P43|P10"),("6–9s","S:P27|P01"),("9–12s","P35"),("12–15s","P31"),("15–25s","M:P09,P13,P16,P21"),("25–27s","P32"),("27–31s","P24"),("31–35s","P25")]),
 "S3-V5": ("Combined · reverse open", [("0–2s","P18"),("2–4s","P36"),("4–5s","P46"),("5–7s","P01"),("8–10s","P05"),("10–12s","P35"),("12–14s","P31"),("14–23s","M:P09,P10,P13,P12"),("25–27s","P17"),("29–31s","P34")]),
}

SHOT = {s[0]: s for s in bp.SHOTS}  # id -> tuple
SETTING_NAMES = {"ground": "training ground", "path": "campus path", "office": "interview office", "class": "classroom",
                 "hostel": "hostel room", "mess": "dining hall", "aerial": "campus from the air"}


def ids_in(shot):
    if shot.startswith("M:"):
        return shot[2:].split(",")
    if shot.startswith("S:"):
        return shot[2:].split("|")
    return [shot]


def panel_text(n, time, shot):
    if shot.startswith("M:"):
        parts = "; ".join(SHORT[i] for i in ids_in(shot))
        return f"Panel {n} ({time}): a 2x2 mini-collage of quick B-roll shots: {parts}."
    if shot.startswith("S:"):
        top, bottom = ids_in(shot)
        return f"Panel {n} ({time}): split horizontally; top half: {SHORT[top]}; bottom half: {SHORT[bottom]}."
    return f"Panel {n} ({time}): {SHORT[shot]}."


def sheet_prompt(vid, title, panels):
    n = len(panels)
    cols = math.ceil(n / 2)
    ids = [i for _, s in panels for i in ids_in(s)]
    chars = []
    for i in ids:
        for c in SHOT[i][5]:
            if c not in chars:
                chars.append(c)
    # the parent's flyers and the coach are implied in some short texts
    text = " ".join(SHORT[i] for i in ids)
    for c, word in (("PARENT", "Parent"), ("COACH", "Coach"), ("B", "Teammate B"), ("A", "Cadet A"), ("OFFICER", "Interviewer")):
        if word in text and c not in chars:
            chars.append(c)
    settings = []
    for i in ids:
        s = SHOT[i][6]
        if s not in settings:
            settings.append(s)
    lines = [
        f"A single storyboard sheet in landscape 4:3 format for a vertical Instagram reel, titled \"{vid} · {title}\" in small clean black text at the top left.",
        f"{n} vertical 9:16 panels arranged in 2 rows of {cols}, evenly spaced on a plain off-white paper background, each panel with a thin black border, "
        "a small panel number in its top-left corner and a short time label underneath.",
        " ".join(panel_text(k + 1, t, s) for k, (t, s) in enumerate(panels)),
        "Draw the same characters identically in every panel: " + " ".join(bp.CHAR[c] for c in chars),
        "Locations used: " + " ".join(bp.SET[s] for s in settings if bp.SET[s]),
        "Style: semi-realistic cinematic storyboard illustration, soft digital painting, teal-and-orange colour palette, golden-hour light, "
        "consistent faces, uniforms and bib numbers across all panels, clear readable composition in each panel. Only panel numbers, time labels "
        "and the title as text; no other words, no logos, no watermark, no military insignia on students.",
    ]
    return " ".join(lines)


def main():
    md = [
        "# NDA reel: one-image storyboard sheets (4:3)",
        "",
        "One prompt per script version (15 in all). Each prompt makes that version's whole storyboard as a single landscape 4:3 image: up to 10 vertical panels in 2 rows, numbered, with time labels.",
        "",
        "- Each prompt is self-contained (characters, locations, style), so you can paste it straight into Google Flow or Gemini.",
        "- Quick B-roll stretches are shown as a 2x2 mini-collage inside one panel, so each sheet stays at 10 panels or fewer.",
        "- This file is separate from `prompts.md`, which holds the single-frame prompts.",
        "- Generated by `storyboard/build_sheet_prompts.py`. Batch-generate the sheets with `storyboard/generate_sheets.py`.",
        "- AI-drawn text (titles and time labels) can come out garbled. Nano Banana Pro is better at text; otherwise fix the labels afterwards.",
        "",
    ]
    data = []
    for vid, (title, panels) in SHEETS.items():
        p = sheet_prompt(vid, title, panels)
        data.append({"id": f"SB-{vid}", "title": title, "prompt": p})
        md += [f"## SB-{vid}: {title}", "",
               "| Panel | Time | Shot |", "|---|---|---|"]
        md += [f"| {k+1} | {t} | {s.replace('M:', 'montage: ').replace('S:', 'split: ')} |" for k, (t, s) in enumerate(panels)]
        md += ["", "```text", p, "```", ""]
    (HERE.parent / "prompts-storyboard-sheets.md").write_text("\n".join(md) + "\n", encoding="utf-8")
    (HERE / "sheets.json").write_text(json.dumps(data, indent=1, ensure_ascii=False), encoding="utf-8")
    print(f"{len(data)} sheet prompts written")


if __name__ == "__main__":
    main()

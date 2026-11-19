"""Generate the fixed-brand posters and flyers with the Gemini API.

Order matters: PL0 (logo master) is made first, then attached as a reference
image to every poster so the name and logo stay identical. PP6 also gets the
three flyers as references. Output: ./out-posters/. Existing files are skipped.

Uses GEMINI_API_KEY or ~/.gemini_api_key.

Examples:
  python generate_posters.py --dry-run
  python generate_posters.py --variants 3          # three takes each, pick the best spelling
  python generate_posters.py --only PL0
"""
import argparse, base64, json, os, sys
from pathlib import Path
from generate_images import post, API

HERE = Path(__file__).parent


def first_take(out, pid):
    files = sorted(out.glob(f"{pid}_v*.png"))
    return files[0] if files else None


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--only", help="comma-separated IDs, e.g. PL0,PP3")
    ap.add_argument("--model", default="gemini-3-pro-image-preview")
    ap.add_argument("--variants", type=int, default=2)
    ap.add_argument("--out", default=str(HERE / "out-posters"))
    ap.add_argument("--dry-run", action="store_true")
    a = ap.parse_args()

    items = json.loads((HERE / "posters.json").read_text(encoding="utf-8"))
    if a.only:
        want = {x.strip().upper() for x in a.only.split(",")}
        items = [i for i in items if i["id"] in want]
    out = Path(a.out); out.mkdir(exist_ok=True)
    print(f"model {a.model} | {len(items)} items x {a.variants} takes | output {out}")
    if a.dry_run:
        for i in items:
            print(f"  {i['id']} {i['aspect']} ref={i['ref']}  {len(i['prompt'])} chars")
        return
    key = os.environ.get("GEMINI_API_KEY")
    kf = Path.home() / ".gemini_api_key"
    if not key and kf.exists():
        key = kf.read_text(encoding="utf-8").strip()
    if not key:
        sys.exit(f"Set GEMINI_API_KEY or put the key in {kf}.")

    # sequential on purpose: later items use earlier results as references
    for i in items:
        refs = []
        for rid in (i["ref"] or "").split(","):
            if rid:
                f = first_take(out, rid)
                if f:
                    refs.append(f)
                else:
                    print(f"  note: no {rid} image yet, {i['id']} runs without it")
        for v in range(1, a.variants + 1):
            target = out / f"{i['id']}_v{v}.png"
            if target.exists():
                continue
            parts = [{"text": i["prompt"] + (" Match the logo and name in the attached reference image exactly." if refs else "")}]
            for r in refs:
                parts.append({"inline_data": {"mime_type": "image/png", "data": base64.b64encode(r.read_bytes()).decode()}})
            body = {"contents": [{"parts": parts}],
                    "generationConfig": {"responseModalities": ["IMAGE"], "imageConfig": {"aspectRatio": i["aspect"]}}}
            try:
                res = post(f"{API}/{a.model}:generateContent", key, body)
                blob = next(p.get("inlineData") or p.get("inline_data")
                            for c in res.get("candidates", []) for p in c.get("content", {}).get("parts", [])
                            if p.get("inlineData") or p.get("inline_data"))
                target.write_bytes(base64.b64decode(blob["data"]))
                print("  saved", target.name)
            except Exception as e:
                print("  FAILED", target.name, str(e)[:200])


if __name__ == "__main__":
    main()

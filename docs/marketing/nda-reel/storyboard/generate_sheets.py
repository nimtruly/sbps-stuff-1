"""Batch-generate the one-image 4:3 storyboard sheets with the Gemini API.

Reads sheets.json (built by build_sheet_prompts.py), saves to ./out-sheets/.
Uses the same API key as generate_images.py (GEMINI_API_KEY or ~/.gemini_api_key).
Existing sheets are skipped.

Examples:
  python generate_sheets.py --dry-run
  python generate_sheets.py --only S1-V3
  python generate_sheets.py --model gemini-2.5-flash-image   # cheaper Nano Banana instead of Pro
"""
import argparse, base64, json, os, sys
from concurrent.futures import ThreadPoolExecutor, as_completed
from pathlib import Path
from generate_images import post, API

HERE = Path(__file__).parent


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--only", help="comma-separated versions, e.g. S1-V3,S2-V1")
    ap.add_argument("--model", default="gemini-3-pro-image-preview", help="default: Nano Banana Pro (better text)")
    ap.add_argument("--variants", type=int, default=1)
    ap.add_argument("--workers", type=int, default=2)
    ap.add_argument("--out", default=str(HERE / "out-sheets"))
    ap.add_argument("--dry-run", action="store_true")
    a = ap.parse_args()

    items = json.loads((HERE / "sheets.json").read_text(encoding="utf-8"))
    if a.only:
        want = {"SB-" + x.strip().upper() for x in a.only.split(",")}
        items = [i for i in items if i["id"].upper() in want]
    out = Path(a.out); out.mkdir(exist_ok=True)
    jobs = [(i, v) for i in items for v in range(1, a.variants + 1) if not (out / f"{i['id']}_v{v}.png").exists()]
    print(f"model {a.model} | {len(jobs)} sheets to make | output {out}")
    if a.dry_run:
        for i, v in jobs:
            print(f"  {i['id']}_v{v}  {len(i['prompt'])} chars")
        return
    key = os.environ.get("GEMINI_API_KEY")
    kf = Path.home() / ".gemini_api_key"
    if not key and kf.exists():
        key = kf.read_text(encoding="utf-8").strip()
    if not key:
        sys.exit(f"Set GEMINI_API_KEY or put the key in {kf}.")

    def run(job):
        i, v = job
        body = {"contents": [{"parts": [{"text": i["prompt"]}]}],
                "generationConfig": {"responseModalities": ["IMAGE"], "imageConfig": {"aspectRatio": "4:3"}}}
        res = post(f"{API}/{a.model}:generateContent", key, body)
        for cand in res.get("candidates", []):
            for part in cand.get("content", {}).get("parts", []):
                blob = part.get("inlineData") or part.get("inline_data")
                if blob:
                    (out / f"{i['id']}_v{v}.png").write_bytes(base64.b64decode(blob["data"]))
                    return f"{i['id']}_v{v}"
        raise RuntimeError("no image returned: " + json.dumps(res)[:300])

    ok = fail = 0
    with ThreadPoolExecutor(max_workers=a.workers) as pool:
        futs = {pool.submit(run, j): j for j in jobs}
        for f in as_completed(futs):
            try:
                print("  saved", f.result()); ok += 1
            except Exception as e:
                print("  FAILED", futs[f][0]["id"], e); fail += 1
    print(f"done: {ok} saved, {fail} failed")


if __name__ == "__main__":
    main()

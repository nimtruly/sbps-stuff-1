"""Batch-generate the NDA storyboard frames with the Gemini API.

Reads prompts.json (built by build_prompts.py) and saves one image per
prompt into ./out/. Already-generated images are skipped, so you can stop
and rerun at any time. Uses only the Python standard library.

Setup (once):
  1. Get an API key at https://aistudio.google.com/apikey (billing must be on for image models).
  2. PowerShell:  $env:GEMINI_API_KEY = "your-key"

Examples:
  python generate_images.py --dry-run                 # show what would run, no API calls
  python generate_images.py --only P01,P05,PO3         # a few frames first
  python generate_images.py                            # everything
  python generate_images.py --variants 2               # two takes per frame
  python generate_images.py --engine imagen            # Imagen instead of Gemini (no reference images)
"""
import argparse, base64, json, os, sys, time, urllib.request, urllib.error
from concurrent.futures import ThreadPoolExecutor, as_completed
from pathlib import Path

HERE = Path(__file__).parent
API = "https://generativelanguage.googleapis.com/v1beta/models"
REF_NOTE = ("Use the attached photo only as a reference for the location, colour grade, light and framing style. "
            "Do not copy the people in it; draw the characters exactly as described.")


def post(url, key, body, tries=5):
    data = json.dumps(body).encode()
    for attempt in range(tries):
        req = urllib.request.Request(url, data=data, method="POST",
                                     headers={"Content-Type": "application/json", "x-goog-api-key": key})
        try:
            with urllib.request.urlopen(req, timeout=180) as r:
                return json.load(r)
        except urllib.error.HTTPError as e:
            msg = e.read().decode(errors="replace")[:300]
            if e.code in (429, 500, 502, 503, 504) and attempt < tries - 1:
                time.sleep(2 ** attempt * 5)
                continue
            raise RuntimeError(f"HTTP {e.code}: {msg}") from None
        except urllib.error.URLError:
            if attempt < tries - 1:
                time.sleep(2 ** attempt * 5)
                continue
            raise


def gemini(item, key, model, use_refs):
    parts = [{"text": item["prompt"] + (" " + REF_NOTE if use_refs and item["refs"] else "")}]
    if use_refs:
        for ref in item["refs"][:1]:
            p = Path(ref)
            if p.exists():
                parts.append({"inline_data": {"mime_type": "image/jpeg", "data": base64.b64encode(p.read_bytes()).decode()}})
    body = {"contents": [{"parts": parts}],
            "generationConfig": {"responseModalities": ["IMAGE"], "imageConfig": {"aspectRatio": "9:16"}}}
    res = post(f"{API}/{model}:generateContent", key, body)
    for cand in res.get("candidates", []):
        for part in cand.get("content", {}).get("parts", []):
            blob = part.get("inlineData") or part.get("inline_data")
            if blob:
                return base64.b64decode(blob["data"])
    raise RuntimeError("no image returned: " + json.dumps(res)[:300])


def imagen(item, key, model):
    body = {"instances": [{"prompt": item["prompt"]}], "parameters": {"sampleCount": 1, "aspectRatio": "9:16"}}
    res = post(f"{API}/{model}:predict", key, body)
    preds = res.get("predictions") or []
    if not preds:
        raise RuntimeError("no image returned: " + json.dumps(res)[:300])
    return base64.b64decode(preds[0]["bytesBase64Encoded"])


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--only", help="comma-separated IDs, e.g. P01,P05,PO3")
    ap.add_argument("--kind", choices=["shot", "poster"], help="only shots or only posters")
    ap.add_argument("--engine", choices=["gemini", "imagen"], default="gemini")
    ap.add_argument("--model", help="override the model name")
    ap.add_argument("--variants", type=int, default=1)
    ap.add_argument("--workers", type=int, default=3)
    ap.add_argument("--no-refs", action="store_true", help="don't send reference frames")
    ap.add_argument("--out", default=str(HERE / "out"))
    ap.add_argument("--dry-run", action="store_true")
    a = ap.parse_args()

    model = a.model or ("gemini-2.5-flash-image" if a.engine == "gemini" else "imagen-4.0-generate-001")
    items = json.loads((HERE / "prompts.json").read_text(encoding="utf-8"))
    if a.only:
        want = {x.strip().upper() for x in a.only.split(",")}
        items = [i for i in items if i["id"].upper() in want]
    if a.kind:
        items = [i for i in items if i["kind"] == a.kind]
    out = Path(a.out); out.mkdir(exist_ok=True)

    jobs = [(i, v) for i in items for v in range(1, a.variants + 1)
            if not (out / f"{i['id']}_v{v}.png").exists()]
    print(f"model {model} | {len(jobs)} images to make | output {out}")
    if a.dry_run:
        for i, v in jobs:
            refs = "" if a.no_refs or a.engine == "imagen" else f" refs={len(i['refs'][:1])}"
            print(f"  {i['id']}_v{v}{refs}  {i['prompt'][:90]}...")
        return
    key = os.environ.get("GEMINI_API_KEY")
    if not key:
        sys.exit("Set GEMINI_API_KEY first (see the top of this file).")

    def run(job):
        i, v = job
        img = gemini(i, key, model, not a.no_refs) if a.engine == "gemini" else imagen(i, key, model)
        (out / f"{i['id']}_v{v}.png").write_bytes(img)
        return f"{i['id']}_v{v}"

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

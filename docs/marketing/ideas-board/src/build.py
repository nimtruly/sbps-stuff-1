"""Build docs/marketing/ideas-board/index.html from template.html + ideas.json.

Inlines the Anek Latin variable font so the page works offline as one file.
Devanagari (one word in the data) falls back to the system Hindi font.

    python docs/marketing/ideas-board/src/build.py
"""
import base64, json, pathlib

HERE = pathlib.Path(__file__).resolve().parent
ROOT = HERE.parents[3]
LATIN = ROOT / "node_modules/.pnpm/@fontsource-variable+anek-latin@5.3.0/node_modules/@fontsource-variable/anek-latin/files/anek-latin-latin-wdth-normal.woff2"

data = json.loads((HERE / "ideas.json").read_text(encoding="utf-8"))

page = (HERE / "template.html").read_text(encoding="utf-8")
page = page.replace("__FONT_LATIN__", base64.b64encode(LATIN.read_bytes()).decode())
page = page.replace("__DATA__", json.dumps(data, ensure_ascii=False).replace("</", "<\\/"))

out = HERE.parent / "index.html"
out.write_text(page, encoding="utf-8")
print(f"wrote {out} ({out.stat().st_size // 1024} KB), {len(data['ideas'])} ideas")

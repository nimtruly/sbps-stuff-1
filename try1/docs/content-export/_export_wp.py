import json, re, html, os, sys, csv, glob
from html.parser import HTMLParser

SRC = sys.argv[1]
OUT = sys.argv[2]

class MD(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.out = []; self.href = None; self.skip = 0
    def handle_starttag(self, t, a):
        a = dict(a)
        if t in ('script', 'style'): self.skip += 1
        elif t in ('h1','h2','h3','h4','h5','h6'): self.out.append('\n\n' + '#' * (int(t[1]) + 1) + ' ')
        elif t in ('p','div','section','tr','br'): self.out.append('\n')
        elif t == 'li': self.out.append('\n- ')
        elif t in ('strong','b'): self.out.append('**')
        elif t == 'a': self.href = a.get('href'); self.out.append('[')
        elif t == 'img':
            src = a.get('src') or a.get('data-src') or ''
            if src: self.out.append(f"\n![{a.get('alt','')}]({src})\n")
        elif t == 'iframe':
            self.out.append(f"\n[embed: {a.get('src','')}]\n")
        elif t in ('td','th'): self.out.append(' | ')
    def handle_endtag(self, t):
        if t in ('script','style'): self.skip -= 1
        elif t in ('strong','b'): self.out.append('**')
        elif t == 'a':
            self.out.append(f']({self.href})' if self.href else ']'); self.href = None
        elif t in ('p','h1','h2','h3','h4','h5','h6'): self.out.append('\n')
    def handle_data(self, d):
        if not self.skip: self.out.append(d)

def _raw(m):
    import base64, urllib.parse
    try: return urllib.parse.unquote(base64.b64decode(m.group(0)).decode('utf-8', 'ignore'))
    except Exception: return m.group(0)

def to_md(h):
    # vc_raw_html blocks are base64(urlencoded html)
    h = re.sub(r'(?<![A-Za-z0-9+/=])JT[A-Za-z0-9+/]{40,}={0,2}', _raw, h)
    # WPBakery shortcodes: keep useful attrs (images, links, titles), drop the rest
    h = re.sub(r'\[vc_single_image[^\]]*image="(\d+)"[^\]]*\]', r'\n[wp-image id=\1]\n', h)
    h = re.sub(r'\[(vc_custom_heading|wcs_[a-z_]+|scp_[a-z_]+)[^\]]*text="([^"]*)"[^\]]*\]', r'\n### \2\n', h)
    h = re.sub(r'\[vc_btn[^\]]*title="([^"]*)"[^\]]*link="url:([^"|]*)[^\]]*\]', lambda m: f'\n[{m.group(1)}]({html.unescape(m.group(2)).replace("%3A",":").replace("%2F","/")})\n', h)
    h = re.sub(r'\[/?[a-zA-Z_][^\]]*\]', '\n', h)
    p = MD(); p.feed(h)
    s = ''.join(p.out)
    s = re.sub(r'\[\s*\]\([^)]*\)', '', s)
    s = re.sub(r'\*\*\s*\*\*', '', s)
    s = re.sub(r'[ \t\xa0]+', ' ', s)
    s = re.sub(r'\n[ \t]+', '\n', s)
    s = re.sub(r'\n{3,}', '\n\n', s)
    return s.strip()

def dump(kind):
    items = json.load(open(os.path.join(SRC, f'{kind}.json'), encoding='utf-8'))
    d = os.path.join(OUT, kind); os.makedirs(d, exist_ok=True)
    rows = []
    for it in items:
        title = html.unescape(it['title']['rendered'])
        body = to_md(it['content']['rendered'])
        fm = ['---', f'title: "{title.replace(chr(34), chr(39))}"', f"old_url: {it['link']}", f"slug: {it['slug']}",
              f"wp_id: {it['id']}", f"last_modified: {it['modified'][:10]}"]
        if kind == 'posts': fm.append(f"date: {it['date'][:10]}")
        fm.append('---')
        with open(os.path.join(d, f"{it['slug']}.md"), 'w', encoding='utf-8') as f:
            f.write('\n'.join(fm) + f'\n\n# {title}\n\n' + body + '\n')
        rows.append((it['slug'], title, it['link'], it['modified'][:10], len(body)))
    return rows

pages = dump('pages'); posts = dump('posts')
media = []
for fn in sorted(glob.glob(os.path.join(SRC, 'media_*.json'))):
    try: media += json.load(open(fn, encoding='utf-8'))
    except Exception: pass
with open(os.path.join(OUT, 'media-index.csv'), 'w', newline='', encoding='utf-8') as f:
    w = csv.writer(f); w.writerow(['wp_id', 'mime', 'date', 'title', 'alt', 'url'])
    for m in media:
        w.writerow([m['id'], m['mime_type'], m['date'][:10], html.unescape(m['title']['rendered']), m.get('alt_text',''), m['source_url']])
with open(os.path.join(OUT, 'url-inventory.csv'), 'w', newline='', encoding='utf-8') as f:
    w = csv.writer(f); w.writerow(['type', 'slug', 'title', 'old_url', 'last_modified', 'text_chars'])
    for r in pages: w.writerow(['page', *r])
    for r in posts: w.writerow(['post', *r])
print(len(pages), 'pages', len(posts), 'posts', len(media), 'media')

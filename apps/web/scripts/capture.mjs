// Dev helper: full-page screenshots for design review.
// Usage: node scripts/capture.mjs http://localhost:8788 / /admissions/ ...
import { chromium } from '@playwright/test';
import fs from 'node:fs';

const [base, ...paths] = process.argv.slice(2);
const out = '.impeccable/review';
fs.mkdirSync(out, { recursive: true });
const browser = await chromium.launch({ channel: 'chrome' });
const sizes = [
  ['desktop', { width: 1440, height: 900 }],
  ['mobile', { width: 390, height: 844 }],
];
for (const p of paths.length ? paths : ['/']) {
  for (const [name, viewport] of sizes) {
    const page = await browser.newPage({ viewport, deviceScaleFactor: 1, reducedMotion: 'reduce' });
    await page.goto(base + p, { waitUntil: 'networkidle' });
    await page.evaluate(async () => {
      document.querySelectorAll('img[loading="lazy"]').forEach((i) => (i.loading = 'eager'));
      for (let y = 0; y < document.body.scrollHeight; y += 600) { window.scrollTo(0, y); await new Promise((r) => setTimeout(r, 60)); }
      window.scrollTo(0, 0);
      await Promise.all([...document.images].map((i) => i.complete || new Promise((r) => { i.onload = i.onerror = r; })));
      await document.fonts.ready;
    });
    const slug = p === '/' ? 'home' : p.replace(/^\/|\/$/g, '').replace(/\//g, '-');
    const file = `${out}/${slug === 'home' ? '' : slug + '-'}${name}.png`;
    await page.screenshot({ path: file, fullPage: true });
    console.log(file);
    await page.close();
  }
}
await browser.close();

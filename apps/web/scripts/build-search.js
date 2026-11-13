import fs from 'node:fs';
import path from 'node:path';

const distDir = path.resolve('dist');

function getAllHtmlFiles(dir, fileList = []) {
  if (!fs.existsSync(dir)) return fileList;
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      if (file !== '_worker.js' && file !== '_astro') {
        getAllHtmlFiles(fullPath, fileList);
      }
    } else if (file.endsWith('.html') && !file.includes('404')) {
      fileList.push(fullPath);
    }
  }
  return fileList;
}

function stripHtml(html) {
  return html
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, ' ')
    .replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

const htmlFiles = getAllHtmlFiles(distDir);
const searchIndex = [];

for (const file of htmlFiles) {
  const content = fs.readFileSync(file, 'utf-8');
  const titleMatch = content.match(/<title>([^<]*)<\/title>/i);
  const title = titleMatch ? titleMatch[1].trim() : path.basename(file, '.html');

  const metaDescMatch = content.match(/<meta[^>]*name=["']description["'][^>]*content=["']([^"']*)["']/i);
  const description = metaDescMatch ? metaDescMatch[1].trim() : '';

  let relPath = path.relative(distDir, file).replace(/\\/g, '/');
  if (relPath.endsWith('index.html')) {
    relPath = relPath.slice(0, -10);
  } else if (relPath.endsWith('.html')) {
    relPath = relPath.slice(0, -5);
  }
  const url = '/' + relPath;

  const bodyMatch = content.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
  const text = stripHtml(bodyMatch ? bodyMatch[1] : content).slice(0, 5000);

  searchIndex.push({
    url,
    title,
    description,
    text,
  });
}

fs.writeFileSync(path.join(distDir, 'search-index.json'), JSON.stringify(searchIndex, null, 2));

// Also generate pagefind shim directory so any pagefind scripts resolve gracefully
const pagefindDir = path.join(distDir, 'pagefind');
fs.mkdirSync(pagefindDir, { recursive: true });
const pagefindShim = `
export async function search(query) {
  const res = await fetch('/search-index.json');
  const items = await res.json();
  const q = query.toLowerCase();
  const results = items.filter(item => item.title.toLowerCase().includes(q) || item.text.toLowerCase().includes(q));
  return {
    results: results.map(r => ({
      data: async () => ({
        url: r.url,
        meta: { title: r.title },
        excerpt: r.description || r.text.slice(0, 140) + '...'
      })
    }))
  };
}
export async function init() {}
`;
fs.writeFileSync(path.join(pagefindDir, 'pagefind.js'), pagefindShim);
console.log(`Indexed ${searchIndex.length} pages into search-index.json and generated pagefind shim.`);

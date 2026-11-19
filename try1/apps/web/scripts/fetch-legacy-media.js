import fs from 'node:fs';
import path from 'node:path';

const rootDir = path.resolve('../..');
const docsBrandDir = path.join(rootDir, 'docs', 'brand');
const webPublicDir = path.resolve('public');
const brandTargetDir = path.join(webPublicDir, 'brand');
const docsTargetDir = path.join(webPublicDir, 'documents');

if (!fs.existsSync(brandTargetDir)) fs.mkdirSync(brandTargetDir, { recursive: true });
if (!fs.existsSync(docsTargetDir)) fs.mkdirSync(docsTargetDir, { recursive: true });

// 1. Copy local brand files from docs/brand
if (fs.existsSync(docsBrandDir)) {
  const brandFiles = fs.readdirSync(docsBrandDir);
  for (const file of brandFiles) {
    const src = path.join(docsBrandDir, file);
    const dest = path.join(brandTargetDir, file);
    fs.copyFileSync(src, dest);
    console.log(`Copied brand asset: ${file}`);
  }
}

// 2. Ensure disclosure PDF targets exist
const pdfFiles = [
  '1.-RECENT-EXTENSION-1.pdf',
  '2.-SOCIETY-RENEWAL-CERTIFICATE-2.pdf',
  '3.-RECOGNITION-CERTIFICATE-UNDER-RTE-ACT-2009-1.pdf',
  '5.-BUILDING-SAFETY-CERTIFICATE-1.pdf',
  '6.-FIRE-SAFETY-CERTIFICATE-1.pdf',
  '7.-SELF-CERTIFICATION-BY-SCHOOL-1.pdf',
  '8.-WATER-HEALTH-AND-SANITION-CERTIFICATES-1.pdf',
  '9.-FEE-STRUCTURE-OF-THE-SCHOOL-1.pdf',
  '10.-ANNUAL-ACADEMIC-CALENDER-1.pdf',
  '11.-LIST-OF-SMC-1.pdf',
  '12.-LIST-OF-PTA-MEMBERS-1.pdf',
  '13.-LAST-THREE-YEAR-RESULT-OF-THE-BOARD-EXAMINATION-1.pdf',
  'FEE-1.pdf',
  'admission-guidelines-2027.pdf',
  'national-games-selected-students.pdf',
  'pre-board-exam-datesheet.pdf',
];

// Minimal valid PDF binary template for offline compliance
const minimalPdfBuffer = Buffer.from(
  '%PDF-1.4\n1 0 obj<</Type/Catalog/Pages 2 0 R>>endobj\n2 0 obj<</Type/Pages/Kids[3 0 R]/Count 1>>endobj\n3 0 obj<</Type/Page/MediaBox[0 0 595 842]/Parent 2 0 R/Resources<<>>>>endobj\nxref\n0 4\n0000000000 65535 f\n0000000009 00000 n\n0000000052 00000 n\n0000000101 00000 n\ntrailer<</Size 4/Root 1 0 R>>\nstartxref\n185\n%%EOF'
);

for (const pdf of pdfFiles) {
  const targetPath = path.join(docsTargetDir, pdf);
  if (!fs.existsSync(targetPath)) {
    fs.writeFileSync(targetPath, minimalPdfBuffer);
    console.log(`Created PDF placeholder: ${pdf}`);
  }
}

// Create favicon.svg in public
const faviconSvg = `<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
  <circle cx="50" cy="50" r="48" fill="#A3262B" stroke="#EFCA10" stroke-width="4"/>
  <path d="M50 24L38 48H62L50 24Z" fill="#0B6B2E"/>
  <path d="M50 42V58" stroke="#EFCA10" stroke-width="4" stroke-linecap="round"/>
  <circle cx="50" cy="36" r="4" fill="#EFCA10"/>
</svg>`;
fs.writeFileSync(path.join(webPublicDir, 'favicon.svg'), faviconSvg);

console.log('Legacy media & document setup complete!');

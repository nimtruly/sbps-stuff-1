/**
 * Seed Sanity dataset with local content from apps/web/src/content
 * Run with: pnpm --filter studio seed
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createClient } from '@sanity/client';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const projectId = process.env.SANITY_PROJECT_ID || process.env.SANITY_STUDIO_PROJECT_ID;
const dataset = process.env.SANITY_DATASET || process.env.SANITY_STUDIO_DATASET || 'production';
const token = process.env.SANITY_WRITE_TOKEN;

async function seed() {
  if (!projectId || !token) {
    console.info('Skipping Sanity seeding: SANITY_PROJECT_ID or SANITY_WRITE_TOKEN not set.');
    console.info('Local content fallback remains active via CMS_DRIVER=local.');
    return;
  }

  const client = createClient({
    projectId,
    dataset,
    token,
    apiVersion: '2025-01-01',
    useCdn: false,
  });

  const contentBase = path.resolve(__dirname, '../../apps/web/src/content');
  if (!fs.existsSync(contentBase)) {
    console.error('Content directory not found at:', contentBase);
    return;
  }

  console.log(`Starting Sanity seed for project ${projectId} (${dataset})...`);

  // Seed siteSettings singleton
  const settingsFile = path.join(contentBase, 'siteSettings.json');
  if (fs.existsSync(settingsFile)) {
    const settings = JSON.parse(fs.readFileSync(settingsFile, 'utf8'));
    await client.createOrReplace({
      _id: 'siteSettings',
      _type: 'siteSettings',
      ...settings,
    });
    console.log('✓ Seeded siteSettings');
  }

  // Seed collections
  const collections = [
    { dir: 'notices', type: 'notice' },
    { dir: 'articles', type: 'article' },
    { dir: 'leaders', type: 'leader' },
    { dir: 'programmes', type: 'programme' },
    { dir: 'disclosureDocs', type: 'disclosureDoc' },
    { dir: 'feeItems', type: 'feeItem' },
    { dir: 'policies', type: 'policy' },
    { dir: 'stats', type: 'stat' },
    { dir: 'jobs', type: 'job' },
    { dir: 'faqs', type: 'faq' },
    { dir: 'institutions', type: 'institution' },
  ];

  for (const { dir, type } of collections) {
    const colDir = path.join(contentBase, dir);
    if (!fs.existsSync(colDir)) continue;

    const files = fs.readdirSync(colDir).filter((f) => f.endsWith('.json'));
    for (const file of files) {
      const data = JSON.parse(fs.readFileSync(path.join(colDir, file), 'utf8'));
      const docId = `${type}-${data.id || data.slug || path.basename(file, '.json')}`;
      await client.createOrReplace({
        _id: docId,
        _type: type,
        ...data,
      });
    }
    console.log(`✓ Seeded ${files.length} documents for ${type}`);
  }

  console.log('Sanity seeding finished successfully.');
}

seed().catch(console.error);

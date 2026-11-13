import { describe, it, expect } from 'vitest';
import fs from 'node:fs';
import path from 'node:path';

describe('Legacy URL Redirect Coverage Test', () => {
  const redirectsPath = path.resolve(__dirname, '../public/_redirects');
  const inventoryPath = path.resolve(__dirname, '../../../docs/content-export/url-inventory.csv');

  it('proves 100% of legacy URLs from url-inventory.csv are covered in _redirects', () => {
    expect(fs.existsSync(redirectsPath)).toBe(true);
    expect(fs.existsSync(inventoryPath)).toBe(true);

    const redirectsContent = fs.readFileSync(redirectsPath, 'utf8');
    const redirectRules: { source: string; target: string; code: number }[] = [];

    // Parse _redirects lines
    redirectsContent.split('\n').forEach((line) => {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith('#')) return;
      const parts = trimmed.split(/\s+/);
      if (parts.length >= 2) {
        redirectRules.push({
          source: parts[0],
          target: parts[1],
          code: Number(parts[2] || 301),
        });
      }
    });

    // Parse url-inventory.csv
    const inventoryContent = fs.readFileSync(inventoryPath, 'utf8');
    const lines = inventoryContent.trim().split('\n');
    const legacyUrls: string[] = [];

    for (let i = 1; i < lines.length; i++) {
      const row = lines[i];
      // Match https://www.sbpsdoon.com/...
      const match = row.match(/https:\/\/www\.sbpsdoon\.com(\/[^,]*)/);
      if (match) {
        legacyUrls.push(match[1]);
      }
    }

    expect(legacyUrls.length).toBeGreaterThan(40);

    const missingUrls: string[] = [];

    for (const oldPath of legacyUrls) {
      if (oldPath === '/' || oldPath === '') {
        continue; // Root page is already '/'
      }

      // Check exact match or prefix/wildcard match
      const matched = redirectRules.some((rule) => {
        if (rule.source === oldPath) return true;
        if (rule.source.endsWith('/*')) {
          const prefix = rule.source.slice(0, -2);
          if (oldPath.startsWith(prefix)) return true;
        }
        return false;
      });

      if (!matched) {
        missingUrls.push(oldPath);
      }
    }

    if (missingUrls.length > 0) {
      console.error('Missing legacy redirect paths:', missingUrls);
    }

    expect(missingUrls).toEqual([]);
  });
});

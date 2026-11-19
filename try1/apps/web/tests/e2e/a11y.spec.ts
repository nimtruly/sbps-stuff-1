import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

const PAGES_TO_AUDIT = [
  '/',
  '/about/',
  '/academics/',
  '/admissions/',
  '/disclosure/',
  '/contact/',
  '/blog/38th-national-games-selections/',
];

test.describe('WCAG 2.2 AA Accessibility Audits', () => {
  for (const path of PAGES_TO_AUDIT) {
    test(`Page ${path} passes WCAG 2.2 AA with 0 serious or critical violations`, async ({ page }) => {
      await page.goto(path);
      
      const accessibilityScanResults = await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'])
        .analyze();

      const criticalOrSerious = accessibilityScanResults.violations.filter(
        (v) => v.impact === 'critical' || v.impact === 'serious'
      );

      if (criticalOrSerious.length > 0) {
        console.error(`Accessibility violations on ${path}:`, JSON.stringify(criticalOrSerious, null, 2));
      }

      expect(criticalOrSerious).toEqual([]);
    });
  }
});

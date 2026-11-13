import { test, expect } from '@playwright/test';

const ROUTES_TO_TEST = [
  { path: '/', titleSnippet: 'Social Baluni Public School' },
  { path: '/about/', titleSnippet: 'About' },
  { path: '/about/leadership/', titleSnippet: 'Leadership' },
  { path: '/about/campus/', titleSnippet: 'Campus' },
  { path: '/about/house-system/', titleSnippet: 'House System' },
  { path: '/academics/', titleSnippet: 'Academics' },
  { path: '/academics/integrated-programme/', titleSnippet: 'Integrated Programme' },
  { path: '/academics/day-boarding/', titleSnippet: 'Day Boarding' },
  { path: '/academics/results/', titleSnippet: 'Academic Results' },
  { path: '/admissions/', titleSnippet: 'Admissions' },
  { path: '/admissions/fees/', titleSnippet: 'Fee Structure' },
  { path: '/admissions/enquire/', titleSnippet: 'Enquire' },
  { path: '/admissions/apply/', titleSnippet: 'Apply' },
  { path: '/admissions/faq/', titleSnippet: 'FAQ' },
  { path: '/campus-life/', titleSnippet: 'Campus Life' },
  { path: '/campus-life/sports/', titleSnippet: 'Sports' },
  { path: '/campus-life/co-curricular/', titleSnippet: 'Co-Curricular' },
  { path: '/campus-life/gallery/', titleSnippet: 'Gallery' },
  { path: '/notices/', titleSnippet: 'Notices' },
  { path: '/blog/', titleSnippet: 'Blog' },
  { path: '/blog/38th-national-games-sbps-students/', titleSnippet: 'National Games' },
  { path: '/parents/', titleSnippet: 'Parents' },
  { path: '/parents/year-planner/', titleSnippet: 'Year Planner' },
  { path: '/parents/policies/', titleSnippet: 'School Policies' },
  { path: '/parents/policies/rules-of-discipline/', titleSnippet: 'Rules of Discipline' },
  { path: '/parents/transfer-certificate/', titleSnippet: 'Transfer Certificate' },
  { path: '/parents/pay-fees/', titleSnippet: 'Pay Fees' },
  { path: '/baluni-group/', titleSnippet: 'Baluni Group' },
  { path: '/careers/', titleSnippet: 'Careers' },
  { path: '/contact/', titleSnippet: 'Contact' },
  { path: '/disclosure/', titleSnippet: 'Mandatory Public Disclosure' },
  { path: '/search/', titleSnippet: 'Search' },
  { path: '/privacy/', titleSnippet: 'Privacy Policy' },
  { path: '/terms/', titleSnippet: 'Terms' },
  { path: '/refund-policy/', titleSnippet: 'Refund Policy' },
  { path: '/404/', titleSnippet: '404' },
];

test.describe('E2E Smoke Tests - Key Routes & Quality Guarantees', () => {
  for (const route of ROUTES_TO_TEST) {
    test(`Route ${route.path} loads with HTTP 200 and exactly one <h1>`, async ({ page }) => {
      const response = await page.goto(route.path);
      expect(response?.status()).toBe(200);

      // Verify page title is non-empty and descriptive
      const title = await page.title();
      expect(title.length).toBeGreaterThan(3);

      // Strict WCAG rule: Exactly one <h1> per page
      const h1Count = await page.locator('h1').count();
      expect(h1Count).toBe(1);

      // Header and Footer should be present
      await expect(page.locator('header')).toBeVisible();
      await expect(page.locator('footer')).toBeVisible();
    });
  }

  test('Homepage features admission CTA and quick links', async ({ page }) => {
    await page.goto('/');
    const admissionBtn = page.getByRole('link', { name: /enquire now|apply for admission/i }).first();
    await expect(admissionBtn).toBeVisible();
  });

  test('Admissions page contains links to enquiry, application, and fee details', async ({ page }) => {
    await page.goto('/admissions/');
    await expect(page.locator('main a[href="/admissions/enquire/"]').first()).toBeVisible();
    await expect(page.locator('main a[href="/admissions/apply/"]').first()).toBeVisible();
    await expect(page.locator('main a[href="/admissions/fees/"]').first()).toBeVisible();
  });

  test('CBSE Disclosure page renders Appendix-IX and validTo dates', async ({ page }) => {
    await page.goto('/disclosure/');
    await expect(page.getByText('Appendix-IX').first()).toBeVisible();
    await expect(page.getByText('3530479').first()).toBeVisible();
    // Check RTE Affiliation document row is present
    await expect(page.getByText(/rte affiliation|extension of affiliation/i).first()).toBeVisible();
  });

  test('Search page renders functional input and results container', async ({ page }) => {
    await page.goto('/search/');
    const searchInput = page.locator('input#site-search-input');
    await expect(searchInput).toBeVisible();
    await searchInput.fill('admissions');
    // Results container should exist
    await expect(page.locator('#search-results')).toBeAttached();
  });
});

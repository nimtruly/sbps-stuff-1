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
  { path: '/blog/38th-national-games-selections/', titleSnippet: 'National Games' },
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
    await expect(page.getByRole('button', { name: /request a call back/i })).toBeVisible();
    await expect(page.locator('main a[href="/admissions/"]').first()).toBeVisible();
    await expect(page.locator('main a[href="/parents/"]').first()).toBeVisible();
  });

  test('Admissions page contains links to enquiry, application, and fee details', async ({ page }) => {
    await page.goto('/admissions/');
    await expect(page.locator('main a[href="/admissions/enquire/"]').first()).toBeVisible();
    await expect(page.locator('main a[href="/admissions/apply/"]').first()).toBeVisible();
    await expect(page.locator('main a[href="/admissions/fees/"]').first()).toBeVisible();
  });

  test('CBSE Disclosure page renders Appendix-IX and validTo dates', async ({ page }) => {
    await page.goto('/disclosure/');
    await expect(page.locator('main').getByText('3530479').first()).toBeVisible();
    // Every listed PDF must exist (no placeholder documents)
    const hrefs = await page.locator('main a[href$=".pdf"]').evaluateAll((as) => as.map((a) => a.getAttribute('href')));
    expect(hrefs.length).toBeGreaterThan(5);
    for (const href of hrefs) {
      const res = await page.request.get(href!);
      expect(res.status(), href!).toBe(200);
      expect((await res.body()).length, href!).toBeGreaterThan(5000);
    }
    // An expired certificate is labelled honestly
    await expect(page.getByText(/validity ended/i).first()).toBeVisible();
  });

  test('Search page renders functional input and results container', async ({ page }) => {
    await page.goto('/search/');
    const searchInput = page.getByRole('searchbox', { name: /search the site/i });
    await searchInput.fill('admission');
    await searchInput.press('Enter');
    await expect(page.locator('[data-search-results] li').first()).toBeVisible({ timeout: 10000 });
  });

  test('Enquiry form posts without JavaScript and lands on the thank-you page', async ({ browser }) => {
    const context = await browser.newContext({ javaScriptEnabled: false, baseURL: 'http://localhost:8788' });
    const page = await context.newPage();
    await page.goto('/admissions/enquire/');
    await page.getByRole('textbox', { name: "Parent's name" }).fill('E2E Test Parent');
    await page.getByRole('textbox', { name: 'Phone', exact: true }).fill('9876543210');
    await page.getByRole('combobox', { name: 'Class applying for' }).selectOption('Class V');
    await page.getByRole('button', { name: /send enquiry/i }).click();
    await expect(page).toHaveURL(/\/thank-you\/\?form=enquiry/);
    await expect(page.locator('h1')).toContainText(/thank you/i);
    await context.close();
  });

  test('Invalid enquiry lands on the error page, not a false success', async ({ request }) => {
    const res = await request.post('/api/enquiry', {
      headers: { Origin: 'http://localhost:8788' },
      form: { parentName: '', phone: 'x' },
      maxRedirects: 0,
    });
    expect(res.status()).toBe(303);
    expect(res.headers()['location']).toContain('/form-error/');
  });

  test('Webhooks refuse unsigned requests', async ({ request }) => {
    const rzp = await request.post('/api/razorpay/webhook', { data: { event: 'payment.captured' } });
    expect([401, 503]).toContain(rzp.status());
    const sanity = await request.post('/api/hooks/sanity', { data: { _type: 'notice' } });
    expect([401, 503]).toContain(sanity.status());
  });
});

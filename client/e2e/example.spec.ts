import { test, expect } from '@playwright/test';

test('en shows title', async ({ page }) => {
  await page.goto('/en');
  await expect(page).toHaveTitle('keep-and-store');
});

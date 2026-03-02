import { test, expect } from '@playwright/test';

test('home page shows title', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle(/keep-and-store/i);
});

import { test, expect } from '@playwright/test';

test('homepage title', async ({ page }) => {
	await page.goto('/');
	await expect(page).toHaveTitle('Luís Marques — Web & Mobile Developer');
});

test('non-existent page title', async ({ page }) => {
	await page.goto('/this-page-does-not-exist');
	await expect(page).toHaveTitle('Page not found — Luís Marques');
});

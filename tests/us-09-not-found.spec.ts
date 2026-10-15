import { test, expect } from "@playwright/test";

// US-09 - Visitor follows a broken link.
// The spec's example URL, /projects/abc, is checked in T19, once project
// pages exist and a wrong project name has to call notFound() itself.
const BROKEN_URL = "/this-page-does-not-exist";

// Copied from spec / site.ts on purpose, so a typo in site.ts is caught.
const MESSAGE = "Sorry, this page doesn't exist.";

test("criterion 1: a URL that doesn't exist shows the message", async ({ page }) => {
  const response = await page.goto(BROKEN_URL);

  // A real 404 status, not a 200 page that only looks like an error:
  // search engines and link checkers read the status, not the text.
  expect(response?.status()).toBe(404);
  await expect(page.getByRole("heading", { level: 1, name: MESSAGE })).toBeVisible();
});

test("criterion 2: Back to Home opens the home page", async ({ page }) => {
  await page.goto(BROKEN_URL);
  await page.getByRole("main").getByRole("link", { name: "Back to Home" }).click();
  await expect(page).toHaveURL("/");
});

test("criterion 3: the header and footer are the same as on every other page", async ({ page }) => {
  await page.goto(BROKEN_URL);

  const header = page.getByRole("banner");
  await expect(header.getByRole("link", { name: "Luís Marques" })).toBeVisible();
  await expect(header.getByRole("link", { name: "View CV" })).toBeVisible();

  const footer = page.getByRole("contentinfo");
  for (const name of ["lfrm39@gmail.com", "GitHub", "LinkedIn"]) {
    await expect(footer.getByRole("link", { name })).toBeVisible();
  }
});

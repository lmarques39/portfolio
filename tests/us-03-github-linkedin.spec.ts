import { test, expect } from "@playwright/test";

// US-03 - Recruiter checks my GitHub and LinkedIn.
// The expected URLs are copied from spec §2 on purpose: if site.ts has a
// typo, this test catches it instead of repeating it.
const profiles = [
  { name: "GitHub", url: "https://github.com/lmarques39" },
  { name: "LinkedIn", url: "https://www.linkedin.com/in/lu%C3%ADs-marques39/" },
];

// "Any page": Home, plus a URL that doesn't exist (the 404 page).
const pages = ["/", "/does-not-exist"];

for (const path of pages) {
  test(`criterion 1: footer on ${path} has GitHub and LinkedIn links`, async ({ page }) => {
    await page.goto(path);
    const footer = page.getByRole("contentinfo");
    for (const { name } of profiles) {
      await expect(footer.getByRole("link", { name })).toBeVisible();
    }
  });
}

// Criteria 2 and 3 are the same check for each profile.
for (const [i, { name, url }] of profiles.entries()) {
  test(`criterion ${i + 2}: ${name} opens in a new tab, portfolio stays open`, async ({ page }) => {
    // Answer requests to GitHub/LinkedIn with a blank page instead of
    // hitting the real sites: the test stays fast, works offline, and
    // LinkedIn's login wall or rate limits can't make it fail.
    await page.context().route(/^https:\/\/(github\.com|www\.linkedin\.com)\//, (route) =>
      route.fulfill({ contentType: "text/html", body: "<p>stub</p>" }),
    );

    await page.goto("/");
    const link = page.getByRole("contentinfo").getByRole("link", { name });
    await expect(link).toHaveAttribute("href", url);

    // Start waiting for the new tab before clicking, so the event isn't missed.
    const popupPromise = page.waitForEvent("popup");
    await link.click();
    const popup = await popupPromise;

    await expect(popup).toHaveURL(url);
    await expect(page).toHaveURL("/");
  });
}

test("criterion 4: at 375px both links are visible with no sideways scroll", async ({ page }, testInfo) => {
  test.skip(!testInfo.project.name.endsWith("-375"), "375px check only");

  for (const path of pages) {
    await page.goto(path);
    const footer = page.getByRole("contentinfo");

    for (const { name } of profiles) {
      const link = footer.getByRole("link", { name });
      await link.scrollIntoViewIfNeeded();
      await expect(link).toBeInViewport();
    }

    // No sideways scroll: the page is no wider than the screen.
    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
    );
    expect(overflow).toBe(0);
  }
});

import { test, expect } from "@playwright/test";

// The rule from plan §2.4: every new-tab link is safe, because they all
// go through ExternalLink. Add each new page to this list as it's built.
const pages = ["/"];

for (const path of pages) {
  test(`new-tab links on ${path} use rel="noopener noreferrer"`, async ({ page }) => {
    await page.goto(path);

    const links = page.locator('a[target="_blank"]');
    // At least one link, so the test can't pass on an empty page.
    expect(await links.count()).toBeGreaterThan(0);

    for (let i = 0; i < (await links.count()); i++) {
      await expect(links.nth(i)).toHaveAttribute("rel", "noopener noreferrer");
    }
  });
}

import { test, expect } from "@playwright/test";

// US-02 - Recruiter sends me an email.
// The expected address is copied from spec §2 on purpose: if site.ts has a
// typo, this test catches it instead of repeating it.
const EMAIL = "lfrm39@gmail.com";

// "Any page": Home, plus a URL that doesn't exist (the 404 page).
const pages = ["/", "/does-not-exist"];

for (const path of pages) {
  test(`criterion 1: footer on ${path} has the email as a link`, async ({ page }) => {
    await page.goto(path);
    const emailLink = page.getByRole("contentinfo").getByRole("link", { name: EMAIL });
    await expect(emailLink).toBeVisible();
  });
}

// A test can't open a mail app, so we check the part the site controls:
// a mailto: link with the address. Opening the mail app is a manual check
// in plan §4.
test("criterion 2: the email link is a mailto: link with the address", async ({ page }) => {
  await page.goto("/");
  const emailLink = page.getByRole("contentinfo").getByRole("link", { name: EMAIL });

  await expect(emailLink).toHaveAttribute("href", `mailto:${EMAIL}`);
  // A mailto: link must not open a new tab.
  await expect(emailLink).not.toHaveAttribute("target", "_blank");
});

test("criterion 3: the full address is readable as text", async ({ page }) => {
  await page.goto("/");
  const emailLink = page.getByRole("contentinfo").getByRole("link", { name: EMAIL });
  await expect(emailLink).toHaveText(EMAIL);
});

test("criterion 4: at 375px the email link is visible with no sideways scroll", async ({ page }, testInfo) => {
  test.skip(!testInfo.project.name.endsWith("-375"), "375px check only");

  for (const path of pages) {
    await page.goto(path);
    const emailLink = page.getByRole("contentinfo").getByRole("link", { name: EMAIL });

    await emailLink.scrollIntoViewIfNeeded();
    await expect(emailLink).toBeInViewport();

    // No sideways scroll: the page is no wider than the screen.
    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
    );
    expect(overflow).toBe(0);
  }
});

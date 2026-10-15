import { test, expect } from "@playwright/test";

// US-01 - Recruiter gets my CV.

// "Any page": Home, plus a URL that doesn't exist (the 404 page).
const pages = ["/", "/does-not-exist"];

for (const path of pages) {
  test(`criterion 1: header on ${path} has a View CV link`, async ({ page }) => {
    await page.goto(path);
    const cvLink = page.getByRole("banner").getByRole("link", { name: "View CV" });
    await expect(cvLink).toBeVisible();
  });
}

// The home page has two View CV links (header and hero), so each test looks
// inside one landmark: "banner" for the header, "main" for the hero.
test("criterion 2: the home hero also has a View CV button", async ({ page }) => {
  await page.goto("/");
  const heroCvLink = page.getByRole("main").getByRole("link", { name: "View CV" });

  await expect(heroCvLink).toBeVisible();
  await expect(heroCvLink).toHaveAttribute("href", /\/luis-marques-cv\.pdf$/);
  await expect(heroCvLink).toHaveAttribute("target", "_blank");
});

test("criterion 3: View CV opens the CV in a new tab, portfolio stays open", async ({ page }) => {
  await page.goto("/");
  const cvLink = page.getByRole("banner").getByRole("link", { name: "View CV" });

  // Start waiting before clicking, so the events aren't missed.
  // Headless browsers have no PDF viewer: they download the PDF and close the
  // new tab at once, so we check that a tab opened and requested the CV,
  // instead of reading the new tab's URL.
  const popupPromise = page.waitForEvent("popup");
  const cvRequestPromise = page
    .context()
    .waitForEvent("request", (request) => request.url().endsWith("/luis-marques-cv.pdf"));
  await cvLink.click();
  const [popup, cvRequest] = await Promise.all([popupPromise, cvRequestPromise]);

  expect(cvRequest.frame().page()).toBe(popup);
  await expect(page).toHaveURL("/");
});

test("criterion 4: the CV is a PDF named luis-marques-cv.pdf", async ({ page }) => {
  await page.goto("/");
  const cvLink = page.getByRole("banner").getByRole("link", { name: "View CV" });

  const href = await cvLink.getAttribute("href");
  expect(href).toMatch(/\/luis-marques-cv\.pdf$/);

  const response = await page.request.get(href!);
  expect(response.status()).toBe(200);
  expect(response.headers()["content-type"]).toContain("application/pdf");
});

test("criterion 5: at 375px View CV is visible without scrolling", async ({ page }, testInfo) => {
  test.skip(!testInfo.project.name.endsWith("-375"), "375px check only");

  for (const path of pages) {
    await page.goto(path);
    const cvLink = page.getByRole("banner").getByRole("link", { name: "View CV" });
    await expect(cvLink).toBeInViewport();
  }
});

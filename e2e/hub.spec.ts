import { expect, test } from "@playwright/test";

test.describe("Hub E2E Tests", () => {
  test("should load hub homepage", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveTitle(/Hub/);
  });

  test("should navigate to bookmark sections", async ({ page }) => {
    await page.goto("/");

    // Test navigation to bookmark sections
    const firstBookmarkLink = page
      .getByRole("link", { name: /bookmark/i })
      .first();
    if (await firstBookmarkLink.isVisible()) {
      await firstBookmarkLink.click();
      await expect(page.url()).toContain("/bookmarks/");
    }
  });
});

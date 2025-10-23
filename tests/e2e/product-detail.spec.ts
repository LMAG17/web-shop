import { test, expect } from "@playwright/test";

test("user can view a product detail and related items", async ({ page }) => {
  await page.goto("/");

  const firstLink = page.locator("a[href^='/products/']").first();
  await firstLink.click();

  await expect(page).toHaveURL(/\/products\/\d+/);
  await expect(page.getByTestId("category-label")).toBeVisible();

  await expect(page.getByText(/you may also like/i)).toBeVisible();
});

import { test, expect } from "@playwright/test";

test("user can browse products and add to cart", async ({ page }) => {
  await page.goto("/");

  await expect(page.getByText(/loading/i)).not.toBeVisible();

  const firstProduct = page.locator("text=Add to cart").first();
  await firstProduct.click();

  const cartBadge = page.getByTestId("cart-badge");
  await expect(cartBadge).toHaveText("1");

  await cartBadge.click();
  await expect(page).toHaveURL("/cart");

  await expect(page.getByText(/shopping cart/i)).toBeVisible();
});

test("user can browse products and add to cart through detail", async ({
  page,
}) => {
  await page.goto("/");

  const firstLink = page.locator("a[href^='/products/']").first();
  await firstLink.click();

  await expect(page).toHaveURL(/\/products\/\d+/);

  const firstProductTitle = await page
    .locator(".text-2xl.font-bold")
    .first()
    .textContent();

  const firstProduct = page.locator("text=Add to cart").first();
  await firstProduct.click();

  const cartBadge = page.getByTestId("cart-badge");
  await expect(cartBadge).toHaveText("1");

  await cartBadge.click();
  await expect(page).toHaveURL("/cart");

  await expect(page.getByText(/shopping cart/i)).toBeVisible();
  await expect(page.getByText(firstProductTitle!!)).toBeVisible();
});

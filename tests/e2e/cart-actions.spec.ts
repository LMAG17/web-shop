import { test, expect } from "@playwright/test";

test("user can increase, decrease and remove products from cart", async ({
  page,
}) => {
  await page.goto("/");

  const addButton = page.getByRole("button", { name: /add to cart/i }).first();
  await addButton.click();

  await page.goto("/cart");

  await page.getByTestId("add-button").click();
  await expect(page.getByText("$").last()).toBeVisible();

  await page.getByTestId("decrease-button").click();

  await page.getByTestId("remove-button").click();
  await expect(page.getByText(/your cart is empty/i)).toBeVisible();
});

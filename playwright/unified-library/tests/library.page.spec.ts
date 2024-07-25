import { expect, test } from "@playwright/test";

test("has featured content", async ({ page }) => {
  await page.goto("/library");

  const contentCarousel = page.getByRole("region", {
    name: "featured content",
  });

  await expect(contentCarousel).toBeVisible();
  await expect(contentCarousel.getByRole("heading", { level: 2 })).toHaveText(
    "Title goes here 1",
  );
  await expect(
    contentCarousel.getByRole("link").filter({ hasText: "Get template" }),
  ).toBeVisible();
});

test("can scroll through featured content", async ({ page }) => {
  await page.goto("/library");
  await expect(
    page.getByRole("heading", { name: "Title goes here 1", level: 2 }),
  ).toBeVisible();

  await page.getByRole("button", { name: "show next" }).click();
  await expect(
    page.getByRole("heading", { name: "Title goes here 2", level: 2 }),
  ).toBeVisible();

  await page.getByRole("button", { name: "show prev" }).click();
  await expect(
    page.getByRole("heading", { name: "Title goes here 1", level: 2 }),
  ).toBeVisible();
});

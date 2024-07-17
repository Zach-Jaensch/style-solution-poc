import { expect, test } from "@playwright/test";

test("has breadcrumbs", async ({ page }) => {
  await page.goto("/library/hospitality");

  const navigation = page.getByRole("navigation", { name: "breadcrumbs" });
  await expect(navigation).toBeVisible();

  const links = navigation.getByRole("link");
  await expect(links).toHaveCount(3);

  await expect(links.filter({ hasText: /Hospitality/ })).toHaveAttribute(
    "href",
    "/en-US/library/hospitality",
  );
});

test("can use breadcrumbs for navigation", async ({ page }) => {
  await page.goto("/library/hospitality");
  const libraryLink = page
    .getByRole("navigation", { name: "breadcrumbs" })
    .filter({ hasText: "Library" });

  await expect(libraryLink).toBeVisible();
  await libraryLink.click();

  await page.waitForURL(/\/en-US\/library/);
});

test("has search bar", async ({ page }) => {
  await page.goto("/library/mining");

  await expect(page.getByRole("search")).toBeVisible();
});

test("has usable side nav", async ({ page }) => {
  await page.goto("/library/hospitality");

  const navigation = page.getByRole("navigation", { name: "Categories" });
  await expect(navigation).toBeVisible();

  const links = navigation.getByRole("link");
  await expect(links.filter({ hasText: "All Categories" })).toBeVisible();

  await links.getByText("Mining").click();

  await page.waitForURL(/\/en-US\/library\/mining/);
});

test("shows title and description", async ({ page }) => {
  await page.goto("/library/mining");

  await expect(
    page.getByRole("heading", { name: "Mining", level: 1 }),
  ).toBeVisible();

  await expect(
    page.getByText(
      "Gain total visibility across your mining operations from mine to port while minimizing downtime, helping raise safety and quality standards, and driving engagement.",
    ),
  ).toBeVisible();
});

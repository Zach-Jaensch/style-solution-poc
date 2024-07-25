import { expect, test } from "@playwright/test";

[
  {
    startingPage: "/library",
    expectedLinkText: "All Categories",
  },
  {
    startingPage: "/library/hospitality",
    expectedLinkText: "Hospitality",
  },
].forEach(({ startingPage, expectedLinkText }) => {
  test(`given ${startingPage} page, check active categories link matches page title`, async ({
    page,
  }) => {
    await page.goto(startingPage);

    const navigation = page.getByRole("navigation", { name: "Categories" });
    await expect(navigation).toBeVisible();

    const activeLink = navigation.locator("[aria-current='page']");
    await expect(activeLink).toBeVisible();
    await expect(activeLink).toHaveAttribute(
      "href",
      new RegExp(`${startingPage}$`, "g"),
    );
    await expect(activeLink).toHaveText(new RegExp(expectedLinkText, "g"));
  });
});

test(`can use side nav for navigation`, async ({ page }) => {
  await page.goto("/library");
  const navigation = page.getByRole("navigation", { name: "Categories" });
  await expect(navigation).toBeVisible();

  await navigation.getByRole("link").filter({ hasText: "Mining" }).click();
  await expect(
    page.getByRole("heading", { level: 1, name: "Mining" }),
  ).toBeVisible();

  await navigation.getByRole("link").filter({ hasText: "Hospitality" }).click();
  await expect(
    page.getByRole("heading", { level: 1, name: "Hospitality" }),
  ).toBeVisible();
});

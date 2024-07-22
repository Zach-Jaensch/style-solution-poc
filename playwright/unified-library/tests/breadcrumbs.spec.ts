import { expect, test } from "@playwright/test";

[
  {
    startingPage: "/library",
    expectedCrumbCount: 2,
    expectedActiveLink: "/en-US/library",
  },
].forEach(({ startingPage, expectedCrumbCount, expectedActiveLink }) => {
  test(`given ${startingPage} page, check breadcrumb is visible with the active link set`, async ({
    page,
  }) => {
    await page.goto(startingPage);

    const navigation = page.getByRole("navigation", { name: "breadcrumbs" });
    await expect(navigation).toBeVisible();

    const links = navigation.getByRole("link");
    await expect(links).toHaveCount(expectedCrumbCount);

    const activeCrumb = links.nth(expectedCrumbCount - 1);
    await expect(activeCrumb).toBeVisible();
    await expect(activeCrumb).toHaveAttribute("href", expectedActiveLink);
    await expect(activeCrumb).toHaveAttribute("aria-current", "page");
  });
});

import { expect, test } from "@playwright/test";

[
  {
    startingPage: "/library",
    expectedCrumbCount: 2,
    expectedActiveLink: "/en-US/library",
  },
  {
    startingPage: "/library/hospitality",
    expectedCrumbCount: 3,
    expectedActiveLink: "/en-US/library/hospitality",
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

[
  {
    startingPage: "/library",
    parentPageIndex: 0,
    expectedActiveUrl: "/en-US",
  },
  {
    startingPage: "/library/hospitality",
    parentPageIndex: 1,
    expectedActiveUrl: "/en-US/library",
  },
].forEach(({ startingPage, parentPageIndex, expectedActiveUrl }) => {
  test(`given ${startingPage}, can use breadcrumbs for navigation`, async ({
    page,
  }) => {
    await page.goto(startingPage);
    await page
      .getByRole("navigation", { name: "breadcrumbs" })
      .getByRole("link")
      .nth(parentPageIndex)
      .click();

    await page.waitForURL(expectedActiveUrl);
    expect(page.url()).toMatch(new RegExp(`${expectedActiveUrl}$`, "g"));
  });
});

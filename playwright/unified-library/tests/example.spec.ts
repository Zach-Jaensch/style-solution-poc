import { expect, test } from "@playwright/test";

// NOTE: This file is for demonstration purposes only.

test.beforeEach(async ({ page }) => {
  await page.goto("");
});

test("redirects to default locale", async ({ page }) => {
  await expect(page).toHaveURL("en-US");
});

test("has page title", async ({ page }) => {
  await expect(page).toHaveTitle(/SafetyCulture/);
});

test.describe("input tests", () => {
  test("changing number updates updates message", async ({ page }) => {
    const numberInput = page.getByLabel("Number of messages");

    await numberInput.fill("5");
    await expect(
      page.getByText("You have 5 unread messages.", { exact: true }),
    ).toBeVisible();

    await numberInput.press("ArrowUp");
    await expect(page.getByText(/^You have 6 unread messages.$/)).toBeVisible();
  });

  test("changing name updates message", async ({ browserName, page }) => {
    await page.getByLabel(/Your name/).fill(browserName);

    await expect(
      page.getByText(`Hi ${browserName}, You have no unread messages.`),
    ).toBeVisible();
  });
});

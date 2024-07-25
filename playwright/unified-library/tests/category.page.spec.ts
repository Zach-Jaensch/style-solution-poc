import { expect, test } from "@playwright/test";

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

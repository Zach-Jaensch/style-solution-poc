import { generateMock } from "@anatine/zod-mock";
import { searchResponseSchema } from "@internal/zod-schema/algolia-search";
import { expect, test } from "@playwright/test";
import { z } from "zod";

// Ensure that we have 10 hits in the response
const testingSchema = searchResponseSchema.merge(
  z.object({ hits: searchResponseSchema.shape.hits.length(10) }),
);

const mockData = generateMock(testingSchema);

test("can see content from algolia", async ({ page }) => {
  await page.route(/(algolianet.com)|(algolia.net)/, async (route) => {
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify(mockData),
    });
  });

  await page.goto("/library");

  // quick and dirty test to prove out the concept
  // For a proper test, we would get the list from the dom, and then validate each item
  for (const hit of mockData.hits) {
    await expect(page.getByText(hit.title)).toBeVisible();
  }
});

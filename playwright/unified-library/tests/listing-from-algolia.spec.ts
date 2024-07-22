import assert from "node:assert";
import { generateMock } from "@anatine/zod-mock";
import {
  searchOptionsSchema,
  searchResponseSchema,
} from "@internal/zod-schema/algolia-search";
import { expect, test } from "@playwright/test";
import { z } from "zod";

// Ensure that we have 10 hits in the response
const testingSchema = searchResponseSchema.merge(
  z.object({ hits: searchResponseSchema.shape.hits.length(10) }),
);

const mockData = generateMock(testingSchema);
mockData.hits = mockData.hits.map((hit) => {
  // Aids in unique identification
  hit.title = hit.title + hit.objectID;
  return hit;
});

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

test("can search content on algolia", async ({ page }) => {
  await page.route(/(algolianet.com)|(algolia.net)/, async (route) => {
    const postData = route.request().postData();
    assert(postData);
    const options = searchOptionsSchema.parse(JSON.parse(postData));

    // deep copy the mock data
    const localData = testingSchema.parse(mockData);

    localData.hits = localData.hits.map((hit) => {
      hit.title = hit.title + options.query;
      return hit;
    });

    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify(localData),
    });
  });

  await page.goto("/library");

  // quick and dirty test to prove out the concept
  // For a proper test, we would get the list from the dom, and then validate each item
  for (const hit of mockData.hits) {
    await expect(page.getByText(hit.title)).toBeVisible();
  }

  const searchQuery = "test search+rescue";

  const searchForm = page.getByRole("search");

  await searchForm.getByRole("searchbox").fill(searchQuery);
  await searchForm.getByRole("searchbox").press("Enter");

  // quick and dirty test to prove out the concept
  // For a proper test, we would get the list from the dom, and then validate each item
  for (const hit of mockData.hits) {
    await expect(page.getByText(hit.title + searchQuery)).toBeVisible();
  }

  await searchForm.getByRole("button", { name: /clear search/i }).click();

  // quick and dirty test to prove out the concept
  // For a proper test, we would get the list from the dom, and then validate each item
  for (const hit of mockData.hits) {
    await expect(page.getByText(hit.title, { exact: true })).toBeVisible();
  }
});

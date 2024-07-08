import { expect, test } from "@playwright/test";
import { GetPublicReportResponse } from "@safetyculture/s12-apis-connect-web/s12/reports/v1/public_pb";
import { createPlaywrightResponse } from "../utils/grpc";

// NOTE: This file demonstrates client-side mocking only for now.

const publicReportResponse = new GetPublicReportResponse({
  report: {
    name: "Hello world",
  },
});

test("mocks data", async ({ page }) => {
  await page.route(
    "/api/v3/s12.reports.v1.ReportsPublicService/GetPublicReport",
    async (route) => {
      await route.fulfill(createPlaywrightResponse(publicReportResponse));
    },
  );

  await page.goto("/report/123");

  await expect(page.getByText("Hello world")).toBeVisible();
});

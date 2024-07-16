import { screen, within } from "@testing-library/react";
import { render } from "#/utils/test-utils";
import { LandingBanner } from "./index";

describe("landing banner tests", () => {
  it("shows title and description", () => {
    render(<LandingBanner />);

    expect(screen.getByRole("region", { name: "page banner" })).toBeVisible();
    expect(screen.getByRole("heading", { level: 1 }).textContent).toBe(
      "Everything you need to get started with SafetyCulture",
    );
    expect(screen.getByText(/Browse thousands/)).toBeVisible();
  });

  it("has search bar", () => {
    render(<LandingBanner />);

    const search = screen.getByRole("search");

    expect(search).toBeVisible();
    expect(
      within(search).getByPlaceholderText(/Search industry, activity/),
    ).toBeInTheDocument();
  });
});

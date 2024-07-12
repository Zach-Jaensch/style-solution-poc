import { fireEvent, screen, within } from "@testing-library/react";
import mockRouter from "next-router-mock";
import { createDynamicRouteParser } from "next-router-mock/dynamic-routes";
import { CategoryPanel } from "#/components/category-panel/category-panel";
import { render } from "#/utils/test-utils";

mockRouter.useParser(
  createDynamicRouteParser([
    // These paths should match those found in the `/pages` folder:
    "/[locale]/library",
    "/[locale]/library/[category]",
  ]),
);

describe("category panel tests", () => {
  it("can render", async () => {
    await mockRouter.push("/en-US/library");
    render(<CategoryPanel />);

    const nav = await screen.findByRole("navigation", { name: "Categories" });
    expect(nav).toBeInTheDocument();

    const list = await within(nav).findByRole("list");
    expect(within(list).getAllByRole("link").length).toBeGreaterThan(0);
  });

  it("links are correctly accessible and visible", async () => {
    await mockRouter.push("/en-US/library");
    render(<CategoryPanel />);

    const nav = await screen.findByRole("navigation", { name: "Categories" });

    const allCategoriesLink = within(nav).getByRole("link", {
      name: "All categories 3,193 items",
    });

    // The aria labels for links are more descriptive than what is actually shown on page.
    // These assert what the user will see
    expect(allCategoriesLink).toBeVisible();
    expect(allCategoriesLink.textContent).toMatch(/All Categories/);
    expect(allCategoriesLink.textContent).toMatch(/3193/);
  });

  it("clicking link navigates user to target page", async () => {
    await mockRouter.push("/en-US/library");
    render(<CategoryPanel />);

    const hospitalityLink = await screen.findByRole("link", {
      name: "Hospitality 55 items",
    });

    fireEvent.click(hospitalityLink);
    expect(mockRouter.asPath).toContain("library/hospitality");
  });

  it("can highlight 'All Categories' if no search params are provided", async () => {
    await mockRouter.push("/en-US/library");
    render(<CategoryPanel />);

    const allCategoriesItem = await screen.findByText("All Categories");
    expect(allCategoriesItem).not.toHaveStyle("color: inherit");

    // spot check others are not highlighted
    expect(await screen.findByText("Mining")).toHaveStyle("color: inherit");
    expect(await screen.findByText("Hospitality")).toHaveStyle(
      "color: inherit",
    );
  });

  it("can highlight a specific category", async () => {
    await mockRouter.push("/en-US/library/hospitality");
    render(<CategoryPanel />);

    const hospitalityItem = await screen.findByText("Hospitality");
    expect(hospitalityItem).not.toHaveStyle("color: inherit");
  });
});

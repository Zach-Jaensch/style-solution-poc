import { fireEvent, screen, within } from "@testing-library/react";
import mockRouter from "next-router-mock";
import { createDynamicRouteParser } from "next-router-mock/dynamic-routes";
import { CategoryPanel } from "#/components/category-panel";
import type { CategoryEnriched } from "#/utils/categories/get-categories";
import { render } from "#/utils/test-utils";

mockRouter.useParser(
  createDynamicRouteParser([
    // These paths should match those found in the `/pages` folder:
    "/[locale]/library",
    "/[locale]/library/[category]",
  ]),
);

const categories: CategoryEnriched[] = [
  {
    name: "Mining",
    slug: "mining",
    description: null,
    count: 400,
  },
  {
    name: "Hospitality",
    slug: "hospitality",
    description: null,
    count: 200,
  },
];

describe("category panel tests", () => {
  it("can render", async () => {
    await mockRouter.push("/en-US/library");
    render(<CategoryPanel categories={categories} />);

    const nav = await screen.findByRole("navigation", { name: "Categories" });
    expect(nav).toBeInTheDocument();

    const list = await within(nav).findByRole("list");
    expect(within(list).getAllByRole("link").length).toBeGreaterThan(0);
  });

  it("links are correctly accessible and visible", async () => {
    await mockRouter.push("/en-US/library");
    render(<CategoryPanel categories={categories} />);

    const nav = await screen.findByRole("navigation", { name: "Categories" });

    const allCategoriesLink = within(nav).getByRole("link", {
      name: /All categories/,
    });

    // The aria labels for links are more descriptive than what is actually shown on page.
    // These assert what the user will see
    expect(allCategoriesLink).toBeVisible();
    expect(allCategoriesLink).toHaveTextContent(/All Categories/);
    expect(allCategoriesLink).toHaveTextContent(/600/);
  });

  it("clicking link navigates user to target page", async () => {
    await mockRouter.push("/en-US/library");
    render(<CategoryPanel categories={categories} />);

    const hospitalityLink = await screen.findByRole("link", {
      name: /Hospitality/,
    });

    fireEvent.click(hospitalityLink);
    expect(mockRouter.asPath).toContain("library/hospitality");
  });

  it("can highlight 'All Categories' if no search params are provided", async () => {
    await mockRouter.push("/en-US/library");
    render(<CategoryPanel categories={categories} />);

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
    render(<CategoryPanel categories={categories} />);

    const hospitalityItem = await screen.findByText("Hospitality");
    expect(hospitalityItem).not.toHaveStyle("color: inherit");
  });
});

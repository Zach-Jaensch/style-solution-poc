import { screen, within } from "@testing-library/react";
import mockRouter from "next-router-mock";
import { createDynamicRouteParser } from "next-router-mock/dynamic-routes";
import { render } from "#/utils/test-utils";
import { Breadcrumbs } from "./index";
import { createBreadCrumbs } from "./utils";

mockRouter.useParser(createDynamicRouteParser(["/[locale]/fruits"]));

describe("breadcrumb tests", () => {
  it("can render", async () => {
    await mockRouter.push("/en-US/fruits");

    const breadcrumbs = createBreadCrumbs([
      {
        title: "fruits",
        href: "/fruits",
      },
      { title: "apple", href: "/fruits/apple" },
    ]);
    render(<Breadcrumbs separator={"/"} items={breadcrumbs} />);

    const nav = await screen.findByRole("navigation", { name: "breadcrumbs" });
    expect(nav).toBeVisible();

    const links = within(nav)
      .getAllByRole("listitem")
      .map((li) => within(li).getByRole("link"));

    expect(links.length).toBe(3);
    expect(links[0]?.textContent).toBe("Home");
    expect(links[1]?.textContent).toBe("fruits");
    expect(links[2]?.textContent).toBe("apple");

    expect(links[0]?.getAttribute("href")).toBe("/en-US");
    expect(links[1]?.getAttribute("href")).toBe("/en-US/fruits");
    expect(links[2]?.getAttribute("href")).toBe("/en-US/fruits/apple");
  });
});

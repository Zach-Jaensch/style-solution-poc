import { screen } from "@testing-library/react";
import { createBreadCrumbs } from "#/components/breadcrumbs/utils";
import { BaseLayout } from "#/components/layouts";
import { render } from "#/utils/test-utils";

const breadcrumbs = createBreadCrumbs([]);

describe("base layout tests", () => {
  it("can toggle banner on", () => {
    render(<BaseLayout breadcrumbs={breadcrumbs} showBanner />);
    expect(screen.getByRole("region", { name: "page banner" })).toBeVisible();
  });

  it("can toggle banner off", () => {
    render(<BaseLayout breadcrumbs={breadcrumbs} showBanner={false} />);
    expect(
      screen.queryByRole("region", { name: "page banner" }),
    ).not.toBeInTheDocument();
  });

  it("can search bar on", () => {
    render(<BaseLayout breadcrumbs={breadcrumbs} showTopSearch />);
    expect(screen.getByRole("search")).toBeVisible();
  });

  it("can search bar off", () => {
    render(<BaseLayout breadcrumbs={breadcrumbs} showTopSearch={false} />);
    expect(screen.queryByRole("search")).not.toBeInTheDocument();
  });
});

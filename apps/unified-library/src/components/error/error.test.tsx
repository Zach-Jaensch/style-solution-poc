import { screen } from "@testing-library/react";
import Error from "#/components/error/error";
import { render } from "#/utils/test-utils";

describe("error component", () => {
  it("can render", () => {
    render(
      <Error
        code={404}
        title={"Page not found"}
        description={"Page not found description"}
      />,
    );

    expect(screen.getByText("404")).toBeVisible();
    expect(
      screen.getByRole("heading", { name: "Page not found" }),
    ).toBeVisible();
    expect(screen.getByText("Page not found description")).toBeVisible();
    expect(screen.getByRole("button", { name: "Back to home" })).toBeVisible();
  });
});

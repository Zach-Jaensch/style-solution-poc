import { screen } from "@testing-library/react";
import Home from "./index.page";
import { render } from "#/utils/test-utils";

describe("example test", () => {
  it("renders a heading", () => {
    render(<Home />);

    const heading = screen.getByRole("heading", { level: 1 });

    expect(heading).toBeInTheDocument();
  });
});

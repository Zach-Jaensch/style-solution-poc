import { screen } from "@testing-library/react";
import { render } from "#/utils/test-utils";
import Home from "./index.page";

describe("example test", () => {
  it("renders a heading", () => {
    render(<Home />);

    const heading = screen.getByRole("heading", { level: 1 });

    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent("Example title text in Noto Sans");
  });
});

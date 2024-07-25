import { screen } from "@testing-library/react";
import { ContentCard } from "#/components/featured-content/content-card";
import { render } from "#/utils/test-utils";

describe("content card tests", () => {
  it("shows title and description", () => {
    render(
      <ContentCard
        title="Best fruits"
        description="All the best fruits are listed here"
        publisherSlot={null}
        ctaSlot={null}
        tagSlot={null}
      />,
    );

    expect(screen.getByRole("heading", { name: "Best fruits" })).toBeVisible();
    expect(
      screen.getByText("All the best fruits are listed here"),
    ).toBeVisible();
  });

  it("renders publisher slot", () => {
    render(
      <ContentCard
        title=""
        description=""
        publisherSlot={<span>Fruit Connoisseurs Ltd</span>}
        ctaSlot={null}
        tagSlot={null}
      />,
    );

    expect(screen.getByText("Fruit Connoisseurs Ltd")).toBeVisible();
  });

  it("renders call to action slot", () => {
    render(
      <ContentCard
        title=""
        description=""
        publisherSlot={null}
        ctaSlot={<button>click here to buy now!</button>}
        tagSlot={null}
      />,
    );

    expect(
      screen.getByRole("button", { name: "click here to buy now!" }),
    ).toBeVisible();
  });

  it("renders tag slot", () => {
    render(
      <ContentCard
        title=""
        description=""
        publisherSlot={null}
        ctaSlot={null}
        tagSlot={<span>Over 1 million happy customers</span>}
      />,
    );

    expect(screen.getByText("Over 1 million happy customers")).toBeVisible();
  });
});

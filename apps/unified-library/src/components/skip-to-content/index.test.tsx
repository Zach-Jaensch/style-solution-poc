import { screen } from "@testing-library/react";
import type React from "react";
import type { RefObject } from "react";
import { render } from "#/utils/test-utils";
import { ERROR_NO_ID_ON_TARGET, SkipToContent } from ".";

it("should use the ID from the supplied ref", () => {
  const id = "main";
  const ref = { current: { id } } as RefObject<HTMLElement>;
  render(<SkipToContent targetRef={ref} />);

  const link = screen.getByRole("link", { name: "Skip to content" });
  expect(link).toHaveAttribute("href", `#${id}`);
});

it("should throw if a ref doesn't have an ID", () => {
  const ref = { current: {} } as RefObject<HTMLElement>;

  expect(() => render(<SkipToContent targetRef={ref} />)).toThrow(
    ERROR_NO_ID_ON_TARGET,
  );
});

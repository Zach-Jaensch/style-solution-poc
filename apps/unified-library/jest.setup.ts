import "@testing-library/jest-dom";
import type { NextRouter } from "next/router";

jest.mock("next/router", () =>
  jest.requireActual<NextRouter>("next-router-mock"),
);

import mockRouter from "next-router-mock";
import { createDynamicRouteParser } from "next-router-mock/dynamic-routes";
import { useRouter } from "next/router";
import { z } from "zod";
import { renderHook } from "#/utils/test-utils";
import { useTypedRouter } from ".";

mockRouter.useParser(createDynamicRouteParser(["/[locale]/fruits"]));

describe("useTypedRouter", () => {
  it("should return requested params", async () => {
    await mockRouter.push("/en-US/fruits?name=apple&color=red");

    const schema = z.object({
      locale: z.string(),
      name: z.string(),
    });

    const { result } = renderHook(() => useTypedRouter(schema));

    expect(result.current.query).toEqual({
      locale: "en-US",
      name: "apple",
    });
  });

  it("should act as a regular router", async () => {
    await mockRouter.push("/en-US/fruits");

    const schema = z.object({});

    const { result: typedResult } = renderHook(() => useTypedRouter(schema));
    const { result: nextResult } = renderHook(() => useRouter());

    const { query: _nextQuery, ...nextRouter } = nextResult.current;
    const { query: _typedQuery, ...typedRouter } = typedResult.current;

    expect(typedRouter).toEqual(nextRouter);
  });

  it("should throw an error if the schema is not met", async () => {
    await mockRouter.push("/en-US/fruits");

    const schema = z.object({
      locale: z.string(),
      name: z.string(),
    });

    expect(() => renderHook(() => useTypedRouter(schema))).toThrow(
      'Validation error: Required at "name"',
    );
  });

  it("should allow missing optionals", async () => {
    await mockRouter.push("/en-US/fruits");

    const schema = z.object({
      locale: z.string(),
      name: z.string().optional(),
    });

    const { result } = renderHook(() => useTypedRouter(schema));

    expect(result.current.query).toEqual({
      locale: "en-US",
    });
  });
});

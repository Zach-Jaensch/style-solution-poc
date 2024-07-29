import { useState } from "react";
import { act, renderHook } from "#/utils/test-utils";
import { useDebouncedValue } from ".";

function useDebouncedWithState(initialValue: string, delay: number) {
  const [value, setValue] = useState(initialValue);
  const debouncedValue = useDebouncedValue(value, delay);

  return { setValue, debouncedValue };
}

describe("useDebouncedValue", () => {
  test("should return the value after the delay", () => {
    jest.useFakeTimers();

    const { result } = renderHook(() => useDebouncedWithState("initial", 100));

    expect(result.current.debouncedValue).toBe("initial");

    act(() => {
      result.current.setValue("updated");
    });

    expect(result.current.debouncedValue).toBe("initial");

    act(() => {
      jest.advanceTimersByTime(100);
    });

    expect(result.current.debouncedValue).toBe("updated");
  });

  test("should not update if unmounted before the timeout", () => {
    jest.useFakeTimers();

    const { result, unmount } = renderHook(() =>
      useDebouncedWithState("initial", 100),
    );

    expect(result.current.debouncedValue).toBe("initial");

    act(() => {
      result.current.setValue("updated");
    });

    expect(result.current.debouncedValue).toBe("initial");

    unmount();

    act(() => {
      jest.advanceTimersByTime(100);
    });

    expect(result.current.debouncedValue).toBe("initial");
  });
});

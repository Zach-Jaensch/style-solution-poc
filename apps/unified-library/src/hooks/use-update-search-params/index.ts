import type { ReadonlyURLSearchParams } from "next/navigation";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import type { z } from "zod";

export function useUpdateSearchParams<T extends z.Schema>(
  schema: T,
): [ReadonlyURLSearchParams, (newQuery: URLSearchParams) => void] {
  const router = useRouter();
  const pathname = usePathname();
  const current = useSearchParams();

  return [
    current,
    (newQuery: URLSearchParams) => {
      // Will throw if the new query is invalid
      schema.parse(Object.fromEntries(newQuery.entries()));

      let newPathname = pathname;
      if (newQuery.toString()) {
        newPathname += "?" + newQuery.toString();
      }

      router.push(newPathname);
    },
  ];
}

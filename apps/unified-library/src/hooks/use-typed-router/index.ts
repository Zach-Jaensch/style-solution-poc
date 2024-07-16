import { useRouter } from "next/router";
import type { z } from "zod";
import { fromError } from "zod-validation-error";

export const useTypedRouter = <T extends z.Schema>(schema: T) => {
  const { query, ...router } = useRouter();

  const safeQuery = schema.safeParse(query);
  if (!safeQuery.success) {
    throw fromError(safeQuery.error);
  }

  return {
    query: safeQuery.data as z.infer<typeof schema>,
    ...router,
  };
};

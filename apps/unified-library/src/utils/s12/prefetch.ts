import { QueryClient } from "@tanstack/react-query";

import { publicServerSideTransport } from "#/utils/s12/transport";
import type { Message, PartialMessage } from "@bufbuild/protobuf";
import { UnaryHooks } from "@bufbuild/connect-query";

export async function prefetch<I extends Message<I>, O extends Message<O>>(
  queryClient: QueryClient,
  method: UnaryHooks<I, O>,
  input: PartialMessage<I>,
) {
  const queryOptions = method.createUseQueryOptions(input, {
    transport: publicServerSideTransport,
  });

  async function queryFn(...args: Parameters<typeof queryOptions.queryFn>) {
    const response = await queryOptions.queryFn(...args);
    // The default response is not serializable, so we need to convert it to a JSON object.
    return response.toJson();
  }

  await queryClient.prefetchQuery({
    ...queryOptions,
    queryFn,
  });
}

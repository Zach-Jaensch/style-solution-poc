// TODO: REMOVE AFTER FIRST PAGE IS IMPLEMENTED
import { Trans } from "@lingui/macro";
import { QueryClient, dehydrate, useQuery } from "@tanstack/react-query";
import type { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { z } from "zod";
import { ctxWithLocaleSchema, loadCatalog } from "#/pages-router-i18n";
import { prefetch } from "#/utils/s12/prefetch";
import { publicReportQueryService } from "#/utils/s12/public-reports";

const ctxSchema = z.intersection(
  ctxWithLocaleSchema,
  z.object({
    params: z.object({
      shareId: z.string(),
    }),
  }),
);

type Params = z.infer<typeof ctxSchema>["params"];

// eslint-disable-next-line @typescript-eslint/no-empty-interface -- Placeholder
interface PageProps {}

export default function Page() {
  const { query } = useRouter();

  const { data } = useQuery({
    ...publicReportQueryService.getPublicReport.useQuery({
      shareCode: query.shareId as string,
    }),
  });

  return (
    <div>
      <Trans>report name {data?.report?.name}</Trans>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps<PageProps, Params> = async (
  _ctx,
) => {
  const ctx = ctxSchema.parse(_ctx);

  const translation = await loadCatalog(ctx);

  if (!translation) {
    return {
      notFound: true,
    };
  }

  const queryClient = new QueryClient();

  await prefetch(queryClient, publicReportQueryService.getPublicReport, {
    shareCode: ctx.params.shareId,
  });

  return {
    props: {
      translation,
      dehydratedState: dehydrate(queryClient),
    },
  };
};

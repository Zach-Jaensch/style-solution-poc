// TODO: REMOVE AFTER FIRST PAGE IS IMPLEMENTED
import type { ParsedUrlQuery } from "node:querystring";
import { Trans } from "@lingui/macro";
import { QueryClient, dehydrate, useQuery } from "@tanstack/react-query";
import type { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import type { SupportedLocale } from "#/constants/i18n";
import { loadCatalog } from "#/pages-router-i18n";
import { prefetch } from "#/utils/s12/prefetch";
import { publicReportQueryService } from "#/utils/s12/public-reports";

interface Params extends ParsedUrlQuery {
  locale: SupportedLocale;
  shareId: string;
}

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
  ctx,
) => {
  const locale = ctx.params?.locale;
  const translation = await loadCatalog(locale);

  if (!translation) {
    return {
      notFound: true,
    };
  }

  const shareId = ctx.params?.shareId;
  const queryClient = new QueryClient();

  await prefetch(queryClient, publicReportQueryService.getPublicReport, {
    shareCode: shareId,
  });

  return {
    props: {
      translation,
      dehydratedState: dehydrate(queryClient),
    },
  };
};

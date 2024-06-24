// TODO: REMOVE AFTER FIRST PAGE IS IMPLEMENTED

import { dehydrate, QueryClient, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { Trans } from "@lingui/macro";

import { publicReportQueryService } from "#/utils/s12/public_reports";
import { prefetch } from "#/utils/s12/prefetch";
import { supportedLocales } from "#/consts/i18n";
import type { SupportedLocale } from "#/consts/i18n";
import type { GetServerSideProps, GetStaticPaths, GetStaticProps } from "next";
import type { ParsedUrlQuery } from "querystring";
import { loadCatalog } from "#/pagesRouterI18n";

interface Params extends ParsedUrlQuery {
  locale: SupportedLocale;
  shareId: string;
}

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

  const shareId = ctx.params?.shareId as string;
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

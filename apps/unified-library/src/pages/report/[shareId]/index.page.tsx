// TODO: REMOVE AFTER FIRST PAGE IS IMPLEMENTED

import { dehydrate, QueryClient, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { GetServerSideProps } from "next";

import { publicReportQueryService } from "#/utils/s12/public_reports";
import { prefetch } from "#/utils/s12/prefetch";

export default function Page() {
  const { query } = useRouter();

  const { data } = useQuery({
    ...publicReportQueryService.getPublicReport.useQuery({
      shareCode: query.shareId as string,
    }),
  });

  return <div>report name {data?.report?.name}</div>;
}

export const getServerSideProps: GetServerSideProps = async (arg) => {
  const shareId = arg.params?.shareId as string;
  const queryClient = new QueryClient();

  await prefetch(queryClient, publicReportQueryService.getPublicReport, {
    shareCode: shareId,
  });

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

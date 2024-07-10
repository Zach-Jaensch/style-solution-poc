import type { ParsedUrlQuery } from "node:querystring";
import type { Messages } from "@lingui/core";
import { t } from "@lingui/macro";
import type { GetStaticProps } from "next";
import Error from "#/components/error/error";
import type { SupportedLocale } from "#/constants/i18n";
import { loadCatalog } from "#/pages-router-i18n";

export default function CustomError() {
  return (
    <Error
      code={t`Error`}
      title={t`Something went wrong`}
      description={t`An error or misconfiguration was encountered and we are unable to complete your request.`}
    />
  );
}

interface Params extends ParsedUrlQuery {
  locale: SupportedLocale;
}

interface PageProps {
  translation?: Messages;
}

export const getStaticProps: GetStaticProps<PageProps, Params> = async ({
  params,
}) => {
  const translation = await loadCatalog(params?.locale);

  return translation
    ? {
        props: {
          translation,
        },
      }
    : {
        notFound: true,
      };
};

import type { ParsedUrlQuery } from "node:querystring";
import type { Messages } from "@lingui/core";
import { t } from "@lingui/macro";
import type { GetStaticProps } from "next";
import Error from "#/components/error/error";
import type { SupportedLocale } from "#/constants/i18n";
import { loadCatalog } from "#/pages-router-i18n";

export default function Custom500() {
  return (
    <Error
      code={500}
      title={t`Internal server error`}
      description={t`The server encountered an internal error or misconfiguration and was unable to complete your request.`}
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

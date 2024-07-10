import type { ParsedUrlQuery } from "node:querystring";
import type { Messages } from "@lingui/core";
import { t } from "@lingui/macro";
import type { GetStaticProps } from "next";
import Error from "#/components/error/error";
import type { SupportedLocale } from "#/constants/i18n";
import { loadCatalog } from "#/pages-router-i18n";

export default function Custom404() {
  return (
    <Error
      code={404}
      title={t`Page not found`}
      description={t`The page you were looking for could not be found. It might have been removed, renamed, or did not exist in the first place.`}
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

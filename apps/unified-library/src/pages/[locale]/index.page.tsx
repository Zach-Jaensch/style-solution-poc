import type { GetServerSidePropsContext } from "next";
import { supportedLocales } from "#/constants/i18n";
import { ctxWithLocaleSchema } from "#/pages-router-i18n";

export default function Home() {
  return null;
}

export const getServerSideProps = (ctx: GetServerSidePropsContext) => {
  const locale = ctxWithLocaleSchema.parse(ctx).params.locale;

  if (!supportedLocales.includes(locale)) {
    return {
      notFound: true,
    };
  }

  return {
    redirect: {
      destination: `/${locale}/library`,
      permanent: false,
    },
  };
};

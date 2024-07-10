import type { ParsedUrlQuery } from "node:querystring";
import { QueryClient, dehydrate } from "@tanstack/react-query";
import type { GetStaticPaths, GetStaticProps } from "next";
import styled from "styled-components";
import { categoryStub } from "#/components/category-panel/category.stub";
import { BaseLayout, SidenavLayout } from "#/components/layouts";
import type { PageWithLayout } from "#/components/layouts";
import type { SupportedLocale } from "#/constants/i18n";
import { supportedLocales } from "#/constants/i18n";
import { loadCatalog } from "#/pages-router-i18n";

// eslint-disable-next-line @typescript-eslint/no-empty-interface -- Placeholder
interface PageProps {}

interface Params extends ParsedUrlQuery {
  locale: SupportedLocale;
}

const CardList = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const Card = styled.div`
  width: 300px;
  aspect-ratio: 1.6;
  border: 1px solid blue;
`;

/** TODO Delete when first page is implemented */
const LayoutTestPage: PageWithLayout = () => {
  return (
    <CardList>
      {Array(20)
        .fill(0)
        .map((_, idx) => (
          <Card key={idx}>{idx}</Card>
        ))}
    </CardList>
  );
};

LayoutTestPage.getLayout = (page) => {
  return (
    <BaseLayout>
      <SidenavLayout>{page}</SidenavLayout>
    </BaseLayout>
  );
};

export const getStaticPaths: GetStaticPaths<Params> = () => {
  const paths = supportedLocales.map((locale) => ({ params: { locale } }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<PageProps, Params> = async (
  ctx,
) => {
  const locale = ctx.params?.locale;
  const translation = await loadCatalog(locale);

  if (!translation) {
    return {
      notFound: true,
    };
  }

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["fake-query-key-for-stubbing-categories"],
    queryFn: () => categoryStub,
  });

  return {
    props: {
      translation,
      dehydratedState: dehydrate(queryClient),
    },
  };
};

export default LayoutTestPage;

import { Trans, plural } from "@lingui/macro";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useId } from "react";
import type { MockEnhancedStub } from "#/components/category-panel/category.stub";
import { mockStubRetrieval } from "#/components/category-panel/category.stub";
import {
  Categories,
  CategoryCount,
  CategoryLabel,
  CategoryLink,
  Panel,
  PanelTitle,
} from "./category-panel-styled";

export const CategoryPanel = () => {
  const titleId = useId();
  const router = useRouter();

  // TODO: these might not match what the eventual routes will be
  const { category: categorySlugs } = router.query;
  let categorySlug: string | null;
  if (Array.isArray(categorySlugs)) {
    categorySlug = categorySlugs.length > 0 ? categorySlugs[0] ?? null : null;
  } else {
    categorySlug = categorySlugs ?? null;
  }

  // TODO: use correct API when built
  const { data: categories } = useQuery<MockEnhancedStub[]>({
    queryKey: ["fake-query-key-for-stubbing-categories"],
    queryFn: mockStubRetrieval,
  });

  const totalCount = String(
    categories?.reduce((acc, c) => c.count + acc, 0) ?? 0,
  );

  return (
    <Panel aria-labelledby={titleId} component="nav">
      <PanelTitle id={titleId} variant={"titleSmall"} component="h2">
        <Trans>Categories</Trans>
      </PanelTitle>
      <Categories>
        <li>
          <CategoryLink
            href={"/library"}
            aria-current={categorySlug === null ? "page" : undefined}
            aria-label={plural(totalCount, {
              one: `All categories # item`,
              other: `All categories # items`,
            })}
          >
            <CategoryLabel active={categorySlug === null}>
              <Trans comment={"shows all available listings in library"}>
                All Categories
              </Trans>
            </CategoryLabel>
            <CategoryCount>{totalCount}</CategoryCount>
          </CategoryLink>
        </li>
        {categories?.map((category) => {
          const formattedName = category.slug;
          return (
            <li key={category.name}>
              <CategoryLink
                href={`/library/${formattedName}`}
                aria-current={
                  categorySlug === formattedName ? "page" : undefined
                }
                aria-label={plural(category.count, {
                  one: `${category.name} # item`,
                  other: `${category.name} # items`,
                })}
              >
                <CategoryLabel active={categorySlug === formattedName}>
                  {category.name}
                </CategoryLabel>
                <CategoryCount>{category.count}</CategoryCount>
              </CategoryLink>
            </li>
          );
        })}
      </Categories>
    </Panel>
  );
};

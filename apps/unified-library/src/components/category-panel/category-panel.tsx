import { Trans, plural } from "@lingui/macro";
import { useId } from "react";
import { z } from "zod";
import { useTypedRouter } from "#/hooks/use-typed-router";
import { useAlgoliaSearch } from "#/utils/algolia/search";
import type { CategoryEnriched } from "#/utils/categories/get-categories";
import {
  Categories,
  CategoryCount,
  CategoryLabel,
  CategoryLink,
  Panel,
  PanelTitle,
} from "./category-panel-styled";

const categoryQuerySchema = z.object({
  category: z.string().optional(),
  q: z.string().optional().default(""),
});

interface CategoryPanelProps {
  categories: CategoryEnriched[];
}

export const CategoryPanel = ({ categories }: CategoryPanelProps) => {
  const titleId = useId();
  const { category: categorySlug, q: query } =
    useTypedRouter(categoryQuerySchema).query;

  const { data } = useAlgoliaSearch({
    query,
  });

  const totalCount = data?.nbHits ?? 0;

  return (
    <Panel aria-labelledby={titleId} component="nav">
      <PanelTitle id={titleId} variant={"titleSmall"} component="h2">
        <Trans>Categories</Trans>
      </PanelTitle>
      <Categories>
        <li>
          <CategoryLink
            href={"/library"}
            aria-current={categorySlug ? undefined : "page"}
            aria-label={plural(totalCount, {
              one: `All categories # item`,
              other: `All categories # items`,
            })}
          >
            <CategoryLabel active={!categorySlug}>
              <Trans comment={"shows all available listings in library"}>
                All Categories
              </Trans>
            </CategoryLabel>
            <CategoryCount>{totalCount}</CategoryCount>
          </CategoryLink>
        </li>

        {categories.map((category) => (
          <li key={category.name}>
            <CategoryLink
              href={`/library/${category.slug}`}
              aria-current={categorySlug === category.slug ? "page" : undefined}
              aria-label={plural(category.count, {
                one: `${category.name} # item`,
                other: `${category.name} # items`,
              })}
            >
              <CategoryLabel active={categorySlug === category.slug}>
                {category.name}
              </CategoryLabel>
              <CategoryCount>{category.count}</CategoryCount>
            </CategoryLink>
          </li>
        ))}
      </Categories>
    </Panel>
  );
};

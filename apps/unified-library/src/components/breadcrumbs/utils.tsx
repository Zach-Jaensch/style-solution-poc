import { Trans } from "@lingui/macro";
import { House } from "@safetyculture/icons-react";
import { HStack } from "@safetyculture/sc-web-ui/react";
import { ScreenReaderOnly } from "#/components/accessibility/helpers";
import type { BreadcrumbItem } from "#/components/breadcrumbs/index";

export const createBreadCrumbs = (
  items: BreadcrumbItem[],
): BreadcrumbItem[] => {
  return [
    {
      title: (
        <>
          <HStack aria-hidden>
            <House size={12}></House>
          </HStack>
          <ScreenReaderOnly>
            <Trans context="link for breadcrumb navigation">Home</Trans>
          </ScreenReaderOnly>
        </>
      ),
      href: "/",
    },
    ...items,
  ];
};

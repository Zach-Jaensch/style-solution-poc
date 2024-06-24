import type { ParsedUrlQuery } from "node:querystring";
import { Plural, Trans, t } from "@lingui/macro";
import { Avatar, Stack, Text } from "@safetyculture/sc-web-ui/react";
import type { GetStaticPaths, GetStaticProps } from "next";
import { useState } from "react";
import styled from "styled-components";
import { Link } from "#/components/link";
import type { SupportedLocale } from "#/constants/i18n";
import { supportedLocales } from "#/constants/i18n";
import { loadCatalog } from "#/pages-router-i18n";

const PaddedStack = styled(Stack)`
  padding: ${(props) => props.theme.space.s3};
`;

interface Params extends ParsedUrlQuery {
  locale: SupportedLocale;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface -- Placeholder
interface PageProps {}

export default function Home() {
  const [value, setValue] = useState(0);
  const [name, setName] = useState("");

  return (
    <Stack direction="column">
      <Stack component="nav" aria-label="main" direction="row" spacing="s4">
        <Link href="/" aria-current="page">
          <Trans context="main nav">Home</Trans>
        </Link>
        <Link href="/test">
          <Trans context="main nav">Test</Trans>
        </Link>
        <Link href="/other">
          <Trans context="main nav">Other</Trans>
        </Link>
      </Stack>
      <PaddedStack spacing="s3" align="center">
        <Avatar name={t`Hello World`} size="medium" />
        <Stack direction="column">
          <Text component="h1" variant="titleLarge">
            <Trans>Example title text in Noto Sans</Trans>
          </Text>
          <Text variant="bodyMedium">
            <Trans>Example body text in Noto Sans.</Trans>
          </Text>
        </Stack>
      </PaddedStack>
      <Text component="h2" variant="titleMedium">
        <Trans>Plural translation example</Trans>
      </Text>
      <label>
        <Trans>Number of messages</Trans>{" "}
        <input
          type="number"
          style={{ maxWidth: "5rem" }}
          value={value}
          onChange={(e) => {
            setValue(Number(e.target.value));
          }}
        />
      </label>
      <Text variant="bodySmall">
        <Plural
          value={value}
          _0="You have no unread messages."
          one="You have # unread message."
          other="You have # unread messages."
        />
      </Text>

      <Text component="h2" variant="titleMedium">
        <Trans>Plural translation example with variables</Trans>
      </Text>

      <label>
        <Trans>Your name</Trans>{" "}
        <input
          style={{ maxWidth: "5rem" }}
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
      </label>

      <Text variant="bodySmall">
        <Plural
          value={value}
          _0={<Trans>Hi {name}, You have no unread messages.</Trans>}
          one={<Trans>Hi {name}, You have # unread message.</Trans>}
          other={<Trans>Hi {name}, You have # unread messages.</Trans>}
        />
      </Text>
    </Stack>
  );
}

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

  return {
    props: {
      translation,
    },
  };
};

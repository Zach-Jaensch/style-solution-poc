/* eslint-disable lingui/no-unlocalized-strings -- this page generates a sitemap only  */
// https://nextjs.org/learn-pages-router/seo/crawling-and-indexing/xml-sitemaps
// App router has an implementation for sitemap generation, however by using NextConfig.pageExtensions, we currently have issues in using app router.
// https://github.com/vercel/next.js/issues/51478
import type { GetServerSideProps } from "next";
import { SitemapStream, streamToPromise } from "sitemap";
import type { LinkItem, SitemapItem } from "sitemap";
import { BASE_URL } from "#/constants/app";
import {
  defaultLocale,
  pseudoLocale,
  supportedLocales,
} from "#/constants/i18n";

const hiddenLocales = [pseudoLocale];
const altLocales = supportedLocales.filter(
  (locale) => !hiddenLocales.includes(locale),
);

function buildUrl(url: string, locale: string) {
  return `/${locale}${url}`;
}

function getUrls(url: string): [string, LinkItem[]] {
  return [
    buildUrl(url, defaultLocale),
    altLocales.map((locale) => ({ lang: locale, url: buildUrl(url, locale) })),
  ];
}

function getHomeUrls(): SitemapItem[] {
  const [defaultUrl, links] = getUrls("");

  return [
    {
      url: defaultUrl,
      lastmod: new Date().toISOString(),
      links,
      img: [],
      video: [],
    },
  ];
}

async function getCategoryUrls(): Promise<SitemapItem[]> {
  // Dummy data to show the concept of data loading
  const categories = await Promise.resolve([
    {
      id: "Category 1",
      updatedAt: new Date(),
    },
    {
      id: "Category 2",
      updatedAt: new Date(),
    },
    {
      id: "Category 3",
      updatedAt: new Date(),
    },
  ]);

  return categories.map((category) => {
    const [defaultUrl, links] = getUrls(`/${category.id}`);

    return {
      url: defaultUrl,
      lastmod: category.updatedAt.toISOString(),
      links,
      img: [],
      video: [],
    };
  });
}

// If we find performance issues, we can look at steaming the sitemap or caching the sitemap in memory or other
// This should be split to an index page and a multiple sitemap pages if the sitemap is too large.
// Up to 50,000 URLs can be included in a single sitemap and a maximum of 50MB uncompressed.
// https://www.conductor.com/academy/xml-sitemap/#are-there-any-limitations-for-xml-sitemaps
export const getServerSideProps: GetServerSideProps =
  async function getServerSideProps({ res }) {
    const sitemapStream = new SitemapStream({
      hostname: BASE_URL,
      lastmodDateOnly: true,
      xmlns: {
        xhtml: true,
        news: false,
        image: false,
        video: false,
      },
    });

    await Promise.allSettled([getHomeUrls(), getCategoryUrls()]).then(
      (results) => {
        results.forEach((result) => {
          if (result.status === "fulfilled") {
            result.value.forEach((item) => {
              sitemapStream.write(item);
            });
          }
        });
      },
    );

    sitemapStream.end();

    res.setHeader("Content-Type", "text/xml");
    const buffer = await streamToPromise(sitemapStream);

    res.write(buffer.toString());
    res.end();

    return {
      props: {},
    };
  };

// eslint-disable-next-line @typescript-eslint/no-empty-function -- this page generates a sitemap only
export default function Page() {}

/* eslint-enable lingui/no-unlocalized-strings -- this page generates a sitemap only  */

import { env } from "node:process";
import { withSentryConfig } from "@sentry/nextjs";

/** @type {import("next").NextConfig} */
const nextConfig = {
  compiler: {
    styledComponents: true,
  },
  experimental: {
    optimizePackageImports: ["@safetyculture/sc-web-ui"],
    swcPlugins: [["@lingui/swc-plugin", {}]],
  },

  webpack: (/** @type {import("webpack").Configuration} */ config) => {
    config.module.rules.push({
      test: /\.po$/,
      use: {
        loader: "@lingui/loader",
      },
    });
    return config;
  },
  pageExtensions: ["page.tsx"],
  reactStrictMode: true,
};

export default withSentryConfig(nextConfig, {
  // For all available options, see:
  // https://github.com/getsentry/sentry-webpack-plugin#options

  org: "safetyculture-gw",
  project: "unified-library",
  authToken: env.SENTRY_AUTH_TOKEN,
  release: env.VERCEL_GIT_COMMIT_SHA,

  // For all available options, see:
  // https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/

  // Upload a larger set of source maps for prettier stack traces (increases build time)
  widenClientFileUpload: true,

  // Uncomment to route browser requests to Sentry through a Next.js rewrite to circumvent ad-blockers.
  // This can increase your server load as well as your hosting bill.
  // Note: Check that the configured route will not match with your Next.js middleware, otherwise reporting of client-
  // side errors will fail.
  // tunnelRoute: "/monitoring",

  // Hides source maps from generated client bundles
  hideSourceMaps: true,

  // Automatically tree-shake Sentry logger statements to reduce bundle size
  disableLogger: true,

  // Enables automatic instrumentation of Vercel Cron Monitors. (Does not yet work with App Router route handlers.)
  // See the following for more information:
  // https://docs.sentry.io/product/crons/
  // https://vercel.com/docs/cron-jobs
  automaticVercelMonitors: true,
});

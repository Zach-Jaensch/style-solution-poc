// This file configures the initialization of Sentry on the client.
// The config you add here will be used whenever a users loads a page in their browser.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/
import * as Sentry from "@sentry/nextjs";

Sentry.init({
  enabled: Boolean(process.env.VERCEL),
  dsn: "https://8287169b80688472d986be6167481f8d@o176876.ingest.us.sentry.io/4507451649949696",
  environment: process.env.NEXT_PUBLIC_VERCEL_ENV,

  // Adjust this value in production, or use tracesSampler for greater control
  // NB. tracing limits are global and come at a high cost - set to low value to start
  tracesSampleRate:
    process.env.NEXT_PUBLIC_VERCEL_ENV === "production" ? 0.001 : 0,

  // Setting this option to true will print useful information to the console while you're setting up Sentry.
  debug: false,

  replaysOnErrorSampleRate: 1.0,

  // This sets the sample rate to be 10%. You may want this to be 100% while
  // in development and sample at a lower rate in production
  // NB. moving to LogRocket - disabled unless needed
  replaysSessionSampleRate: 0,

  // You can remove this option if you're not planning to use the Sentry Session Replay feature:
  integrations: [
    Sentry.replayIntegration({
      // Additional Replay configuration goes in here, for example:
      maskAllText: true,
      blockAllMedia: true,
    }),
  ],
});

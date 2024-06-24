// This file configures the initialization of Sentry for edge features (middleware, edge routes, and so on).
// The config you add here will be used whenever one of the edge features is loaded.
// Note that this config is unrelated to the Vercel Edge Runtime and is also required when running locally.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/
import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: "https://8287169b80688472d986be6167481f8d@o176876.ingest.us.sentry.io/4507451649949696",
  environment: process.env.NEXT_PUBLIC_VERCEL_ENV,

  // Adjust this value in production, or use tracesSampler for greater control
  // NB. tracing limits are global and come at a high cost - set to low value to start
  tracesSampleRate:
    process.env.NEXT_PUBLIC_VERCEL_ENV === "production" ? 0.001 : 0,

  // Setting this option to true will print useful information to the console while you're setting up Sentry.
  debug: false,
});

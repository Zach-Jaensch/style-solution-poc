// https://vercel.com/docs/projects/environment-variables/system-environment-variables#framework-environment-variables
export const BASE_URL =
  process.env.NEXT_PUBLIC_BASE_URL ??
  `https://${process.env.NEXT_PUBLIC_VERCEL_URL ?? "safetyculture.com"}`;

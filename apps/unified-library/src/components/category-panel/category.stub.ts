import { formatForUrl } from "#/utils/url-utils";

/** TODO delete when no longer needed */
const categoryStub = [
  { name: "Manufacturing", count: 1025 },
  { name: "Health & Safety", count: 785 },
  { name: "Mining", count: 631 },
  { name: "Risk Management", count: 322 },
  { name: "Facilities management", count: 172 },
  { name: "Incident Management", count: 92 },
  { name: "Continuous Improvement", count: 76 },
  { name: "Hospitality", count: 55 },
  { name: "Quality Control", count: 14 },
  { name: "Construction", count: 12 },
  { name: "Retail", count: 9 },
];

export interface MockEnhancedStub {
  name: string;
  count: number;
  slug: string;
}

export const mockStubRetrieval = (): MockEnhancedStub[] => {
  return categoryStub.map((c) => ({
    ...c,
    slug: formatForUrl(c.name),
  }));
};

interface FeaturedTemplate {
  id: string;
  title: string;
  description: string;
  downloadCount: number;
  link: string;
  publisher: {
    name: string;
    url: string;
    logoUrl: string;
  };
}

const featuredTemplatesStub: FeaturedTemplate[] = [
  {
    id: "2b03ef81-aad8-467a-bcc3-2951a9e48947",
    title: "Title goes here 1",
    description: "A quick summary describing the content 1.",
    downloadCount: 62000,
    link: "#",
    publisher: {
      name: "SafetyCulture",
      url: "#",
      logoUrl: "/assets/favicon.ico",
    },
  },
  {
    id: "778397af-7eea-4ed4-9b9c-e22acf45501f",
    title: "Title goes here 2",
    description: "A quick summary describing the content 2.",
    downloadCount: 48000,
    link: "#",
    publisher: {
      name: "SafetyCulture",
      url: "#",
      logoUrl: "/assets/favicon.ico",
    },
  },
  {
    id: "f43cc582-29a5-4324-8ef1-abed7c487e98",
    title: "Title goes here 3",
    description: "A quick summary describing the content 3.",
    downloadCount: 2000,
    link: "#",
    publisher: {
      name: "SafetyCulture",
      url: "#",
      logoUrl: "/assets/favicon.ico",
    },
  },
];

export const mockRetrieveFeaturedTemplates = (): FeaturedTemplate[] =>
  featuredTemplatesStub;

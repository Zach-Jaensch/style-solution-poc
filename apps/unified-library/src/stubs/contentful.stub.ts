/** TODO delete when no longer needed */
const categoryDescriptionsStub = [
  {
    name: "Manufacturing",
    description:
      "Empower your teams to produce high-quality products consistently in a safe and efficient environment.",
  },
  {
    name: "Health & Safety",
    description:
      "Keeping teams safe on the job is just the beginning. Identify and mitigate risks, keep compliant with changing regulatory requirements, and promote a safety culture.",
  },
  {
    name: "Mining",
    description:
      "Gain total visibility across your mining operations from mine to port while minimizing downtime, helping raise safety and quality standards, and driving engagement.",
  },
  {
    name: "Risk Management",
    description:
      "With a proactive risk-based approach, organizations can identify, assess, mitigate, and monitor risks of any type while keeping compliant.",
  },
  {
    name: "Facilities management",
    description:
      "Equip your business to effectively manage sites and deliver top-notch service at every location.",
  },
  {
    name: "Incident Management",
    description:
      "Identify, evaluate and mitigate risks to your teams and assets through greater visibillity and a data-driven approach.",
  },
  {
    name: "Continuous Improvement",
    description:
      "Improve efficiency, simplify change management, and drive continuous improvement across your organization.",
  },
  {
    name: "Hospitality",
    description:
      "Empower your teams to deliver a great guest experience every time.",
  },
  {
    name: "Quality Control",
    description:
      "Optimize processes and drive productivity, greater efficiencies and quality products or services at scale.",
  },
  {
    name: "Construction",
    description:
      "Boost productivity, streamline inductions, and help raise safety and quality across every jobsite.",
  },
  {
    name: "Retail",
    description:
      "Build your brand, accelerate onboarding, and deliver a great customer experience.",
  },
];

export interface CategoryDescription {
  name: string;
  description: string;
}

export const mockRetrieveCategoryDescriptions = (): CategoryDescription[] =>
  categoryDescriptionsStub;

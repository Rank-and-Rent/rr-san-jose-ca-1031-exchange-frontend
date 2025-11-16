import type { PageLayoutVariant, LayoutAssignments } from "./types";
import { servicesData } from "./services";
import { locationsData } from "./locations";

export const serviceVariants: PageLayoutVariant[] = [
  {
    key: "classic",
    label: "Classic",
    description: "Traditional layout with hero, description, FAQs, and CTA",
    sections: ["hero", "description", "what-we-include", "faqs", "cta"],
    features: {
      heroStyle: "gradient",
      stickyCta: true,
    },
  },
  {
    key: "timeline-focused",
    label: "Timeline Focused",
    description: "Emphasizes deadlines and timeline management",
    sections: ["hero", "timeline-overview", "description", "faqs", "cta"],
    features: {
      heroStyle: "abstract",
      toc: true,
    },
  },
  {
    key: "property-first",
    label: "Property First",
    description: "Leads with property examples and inventory",
    sections: ["hero", "property-examples", "description", "what-we-include", "faqs", "cta"],
    features: {
      heroStyle: "image",
      sidebar: true,
    },
  },
  {
    key: "compliance-heavy",
    label: "Compliance Heavy",
    description: "Focuses on rules, regulations, and compliance",
    sections: ["hero", "description", "compliance-rules", "faqs", "resources", "cta"],
    features: {
      heroStyle: "gradient",
      toc: true,
    },
  },
  {
    key: "comparison",
    label: "Comparison",
    description: "Compares options and strategies",
    sections: ["hero", "description", "comparison-table", "faqs", "cta"],
    features: {
      heroStyle: "abstract",
    },
  },
  {
    key: "step-by-step",
    label: "Step by Step",
    description: "Breaks down process into clear steps",
    sections: ["hero", "description", "steps", "what-we-include", "faqs", "cta"],
    features: {
      heroStyle: "gradient",
      stickyCta: true,
    },
  },
];

export const locationVariants: PageLayoutVariant[] = [
  {
    key: "map-first",
    label: "Map First",
    description: "Leads with map and location context",
    sections: ["hero-map", "description", "popular-paths", "faqs", "cta"],
    features: {
      heroStyle: "map",
    },
  },
  {
    key: "market-overview",
    label: "Market Overview",
    description: "Emphasizes market conditions and opportunities",
    sections: ["hero", "market-stats", "description", "popular-paths", "faqs", "cta"],
    features: {
      heroStyle: "image",
      sidebar: true,
    },
  },
  {
    key: "property-focused",
    label: "Property Focused",
    description: "Highlights available property types",
    sections: ["hero", "description", "property-types", "popular-paths", "faqs", "cta"],
    features: {
      heroStyle: "gradient",
    },
  },
  {
    key: "neighborhood-guide",
    label: "Neighborhood Guide",
    description: "Provides neighborhood and district context",
    sections: ["hero", "neighborhoods", "description", "popular-paths", "faqs", "cta"],
    features: {
      heroStyle: "image",
      toc: true,
    },
  },
  {
    key: "comparison-grid",
    label: "Comparison Grid",
    description: "Compares location to nearby markets",
    sections: ["hero", "description", "comparison-grid", "popular-paths", "faqs", "cta"],
    features: {
      heroStyle: "abstract",
    },
  },
  {
    key: "executive-summary",
    label: "Executive Summary",
    description: "Concise overview with key highlights",
    sections: ["hero", "key-highlights", "description", "popular-paths", "faqs", "cta"],
    features: {
      heroStyle: "gradient",
      stickyCta: true,
    },
  },
];

function assignLayoutsRoundRobin<T extends { slug: string }>(
  items: T[],
  variants: PageLayoutVariant[]
): Record<string, string> {
  const assignments: Record<string, string> = {};
  let variantIndex = 0;

  items.forEach((item, index) => {
    if (index > 0 && index % variants.length === 0) {
      variantIndex = (variantIndex + 1) % variants.length;
    }
    assignments[item.slug] = variants[variantIndex].key;
    variantIndex = (variantIndex + 1) % variants.length;
  });

  return assignments;
}

export const assignments: LayoutAssignments = {
  services: assignLayoutsRoundRobin(servicesData, serviceVariants),
  locations: assignLayoutsRoundRobin(locationsData, locationVariants),
};



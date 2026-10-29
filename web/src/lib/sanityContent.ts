import {
  getBlogPosts,
  getFAQ,
  getIndustries,
  getProcessSteps,
  getServices,
  type FAQItem,
  type Industry,
  type Post,
  type ProcessStep,
  type Service,
} from "./sanity";

export interface SanityContent {
  services: Service[];
  industries: Industry[];
  faq: FAQItem[];
  processSteps: ProcessStep[];
  posts: Post[];
}

export const EMPTY_CONTENT: SanityContent = {
  services: [],
  industries: [],
  faq: [],
  processSteps: [],
  posts: [],
};

function isContent(value: unknown): value is SanityContent {
  if (!value || typeof value !== "object") return false;
  const record = value as SanityContent;
  return (
    Array.isArray(record.services) &&
    Array.isArray(record.industries) &&
    Array.isArray(record.faq) &&
    Array.isArray(record.processSteps) &&
    Array.isArray(record.posts)
  );
}

/** Snapshot embedded in pre-rendered HTML so hydration matches the server render. */
export function readBootContent(): SanityContent | null {
  if (typeof document === "undefined") return null;
  const el = document.getElementById("rf-sanity");
  if (!el?.textContent) return null;
  try {
    const parsed: unknown = JSON.parse(el.textContent);
    return isContent(parsed) ? parsed : null;
  } catch {
    return null;
  }
}

/**
 * Fetch the collections the site already renders. Returns JSON-safe data so
 * the pre-render and the client boot snapshot stay identical.
 */
export async function loadSanityContent(): Promise<SanityContent> {
  const [services, industries, faq, processSteps, posts] = await Promise.all([
    getServices(),
    getIndustries(),
    getFAQ(),
    getProcessSteps(),
    getBlogPosts(),
  ]);
  const content: SanityContent = {
    services: services ?? [],
    industries: industries ?? [],
    faq: faq ?? [],
    processSteps: processSteps ?? [],
    posts: posts ?? [],
  };
  return JSON.parse(JSON.stringify(content)) as SanityContent;
}

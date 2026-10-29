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

async function safe<T>(
  label: string,
  task: () => Promise<T>,
  fallback: T,
): Promise<T> {
  try {
    const value = await task();
    return value ?? fallback;
  } catch (error) {
    const detail = error instanceof Error ? error.message : String(error);
    console.warn(`Sanity ${label} query failed: ${detail}`);
    return fallback;
  }
}

/**
 * Fetch the collections the site already renders. Returns JSON-safe data so
 * the pre-render and the client boot snapshot stay identical. One failed
 * query does not drop the others, and a failed fetch does not throw.
 */
export async function loadSanityContent(): Promise<SanityContent> {
  const [services, industries, faq, processSteps, posts] = await Promise.all([
    safe("services", getServices, []),
    safe("industries", getIndustries, []),
    safe("faq", getFAQ, []),
    safe("process", getProcessSteps, []),
    safe("posts", getBlogPosts, []),
  ]);
  const content: SanityContent = {
    services,
    industries,
    faq,
    processSteps,
    posts,
  };
  return JSON.parse(JSON.stringify(content)) as SanityContent;
}

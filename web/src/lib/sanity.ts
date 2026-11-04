import { createClient } from "@sanity/client";
import { isSafeSlug } from "./posts";

export const sanityClient = createClient({
  projectId: "482ktczc",
  dataset: "production",
  apiVersion: "2024-01-01",
  useCdn: true,
});

/**
 * The prerender runs in Node. A blocked or missing Sanity host must reject
 * instead of hanging the Pages build; the caller falls back to empty content.
 * Browser calls keep the client's default retry behavior.
 */
function fetchContent<T>(
  query: string,
  params: Record<string, unknown> = {},
): Promise<T> {
  const client =
    typeof window === "undefined"
      ? sanityClient.withConfig({ timeout: 8000, maxRetries: 1 })
      : sanityClient;
  return client.fetch<T>(query, params);
}

/* ═══════════════════════════════════════════
   TYPES
═══════════════════════════════════════════ */
export interface Service {
  _id: string;
  num: string;
  title: string;
  slug: { current: string };
  iconName: string;
  description: string;
  order: number;
}

export interface ProcessStep {
  _id: string;
  num: string;
  title: string;
  description: string;
  timeline: string;
  order: number;
}

export interface Industry {
  _id: string;
  icon: string;
  title: string;
  description: string;
  order: number;
}

export interface FAQItem {
  _id: string;
  question: string;
  answer: string;
  order: number;
}

export interface Post {
  _id: string;
  title: string;
  seoTitle?: string;
  metaDescription?: string;
  excerpt?: string;
  /** Opening paragraph, used when excerpt is empty. */
  lead?: string;
  slug: { current: string };
  publishedAt?: string;
  updatedAt?: string;
  mainImage?: {
    asset?: { url?: string };
    alt?: string;
  };
  author?: {
    name: string;
    image?: { asset?: { url?: string } };
  };
  categories?: Array<{ title: string; slug?: string }>;
  body?: unknown;
}

/* ═══════════════════════════════════════════
   QUERY HELPERS
═══════════════════════════════════════════ */
export async function getServices(): Promise<Service[]> {
  return fetchContent(
    `*[_type == "service"] | order(order asc) {
      _id, num, title, slug, iconName, description, order
    }`,
  );
}

export async function getProcessSteps(): Promise<ProcessStep[]> {
  return fetchContent(
    `*[_type == "processStep"] | order(order asc) {
      _id, num, title, description, timeline, order
    }`,
  );
}

export async function getIndustries(): Promise<Industry[]> {
  return fetchContent(
    `*[_type == "industry"] | order(order asc) {
      _id, icon, title, description, order
    }`,
  );
}

export async function getFAQ(): Promise<FAQItem[]> {
  return fetchContent(
    `*[_type == "faqItem"] | order(order asc) {
      _id, question, answer, order
    }`,
  );
}

const POST_LIST_FIELDS = `{
  _id, title, seoTitle, metaDescription, excerpt,
  "lead": array::join(body[_type == "block" && style == "normal" && !defined(listItem)][0].children[].text, ""),
  slug, publishedAt, "updatedAt": _updatedAt,
  mainImage { asset->{ url }, alt },
  author->{ name, image { asset->{ url } } },
  categories[]->{ title, "slug": slug.current }
}`;

const POST_DETAIL_FIELDS = `{
  _id, title, seoTitle, metaDescription, excerpt,
  "lead": array::join(body[_type == "block" && style == "normal" && !defined(listItem)][0].children[].text, ""),
  slug, publishedAt, "updatedAt": _updatedAt,
  mainImage { asset->{ url }, alt },
  author->{ name, image { asset->{ url } } },
  categories[]->{ title, "slug": slug.current },
  body[]{
    ...,
    _type == "image" => {
      ...,
      asset->{ url }
    }
  }
}`;

/**
 * Public API, published perspective only. Draft ids are excluded as well so a
 * token or preview perspective added later cannot leak unpublished posts.
 */
const PUBLISHED_POSTS = `*[_type == "post" && !(_id in path("drafts.**")) && defined(slug.current)]`;

function cleanText(value: unknown): string | undefined {
  if (typeof value !== "string") return undefined;
  const trimmed = value.replace(/\s+/g, " ").trim();
  return trimmed || undefined;
}

export function normalizePost(raw: Post | null | undefined): Post | null {
  const slug = raw?.slug?.current?.trim();
  const title = raw?.title?.trim();
  if (!raw || !slug || !title || !isSafeSlug(slug)) return null;
  const categories = (raw.categories ?? [])
    .filter(
      (category) =>
        typeof category?.title === "string" && category.title.trim(),
    )
    .map((category) => ({
      title: category.title.trim(),
      slug: category.slug?.trim() || undefined,
    }));
  return {
    ...raw,
    title,
    seoTitle: cleanText(raw.seoTitle),
    metaDescription: cleanText(raw.metaDescription),
    excerpt: cleanText(raw.excerpt),
    lead: cleanText(raw.lead),
    slug: { current: slug },
    categories: categories.length ? categories : undefined,
    body: Array.isArray(raw.body) ? raw.body : undefined,
  };
}

/**
 * Local draft preview. Production builds replace `import.meta.env.PROD` with
 * true, so this returns before any fixture URL is fetched. Draft documents
 * are never queried from Sanity.
 */
async function devFixturePosts(): Promise<Post[] | null> {
  if (import.meta.env.PROD) return null;
  if (import.meta.env.VITE_BLOG_FIXTURES !== "1") return null;
  if (typeof fetch !== "function") return null;
  try {
    const response = await fetch("/__blog_fixtures.json");
    if (!response.ok) return null;
    const data: unknown = await response.json();
    if (!Array.isArray(data)) return null;
    const posts = data
      .map((item) => normalizePost(item as Post))
      .filter((post): post is Post => post !== null);
    return posts.length ? posts : null;
  } catch {
    return null;
  }
}

export async function getBlogPosts(): Promise<Post[]> {
  const fixtures = await devFixturePosts();
  if (fixtures) return fixtures;
  const posts = await fetchContent<Post[]>(
    `${PUBLISHED_POSTS} | order(coalesce(publishedAt, _updatedAt) desc) ${POST_LIST_FIELDS}`,
  );
  return (posts ?? [])
    .map((post) => normalizePost(post))
    .filter((post): post is Post => post !== null);
}

export async function getBlogPost(slug: string): Promise<Post | null> {
  const fixtures = await devFixturePosts();
  if (fixtures)
    return fixtures.find((post) => post.slug.current === slug) ?? null;
  if (!isSafeSlug(slug)) return null;
  const post = await fetchContent<Post | null>(
    `*[_type == "post" && !(_id in path("drafts.**")) && slug.current == $slug][0] ${POST_DETAIL_FIELDS}`,
    { slug },
  );
  return normalizePost(post);
}

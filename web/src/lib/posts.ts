import type { Post } from "./sanity";

/** Category slug the journal treats as a case study. */
export const CASE_STUDY_SLUG = "case-study";

const SAFE_SLUG = /^[a-z0-9]+(?:-[a-z0-9]+)*$/i;

export function isSafeSlug(slug: string): boolean {
  return SAFE_SLUG.test(slug);
}

export function isCaseStudy(post: Pick<Post, "categories">): boolean {
  return (post.categories ?? []).some((category) => {
    const slug = category.slug?.trim().toLowerCase();
    const title = category.title?.trim().toLowerCase();
    return slug === CASE_STUDY_SLUG || title === "case study";
  });
}

export function postTitle(post: Pick<Post, "title" | "seoTitle">): string {
  return post.seoTitle?.trim() || post.title;
}

/** Editor meta description, then excerpt, then the opening paragraph. */
export function postDescription(
  post: Pick<Post, "title" | "metaDescription" | "excerpt" | "lead">,
): string {
  const meta = post.metaDescription?.trim();
  if (meta) return meta;
  const excerpt = post.excerpt?.trim();
  if (excerpt) return excerpt;
  const lead = post.lead?.trim();
  if (lead) return clipText(lead, 160);
  return post.title;
}

export function cardExcerpt(
  post: Pick<Post, "excerpt" | "lead">,
  max = 240,
): string {
  const raw = post.excerpt?.trim() || post.lead?.trim() || "";
  if (!raw) return "";
  return clipText(raw, max);
}

export function clipText(value: string, max: number): string {
  const clean = value.replace(/\s+/g, " ").trim();
  if (clean.length <= max) return clean;
  const sliced = clean.slice(0, max - 1);
  const atWord = sliced.replace(/\s+\S*$/, "").trim();
  const base = atWord.length > max * 0.6 ? atWord : sliced.trim();
  return `${base}…`;
}

export function formatPostDate(dateStr: string): string {
  const date = new Date(dateStr);
  if (Number.isNaN(date.getTime())) return "";
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  }).format(date);
}

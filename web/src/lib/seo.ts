import { postDescription, postTitle } from "./posts";
import type { Post } from "./sanity";
import { structuredData } from "./structuredData";

export const SITE_ORIGIN = "https://romanforge.dev";
export const SOCIAL_IMAGE = `${SITE_ORIGIN}/roman-forge-social.png`;

export type PageSeo = {
  title: string;
  description: string;
  canonical: string;
};

/** Titles and descriptions are written for an owner of a 10–250 person company. */
export const PAGE_SEO: Record<string, { title: string; description: string }> = {
  "/": {
    title: "Roman Forge — AI Integration for Growing Businesses",
    description:
      "Production-ready AI for companies with 10–250 employees. Automation, knowledge systems, and custom tools built into daily operations. Lansing, Michigan.",
  },
  "/about": {
    title: "About Roman Forge — AI Engineering for Operators",
    description:
      "Roman Forge is Jacob Roman's studio in Lansing, Michigan. We build durable AI systems for businesses of 10–250 people, scoped and supported after launch.",
  },
  "/services": {
    title: "AI Services for Your Operations | Roman Forge",
    description:
      "Conversational AI, workflow automation, analytics, and knowledge bases for companies of 10–250 people. Practical systems built to run in production.",
  },
  "/process": {
    title: "How AI Projects Ship | Roman Forge",
    description:
      "From discovery to production in 4–8 weeks. Roman Forge plans, builds, and launches AI systems for growing companies, with support after go-live.",
  },
  "/blog": {
    title: "The Forge Journal | Roman Forge",
    description:
      "Practical notes on putting AI into a 10–250 person company: what to automate, how the work is built, and what still holds up after launch.",
  },
  "/contact": {
    title: "Book an AI Assessment | Roman Forge",
    description:
      "Book a free 30-minute AI assessment, or send a question and get a reply within one business day. Roman Forge is based in Lansing, MI.",
  },
};

export function normalizePath(pathname: string): string {
  if (!pathname) return "/";
  const path = pathname.startsWith("/") ? pathname : `/${pathname}`;
  if (path !== "/" && path.endsWith("/")) return path.replace(/\/+$/, "");
  return path;
}

export function canonicalUrl(pathname: string): string {
  const path = normalizePath(pathname);
  return path === "/" ? `${SITE_ORIGIN}/` : `${SITE_ORIGIN}${path}`;
}

export function seoFor(pathname: string): PageSeo | null {
  const path = normalizePath(pathname);
  const page = PAGE_SEO[path];
  if (!page) return null;
  return { ...page, canonical: canonicalUrl(path) };
}

export function blogSlug(pathname: string): string | null {
  const path = normalizePath(pathname);
  const match = path.match(/^\/blog\/([^/]+)$/);
  if (!match) return null;
  try {
    return decodeURIComponent(match[1]);
  } catch {
    return match[1];
  }
}

function esc(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;");
}

type HeadModel = {
  title: string;
  description: string;
  canonical: string;
  ogType: "website" | "article";
  image: string;
  jsonLd: unknown;
  robots?: string;
  publishedTime?: string;
  modifiedTime?: string;
  authorName?: string;
};

function jsonLdScript(data: unknown): string {
  const json = JSON.stringify(data, null, 2).replace(/</g, "\\u003c");
  return `<script type="application/ld+json" id="rf-jsonld">${json}</script>`;
}

function serializeHead(model: HeadModel): string {
  const tags = [
    `<title>${esc(model.title)}</title>`,
    `<meta name="description" content="${esc(model.description)}" />`,
    `<link rel="canonical" href="${esc(model.canonical)}" />`,
    `<meta property="og:title" content="${esc(model.title)}" />`,
    `<meta property="og:description" content="${esc(model.description)}" />`,
    `<meta property="og:url" content="${esc(model.canonical)}" />`,
    `<meta property="og:type" content="${model.ogType}" />`,
    `<meta property="og:image" content="${esc(model.image)}" />`,
    `<meta property="og:site_name" content="Roman Forge" />`,
  ];
  if (model.publishedTime) {
    tags.push(
      `<meta property="article:published_time" content="${esc(model.publishedTime)}" />`,
    );
  }
  if (model.modifiedTime) {
    tags.push(
      `<meta property="article:modified_time" content="${esc(model.modifiedTime)}" />`,
    );
  }
  if (model.authorName) {
    tags.push(
      `<meta property="article:author" content="${esc(model.authorName)}" />`,
    );
  }
  tags.push(
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${esc(model.title)}" />`,
    `<meta name="twitter:description" content="${esc(model.description)}" />`,
    `<meta name="twitter:image" content="${esc(model.image)}" />`,
  );
  if (model.robots)
    tags.push(`<meta name="robots" content="${esc(model.robots)}" />`);
  tags.push(jsonLdScript(model.jsonLd));
  return tags.join("\n    ");
}

function staticHead(pathname: string): HeadModel | null {
  const seo = seoFor(pathname);
  if (!seo) return null;
  return {
    title: seo.title,
    description: seo.description,
    canonical: seo.canonical,
    ogType: "website",
    image: SOCIAL_IMAGE,
    jsonLd: structuredData,
  };
}

function absoluteImage(url?: string): string {
  if (!url) return SOCIAL_IMAGE;
  if (url.startsWith("https://") || url.startsWith("http://")) return url;
  if (url.startsWith("/")) return `${SITE_ORIGIN}${url}`;
  return SOCIAL_IMAGE;
}

function stamp(value?: string): string | undefined {
  if (!value || Number.isNaN(Date.parse(value))) return undefined;
  return value;
}

export function postHead(post: Post): HeadModel {
  const title = postTitle(post);
  const description = postDescription(post);
  const canonical = canonicalUrl(`/blog/${post.slug.current}`);
  const authorName = post.author?.name?.trim() || "Jacob Roman";
  const publishedTime = stamp(post.publishedAt);
  const modifiedTime = stamp(post.updatedAt) || publishedTime;
  const article = {
    "@type": ["BlogPosting", "Article"],
    "@id": `${canonical}#article`,
    headline: title,
    description,
    url: canonical,
    mainEntityOfPage: canonical,
    image: absoluteImage(post.mainImage?.asset?.url),
    inLanguage: "en",
    ...(publishedTime ? { datePublished: publishedTime } : {}),
    ...(modifiedTime ? { dateModified: modifiedTime } : {}),
    author: post.author?.name
      ? { "@type": "Person", name: authorName }
      : { "@id": "https://romanforge.dev/#jacob-roman" },
    publisher: { "@id": "https://romanforge.dev/#organization" },
    isPartOf: {
      "@type": "Blog",
      name: "The Forge Journal",
      url: `${SITE_ORIGIN}/blog`,
    },
    ...(post.categories?.length
      ? { articleSection: post.categories.map((category) => category.title) }
      : {}),
  };
  const breadcrumb = {
    "@type": "BreadcrumbList",
    "@id": `${canonical}#breadcrumb`,
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: `${SITE_ORIGIN}/`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "The Forge Journal",
        item: `${SITE_ORIGIN}/blog`,
      },
      { "@type": "ListItem", position: 3, name: title, item: canonical },
    ],
  };
  return {
    title,
    description,
    canonical,
    ogType: "article",
    image: absoluteImage(post.mainImage?.asset?.url),
    publishedTime,
    modifiedTime,
    authorName,
    jsonLd: {
      "@context": "https://schema.org",
      "@graph": [...structuredData["@graph"], article, breadcrumb],
    },
  };
}

function missingPostHead(pathname: string): HeadModel {
  const canonical = canonicalUrl(pathname);
  return {
    title: "Journal entry not found | Roman Forge",
    description:
      "That journal entry is not on the site. Browse The Forge Journal for published posts.",
    canonical,
    ogType: "website",
    image: SOCIAL_IMAGE,
    robots: "noindex",
    jsonLd: structuredData,
  };
}

function headFor(pathname: string, posts: Post[]): HeadModel | null {
  const slug = blogSlug(pathname);
  if (slug) {
    const post = posts.find((item) => item.slug.current === slug);
    return post ? postHead(post) : missingPostHead(normalizePath(pathname));
  }
  return staticHead(pathname);
}

/** Head tags injected into each pre-rendered document. */
export function renderSeoHead(pathname: string, posts: Post[] = []): string {
  const model = headFor(pathname, posts);
  if (!model) throw new Error(`No SEO metadata for ${pathname}`);
  return serializeHead(model);
}

function setMeta(attr: "name" | "property", key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(
    `meta[${attr}="${key}"]`,
  );
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.content = content;
}

function setOrRemoveMeta(
  attr: "name" | "property",
  key: string,
  content?: string,
) {
  if (!content) {
    document.head.querySelector(`meta[${attr}="${key}"]`)?.remove();
    return;
  }
  setMeta(attr, key, content);
}

function applyHead(model: HeadModel): void {
  if (typeof document === "undefined") return;
  document.title = model.title;
  setMeta("name", "description", model.description);
  setMeta("property", "og:title", model.title);
  setMeta("property", "og:description", model.description);
  setMeta("property", "og:url", model.canonical);
  setMeta("property", "og:type", model.ogType);
  setMeta("property", "og:image", model.image);
  setMeta("property", "og:site_name", "Roman Forge");
  setMeta("name", "twitter:card", "summary_large_image");
  setMeta("name", "twitter:title", model.title);
  setMeta("name", "twitter:description", model.description);
  setMeta("name", "twitter:image", model.image);
  setOrRemoveMeta("property", "article:published_time", model.publishedTime);
  setOrRemoveMeta("property", "article:modified_time", model.modifiedTime);
  setOrRemoveMeta("property", "article:author", model.authorName);
  setOrRemoveMeta("name", "robots", model.robots);
  document.head.querySelector('meta[property="og:logo"]')?.remove();

  let canonical = document.head.querySelector<HTMLLinkElement>(
    'link[rel="canonical"]',
  );
  if (!canonical) {
    canonical = document.createElement("link");
    canonical.rel = "canonical";
    document.head.appendChild(canonical);
  }
  canonical.href = model.canonical;

  let ld = document.getElementById("rf-jsonld");
  if (!ld) {
    ld = document.createElement("script");
    ld.id = "rf-jsonld";
    ld.setAttribute("type", "application/ld+json");
    document.head.appendChild(ld);
  }
  ld.textContent = JSON.stringify(model.jsonLd);
}

/** Keep the document head in sync after client-side navigations. */
export function applySeo(pathname: string): void {
  // Post routes update the head themselves. Returning here leaves their
  // article tags in place until the next static page replaces them.
  if (blogSlug(pathname)) return;
  const model = staticHead(pathname);
  if (!model) return;
  applyHead(model);
}

export function applyPostHead(post: Post | null, pathname: string): void {
  applyHead(post ? postHead(post) : missingPostHead(pathname));
}

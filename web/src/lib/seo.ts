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

function esc(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;");
}

/** Head tags injected into each pre-rendered document. */
export function renderSeoHead(pathname: string): string {
  const seo = seoFor(pathname);
  if (!seo) throw new Error(`No SEO metadata for ${pathname}`);
  const json = JSON.stringify(structuredData, null, 2).replace(/</g, "\\u003c");
  return [
    `<title>${esc(seo.title)}</title>`,
    `<meta name="description" content="${esc(seo.description)}" />`,
    `<link rel="canonical" href="${esc(seo.canonical)}" />`,
    `<meta property="og:title" content="${esc(seo.title)}" />`,
    `<meta property="og:description" content="${esc(seo.description)}" />`,
    `<meta property="og:url" content="${esc(seo.canonical)}" />`,
    `<meta property="og:type" content="website" />`,
    `<meta property="og:image" content="${SOCIAL_IMAGE}" />`,
    `<meta property="og:site_name" content="Roman Forge" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${esc(seo.title)}" />`,
    `<meta name="twitter:description" content="${esc(seo.description)}" />`,
    `<meta name="twitter:image" content="${SOCIAL_IMAGE}" />`,
    `<script type="application/ld+json" id="rf-jsonld">${json}</script>`,
  ].join("\n    ");
}

function setMeta(attr: "name" | "property", key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.content = content;
}

/** Keep the document head in sync after client-side navigations. */
export function applySeo(pathname: string): void {
  if (typeof document === "undefined") return;
  const seo = seoFor(pathname);
  if (!seo) return;

  document.title = seo.title;
  setMeta("name", "description", seo.description);
  setMeta("property", "og:title", seo.title);
  setMeta("property", "og:description", seo.description);
  setMeta("property", "og:url", seo.canonical);
  setMeta("property", "og:type", "website");
  setMeta("property", "og:image", SOCIAL_IMAGE);
  setMeta("property", "og:site_name", "Roman Forge");
  setMeta("name", "twitter:card", "summary_large_image");
  setMeta("name", "twitter:title", seo.title);
  setMeta("name", "twitter:description", seo.description);
  setMeta("name", "twitter:image", SOCIAL_IMAGE);
  document.head.querySelector('meta[property="og:logo"]')?.remove();

  let canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!canonical) {
    canonical = document.createElement("link");
    canonical.rel = "canonical";
    document.head.appendChild(canonical);
  }
  canonical.href = seo.canonical;

  let ld = document.getElementById("rf-jsonld");
  if (!ld) {
    ld = document.createElement("script");
    ld.id = "rf-jsonld";
    ld.setAttribute("type", "application/ld+json");
    document.head.appendChild(ld);
  }
  ld.textContent = JSON.stringify(structuredData);
}

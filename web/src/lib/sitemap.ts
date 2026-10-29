type SitemapPost = {
  slug: { current: string };
  updatedAt?: string;
  publishedAt?: string;
};

const STATIC_PAGES = [
  ["/", "weekly", "1.0"],
  ["/about", "monthly", "0.8"],
  ["/services", "monthly", "0.8"],
  ["/process", "monthly", "0.7"],
  ["/blog", "weekly", "0.7"],
  ["/contact", "yearly", "0.6"],
] as const;

function urlEntry(
  loc: string,
  changefreq: string,
  priority: string,
  lastmod?: string,
): string {
  const modified = lastmod ? `\n    <lastmod>${lastmod}</lastmod>` : "";
  return `  <url>\n    <loc>${loc}</loc>${modified}\n    <changefreq>${changefreq}</changefreq>\n    <priority>${priority}</priority>\n  </url>`;
}

function dayStamp(value?: string): string | undefined {
  if (!value) return undefined;
  const day = value.slice(0, 10);
  return /^\d{4}-\d{2}-\d{2}$/.test(day) ? day : undefined;
}

/** Sitemap for the static pages plus one URL per published post. */
export function buildSitemap(posts: SitemapPost[]): string {
  const includeBlog = posts.length > 0;
  const staticEntries = STATIC_PAGES.filter(
    ([route]) => route !== "/blog" || includeBlog,
  ).map(([route, changefreq, priority]) => {
    const loc =
      route === "/"
        ? "https://romanforge.dev/"
        : `https://romanforge.dev${route}`;
    return urlEntry(loc, changefreq, priority);
  });
  const postEntries = posts.map((post) =>
    urlEntry(
      `https://romanforge.dev/blog/${post.slug.current}`,
      "monthly",
      "0.6",
      dayStamp(post.updatedAt || post.publishedAt),
    ),
  );
  const urls = [...staticEntries, ...postEntries].join("\n");
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
}

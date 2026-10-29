import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { loadSanityContent, render, STATIC_ROUTES } from "../dist-ssr/entry-server.js";

const webRoot = join(dirname(fileURLToPath(import.meta.url)), "..");
const dist = join(webRoot, "dist");
const template = readFileSync(join(dist, "index.html"), "utf8");

const SLOT_START = '<meta name="rf-seo-slot" content="start" />';
const SLOT_END = '<meta name="rf-seo-slot" content="end" />';
if (!template.includes(SLOT_START) || !template.includes(SLOT_END)) {
  throw new Error("dist/index.html is missing the SEO slot markers");
}
if (!template.includes('<div id="root"></div>')) {
  throw new Error("dist/index.html is missing an empty #root");
}

let content;
try {
  content = await loadSanityContent();
  console.log(
    `Sanity: ${content.services.length} services, ${content.industries.length} industries, ${content.faq.length} faq, ${content.processSteps.length} steps, ${content.posts.length} posts`,
  );
} catch (error) {
  console.warn("Sanity fetch failed; pre-rendering fallback copy.", error);
  content = {
    services: [],
    industries: [],
    faq: [],
    processSteps: [],
    posts: [],
  };
}

const payload = JSON.stringify(content).replace(/</g, "\\u003c");
const sanityTag = `<script type="application/json" id="rf-sanity">${payload}</script>`;
const titles = new Set();

for (const route of STATIC_ROUTES) {
  const { appHtml, headHtml } = await render(route, content);
  const start = template.indexOf(SLOT_START);
  const end = template.indexOf(SLOT_END);
  let html =
    template.slice(0, start) +
    headHtml +
    template.slice(end + SLOT_END.length);
  html = html.replace('<div id="root"></div>', `<div id="root">${appHtml}</div>`);
  if (!html.includes('id="rf-sanity"')) {
    html = html.replace(
      '<script type="module"',
      `${sanityTag}\n    <script type="module"`,
    );
  }

  const h1s = appHtml.match(/<h1[\s>]/g) ?? [];
  if (h1s.length !== 1) {
    throw new Error(`${route} rendered ${h1s.length} h1 elements`);
  }
  const title = headHtml.match(/<title>([^<]*)<\/title>/)?.[1];
  const ogTitle = headHtml.match(/property="og:title" content="([^"]*)"/)?.[1];
  const description = headHtml.match(/name="description" content="([^"]*)"/)?.[1];
  const canonical = headHtml.match(/rel="canonical" href="([^"]*)"/)?.[1];
  if (!title || !description) throw new Error(`${route} is missing title or description`);
  if (title !== ogTitle) throw new Error(`${route} title/og:title mismatch`);
  if (headHtml.includes("og:logo")) throw new Error(`${route} still has og:logo`);
  if (!headHtml.includes("application/ld+json")) throw new Error(`${route} is missing JSON-LD`);
  const expectedCanonical =
    route === "/" ? "https://romanforge.dev/" : `https://romanforge.dev${route}`;
  if (canonical !== expectedCanonical) {
    throw new Error(`${route} canonical is ${canonical}, expected ${expectedCanonical}`);
  }
  const text = appHtml.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
  if (text.length < 200) throw new Error(`${route} body text is too short`);
  if (titles.has(title)) throw new Error(`duplicate title: ${title}`);
  titles.add(title);
  if (html.includes("/vite.svg")) throw new Error(`${route} still links vite.svg`);
  if (!html.includes('href="/favicon.svg"')) throw new Error(`${route} is missing favicon.svg`);

  const outFile = route === "/" ? join(dist, "index.html") : join(dist, route.slice(1), "index.html");
  mkdirSync(dirname(outFile), { recursive: true });
  writeFileSync(outFile, html);
  console.log(`pre-rendered ${route} (${text.length} chars of text)`);
}

const year = String(new Date().getFullYear());
const home = readFileSync(join(dist, "index.html"), "utf8");
if (!home.includes(year) || !home.includes("ALL RIGHTS RESERVED")) {
  throw new Error(`footer year is not ${year}`);
}
if (content.posts.length === 0 && home.includes('href="/blog"')) {
  throw new Error("home HTML links to /blog even though there are no posts");
}
if (content.posts.length > 0 && !home.includes('href="/blog"')) {
  throw new Error("home HTML should link to /blog because posts exist");
}

const sitemapRoutes = STATIC_ROUTES.filter(
  (route) => route !== "/blog" || content.posts.length > 0,
);
const meta = {
  "/": ["weekly", "1.0"],
  "/about": ["monthly", "0.8"],
  "/services": ["monthly", "0.8"],
  "/process": ["monthly", "0.7"],
  "/blog": ["weekly", "0.7"],
  "/contact": ["yearly", "0.6"],
};
const urls = sitemapRoutes
  .map((route) => {
    const loc = route === "/" ? "https://romanforge.dev/" : `https://romanforge.dev${route}`;
    const [changefreq, priority] = meta[route];
    return `  <url>\n    <loc>${loc}</loc>\n    <changefreq>${changefreq}</changefreq>\n    <priority>${priority}</priority>\n  </url>`;
  })
  .join("\n");
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
writeFileSync(join(dist, "sitemap.xml"), sitemap);
console.log(
  `sitemap ${content.posts.length > 0 ? "includes" : "omits"} /blog (${sitemapRoutes.length} urls)`,
);

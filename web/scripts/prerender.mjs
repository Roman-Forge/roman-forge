import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import {
  buildSitemap,
  getBlogPost,
  isSafeSlug,
  loadSanityContent,
  render,
  STATIC_ROUTES,
} from "../dist-ssr/entry-server.js";

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
  const detail = error instanceof Error ? error.message : String(error);
  console.warn(`Sanity fetch failed; pre-rendering fallback copy. ${detail}`);
  content = {
    services: [],
    industries: [],
    faq: [],
    processSteps: [],
    posts: [],
  };
}

const publishedPosts = [];
for (const summary of content.posts) {
  const slug = summary?.slug?.current;
  if (!summary?.title || !isSafeSlug(slug ?? "")) {
    console.warn(`Skipping a post with no title or an unsafe slug (${slug ?? "missing"})`);
    continue;
  }
  let post = summary;
  try {
    const full = await getBlogPost(slug);
    if (full) post = { ...summary, ...full, slug: { current: slug } };
  } catch (error) {
    const detail = error instanceof Error ? error.message : String(error);
    console.warn(`Post ${slug} body could not be loaded; pre-rendering the summary. ${detail}`);
  }
  publishedPosts.push(post);
}

const summaries = publishedPosts.map((post) => {
  if (!post.body) return post;
  const { body: _body, ...rest } = post;
  return rest;
});
const baseContent = { ...content, posts: summaries };
const routes = STATIC_ROUTES.map((route) => ({ route, content: baseContent }));
for (const post of publishedPosts) {
  routes.push({
    route: `/blog/${post.slug.current}`,
    content: {
      ...baseContent,
      posts: summaries.map((item) => (item.slug.current === post.slug.current ? post : item)),
    },
  });
}

const titles = new Set();

for (const { route, content: pageContent } of routes) {
  const { appHtml, headHtml } = await render(route, pageContent);
  const payload = JSON.stringify(pageContent).replace(/</g, "\\u003c");
  const sanityTag = `<script type="application/json" id="rf-sanity">${payload}</script>`;
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
  if (route.startsWith("/blog/")) {
    if (!headHtml.includes("BlogPosting") || !headHtml.includes("Article")) {
      throw new Error(`${route} is missing Article/BlogPosting JSON-LD`);
    }
    if (!headHtml.includes('property="og:type" content="article"')) {
      throw new Error(`${route} og:type should be article`);
    }
  } else if (headHtml.includes('content="article"')) {
    throw new Error(`${route} should stay og:type website`);
  }
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
if (publishedPosts.length === 0 && home.includes('href="/blog"')) {
  throw new Error("home HTML links to /blog even though there are no posts");
}
if (publishedPosts.length > 0 && !home.includes('href="/blog"')) {
  throw new Error("home HTML should link to /blog because posts exist");
}

const sitemap = buildSitemap(publishedPosts);
writeFileSync(join(dist, "sitemap.xml"), sitemap);
const blogInSitemap = publishedPosts.length > 0;
console.log(
  `sitemap ${blogInSitemap ? "includes" : "omits"} /blog and lists ${publishedPosts.length} posts`,
);

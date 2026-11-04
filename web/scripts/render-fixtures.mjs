/**
 * Render the local draft fixtures through the production SSR bundle.
 * Does not write into dist/ and does not talk to Sanity.
 *
 *   node scripts/render-fixtures.mjs
 *
 * Requires `npm run build` first (so dist-ssr exists) and
 * fixtures/draft-posts.json (gitignored; unpublished drafts).
 */
import { mkdirSync, readFileSync, readdirSync, statSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { loadFixturePosts } from "./blog-fixtures.mjs";

const webRoot = join(dirname(fileURLToPath(import.meta.url)), "..");
const outDir = join(webRoot, "fixture-preview");
const { render, renderSeoHead, buildSitemap } = await import("../dist-ssr/entry-server.js");

const posts = loadFixturePosts();
const content = {
  services: [],
  industries: [],
  faq: [],
  processSteps: [],
  posts,
};

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

function decode(value) {
  return value
    .replace(/&quot;/g, '"')
    .replace(/&lt;/g, "<")
    .replace(/&amp;/g, "&");
}

const emptySitemap = buildSitemap([]);
assert(!emptySitemap.includes("/blog"), "empty sitemap should omit /blog");
const fullSitemap = buildSitemap(posts);
assert(fullSitemap.includes("https://romanforge.dev/blog<"), "sitemap should include the journal index");
for (const post of posts) {
  assert(
    fullSitemap.includes(`https://romanforge.dev/blog/${post.slug.current}<`),
    `sitemap missing ${post.slug.current}`,
  );
}

mkdirSync(outDir, { recursive: true });

const pages = [
  { route: "/blog", file: "blog.html" },
  ...posts.map((post) => ({
    route: `/blog/${post.slug.current}`,
    file: `${post.slug.current}.html`,
    post,
  })),
  { route: "/blog/not-a-real-post", file: "missing.html" },
];

for (const page of pages) {
  const pageContent = page.post
    ? {
        ...content,
        posts: posts.map((item) => (item.slug.current === page.post.slug.current ? page.post : { ...item, body: undefined })),
      }
    : content;
  const { appHtml, headHtml } = await render(page.route, pageContent);
  const html = `<!doctype html><html><head>\n${headHtml}\n</head><body><div id="root">${appHtml}</div></body></html>\n`;
  writeFileSync(join(outDir, page.file), html);
  const h1s = appHtml.match(/<h1[\s>]/g) ?? [];
  assert(h1s.length === 1, `${page.route} rendered ${h1s.length} h1 elements`);
  const text = appHtml.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
  assert(text.length > 80, `${page.route} looks blank (${text.length} chars)`);
  console.log(`fixture ${page.route} (${text.length} chars)`);
}

const lansing = posts.find((post) => post.slug.current === "ai-consultant-lansing");
const lansingHtml = readFileSync(join(outDir, "ai-consultant-lansing.html"), "utf8");
assert(lansingHtml.includes(`<title>${lansing.title}</title>`), "title should fall back to the post title");
assert(lansingHtml.includes('property="og:type" content="article"'), "og:type article");
assert(
  lansingHtml.includes('rel="canonical" href="https://romanforge.dev/blog/ai-consultant-lansing"'),
  "canonical",
);
assert(lansingHtml.includes("BlogPosting") && lansingHtml.includes("Article"), "json-ld types");
assert(lansingHtml.includes("<ul"), "bullet list");
assert(lansingHtml.includes("<ol"), "numbered list");
assert(lansingHtml.includes("<strong"), "bold");
assert(lansingHtml.includes("<em"), "italic");
assert(lansingHtml.includes('href="https://calendly.com/jacobroman1115/30min"'), "link");
assert(lansingHtml.includes("<h2"), "heading");
const description = decode(
  lansingHtml.match(/name="description" content="([^"]*)"/)?.[1] ?? "",
);
assert(description.startsWith("If you run a business"), `unexpected description: ${description}`);
assert(description.length <= 160, `description is ${description.length} chars`);

const override = renderSeoHead("/blog/ai-consultant-lansing", [
  {
    ...lansing,
    seoTitle: "Custom SEO Title",
    metaDescription: "Custom meta description for the fixture.",
  },
]);
assert(override.includes("<title>Custom SEO Title</title>"), "seoTitle override");
assert(
  override.includes('name="description" content="Custom meta description for the fixture."'),
  "metaDescription override",
);

const indexHtml = readFileSync(join(outDir, "blog.html"), "utf8");
assert(indexHtml.includes('href="/blog/demo-dental-intake-assistant"'), "list links to the case study");
assert(indexHtml.includes(">Case studies<"), "list can filter case studies");
assert(/Case study(?!s)/.test(indexHtml), "case study badge");
assert(indexHtml.includes("If you run a business"), "list shows the excerpt fallback");

const missing = readFileSync(join(outDir, "missing.html"), "utf8");
assert(missing.includes("That journal entry is not on the site"), "missing slug is not blank");
assert(missing.includes('name="robots" content="noindex"'), "missing slug is noindex");

function walk(dir, found) {
  for (const name of readdirSync(dir)) {
    const path = join(dir, name);
    if (statSync(path).isDirectory()) walk(path, found);
    else if (/\.(html|js|css|json)$/.test(name)) found.push(path);
  }
  return found;
}

const dist = join(webRoot, "dist");
try {
  const leaks = walk(dist, []).filter((file) =>
    readFileSync(file, "utf8").includes("ai-consultant-lansing"),
  );
  assert(leaks.length === 0, `draft slug leaked into dist: ${leaks.join(", ")}`);
} catch (error) {
  if (error && error.code !== "ENOENT") throw error;
}

console.log(`fixture preview written to ${outDir}`);

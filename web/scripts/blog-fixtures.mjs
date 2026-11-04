import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const webRoot = join(dirname(fileURLToPath(import.meta.url)), "..");

export function fixtureFile() {
  return join(webRoot, "fixtures", "draft-posts.json");
}

function spanText(block) {
  return (block?.children ?? []).map((child) => child?.text ?? "").join("");
}

function leadOf(body) {
  const block = (body ?? []).find(
    (item) => item?._type === "block" && item.style === "normal" && !item.listItem,
  );
  return spanText(block).replace(/\s+/g, " ").trim();
}

function numberedList() {
  const item = (key, text, marks = [], markDefs = []) => ({
    _key: key,
    _type: "block",
    style: "normal",
    listItem: "number",
    level: 1,
    markDefs,
    children: [{ _key: `${key}-span`, _type: "span", marks, text }],
  });
  return [
    {
      _key: "fixture-numbered-heading",
      _type: "block",
      style: "h2",
      markDefs: [],
      children: [
        {
          _key: "fixture-numbered-heading-span",
          _type: "span",
          marks: [],
          text: "A numbered list",
        },
      ],
    },
    item("fixture-n1", "Find the work worth automating.", ["strong"]),
    item("fixture-n2", "Build it into the tools the team already uses.", ["em"]),
    item("fixture-n3", "Ask a question before booking a call.", ["fixlink"], [
      { _key: "fixlink", _type: "link", href: "https://romanforge.dev/contact" },
    ]),
  ];
}

/**
 * Maps raw Sanity draft documents into the shape the site renders.
 * The dental demo is tagged as a case study here only — the draft has no
 * category, and this script does not write anything back to Sanity.
 * The Lansing draft has no listItem "number" blocks, so one numbered list
 * is appended to prove the renderer emits an ordered list.
 */
export function postsFromDocuments(documents) {
  return documents.map((doc) => {
    const slug = doc?.slug?.current;
    const body = Array.isArray(doc?.body) ? doc.body.map((block) => ({ ...block })) : [];
    if (slug === "ai-consultant-lansing") body.push(...numberedList());
    return {
      _id: doc._id,
      title: doc.title,
      slug: { current: slug },
      lead: leadOf(doc.body),
      publishedAt: doc.publishedAt,
      updatedAt: doc._updatedAt,
      categories:
        slug === "demo-dental-intake-assistant"
          ? [{ title: "Case Study", slug: "case-study" }]
          : undefined,
      body,
    };
  });
}

export function loadFixturePosts() {
  const raw = JSON.parse(readFileSync(fixtureFile(), "utf8"));
  if (!Array.isArray(raw)) throw new Error("fixtures/draft-posts.json must be an array");
  return postsFromDocuments(raw);
}

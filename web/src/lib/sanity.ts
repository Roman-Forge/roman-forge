import { createClient } from "@sanity/client";

export const sanityClient = createClient({
  projectId: "482ktczc",
  dataset: "production",
  apiVersion: "2024-01-01",
  useCdn: true,
});

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
  slug: { current: string };
  excerpt?: string;
  publishedAt?: string;
  mainImage?: {
    asset: { url: string };
    alt?: string;
  };
  author?: {
    name: string;
    image?: { asset: { url: string } };
  };
  categories?: Array<{ title: string }>;
}

/* ═══════════════════════════════════════════
   QUERY HELPERS
═══════════════════════════════════════════ */
export async function getServices(): Promise<Service[]> {
  return sanityClient.fetch(
    `*[_type == "service"] | order(order asc) {
      _id, num, title, slug, iconName, description, order
    }`
  );
}

export async function getProcessSteps(): Promise<ProcessStep[]> {
  return sanityClient.fetch(
    `*[_type == "processStep"] | order(order asc) {
      _id, num, title, description, timeline, order
    }`
  );
}

export async function getIndustries(): Promise<Industry[]> {
  return sanityClient.fetch(
    `*[_type == "industry"] | order(order asc) {
      _id, icon, title, description, order
    }`
  );
}

export async function getFAQ(): Promise<FAQItem[]> {
  return sanityClient.fetch(
    `*[_type == "faqItem"] | order(order asc) {
      _id, question, answer, order
    }`
  );
}

export async function getBlogPosts(): Promise<Post[]> {
  return sanityClient.fetch(
    `*[_type == "post"] | order(publishedAt desc) {
      _id, title, slug, excerpt, publishedAt,
      mainImage { asset->{ url }, alt },
      author->{ name, image { asset->{ url } } },
      categories[]->{ title }
    }`
  );
}

export async function getBlogPost(slug: string): Promise<Post | null> {
  return sanityClient.fetch(
    `*[_type == "post" && slug.current == $slug][0] {
      _id, title, slug, excerpt, publishedAt,
      mainImage { asset->{ url }, alt },
      author->{ name, image { asset->{ url } } },
      categories[]->{ title }
    }`,
    { slug }
  );
}

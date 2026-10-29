import { useEffect, useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { T, mono, cormorant, dm } from "../components/design";
import { PortableTextBody } from "../components/PortableTextBody";
import { getBlogPost, type Post } from "../lib/sanity";
import { useSanity } from "../components/SanityProvider";
import { applyPostHead, blogSlug } from "../lib/seo";
import { cardExcerpt, formatPostDate, isCaseStudy } from "../lib/posts";

const paragraphFallback = {
  ...dm,
  fontSize: "1.05rem",
  lineHeight: 1.75,
  color: T.text,
};

function kicker(label: string) {
  return (
    <div
      className="flex items-center gap-2 mb-4 text-[0.65rem] uppercase tracking-[0.25em]"
      style={{ ...mono, color: T.gold }}
    >
      <span className="w-6 h-px" style={{ background: T.gold }} />
      {label}
    </div>
  );
}

export default function BlogPostPage() {
  const pathname = useRouterState({
    select: (state) => state.location.pathname,
  });
  const slug = blogSlug(pathname) ?? "";
  const { posts, ready } = useSanity();
  const summary = posts.find((post) => post.slug.current === slug);
  const [fetched, setFetched] = useState<Post | null | undefined>(undefined);

  useEffect(() => {
    if (!slug) return;
    let cancelled = false;
    getBlogPost(slug)
      .then((post) => {
        if (!cancelled) setFetched(post);
      })
      .catch(() => {
        // Keep the pre-rendered copy when the refresh fails.
      });
    return () => {
      cancelled = true;
    };
  }, [slug]);

  const post = fetched === undefined ? summary : (fetched ?? undefined);

  useEffect(() => {
    if (!slug) return;
    if (fetched === undefined && !summary && !ready) return;
    applyPostHead(post ?? null, pathname);
  }, [slug, pathname, post, fetched, summary, ready]);

  if (!post && !ready) {
    return (
      <div className="container mx-auto mt-2 py-20 max-w-3xl">
        <h1 style={{ ...cormorant, fontSize: "3rem", color: T.text }}>
          Loading journal entry
        </h1>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="container mx-auto mt-2 py-20 max-w-3xl">
        {kicker("Journal")}
        <h1
          className="text-5xl font-medium leading-tight mb-4"
          style={{ ...cormorant, color: T.text }}
        >
          That journal entry is not on the site
        </h1>
        <p
          className="mb-8"
          style={{
            ...dm,
            fontSize: "1.05rem",
            lineHeight: 1.7,
            color: T.textMuted,
          }}
        >
          It may have been renamed or it has not been published yet.
        </p>
        <Link
          to="/blog"
          className="no-underline"
          style={{ ...mono, fontSize: "0.75rem", color: T.gold }}
        >
          Back to The Forge Journal
        </Link>
      </div>
    );
  }

  const dateLabel = post.publishedAt ? formatPostDate(post.publishedAt) : "";
  const excerpt = post.excerpt?.trim() || "";
  const hasBody = Array.isArray(post.body) && post.body.length > 0;

  return (
    <div className="container mx-auto mt-2 py-16">
      <article className="max-w-3xl">
        <Link
          to="/blog"
          activeOptions={{ exact: true }}
          className="no-underline inline-block mb-8"
          style={{
            ...mono,
            fontSize: "0.7rem",
            color: T.gold,
            letterSpacing: "0.08em",
          }}
        >
          The Forge Journal
        </Link>
        {kicker(isCaseStudy(post) ? "Case study" : "Journal")}
        <h1
          className="text-4xl md:text-5xl font-medium leading-tight mb-4"
          style={{ ...cormorant, color: T.text }}
        >
          {post.title}
        </h1>
        <p
          className="mb-8"
          style={{ ...mono, fontSize: "0.72rem", color: T.textDim }}
        >
          <span>{post.author?.name ?? "Roman Forge"}</span>
          {dateLabel && post.publishedAt && (
            <>
              <span aria-hidden="true"> · </span>
              <time dateTime={post.publishedAt}>{dateLabel}</time>
            </>
          )}
        </p>
        {post.mainImage?.asset?.url && (
          <img
            src={post.mainImage.asset.url}
            alt={post.mainImage.alt ?? post.title}
            className="w-full h-auto mb-8"
          />
        )}
        {excerpt && (
          <p
            className="mb-8"
            style={{
              ...dm,
              fontSize: "1.15rem",
              lineHeight: 1.7,
              color: T.textMuted,
            }}
          >
            {excerpt}
          </p>
        )}
        {hasBody ? (
          <PortableTextBody value={post.body} />
        ) : (
          <p style={paragraphFallback}>
            {cardExcerpt(post) || "Loading this entry…"}
          </p>
        )}
      </article>
    </div>
  );
}

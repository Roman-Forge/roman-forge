import { useEffect, useState } from "react";
import { T, mono, cormorant, dm, SectionHeader, Reveal } from "../components/design";
import { getBlogPosts, type Post } from "../lib/sanity";

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
}

export default function BlogPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getBlogPosts()
      .then((data) => setPosts(data ?? []))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      {/* ══════ PAGE HERO ══════ */}
      <div className="container mx-auto mt-2 py-20">
        <SectionHeader
          tag="Insights"
          title="The Forge Journal"
          desc="Practical AI implementation guides, case studies, and engineering insights from the Roman Forge team."
        />
      </div>

      {/* ══════ POSTS GRID ══════ */}
      <div className="container mx-auto pb-20">
        {loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px">
            {[1, 2, 3].map((i) => (
              <div key={i} className="p-8 bracket-corners" style={{ border: `1px solid ${T.border}`, background: T.bgCard }}>
                <div className="h-40 mb-4 animate-pulse" style={{ background: T.bgElevated }} />
                <div className="h-3 mb-2 w-2/3 animate-pulse" style={{ background: T.bgElevated }} />
                <div className="h-3 w-full animate-pulse" style={{ background: T.bgElevated }} />
              </div>
            ))}
          </div>
        )}

        {!loading && posts.length === 0 && (
          <div
            className="text-center py-20 bracket-corners"
            style={{ border: `1px solid ${T.border}`, background: T.bgCard }}
          >
            <p style={{ ...mono, fontSize: "0.8rem", color: T.textDim }}>
              No posts published yet. Check back soon.
            </p>
          </div>
        )}

        {!loading && posts.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post, i) => (
              <Reveal key={post._id} delay={i * 70}>
                <div
                  className="h-full flex flex-col transition-colors duration-300 hover-card bracket-corners"
                  style={{ border: `1px solid ${T.border}`, marginRight: -1, marginBottom: -1, background: T.bgCard }}
                >
                  {/* Image */}
                  {post.mainImage?.asset?.url ? (
                    <div className="h-44 overflow-hidden">
                      <img
                        src={post.mainImage.asset.url}
                        alt={post.mainImage.alt ?? post.title}
                        className="w-full h-full object-cover"
                        style={{ filter: "brightness(0.85)" }}
                      />
                    </div>
                  ) : (
                    <div
                      className="h-44 flex items-center justify-center"
                      style={{ background: T.bgElevated, borderBottom: `1px solid ${T.border}` }}
                    >
                      <span style={{ ...cormorant, fontSize: "4rem", color: T.gold, opacity: 0.1 }}>RF</span>
                    </div>
                  )}

                  <div className="p-6 flex flex-col flex-1">
                    {/* Categories */}
                    {post.categories && post.categories.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mb-3">
                        {post.categories.map((cat) => (
                          <span
                            key={cat.title}
                            style={{
                              ...mono,
                              fontSize: "0.55rem",
                              padding: "0.2rem 0.5rem",
                              border: `1px solid ${T.border}`,
                              color: T.gold,
                              letterSpacing: "0.1em",
                              textTransform: "uppercase",
                            }}
                          >
                            {cat.title}
                          </span>
                        ))}
                      </div>
                    )}

                    <h2
                      className="font-semibold mb-2 flex-1"
                      style={{ ...dm, fontSize: "1.05rem", lineHeight: 1.4, color: T.text }}
                    >
                      {post.title}
                    </h2>

                    {post.excerpt && (
                      <p
                        className="mb-4"
                        style={{ ...mono, fontSize: "0.72rem", lineHeight: 1.7, color: T.textDim }}
                      >
                        {post.excerpt}
                      </p>
                    )}

                    {/* Meta */}
                    <div
                      className="flex items-center justify-between mt-auto pt-4"
                      style={{ borderTop: `1px solid ${T.border}` }}
                    >
                      <span style={{ ...mono, fontSize: "0.65rem", color: T.textDim }}>
                        {post.author?.name ?? "Roman Forge"}
                      </span>
                      {post.publishedAt && (
                        <span style={{ ...mono, fontSize: "0.65rem", color: T.textDim }}>
                          {formatDate(post.publishedAt)}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

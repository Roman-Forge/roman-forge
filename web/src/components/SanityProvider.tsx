import { createContext, useContext, useEffect, useState } from "react";
import {
  EMPTY_CONTENT,
  loadSanityContent,
  readBootContent,
  type SanityContent,
} from "../lib/sanityContent";
import type { Post } from "../lib/sanity";

type SanityState = {
  content: SanityContent;
  ready: boolean;
};

const SanityContext = createContext<SanityState>({
  content: EMPTY_CONTENT,
  ready: false,
});

function mergePosts(previous: Post[], next: Post[]): Post[] {
  const prior = new Map(previous.map((post) => [post.slug.current, post]));
  return next.map((post) => {
    const earlier = prior.get(post.slug.current);
    if (post.body || !earlier?.body) return post;
    return { ...post, body: earlier.body };
  });
}

export function SanityProvider({
  initial,
  children,
}: {
  initial: SanityContent | null;
  children: React.ReactNode;
}) {
  const [state, setState] = useState<SanityState>(() => {
    if (initial) return { content: initial, ready: true };
    const boot = readBootContent();
    if (boot) return { content: boot, ready: true };
    return { content: EMPTY_CONTENT, ready: false };
  });

  useEffect(() => {
    let cancelled = false;
    loadSanityContent()
      .then((content) => {
        if (cancelled) return;
        setState((current) => ({
          content: {
            ...content,
            posts: mergePosts(current.content.posts, content.posts),
          },
          ready: true,
        }));
      })
      .catch(() => {
        if (!cancelled) setState((current) => ({ ...current, ready: true }));
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <SanityContext.Provider value={state}>{children}</SanityContext.Provider>
  );
}

export function useSanity(): SanityContent & { ready: boolean } {
  const { content, ready } = useContext(SanityContext);
  return { ...content, ready };
}

import { createContext, useContext, useEffect, useState } from "react";
import {
  EMPTY_CONTENT,
  loadSanityContent,
  readBootContent,
  type SanityContent,
} from "../lib/sanityContent";

type SanityState = {
  content: SanityContent;
  ready: boolean;
};

const SanityContext = createContext<SanityState>({
  content: EMPTY_CONTENT,
  ready: false,
});

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
        if (!cancelled) setState({ content, ready: true });
      })
      .catch(() => {
        if (!cancelled) setState((current) => ({ ...current, ready: true }));
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return <SanityContext.Provider value={state}>{children}</SanityContext.Provider>;
}

export function useSanity(): SanityContent & { ready: boolean } {
  const { content, ready } = useContext(SanityContext);
  return { ...content, ready };
}

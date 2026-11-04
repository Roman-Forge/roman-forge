import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react";

/**
 * Pages v2 runs Node 18, which parses PostHog's ESM `.js` files as CommonJS.
 * Vite externalizes that import in the prerender bundle, so `node` crashes
 * before any HTML is written. Analytics is client-only; the server build
 * gets a passthrough provider.
 */
function stubPosthogOnServer(): Plugin {
  const stubId = "\0posthog-ssr-stub";
  return {
    name: "stub-posthog-ssr",
    enforce: "pre",
    resolveId(id, _importer, options) {
      if (!options?.ssr) return null;
      if (
        id === "posthog-js" ||
        id === "posthog-js/react" ||
        id.startsWith("posthog-js/")
      ) {
        return stubId;
      }
      return null;
    },
    load(id) {
      if (id !== stubId) return null;
      return [
        "export function PostHogProvider(props) { return props.children; }",
        "export function usePostHog() { return undefined; }",
        "const posthog = {};",
        "export default posthog;",
      ].join("\n");
    },
  };
}

// https://vitejs.dev/config/
export default defineConfig(async () => {
  const plugins: Plugin[] = [react(), stubPosthogOnServer()];
  // Draft fixtures are a local dev server only. Production builds never load them.
  if (
    process.env.NODE_ENV !== "production" &&
    process.env.VITE_BLOG_FIXTURES === "1"
  ) {
    const mod = (await import("./scripts/blog-fixtures-plugin.mjs")) as {
      blogFixtureDevPlugin: () => Plugin;
    };
    plugins.push(mod.blogFixtureDevPlugin());
  }
  return {
    plugins,
    optimizeDeps: {
      include: ["@sanity/client"],
    },
    server: {
      proxy: {
        "/api": "http://localhost:8788",
      },
    },
    ssr: {
      noExternal: ["@portabletext/react", "@portabletext/toolkit"],
    },
  };
});

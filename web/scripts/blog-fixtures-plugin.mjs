import { loadFixturePosts } from "./blog-fixtures.mjs";

/** Dev server only. `vite.config.ts` adds this when VITE_BLOG_FIXTURES=1 and NODE_ENV is not production. */
export function blogFixtureDevPlugin() {
  return {
    name: "blog-fixture-dev",
    apply: "serve",
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        const url = req.url?.split("?")[0];
        if (url !== "/__blog_fixtures.json") return next();
        try {
          const posts = loadFixturePosts();
          res.setHeader("Content-Type", "application/json");
          res.setHeader("Cache-Control", "no-store");
          res.end(JSON.stringify(posts));
        } catch (error) {
          res.statusCode = 404;
          res.end(error instanceof Error ? error.message : "fixtures unavailable");
        }
      });
    },
  };
}

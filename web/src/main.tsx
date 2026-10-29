import { createRoot, hydrateRoot } from "react-dom/client";
import { createBrowserHistory } from "@tanstack/react-router";
import { AppTree } from "./AppTree";
import { createAppRouter } from "./router";
import "./index.css";

const router = createAppRouter(createBrowserHistory());

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

const el = document.getElementById("root");
if (!el) throw new Error("Root element not found");

const tree = <AppTree router={router} sanity={null} />;

if (el.childElementCount > 0) {
  // The pre-render runs with TanStack's server build, which wraps Matches in a
  // fragment. On the client that same wrapper is Suspense unless router.ssr is
  // set, and that extra boundary fails hydration. Load first so the initial
  // client render already has the resolved route instead of a pending fallback.
  router.ssr = { manifest: undefined };
  void router.load().then(() => {
    hydrateRoot(el, tree);
  });
} else {
  createRoot(el).render(tree);
}

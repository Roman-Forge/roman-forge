import { renderToString } from "react-dom/server";
import { createMemoryHistory } from "@tanstack/react-router";
import { AppTree } from "./AppTree";
import { createAppRouter, STATIC_ROUTES } from "./router";
import { loadSanityContent, type SanityContent } from "./lib/sanityContent";
import { renderSeoHead } from "./lib/seo";

export { STATIC_ROUTES, loadSanityContent, renderSeoHead };

export async function render(url: string, content: SanityContent) {
  const router = createAppRouter(createMemoryHistory({ initialEntries: [url] }));
  await router.load();
  const appHtml = renderToString(<AppTree router={router} sanity={content} />);
  const headHtml = renderSeoHead(url);
  return { appHtml, headHtml };
}

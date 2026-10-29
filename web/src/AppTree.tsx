import { StrictMode } from "react";
import { RouterProvider } from "@tanstack/react-router";
import { PostHogProvider } from "posthog-js/react";
import { ThemeProvider } from "./lib/theme";
import { SanityProvider } from "./components/SanityProvider";
import { createAppRouter } from "./router";
import type { SanityContent } from "./lib/sanityContent";

const apiHost = import.meta.env.VITE_REACT_APP_PUBLIC_POSTHOG_HOST;
const apiKey = import.meta.env.VITE_REACT_APP_PUBLIC_POSTHOG_KEY;
const posthogOptions = { api_host: apiHost };

type AppRouter = ReturnType<typeof createAppRouter>;

export function AppTree({
  router,
  sanity,
}: {
  router: AppRouter;
  sanity: SanityContent | null;
}) {
  const routed = <RouterProvider router={router} />;
  return (
    <StrictMode>
      <ThemeProvider>
        <SanityProvider initial={sanity}>
          {apiKey ? (
            <PostHogProvider apiKey={apiKey} options={posthogOptions}>
              {routed}
            </PostHogProvider>
          ) : (
            routed
          )}
        </SanityProvider>
      </ThemeProvider>
    </StrictMode>
  );
}

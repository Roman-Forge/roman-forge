import { useFeatureFlagEnabled } from "posthog-js/react";
import App from "../App";
import HomePage from "../components/HomePage";

export default function Index() {
  const flagEnabled = useFeatureFlagEnabled("test-flag");

  if (
    (flagEnabled && window.location.origin === "https://forge-5v1.pages.dev") ||
    import.meta.env.VITE_FEATURE_LAUNCH === "true"
  ) {
    return <HomePage />;
  }

  return <App />;
}

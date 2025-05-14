import { useFeatureFlagEnabled } from "posthog-js/react"
import App from "../App";
import HomePage from "../components/HomePage";

export default function Index() {
    const flagEnabled = useFeatureFlagEnabled('test-flag');
    console.log("flagEnabled", flagEnabled);
    console.log("LOCATIONB", window.location.origin)
    console.log("LOCAL", import.meta.env.VITE_FEATURE_LAUNCH === 'true');

    if (flagEnabled && window.location.origin === 'https://forge-5v1.pages.dev' || import.meta.env.VITE_FEATURE_LAUNCH === 'true' ) {
        console.log('THIS RENDERED')
        return <HomePage />
    }

    return <App />
}
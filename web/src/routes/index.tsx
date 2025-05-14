import { useFeatureFlagEnabled } from "posthog-js/react"
import App from "../App";
import HomePage from "../components/HomePage";

export default function Index() {
    const flagEnabled = useFeatureFlagEnabled('test-flag');
    console.log('FLAG', flagEnabled);
    console.log('LOCAL', import.meta.env.VITE_FEATURE_LAUNCH);
    console.log('URL', window.location);

    if (flagEnabled && window.location.origin === 'https://forge-5v1.pages.dev/' || import.meta.env.VITE_FEATURE_LAUNCH === 'true' ) {
        return <HomePage />
    }

    return <App />
}
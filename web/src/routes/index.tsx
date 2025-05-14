import { useFeatureFlagEnabled } from "posthog-js/react"
import App from "../App";
import HomePage from "../components/HomePage";

export default function Index() {
    const flagEnabled = useFeatureFlagEnabled('test-flag');
    console.log('FLAG', flagEnabled);
    console.log('LOCAL', import.meta.env.VITE_FEATURE_LAUNCH);

    if (flagEnabled || import.meta.env.VITE_FEATURE_LAUNCH === 'true') {
        return <HomePage />
    }

    return <App />
}
import React from 'react';
import GradientBackground from './components/GradientBackground';
import ComingSoon from './components/ComingSoon';
import { useFeatureFlagEnabled } from 'posthog-js/react';

function App() {
  const flagEnabled = useFeatureFlagEnabled('test-flag');

  if (flagEnabled) {
    return (
      <div>Hello world</div>
    )
  }

  return (
    <GradientBackground>
      <div className="min-h-screen flex flex-col items-center justify-center p-6">
        <ComingSoon />
      </div>
    </GradientBackground>
  );
}

export default App;
import React from 'react';
import GradientBackground from './components/GradientBackground';
import ComingSoon from './components/ComingSoon';

function App() {
  return (
    <GradientBackground>
      <div className="min-h-screen flex flex-col items-center justify-center p-6">
        <ComingSoon />
      </div>
    </GradientBackground>
  );
}

export default App;
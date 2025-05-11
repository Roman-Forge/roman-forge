import React from 'react';

interface GradientBackgroundProps {
  children: React.ReactNode;
}

const GradientBackground: React.FC<GradientBackgroundProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#060B14] via-[#12403C] to-[#0D2E2B] relative overflow-hidden">
      {/* Animated gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-tr from-[#0D2E2B]/20 via-[#12403C]/10 to-[#060B14]/30 opacity-70 animate-gradient-shift" />
      
      {/* Main content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};

export default GradientBackground;
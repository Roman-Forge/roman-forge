import React, { useEffect, useState } from 'react';
import Logo from './Logo';

const ComingSoon: React.FC = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(true);
    }, 300);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div 
      className={`flex flex-col items-center justify-center transition-opacity duration-1000 ease-in-out ${
        visible ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <Logo />
      
      <h1 className="mt-8 text-4xl md:text-6xl font-light text-white tracking-wider">
        COMING SOON
      </h1>
      
      <p className="mt-4 text-md md:text-xl text-white/80 max-w-md text-center px-4">
        We're working on something exciting. Stay tuned for our launch.
      </p>
      
      <div className="mt-12 flex flex-col items-center">
        <div className="inline-flex items-center justify-center relative overflow-hidden group">
          <input 
            type="email" 
            placeholder="Enter your email" 
            className="px-6 py-3 w-64 md:w-80 rounded-full bg-white/10 backdrop-blur-sm text-white border border-white/20 focus:outline-none focus:ring-2 focus:ring-[#12403C]/50 transition-all"
          />
          <button className="absolute right-1 rounded-full px-4 py-2 bg-[#12403C] text-white hover:bg-[#0D2E2B] transition-all duration-200">
            Notify Me
          </button>
        </div>
        <p className="text-white/60 text-xs mt-2">
          We'll notify you when we launch.
        </p>
      </div>
    </div>
  );
};

export default ComingSoon;
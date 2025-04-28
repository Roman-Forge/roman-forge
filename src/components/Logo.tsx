import React from 'react';
import { Gem } from 'lucide-react';

const Logo: React.FC = () => {
  return (
    <div className="flex items-center justify-center">
      <Gem size={72} className="text-white animate-pulse" />
    </div>
  );
};

export default Logo;
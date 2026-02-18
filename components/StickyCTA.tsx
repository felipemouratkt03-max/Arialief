
import React, { useState, useEffect } from 'react';
import { CONFIG } from '../config';

export const StickyCTA: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show after scrolling 500px
      if (window.scrollY > 500) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 p-4 z-[100] sm:hidden animate-in fade-in slide-in-from-bottom-4 duration-300">
      <a 
        href={CONFIG.affiliateLink}
        target="_blank"
        rel="noopener noreferrer"
        className="block w-full bg-green-500 text-white font-black text-center py-4 rounded-2xl shadow-[0_10px_40px_rgba(34,197,94,0.4)] active:scale-95 transition-transform cursor-pointer"
      >
        RECLAIM YOUR MOBILITY NOW →
      </a>
    </div>
  );
};

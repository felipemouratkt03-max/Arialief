
import React, { useState, useEffect } from 'react';
import { CONFIG } from '../config';
import { CtaButton } from './CtaButton.tsx';

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
      <CtaButton text="RECLAIM YOUR MOBILITY NOW →" size="lg" className="w-full !rounded-2xl" />
    </div>
  );
};

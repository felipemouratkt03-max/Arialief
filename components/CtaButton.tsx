
import React from 'react';
import { CONFIG } from '../config';

interface CtaButtonProps {
  text: string;
  className?: string;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export const CtaButton: React.FC<CtaButtonProps> = ({ 
  text, 
  className = '', 
  variant = 'primary',
  size = 'md'
}) => {
  const baseStyles = "inline-flex items-center justify-center font-black uppercase tracking-widest transition-all duration-300 transform hover:-translate-y-1 active:scale-95 cursor-pointer relative";
  
  const variants = {
    primary: "bg-green-500 hover:bg-green-400 text-white shadow-lg",
    secondary: "bg-slate-900 hover:bg-slate-800 text-white shadow-xl",
    outline: "bg-transparent border-2 border-slate-200 hover:border-slate-900 text-slate-900 hover:bg-slate-50"
  };

  const sizes = {
    sm: "px-6 py-3 text-[10px] rounded-lg",
    md: "px-8 py-4 text-sm rounded-xl",
    lg: "px-10 py-5 text-base rounded-2xl",
    xl: "px-12 py-6 text-xl rounded-[2rem]"
  };

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    window.open(CONFIG.affiliateLink, '_blank', 'noopener,noreferrer');
    console.log('CTA Clicked (forced):', CONFIG.affiliateLink);
  };

  return (
    <button 
      onClick={handleClick}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      style={{ 
        display: className.includes('w-full') ? 'flex' : 'inline-flex',
        minWidth: 'fit-content'
      }}
    >
      {text}
    </button>
  );
};


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
  const baseStyles = "inline-flex items-center justify-center font-black uppercase tracking-widest transition-all duration-300 transform hover:-translate-y-1 active:scale-95 cursor-pointer relative z-[60]";
  
  const variants = {
    primary: "bg-green-500 hover:bg-green-400 text-white shadow-[0_10px_40px_rgba(34,197,94,0.4)] hover:shadow-[0_15px_50px_rgba(34,197,94,0.5)] animate-pulse-subtle",
    secondary: "bg-slate-900 hover:bg-slate-800 text-white shadow-xl",
    outline: "bg-transparent border-2 border-slate-200 hover:border-slate-900 text-slate-900 hover:bg-slate-50"
  };

  const sizes = {
    sm: "px-6 py-3 text-[10px] rounded-lg",
    md: "px-8 py-4 text-sm rounded-xl",
    lg: "px-10 py-5 text-base rounded-2xl",
    xl: "px-12 py-6 text-xl rounded-[2rem]"
  };

  return (
    <a 
      href={CONFIG.affiliateLink}
      target="_blank"
      rel="noopener noreferrer"
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
    >
      {text}
    </a>
  );
};

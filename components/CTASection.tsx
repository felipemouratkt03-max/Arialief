
import React from 'react';
import { CONFIG } from '../config';

export const CTASection: React.FC = () => {
  return (
    <div className="mt-16 space-y-8">
      <div className="bg-slate-900 rounded-[2rem] p-8 md:p-12 text-center text-white relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-1/2 bg-green-500/10 blur-[100px] pointer-events-none" />
        
        <h2 className="text-2xl md:text-4xl font-black mb-6 leading-tight relative z-10">
          Ready to Experience Relief?
        </h2>
        <p className="text-slate-400 text-lg md:text-xl mb-8 max-w-2xl mx-auto leading-relaxed relative z-10">
          Join the thousands of men and women who have reclaimed their mobility and peace of mind using this science-backed, natural nerve support formula.
        </p>
        
        <div className="relative z-10">
          <a 
            href={CONFIG.affiliateLink}
            className="inline-block w-full sm:w-auto bg-green-600 hover:bg-green-500 text-white font-black text-xl px-8 py-4 rounded-xl transition-all duration-300 shadow-[0_10px_30px_rgba(22,163,74,0.2)] transform hover:-translate-y-1"
          >
            YES — I Want to Try This Formula
          </a>
        </div>
        
        <p className="mt-8 text-[10px] text-slate-500 font-medium tracking-widest relative z-10 uppercase">
          Official Research and Ordering Page
        </p>
      </div>
    </div>
  );
};
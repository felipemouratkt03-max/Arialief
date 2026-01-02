
import React from 'react';
import { CONFIG } from '../config';

export const CTASection: React.FC = () => {
  return (
    <div className="mt-24 space-y-12">
      <div className="bg-slate-900 rounded-[3rem] p-10 md:p-16 text-center text-white relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-1/2 bg-green-500/10 blur-[100px] pointer-events-none" />
        
        <h2 className="text-3xl md:text-5xl font-black mb-8 leading-tight relative z-10">
          Ready to Experience Relief?
        </h2>
        <p className="text-slate-400 text-xl md:text-2xl mb-12 max-w-2xl mx-auto leading-relaxed relative z-10">
          Join the thousands of men and women who have reclaimed their mobility and peace of mind using this science-backed, natural nerve support formula.
        </p>
        
        <div className="relative z-10">
          <a 
            href={CONFIG.affiliateLink}
            className="inline-block w-full sm:w-auto bg-green-600 hover:bg-green-500 text-white font-black text-2xl px-12 py-7 rounded-2xl transition-all duration-300 shadow-[0_20px_50px_rgba(22,163,74,0.3)] transform hover:-translate-y-2"
          >
            YES — I Want to Try This Natural Nerve Support Formula
          </a>
        </div>
        
        <p className="mt-10 text-sm text-slate-500 font-medium tracking-wide relative z-10 uppercase">
          Official Research and Ordering Page
        </p>
      </div>
    </div>
  );
};
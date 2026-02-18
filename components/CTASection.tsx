
import React from 'react';
import { CONFIG } from '../config';
import { CtaButton } from './CtaButton.tsx';

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
        
        <div className="relative z-20 flex flex-col sm:flex-row items-center justify-center gap-4">
          <CtaButton text="GET RELIEF NOW →" size="lg" className="w-full sm:w-auto" />
          <CtaButton text="Watch Video" variant="outline" size="lg" className="w-full sm:w-auto !text-white !border-white/20 hover:!border-white/40" />
        </div>
        
        <p className="mt-8 text-[9px] text-slate-500 font-bold tracking-[0.2em] relative z-10 uppercase opacity-60">
          Official Research and Ordering Page
        </p>
      </div>
    </div>
  );
};
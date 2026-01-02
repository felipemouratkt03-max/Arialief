
import React from 'react';
import { IMAGE_URLS } from '../App';

export const CTASection: React.FC = () => {
  const affiliateLink = "https://bg.arialief.com/vd/?aff_id=47003";

  return (
    <div className="mt-24 space-y-12">
      <div className="bg-slate-900 rounded-[3rem] p-10 md:p-16 text-center text-white relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-1/2 bg-blue-500/10 blur-[100px] pointer-events-none" />
        <h2 className="text-3xl md:text-5xl font-black mb-8 leading-tight relative z-10">
          Ready to Experience Relief?
        </h2>
        <div className="relative z-10">
          <a 
            href={affiliateLink}
            className="inline-block w-full sm:w-auto bg-blue-600 hover:bg-blue-500 text-white font-black text-2xl px-12 py-7 rounded-2xl transition-all duration-300 shadow-[0_20px_50px_rgba(37,99,235,0.3)] transform hover:-translate-y-2"
          >
            YES — I Want to Try This Natural Nerve Support Formula
          </a>
        </div>
        <p className="mt-10 text-sm text-slate-500 font-medium tracking-wide relative z-10 uppercase">
          Official Research and Ordering Page
        </p>
      </div>

      <div className="space-y-4">
        <div className="relative overflow-hidden rounded-3xl shadow-lg max-w-xl mx-auto border-4 border-white bg-slate-100">
          <img 
            src={IMAGE_URLS.confident_relief} 
            alt="Confident relief" 
            className="w-full h-[400px] object-cover transition-opacity duration-500"
            onLoad={(e) => (e.currentTarget.style.opacity = '1')}
            style={{ opacity: 0 }}
          />
        </div>
        <p className="text-[10px] text-slate-300 uppercase tracking-widest font-bold text-center">
          [Image Prompt]: A calm, confident older adult holding a natural supplement bottle with quiet hope.
        </p>
      </div>
    </div>
  );
};

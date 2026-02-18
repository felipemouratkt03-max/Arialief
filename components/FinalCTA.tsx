
import React from 'react';
import { CONFIG } from '../config';

export const FinalCTA: React.FC = () => {
  return (
    <div className="w-full py-16 px-4 bg-green-50 border-y border-green-100 mt-12">
      <div className="max-w-3xl mx-auto text-center space-y-8">
        <h2 className="text-3xl md:text-4xl font-black text-slate-900 leading-tight">
          Don't Wait for the Fire to Return
        </h2>
        <p className="text-slate-600 text-lg md:text-xl leading-relaxed">
          Take the first step toward reclaiming your life today. Join thousands who have found relief with our natural formula.
        </p>
        <div className="pt-4">
          <a 
            href={CONFIG.affiliateLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block w-full sm:w-auto bg-green-600 hover:bg-green-500 text-white font-black text-2xl px-12 py-6 rounded-2xl transition-all duration-300 shadow-[0_20px_50px_rgba(22,163,74,0.3)] transform hover:-translate-y-2 text-center"
          >
            YES! I WANT RELIEF NOW →
          </a>
        </div>
        <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">
          100% Satisfaction Guarantee • Secure Checkout
        </p>
      </div>
    </div>
  );
};

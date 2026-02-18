
import React from 'react';
import { CONFIG } from '../config';
import { CtaButton } from './CtaButton.tsx';

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
          <CtaButton text="YES! I WANT RELIEF NOW →" size="xl" className="w-full sm:w-auto" />
        </div>
        <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">
          100% Satisfaction Guarantee • Secure Checkout
        </p>
      </div>
    </div>
  );
};

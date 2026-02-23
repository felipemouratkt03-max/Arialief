
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
        <div className="pt-4 flex flex-col items-center space-y-6">
          <CtaButton text="YES! I WANT RELIEF NOW →" size="xl" className="w-full sm:w-auto" />
          
          <div className="flex flex-col items-center space-y-4">
            <div className="flex items-center justify-center space-x-3 bg-white px-6 py-3 rounded-full shadow-md border border-green-100 transform hover:scale-105 transition-transform">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <span className="text-sm font-black text-slate-900 uppercase tracking-widest">100% Satisfaction Guarantee</span>
            </div>
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-[0.2em]">
              Secure Checkout • 60-Day Money Back
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};


import React from 'react';

export const Header: React.FC = () => {
  return (
    <header className="w-full bg-white/80 backdrop-blur-md border-b border-slate-100 sticky top-0 z-50">
      <div className="max-w-4xl mx-auto px-6 h-20 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-slate-900 rounded-xl flex items-center justify-center shadow-lg transform -rotate-3">
            <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <span className="font-black text-slate-900 text-xl tracking-tight">NerveHealth <span className="text-green-600">Insights</span></span>
        </div>
        <div className="hidden sm:flex items-center space-x-8 text-[11px] font-black text-slate-400 uppercase tracking-widest">
          <span className="hover:text-slate-900 transition-colors cursor-pointer">Stories</span>
          <span className="hover:text-slate-900 transition-colors cursor-pointer">Science</span>
          <span className="hover:text-slate-900 transition-colors cursor-pointer">Community</span>
        </div>
      </div>
    </header>
  );
};
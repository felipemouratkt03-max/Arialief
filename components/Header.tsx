
import React from 'react';

export const Header: React.FC = () => {
  return (
    <header className="w-full bg-white border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-4xl mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <span className="font-bold text-gray-800 text-lg tracking-tight">NerveHealth Insights</span>
        </div>
        <div className="hidden sm:flex items-center space-x-6 text-sm font-medium text-gray-500">
          <span>Patient Stories</span>
          <span>Health Blog</span>
          <span>Research</span>
        </div>
      </div>
    </header>
  );
};


import React from 'react';

export const CTASection: React.FC = () => {
  const affiliateLink = "https://bg.arialief.com/vd/?aff_id=47003";

  return (
    <div className="mt-16 bg-gray-900 rounded-2xl p-8 md:p-12 text-center text-white">
      <h2 className="text-2xl md:text-4xl font-bold mb-6">Ready to Experience Relief?</h2>
      <p className="text-gray-300 text-lg md:text-xl mb-10 max-w-2xl mx-auto">
        Join the thousands of men and women who have reclaimed their mobility and peace of mind using this science-backed, natural nerve support formula.
      </p>
      
      <a 
        href={affiliateLink}
        className="inline-block w-full sm:w-auto bg-blue-600 hover:bg-blue-500 text-white font-bold text-xl px-8 py-5 rounded-lg transition-colors duration-200 shadow-lg transform hover:-translate-y-1"
      >
        YES — I Want to Try This Natural Nerve Support Formula
      </a>
      
      <p className="mt-6 text-sm text-gray-400">
        Clicking the button above will take you to the official research and ordering page.
      </p>
    </div>
  );
};


import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-white border-t border-gray-100 py-12 mt-12">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <p className="text-gray-400 text-sm mb-4">
          © {new Date().getFullYear()} NerveHealth Insights. All rights reserved.
        </p>
        <div className="flex justify-center space-x-6 text-xs font-medium text-gray-400">
          <a href="#" className="hover:text-blue-600">Privacy Policy</a>
          <a href="#" className="hover:text-blue-600">Terms of Service</a>
          <a href="#" className="hover:text-blue-600">Contact Us</a>
        </div>
        <p className="mt-8 text-[10px] text-gray-300 max-w-xl mx-auto leading-relaxed">
          The information provided on this website is for educational purposes only and is not intended as a substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of your physician or other qualified health provider with any questions you may have regarding a medical condition.
        </p>
      </div>
    </footer>
  );
};

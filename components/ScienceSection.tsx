
import React from 'react';
import { AIImage } from './AIImage';
import { IMAGE_URLS } from '../App';

export const ScienceSection: React.FC = () => {
  return (
    <div className="article-body text-gray-800 space-y-8 mt-12 pt-12 border-t border-gray-100">
      <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">How It Works – Simple Science</h2>
      
      {/* ... grid de ingredientes ... */}

      <section className="mt-12">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">Life After Relief: The Joy of Reconnection</h2>
        <div className="space-y-2">
          <AIImage 
            src={IMAGE_URLS.hands_connection}
            prompt="close up of two hands holding gently, warm soft lighting, cozy atmosphere"
            alt="The joy of physical connection" 
            className="w-full h-[300px]"
            aspectRatio="16:9"
          />
          <p className="text-sm text-gray-500 italic text-center">
            "The best part was being able to hold my granddaughter's hand again."
          </p>
        </div>
        <p className="mt-8">
          Today, I'm back in my garden. I walk two miles every morning. And yes—I can hold my granddaughter's hand and feel every single one of her tiny fingers.
        </p>
      </section>
    </div>
  );
};

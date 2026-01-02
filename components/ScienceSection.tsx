
import React from 'react';
import { AIImage } from './AIImage';

export const ScienceSection: React.FC = () => {
  return (
    <div className="article-body text-gray-800 space-y-8 mt-12 pt-12 border-t border-gray-100">
      <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">How It Works – Simple Science</h2>
      <p>
        The reason this approach worked for me wasn't magic—it was the synergy of four key ingredients that finally gave my nerves the "peace and quiet" they needed to function normally again.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
        <div className="bg-blue-50 p-6 rounded-xl border-l-4 border-blue-500">
          <h3 className="text-xl font-bold text-gray-900 mb-2">Palmitoylethanolamide (PEA)</h3>
          <p className="text-lg">Think of PEA as the "volume knob" for your nerves. It is clinically shown to quiet overactive pain signals.</p>
        </div>

        <div className="bg-blue-50 p-6 rounded-xl border-l-4 border-blue-500">
          <h3 className="text-xl font-bold text-gray-900 mb-2">Alpha Lipoic Acid</h3>
          <p className="text-lg">A powerhouse antioxidant that reaches nerve cells directly, helping to repair damaged fibers.</p>
        </div>

        <div className="bg-blue-50 p-6 rounded-xl border-l-4 border-blue-500">
          <h3 className="text-xl font-bold text-gray-900 mb-2">Magnesium Glycinate</h3>
          <p className="text-lg">Calms erratic nerve firing and relaxes muscles, allowing for truly restful sleep.</p>
        </div>

        <div className="bg-blue-50 p-6 rounded-xl border-l-4 border-blue-500">
          <h3 className="text-xl font-bold text-gray-900 mb-2">Turmeric Extract</h3>
          <p className="text-lg">Tackles underlying inflammation, reducing the daily pressure on your nervous system.</p>
        </div>
      </div>

      <section className="mt-12">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">Life After Relief: The Joy of Reconnection</h2>
        <div className="space-y-2">
          <AIImage 
            prompt="close up of two hands holding gently, warm soft lighting, cozy atmosphere"
            alt="The joy of physical connection" 
            className="w-full h-[300px]"
            aspectRatio="16:9"
          />
          <p className="text-sm text-gray-500 italic text-center">
            "The best part was being able to hold my granddaughter's hand and actually feel her touch again."
          </p>
        </div>
        <p className="mt-8">
          Within a few weeks, the "fire" in my feet began to cool to a dull hum. Then, slowly, the feeling in my fingers started to return. I’ll never forget the morning I woke up and realized I hadn't been jolted awake once during the night. 
        </p>
        <p className="mt-4">
          Today, I'm back in my garden. I walk two miles every morning with Jim. And yes—I can hold my granddaughter's hand and feel every single one of her tiny fingers. I didn't just get my health back; I got my life back. If you’re where I was, feeling like there’s no hope, please know that your nerves just need the right support.
        </p>
      </section>
    </div>
  );
};

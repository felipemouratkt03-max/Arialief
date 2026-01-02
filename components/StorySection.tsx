
import React from 'react';
import { AIImage } from './AIImage';
import { IMAGE_URLS } from '../App';

export const StorySection: React.FC = () => {
  return (
    <div className="article-body text-slate-800 space-y-10">
      <div className="space-y-4">
        <AIImage 
          src={IMAGE_URLS.garden_story}
          prompt="a peaceful senior woman smiling gently in a sun-drenched morning English garden, lush flowers, morning mist, warm sunlight"
          alt="Peaceful morning in the garden" 
          className="w-full h-[350px] md:h-[500px]"
          aspectRatio="16:9"
        />
        <p className="text-sm text-slate-400 italic text-center font-medium">
          "The morning I finally felt like myself again, back where I belong."
        </p>
      </div>

      <section>
        <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-8 tracking-tight">The Daily Struggle: When Every Step Feels Like Glass</h2>
        <p>
          I remember the exact moment I realized I was losing my independence. It wasn't a sudden fall or a dramatic injury. It was simply the morning I tried to pour a cup of coffee and the mug slipped right through my fingers. My hand didn't feel like my own; it was just a mass of heavy, buzzing numbness.
        </p>
        <p className="mt-6">
          For years, my feet felt like they were constantly on fire. Every night, the "electric shocks" would start—sharp, jolting stabs that made sleep impossible. During the day, it was the opposite: a deep, hollow numbness that made me feel like I was <strong>walking on pins</strong>.
        </p>
      </section>
      
      {/* ... restante do conteúdo ... */}
    </div>
  );
};


import React from 'react';
import { CONFIG } from '../config';

export const Hero: React.FC = () => {
  return (
    <section className="text-center space-y-8">
      <div className="inline-block px-4 py-1.5 bg-green-50 text-green-600 text-xs font-bold uppercase tracking-[0.2em] rounded-full">
        Real User Story
      </div>
      <h1 className="text-4xl md:text-6xl font-black text-slate-900 leading-tight tracking-tight">
        For Years, I Thought I’d Never Feel the Grass Beneath My Bare Feet Again…
      </h1>
      <p className="text-slate-500 text-xl md:text-2xl font-medium max-w-3xl mx-auto italic leading-relaxed">
        "I’ll never forget the morning the fire finally went out. This is how I reclaimed my mobility after years of 'walking on pins'."
      </p>
      
      {CONFIG.images.hero && (
        <div className="mt-12">
          <div className="relative overflow-hidden rounded-[2rem] shadow-xl border border-white bg-slate-100">
            <img 
              src={CONFIG.images.hero} 
              alt="Bare feet touching morning grass" 
              className="w-full h-[400px] md:h-[600px] object-cover transition-opacity duration-500"
              onLoad={(e) => (e.currentTarget.style.opacity = '1')}
              style={{ opacity: 0 }}
            />
          </div>
        </div>
      )}
    </section>
  );
};
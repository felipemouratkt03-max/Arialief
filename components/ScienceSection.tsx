
import React from 'react';
import { IMAGE_URLS } from '../App';

export const ScienceSection: React.FC = () => {
  return (
    <div className="article-body text-slate-800 space-y-16 mt-20 pt-20 border-t border-slate-100">
      <section>
        <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-8 leading-tight">Simple Science – Calming the Storm Within</h2>
        <div className="space-y-6">
          <p>
            My nerves weren't just "broken"—they were starving for the right nutrients. I learned about a specific combination of four powerhouses:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
            <div className="bg-slate-50 p-8 rounded-[2rem] border border-slate-100">
              <h3 className="text-xl font-black text-slate-900 mb-3">PEA (Palmitoylethanolamide)</h3>
              <p className="mt-4 text-slate-700">This naturally occurring compound helps quiet down overactive nerves, essentially turning down the "volume" on buzzing signals.</p>
            </div>
            <div className="bg-slate-50 p-8 rounded-[2rem] border border-slate-100">
              <h3 className="text-xl font-black text-slate-900 mb-3">Alpha Lipoic Acid</h3>
              <p className="mt-4 text-slate-700">A potent antioxidant that providing the essential support needed for long-term nerve health.</p>
            </div>
          </div>
        </div>
        <div className="mt-12 space-y-4">
          <div className="relative overflow-hidden rounded-3xl shadow-lg bg-slate-100">
            <img 
              src={IMAGE_URLS.science_flatlay} 
              alt="Natural supplement flat lay" 
              className="w-full h-[350px] object-cover transition-opacity duration-500"
              onLoad={(e) => (e.currentTarget.style.opacity = '1')}
              style={{ opacity: 0 }}
            />
          </div>
          <p className="text-[10px] text-slate-300 uppercase tracking-widest font-bold text-center">
            [Image Prompt]: A clean flat-lay: natural supplement capsules next to whole-food ingredients like turmeric and greens.
          </p>
        </div>
      </section>

      <section>
        <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-8 leading-tight">Reconnecting With What Matters Most</h2>
        <div className="space-y-6">
          <p>
            I’ll never forget the first time I picked up my granddaughter again. I could feel her soft sweater and the grip of her tiny fingers. I wasn't just observing her; I was <strong>connecting</strong> with her.
          </p>
        </div>
        <div className="mt-12 space-y-4">
          <div className="relative overflow-hidden rounded-[2rem] shadow-xl bg-slate-100">
            <img 
              src={IMAGE_URLS.joy_connection} 
              alt="Joyful connection with child" 
              className="w-full h-[500px] object-cover transition-opacity duration-500"
              onLoad={(e) => (e.currentTarget.style.opacity = '1')}
              style={{ opacity: 0 }}
            />
          </div>
          <p className="text-[10px] text-slate-300 uppercase tracking-widest font-bold text-center">
            [Image Prompt]: An older woman laughing while holding a toddler’s hands in a backyard garden.
          </p>
        </div>
      </section>
    </div>
  );
};

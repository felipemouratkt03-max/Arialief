
import React from 'react';

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
            <div className="bg-slate-50 p-8 rounded-[2rem] border border-slate-100">
              <h3 className="text-xl font-black text-slate-900 mb-3">Magnesium Glycinate</h3>
              <p className="mt-4 text-slate-700">Crucial for calming erratic nerve firing, letting you finally sleep through the night.</p>
            </div>
            <div className="bg-slate-50 p-8 rounded-[2rem] border border-slate-100">
              <h3 className="text-xl font-black text-slate-900 mb-3">Turmeric Extract</h3>
              <p className="mt-4 text-slate-700">Supports a healthy inflammatory response, reducing daily pressure on your nerves.</p>
            </div>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-8 leading-tight">Reconnecting With What Matters Most</h2>
        <div className="space-y-6">
          <p>
            Within a few weeks of consistent support, the "buzzing" in my feet started to fade. It wasn't an overnight miracle, but it was real progress. The "fire" cooled to a dull hum, and eventually, the hum disappeared altogether. 
          </p>
          <p>
            I’ll never forget the first time I picked up my granddaughter again. I could feel her soft sweater and the grip of her tiny fingers. I wasn't just observing her; I was <strong>connecting</strong> with her.
          </p>
          <p>
            Now, I’m back in my garden every morning. I’m walking two miles a day. And most importantly, I’m not living in fear of my own body anymore.
          </p>
        </div>
      </section>
    </div>
  );
};

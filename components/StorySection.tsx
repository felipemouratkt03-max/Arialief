
import React from 'react';
import { IMAGE_URLS } from '../App';

export const StorySection: React.FC = () => {
  return (
    <div className="article-body text-slate-800 space-y-16">
      <section>
        <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-8 leading-tight">The Daily Struggle: When Every Step Feels Like Glass</h2>
        <div className="space-y-6">
          <p>
            I used to love my morning walks. But slowly, almost imperceptibly, those walks became a chore. Then they became a burden. Eventually, they became a nightmare. 
          </p>
          <p>
            It started as a faint tingling—like my feet had "fallen asleep" and were taking forever to wake up. But by the time I hit 60, that tingling had turned into a relentless, burning sensation. Every step felt like I was <strong>walking on broken glass</strong>. 
          </p>
          <p>
            The nights were the worst. I’d lay in bed, exhausted, but as soon as the sheets touched my feet, the "electric shocks" would start. Sharp, jolting stabs that would make me sit bolt upright in the dark. I felt like a prisoner in my own skin.
          </p>
        </div>
        <div className="mt-12 space-y-4">
          <div className="relative overflow-hidden rounded-3xl shadow-lg bg-slate-100">
            <img 
              src={IMAGE_URLS.night_pain} 
              alt="Discomfort at night" 
              className="w-full h-[350px] object-cover transition-opacity duration-500"
              onLoad={(e) => (e.currentTarget.style.opacity = '1')}
              style={{ opacity: 0 }}
            />
          </div>
          <p className="text-[10px] text-slate-300 uppercase tracking-widest font-bold text-center">
            [Image Prompt]: An older man sitting on the edge of his bed at night, one hand gripping his calf in discomfort.
          </p>
        </div>
      </section>

      <section>
        <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-8 leading-tight">Failed Solutions: The "Just Live With It" Trap</h2>
        <div className="space-y-6">
          <p>
            I see specialists, underwent testing, and walked away with a mountain of prescriptions. Some of those little white pills made me so groggy I felt like I was living underwater. I couldn't drive, I couldn't focus on a book, and I certainly didn't feel like "me."
          </p>
          <p>
            Then there were the creams. Greasy, menthol-scented ointments that promised instant relief but only left me with ruined socks and a sticky mess. Every doctor visit ended the same way: a sympathetic nod.
          </p>
        </div>
        <div className="mt-12 space-y-4">
          <div className="relative overflow-hidden rounded-3xl shadow-lg bg-slate-100">
            <img 
              src={IMAGE_URLS.bathroom_clutter} 
              alt="Frustration with failed solutions" 
              className="w-full h-[350px] object-cover transition-opacity duration-500"
              onLoad={(e) => (e.currentTarget.style.opacity = '1')}
              style={{ opacity: 0 }}
            />
          </div>
          <p className="text-[10px] text-slate-300 uppercase tracking-widest font-bold text-center">
            [Image Prompt]: A cluttered bathroom counter with medicine bottles and frustrated woman.
          </p>
        </div>
      </section>

      <section>
        <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-8 leading-tight">The Turning Point: A Simple Suggestion on a Sunlit Porch</h2>
        <div className="space-y-6">
          <p>
            The breakthrough didn't happen in a sterile clinic. It happened on my neighbor Martha's porch. Martha, who had dealt with her own share of health hurdles, looked at me with a knowing smile. 
          </p>
          <p>
            "Sarah," she said, "most of what they give us is just trying to mask the noise. Why not try to fix the wiring instead?"
          </p>
          <p>
            She told me about a specific, science-backed approach she’d discovered—one that used natural compounds to calm the overactive nerves. For the first time in years, I felt a flicker of real hope.
          </p>
        </div>
        <div className="mt-12 space-y-4">
          <div className="relative overflow-hidden rounded-3xl shadow-lg bg-slate-100">
            <img 
              src={IMAGE_URLS.porch_talk} 
              alt="Friends sharing advice" 
              className="w-full h-[400px] object-cover transition-opacity duration-500"
              onLoad={(e) => (e.currentTarget.style.opacity = '1')}
              style={{ opacity: 0 }}
            />
          </div>
          <p className="text-[10px] text-slate-300 uppercase tracking-widest font-bold text-center">
            [Image Prompt]: Two older women sitting on a sunlit porch, one handing a small natural bottle to the other.
          </p>
        </div>
      </section>
    </div>
  );
};

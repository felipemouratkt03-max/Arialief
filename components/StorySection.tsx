
import React from 'react';
import { AIImage } from './AIImage';

export const StorySection: React.FC = () => {
  return (
    <div className="article-body text-slate-800 space-y-10">
      <div className="space-y-4">
        <AIImage 
          prompt="a peaceful senior woman smiling gently in a sun-drenched morning English garden, lush flowers, morning mist, warm sunlight, 8k resolution"
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
          For years, my feet felt like they were constantly on fire. Every night, the "electric shocks" would start—sharp, jolting stabs that made sleep impossible. During the day, it was the opposite: a deep, hollow numbness that made me feel like I was <strong>walking on pins</strong>. I stopped gardening. I stopped going for walks with my husband, Jim. Most heartbreaking of all, I became afraid to pick up my 3-year-old granddaughter. I couldn't feel where my hands ended and her little body began. I felt isolated, frustrated, and deeply alone in my own skin.
        </p>
      </section>

      <section>
        <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-8 tracking-tight">Failed Solutions: The "Just Live With It" Trap</h2>
        <p>
          I did what everyone does. I went to the specialists. They gave me prescription after prescription. Some made me so drowsy I couldn't drive; others left me in a thick "brain fog" that made me feel like I was underwater. 
        </p>
        <p className="mt-6">
          Then came the creams. Greasy, smelly ointments that did nothing but ruin my socks. Every doctor I spoke to seemed to have the same shrug-of-the-shoulders attitude: <em>"It's just part of getting older, Sarah. You have to learn to live with it."</em> I refused to believe that my golden years were destined to be spent in a recliner, dreading every movement.
        </p>
      </section>

      <section>
        <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-8 tracking-tight">The Turning Point: A Neurologist’s Offhand Comment</h2>
        <p>
          The breakthrough didn't come from a miracle cure or a late-night infomercial. It came during a follow-up visit with a new neurologist. As I was walking out, defeated, she mentioned that most conventional approaches only mask the symptoms—they don't actually support the nerve fibers themselves.
        </p>
        <p className="mt-6 border-l-4 border-blue-500 pl-6 py-2 bg-blue-50/50 rounded-r-lg">
          She pointed me toward recent research on "calming" the nervous system from the inside out using specific naturally occurring compounds. I was skeptical, of course. I had tried "natural" things before. But I saw the logic in it. I decided to try one last thing—a science-backed formula that focused on <strong>repair and inflammatory response</strong> rather than just numbing the pain.
        </p>
      </section>
    </div>
  );
};

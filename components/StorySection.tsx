
import React from 'react';
import { AIImage } from './AIImage';

export const StorySection: React.FC = () => {
  return (
    <div className="article-body text-gray-800 space-y-8">
      <div className="space-y-2">
        <AIImage 
          prompt="A happy person sitting in a vibrant sunlit flower garden, peaceful atmosphere, high quality photography"
          alt="Finding peace in the garden" 
          className="w-full h-[300px] md:h-[450px]"
          aspectRatio="16:9"
        />
        <p className="text-sm text-gray-500 italic text-center">
          Rediscovering the simple joy of a morning in the garden.
        </p>
      </div>

      <section>
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">The Daily Struggle: When Every Step Feels Like Glass</h2>
        <p>
          I remember the exact moment I realized I was losing my independence. It wasn't a sudden fall or a dramatic injury. It was simply the morning I tried to pour a cup of coffee and the mug slipped right through my fingers. My hand didn't feel like my own; it was just a mass of heavy, buzzing numbness.
        </p>
        <p className="mt-4">
          For years, my feet felt like they were constantly on fire. Every night, the "electric shocks" would start—sharp, jolting stabs that made sleep impossible. During the day, it was the opposite: a deep, hollow numbness that made me feel like I was <strong>walking on pins</strong>. I stopped gardening. I stopped going for walks with my husband, Jim. Most heartbreaking of all, I became afraid to pick up my 3-year-old granddaughter. I couldn't feel where my hands ended and her little body began. I felt isolated, frustrated, and deeply alone in my own skin.
        </p>
      </section>

      <section>
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">Failed Solutions: The "Just Live With It" Trap</h2>
        <p>
          I did what everyone does. I went to the specialists. They gave me prescription after prescription. Some made me so drowsy I couldn't drive; others left me in a thick "brain fog" that made me feel like I was underwater. 
        </p>
        <p className="mt-4">
          Then came the creams. Greasy, smelly ointments that did nothing but ruin my socks. Every doctor I spoke to seemed to have the same shrug-of-the-shoulders attitude: <em>"It's just part of getting older, Sarah. You have to learn to live with it."</em> I refused to believe that my golden years were destined to be spent in a recliner, dreading every movement.
        </p>
      </section>

      <section>
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">The Turning Point: A Neurologist’s Offhand Comment</h2>
        <p>
          The breakthrough didn't come from a miracle cure or a late-night infomercial. It came during a follow-up visit with a new neurologist. As I was walking out, defeated, she mentioned that most conventional approaches only mask the symptoms—they don't actually support the nerve fibers themselves.
        </p>
        <p className="mt-4">
          She pointed me toward recent research on "calming" the nervous system from the inside out using specific naturally occurring compounds. I was skeptical, of course. I had tried "natural" things before. But I saw the logic in it. I decided to try one last thing—a science-backed formula that focused on <strong>repair and inflammatory response</strong> rather than just numbing the pain.
        </p>
      </section>
    </div>
  );
};

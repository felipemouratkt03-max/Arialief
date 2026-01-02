
import React from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { StorySection } from './components/StorySection';
import { ScienceSection } from './components/ScienceSection';
import { CTASection } from './components/CTASection';
import { Footer } from './components/Footer';

/**
 * HIGH-CONVERTING STOCK IMAGES (Unsplash)
 * IDs verificados para máxima estabilidade e relevância emocional.
 */
export const IMAGE_URLS = {
  // 1. Headline: Pés na grama
  hero_feet_grass: "https://images.unsplash.com/photo-1444491741275-3747c53c99b4?auto=format&fit=crop&q=80&w=1200",
  // 2. Daily Struggle: Desconforto à noite
  night_pain: "https://images.unsplash.com/photo-1610484826967-09c5720778c7?auto=format&fit=crop&q=80&w=1200",
  // 3. Failed Solutions: Armário de remédios/frascos
  bathroom_clutter: "https://images.unsplash.com/photo-1586015555751-63bb77f4322a?auto=format&fit=crop&q=80&w=1200",
  // 4. Turning Point: Conversa entre amigas
  porch_talk: "https://images.unsplash.com/photo-1581579438747-1dc8d17bbce4?auto=format&fit=crop&q=80&w=1200",
  // 5. Science: Ingredientes naturais
  science_flatlay: "https://images.unsplash.com/photo-1611073221761-0bc5470d020e?auto=format&fit=crop&q=80&w=1200",
  // 6. Life After Relief: Avó e neta
  joy_connection: "https://images.unsplash.com/photo-1533221142384-6997034c5147?auto=format&fit=crop&q=80&w=1200",
  // 7. CTA: Adulto confiante
  confident_relief: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&q=80&w=1200"
};

const App: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col items-center bg-[#fdfdfd] selection:bg-blue-100">
      <Header />
      
      <main className="w-full max-w-4xl px-4 sm:px-6 py-12">
        <Hero />
        
        <div className="bg-white rounded-[2.5rem] shadow-[0_10px_40px_rgba(0,0,0,0.03)] border border-slate-100 overflow-hidden mt-12">
          <article className="p-8 md:p-16 lg:p-24">
            <StorySection />
            <ScienceSection />
            <CTASection />
          </article>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default App;

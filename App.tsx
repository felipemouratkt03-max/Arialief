import React from 'react';
import { Header } from './components/Header.tsx';
import { Hero } from './components/Hero.tsx';
import { StorySection } from './components/StorySection.tsx';
import { ScienceSection } from './components/ScienceSection.tsx';
import { CTASection } from './components/CTASection.tsx';
import { Footer } from './components/Footer.tsx';

const App: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col items-center bg-[#fdfdfd] selection:bg-green-100">
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
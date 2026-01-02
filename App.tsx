
import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { StorySection } from './components/StorySection';
import { ScienceSection } from './components/ScienceSection';
import { CTASection } from './components/CTASection';
import { Footer } from './components/Footer';

const App: React.FC = () => {
  const [hasKey, setHasKey] = useState(true);

  useEffect(() => {
    const checkKey = async () => {
      if (window.aistudio) {
        const active = await window.aistudio.hasSelectedApiKey();
        setHasKey(active);
      }
    };
    checkKey();
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center">
      <Header />
      
      {!hasKey && (
        <div className="w-full bg-blue-600 text-white py-2 px-4 text-center text-xs font-bold animate-pulse">
          Cinematic Story Visuals Enabled: <button onClick={() => window.aistudio.openSelectKey()} className="underline ml-1">Connect your API Key to view.</button>
        </div>
      )}

      <main className="w-full max-w-4xl px-4 sm:px-6 py-8">
        <Hero />
        
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mt-8">
          <article className="p-6 md:p-12">
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

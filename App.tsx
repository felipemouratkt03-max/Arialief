
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
    
    // Polling opcional para detectar quando a chave é selecionada
    const interval = setInterval(checkKey, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center">
      <Header />
      
      {!hasKey && (
        <div className="w-full bg-blue-700 text-white py-2.5 px-4 text-center text-[11px] font-bold shadow-md z-40">
          <span className="opacity-90">Experience the story with cinematic visuals:</span>
          <button 
            onClick={() => window.aistudio.openSelectKey()} 
            className="ml-2 bg-white text-blue-700 px-3 py-1 rounded-full hover:bg-blue-50 transition-colors uppercase tracking-tight"
          >
            Enable Images
          </button>
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

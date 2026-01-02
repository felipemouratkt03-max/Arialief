
import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { StorySection } from './components/StorySection';
import { ScienceSection } from './components/ScienceSection';
import { CTASection } from './components/CTASection';
import { Footer } from './components/Footer';
import { DebugConsole, pushLog } from './components/DebugConsole';

const App: React.FC = () => {
  const [hasKey, setHasKey] = useState(true);

  useEffect(() => {
    const checkKeyStatus = async () => {
      const aistudio = (window as any).aistudio;
      if (aistudio) {
        const active = await aistudio.hasSelectedApiKey();
        if (active !== hasKey) {
          setHasKey(active);
          pushLog(`API Key Status Changed: ${active ? 'Active' : 'Inactive'}`, active ? 'success' : 'info');
        }
      }
    };

    checkKeyStatus();
    const interval = setInterval(checkKeyStatus, 2000);
    return () => clearInterval(interval);
  }, [hasKey]);

  const handleOpenKey = async () => {
    const aistudio = (window as any).aistudio;
    if (aistudio) {
      pushLog('Opening API Key Selection Dialog...', 'info');
      await aistudio.openSelectKey();
      setHasKey(true);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center selection:bg-blue-100">
      <Header />
      
      {!hasKey && (
        <div className="w-full bg-gradient-to-r from-blue-600 to-blue-800 text-white py-3 px-4 text-center text-[11px] font-bold shadow-lg z-40 sticky top-16">
          <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-center gap-2">
            <span className="flex items-center gap-1.5 uppercase tracking-wide">
              <span className="w-2 h-2 bg-yellow-400 rounded-full animate-ping"></span>
              Enhance this story with AI-generated cinematic visuals
            </span>
            <button 
              onClick={handleOpenKey} 
              className="bg-white text-blue-700 px-4 py-1.5 rounded-full hover:bg-blue-50 transition-all shadow-sm uppercase tracking-tighter active:scale-95"
            >
              Connect API Key
            </button>
          </div>
        </div>
      )}

      <main className="w-full max-w-4xl px-4 sm:px-6 py-12">
        <Hero />
        
        <div className="bg-white rounded-[2.5rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 overflow-hidden mt-12">
          <article className="p-6 md:p-16 lg:p-20">
            <StorySection />
            <ScienceSection />
            <CTASection />
          </article>
        </div>
      </main>

      <Footer />
      <DebugConsole />
    </div>
  );
};

export default App;

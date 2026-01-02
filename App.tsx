
import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { StorySection } from './components/StorySection';
import { ScienceSection } from './components/ScienceSection';
import { CTASection } from './components/CTASection';
import { Footer } from './components/Footer';
import { DebugConsole, pushLog } from './components/DebugConsole';

// --- CONFIGURAÇÃO MANUAL DE IMAGENS ---
// Cole aqui os links das suas imagens hospedadas. 
// Se deixar vazio "", o sistema tentará usar a IA (se a chave estiver conectada).
export const IMAGE_URLS = {
  main_hero: "", // Ex: "https://seusite.com/imagem1.jpg"
  garden_story: "",
  hands_connection: ""
};

const App: React.FC = () => {
  const [hasKey, setHasKey] = useState(false);
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const checkKeyStatus = async () => {
      const aistudio = (window as any).aistudio;
      if (aistudio) {
        const active = await aistudio.hasSelectedApiKey();
        setHasKey(active);
        setIsChecking(false);
      } else {
        // Se não houver aistudio em 2 segundos, paramos de carregar
        setTimeout(() => setIsChecking(false), 2000);
      }
    };
    checkKeyStatus();
  }, []);

  const handleOpenKey = async () => {
    const aistudio = (window as any).aistudio;
    if (aistudio) {
      await aistudio.openSelectKey();
      setHasKey(true);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center selection:bg-blue-100">
      <Header />
      
      {/* Banner de IA só aparece se você NÃO definiu imagens manuais E não tem chave */}
      {!hasKey && !IMAGE_URLS.main_hero && !isChecking && (
        <div className="w-full bg-slate-900 text-white py-3 px-4 text-center text-[11px] font-bold z-40 sticky top-16 border-b border-blue-500/30">
          <div className="max-w-4xl mx-auto flex items-center justify-center gap-4">
            <span>IMAGENS EM MODO DE RASCUNHO (IA DESATIVADA)</span>
            <button onClick={handleOpenKey} className="bg-blue-600 px-4 py-1 rounded-full text-[10px]">ATIVAR IA</button>
          </div>
        </div>
      )}

      <main className="w-full max-w-4xl px-4 sm:px-6 py-12">
        <Hero />
        
        <div className="bg-white rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-slate-100 overflow-hidden mt-12">
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

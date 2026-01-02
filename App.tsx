
import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { StorySection } from './components/StorySection';
import { ScienceSection } from './components/ScienceSection';
import { CTASection } from './components/CTASection';
import { Footer } from './components/Footer';
import { DebugConsole, pushLog } from './components/DebugConsole';

const App: React.FC = () => {
  // Começamos como "false" para garantir que a verificação ocorra antes de renderizar imagens
  const [hasKey, setHasKey] = useState(false);
  const [isInitializing, setIsInitializing] = useState(true);

  useEffect(() => {
    pushLog('Iniciando Nerve Relief Journey App...', 'info');
    
    const checkKeyStatus = async () => {
      const aistudio = (window as any).aistudio;
      if (aistudio) {
        try {
          const active = await aistudio.hasSelectedApiKey();
          if (active !== hasKey) {
            setHasKey(active);
            pushLog(`Status da Chave: ${active ? 'VÁLIDA' : 'NECESSÁRIA'}`, active ? 'success' : 'info');
          }
        } catch (err) {
          pushLog('Erro ao verificar status da chave: ' + err, 'error');
        } finally {
          setIsInitializing(false);
        }
      } else {
        // Se aistudio ainda não apareceu, aguardamos
        pushLog('Aguardando injeção do Google AI Studio...', 'info');
      }
    };

    checkKeyStatus();
    const interval = setInterval(checkKeyStatus, 3000);
    return () => clearInterval(interval);
  }, [hasKey]);

  const handleOpenKey = async () => {
    const aistudio = (window as any).aistudio;
    if (aistudio) {
      pushLog('Solicitando abertura do seletor de chave...', 'info');
      try {
        await aistudio.openSelectKey();
        // A instrução diz para assumir sucesso e prosseguir
        setHasKey(true);
        pushLog('Seletor de chave acionado.', 'success');
      } catch (e) {
        pushLog('Falha ao abrir seletor: ' + e, 'error');
      }
    } else {
      pushLog('Erro: Objeto aistudio não encontrado ao clicar no botão.', 'error');
      alert('O sistema de IA ainda está carregando. Por favor, aguarde 5 segundos e tente novamente.');
    }
  };

  if (isInitializing && !hasKey) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-10 text-center">
        <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-4"></div>
        <p className="text-slate-500 font-medium animate-pulse">Iniciando motor de visualização...</p>
        <DebugConsole />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center selection:bg-blue-100">
      <Header />
      
      {!hasKey && (
        <div className="w-full bg-slate-900 text-white py-4 px-4 text-center text-[12px] font-bold shadow-2xl z-40 sticky top-16 border-b border-blue-500/30">
          <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-center gap-4">
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 bg-blue-400 rounded-full animate-ping"></span>
              ESTE SITE USA IA PARA GERAR VISUAIS PERSONALIZADOS
            </span>
            <button 
              onClick={handleOpenKey} 
              className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-2 rounded-full transition-all shadow-[0_0_15px_rgba(37,99,235,0.4)] uppercase tracking-tighter active:scale-95"
            >
              ATIVAR IMAGENS AGORA
            </button>
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

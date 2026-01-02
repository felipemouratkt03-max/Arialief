
import React, { useState, useEffect, useCallback } from 'react';
import { GoogleGenAI } from "@google/genai";
import { pushLog } from './DebugConsole';

interface AIImageProps {
  prompt: string;
  alt: string;
  className?: string;
  aspectRatio?: "1:1" | "3:4" | "4:3" | "9:16" | "16:9";
}

export const AIImage: React.FC<AIImageProps> = ({ prompt, alt, className, aspectRatio = "16:9" }) => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [needsKey, setNeedsKey] = useState(false);

  const generateImage = useCallback(async () => {
    const aistudio = (window as any).aistudio;
    if (aistudio) {
      const hasKey = await aistudio.hasSelectedApiKey();
      if (!hasKey) {
        pushLog(`Imagem "${alt}" pausada: Chave não selecionada.`, 'info');
        setNeedsKey(true);
        setLoading(false);
        return;
      }
    }

    try {
      setLoading(true);
      setError(null);
      setNeedsKey(false);
      
      const apiKey = process.env.API_KEY;
      if (!apiKey || apiKey === "undefined" || apiKey.length < 5) {
        pushLog(`Erro Crítico: process.env.API_KEY está vazio. Clique em 'Ativar Imagens'.`, 'error');
        setNeedsKey(true);
        return;
      }

      pushLog(`Iniciando geração IA para: ${alt}`, 'info');

      const ai = new GoogleGenAI({ apiKey });
      
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash-image',
        contents: {
          parts: [{ text: `High-quality professional photography, detailed lighting, clean composition: ${prompt}` }],
        },
        config: {
          imageConfig: { aspectRatio: aspectRatio },
        },
      });

      let base64Data: string | null = null;
      const parts = response.candidates?.[0]?.content?.parts;
      
      if (parts) {
        for (const part of parts) {
          if (part.inlineData?.data) {
            base64Data = part.inlineData.data;
            break;
          }
        }
      }

      if (base64Data) {
        setImageUrl(`data:image/png;base64,${base64Data}`);
        pushLog(`Sucesso: Imagem "${alt}" carregada.`, 'success');
      } else {
        pushLog(`Aviso: API respondeu mas sem dados de imagem para "${alt}".`, 'error');
        throw new Error("No image data");
      }

    } catch (err: any) {
      const errorMsg = err.message || "Erro desconhecido";
      pushLog(`Falha na Imagem "${alt}": ${errorMsg}`, 'error');
      
      if (errorMsg.includes("Requested entity was not found") || errorMsg.includes("API key")) {
        pushLog(`DICA: Sua chave de API pode não ter acesso ao modelo de imagem ou expirou.`, 'error');
        setNeedsKey(true);
      } else {
        setError(errorMsg);
      }
    } finally {
      setLoading(false);
    }
  }, [prompt, aspectRatio, alt]);

  useEffect(() => {
    generateImage();
  }, [generateImage]);

  const handleOpenKeySelector = async () => {
    const aistudio = (window as any).aistudio;
    if (aistudio) {
      await aistudio.openSelectKey();
      setNeedsKey(false);
      generateImage();
    }
  };

  if (needsKey) {
    return (
      <div className={`bg-slate-50 border-2 border-dashed border-slate-200 flex flex-col items-center justify-center rounded-2xl p-8 text-center transition-all hover:bg-slate-100 ${className}`}>
        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mb-4 text-blue-600">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        </div>
        <p className="text-[11px] font-bold text-slate-800 mb-3 uppercase tracking-tight">Visual aguardando ativação</p>
        <button 
          onClick={handleOpenKeySelector}
          className="bg-slate-900 text-white text-[10px] font-bold py-2 px-6 rounded-full shadow-lg hover:bg-black transition-all active:scale-95"
        >
          CONECTAR CHAVE
        </button>
      </div>
    );
  }

  if (loading) {
    return (
      <div className={`bg-slate-50 flex flex-col items-center justify-center rounded-2xl border border-slate-100 ${className}`}>
        <div className="w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-[9px] font-bold text-slate-400 mt-4 uppercase tracking-[0.2em]">Processando...</p>
      </div>
    );
  }

  if (error || !imageUrl) {
    return (
      <div className={`bg-slate-50 flex flex-col items-center justify-center rounded-2xl border border-slate-100 p-8 text-center ${className}`}>
        <span className="text-red-400 mb-2 opacity-50">⚠️</span>
        <p className="text-slate-400 text-[10px] font-bold uppercase mb-3">Erro no carregamento</p>
        <button onClick={() => generateImage()} className="text-blue-600 text-[10px] font-black hover:underline uppercase">Tentar novamente</button>
      </div>
    );
  }

  return (
    <div className="relative group overflow-hidden rounded-2xl shadow-xl border border-slate-100">
      <img src={imageUrl} alt={alt} className={`w-full object-cover transition-all duration-1000 group-hover:scale-105 ${className}`} />
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
    </div>
  );
};

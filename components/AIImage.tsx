
import React, { useState, useEffect } from 'react';
import { GoogleGenAI } from "@google/genai";

interface AIImageProps {
  prompt: string;
  alt: string;
  className?: string;
  aspectRatio?: "1:1" | "3:4" | "4:3" | "9:16" | "16:9";
}

// Fixed: Removed the redundant declare global block that was causing "identical modifiers" and "type mismatch" errors
// with the environment-provided AIStudio interface.

export const AIImage: React.FC<AIImageProps> = ({ prompt, alt, className, aspectRatio = "16:9" }) => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [needsKey, setNeedsKey] = useState(false);

  const handleSelectKey = async () => {
    if (window.aistudio) {
      await window.aistudio.openSelectKey();
      // Assume success and proceed to generate
      setNeedsKey(false);
      setLoading(true);
      generateImage();
    }
  };

  const generateImage = async () => {
    // 1. Verificar se o usuário já selecionou uma chave
    if (window.aistudio) {
      const hasKey = await window.aistudio.hasSelectedApiKey();
      if (!hasKey) {
        setNeedsKey(true);
        setLoading(false);
        return;
      }
    }

    try {
      setLoading(true);
      setError(null);

      // 2. Criar instância nova imediatamente antes da chamada (regra do SDK para chaves dinâmicas)
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash-image',
        contents: {
          parts: [{ text: `Professional lifestyle photography, bright natural lighting, soft colors. Scene: ${prompt}` }],
        },
        config: {
          imageConfig: {
            aspectRatio: aspectRatio
          },
        },
      });

      let foundImage = false;
      const parts = response.candidates?.[0]?.content?.parts;
      
      // Itera pelas partes para encontrar a imagem (regra do SDK)
      if (parts) {
        for (const part of parts) {
          if (part.inlineData?.data) {
            setImageUrl(`data:image/png;base64,${part.inlineData.data}`);
            foundImage = true;
            break;
          }
        }
      }

      if (!foundImage) {
        throw new Error("Safety filters or billing restricted this generation.");
      }
    } catch (err: any) {
      console.error("Image generation failed:", err);
      // Se o erro for de entidade não encontrada, forçar seleção de chave (regra do SDK)
      if (err.message?.includes("Requested entity was not found")) {
        setNeedsKey(true);
      } else {
        setError("Image generation temporarily unavailable.");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    generateImage();
  }, [prompt]);

  if (needsKey) {
    return (
      <div className={`bg-gray-50 border-2 border-dashed border-gray-200 flex flex-col items-center justify-center rounded-xl p-6 text-center transition-all hover:border-blue-300 ${className}`}>
        <svg className="w-8 h-8 text-blue-500 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
        </svg>
        <p className="text-xs text-gray-600 mb-3 font-medium">To view the story visuals, please connect your API Key.</p>
        <button 
          onClick={handleSelectKey}
          className="bg-blue-600 hover:bg-blue-700 text-white text-[10px] font-bold py-2 px-4 rounded transition-all shadow-sm active:scale-95"
        >
          Select API Key
        </button>
      </div>
    );
  }

  if (loading) {
    return (
      <div className={`bg-gray-100 animate-pulse flex flex-col items-center justify-center rounded-xl overflow-hidden border border-gray-200 ${className}`}>
        <div className="w-6 h-6 border-2 border-blue-200 border-t-blue-600 rounded-full animate-spin mb-2"></div>
        <p className="text-[10px] font-medium text-gray-400 uppercase tracking-widest">Generating Visual...</p>
      </div>
    );
  }

  if (error || !imageUrl) {
    return (
      <div className={`bg-gray-50 flex items-center justify-center rounded-xl border border-gray-100 p-4 ${className}`}>
        <p className="text-gray-400 text-[10px] italic">Visualizing the story...</p>
      </div>
    );
  }

  return (
    <div className="relative group overflow-hidden rounded-xl shadow-lg border border-gray-100">
      <img 
        src={imageUrl} 
        alt={alt} 
        className={`w-full object-cover transition-opacity duration-1000 ${className}`} 
      />
    </div>
  );
};


import React, { useState, useEffect, useCallback } from 'react';
import { GoogleGenAI } from "@google/genai";
import { pushLog } from './DebugConsole';

interface AIImageProps {
  src?: string; // Nova prop para imagem manual
  prompt: string;
  alt: string;
  className?: string;
  aspectRatio?: "1:1" | "3:4" | "4:3" | "9:16" | "16:9";
}

export const AIImage: React.FC<AIImageProps> = ({ src, prompt, alt, className, aspectRatio = "16:9" }) => {
  const [imageUrl, setImageUrl] = useState<string | null>(src || null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [needsKey, setNeedsKey] = useState(false);

  const generateImage = useCallback(async () => {
    // Se já temos um src manual, não fazemos nada com a IA
    if (src) return;

    const aistudio = (window as any).aistudio;
    if (aistudio) {
      const hasKey = await aistudio.hasSelectedApiKey();
      if (!hasKey) {
        setNeedsKey(true);
        return;
      }
    }

    try {
      setLoading(true);
      setError(null);
      const apiKey = process.env.API_KEY;
      if (!apiKey || apiKey === "undefined") {
        setNeedsKey(true);
        return;
      }

      const ai = new GoogleGenAI({ apiKey });
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash-image',
        contents: {
          parts: [{ text: `Professional medical lifestyle photography: ${prompt}` }],
        },
        config: { imageConfig: { aspectRatio } },
      });

      const base64Data = response.candidates?.[0]?.content?.parts?.find(p => p.inlineData)?.inlineData?.data;
      if (base64Data) {
        setImageUrl(`data:image/png;base64,${base64Data}`);
      } else {
        throw new Error("No data");
      }
    } catch (err: any) {
      setError(err.message);
      pushLog(`Falha ao gerar imagem IA: ${alt}`, 'error');
    } finally {
      setLoading(false);
    }
  }, [src, prompt, aspectRatio, alt]);

  useEffect(() => {
    if (src) {
      setImageUrl(src);
      setLoading(false);
      setNeedsKey(false);
    } else {
      generateImage();
    }
  }, [src, generateImage]);

  if (loading) {
    return <div className={`bg-gray-100 animate-pulse rounded-2xl ${className}`} />;
  }

  // Se for imagem estática ou carregou da IA
  if (imageUrl) {
    return (
      <div className="relative overflow-hidden rounded-2xl shadow-sm border border-slate-100">
        <img 
          src={imageUrl} 
          alt={alt} 
          loading="lazy"
          className={`w-full object-cover ${className}`} 
        />
      </div>
    );
  }

  // Só mostra aviso de chave se não houver imagem estática definida
  if (needsKey && !src) {
    return (
      <div className={`bg-slate-50 border-2 border-dashed border-slate-200 flex flex-col items-center justify-center rounded-2xl p-4 text-center ${className}`}>
        <p className="text-[10px] font-bold text-slate-400 uppercase">Defina uma URL de imagem ou conecte a IA</p>
      </div>
    );
  }

  return <div className={`bg-gray-200 rounded-2xl ${className}`} />;
};

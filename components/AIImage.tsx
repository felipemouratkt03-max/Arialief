
import React, { useState, useEffect } from 'react';
import { GoogleGenAI } from "@google/genai";

interface AIImageProps {
  prompt: string;
  alt: string;
  className?: string;
  aspectRatio?: "1:1" | "3:4" | "4:3" | "9:16" | "16:9";
}

export const AIImage: React.FC<AIImageProps> = ({ prompt, alt, className, aspectRatio = "16:9" }) => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const generateImage = async () => {
      // Usamos gemini-2.5-flash-image por padrão para garantir que as imagens carreguem
      // de forma confiável no ambiente de deploy sem exigir seleção manual de chave paga.
      const apiKey = process.env.API_KEY;
      if (!apiKey) {
        if (isMounted) {
          setError("API key missing");
          setLoading(false);
        }
        return;
      }

      try {
        if (isMounted) {
          setLoading(true);
          setError(null);
        }

        const ai = new GoogleGenAI({ apiKey });
        
        // Prompts mais genéricos para evitar filtros de segurança sobre saúde/corpo humano
        const response = await ai.models.generateContent({
          model: 'gemini-2.5-flash-image',
          contents: {
            parts: [{ text: `Professional, high-quality photograph for a magazine. Scene: ${prompt}. Cinematic lighting, soft focus background, realistic textures.` }],
          },
          config: {
            imageConfig: {
              aspectRatio: aspectRatio
            },
          },
        });

        if (!isMounted) return;

        let foundImage = false;
        const candidate = response.candidates?.[0];
        
        if (candidate?.content?.parts) {
          for (const part of candidate.content.parts) {
            if (part.inlineData?.data) {
              setImageUrl(`data:image/png;base64,${part.inlineData.data}`);
              foundImage = true;
              break;
            }
          }
        }

        if (!foundImage) {
          throw new Error("Model refused to generate image based on safety filters.");
        }
      } catch (err: any) {
        console.error("Image generation failed:", err);
        if (isMounted) {
          setError(err.message || "Failed to load image");
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    generateImage();

    return () => {
      isMounted = false;
    };
  }, [prompt, aspectRatio]);

  if (loading) {
    return (
      <div className={`bg-gray-100 animate-pulse flex flex-col items-center justify-center rounded-xl overflow-hidden ${className}`}>
        <div className="flex flex-col items-center">
          <div className="w-8 h-8 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mb-2"></div>
          <p className="text-[10px] font-bold text-gray-400 tracking-widest uppercase">Visualizing...</p>
        </div>
      </div>
    );
  }

  if (error || !imageUrl) {
    return (
      <div className={`bg-gray-200 flex flex-col items-center justify-center rounded-xl p-4 text-center ${className}`}>
        <svg className="w-8 h-8 text-gray-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
        <p className="text-gray-500 text-[10px] italic">Image generation paused. Refresh to retry.</p>
      </div>
    );
  }

  return (
    <div className="relative overflow-hidden rounded-xl shadow-lg">
      <img 
        src={imageUrl} 
        alt={alt} 
        className={`w-full object-cover transition-opacity duration-500 ${className}`} 
      />
    </div>
  );
};

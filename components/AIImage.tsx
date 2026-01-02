
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
      const apiKey = process.env.API_KEY;
      if (!apiKey) {
        if (isMounted) {
          setError("Configuring...");
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
        
        // Usando gemini-2.5-flash-image para maior compatibilidade e velocidade
        const response = await ai.models.generateContent({
          model: 'gemini-2.5-flash-image',
          contents: {
            parts: [{ text: `Professional editorial photograph, natural lighting, cinematic style. Scene: ${prompt}` }],
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

        if (!foundImage) throw new Error("Safety Block");

      } catch (err: any) {
        console.error("Image gen error:", err);
        if (isMounted) {
          setError("Unable to render visual at this moment.");
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
      <div className={`bg-gray-100 animate-pulse flex flex-col items-center justify-center rounded-xl overflow-hidden border border-gray-200 ${className}`}>
        <div className="w-8 h-8 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mb-2"></div>
        <p className="text-[10px] font-bold text-gray-400 tracking-widest uppercase">Visualizing Story...</p>
      </div>
    );
  }

  if (error || !imageUrl) {
    // Fallback elegante caso o modelo de imagem falhe
    return (
      <div className={`bg-gradient-to-br from-gray-50 to-gray-100 flex flex-col items-center justify-center rounded-xl border border-gray-200 p-8 text-center ${className}`}>
        <svg className="w-12 h-12 text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
        <p className="text-gray-400 text-sm italic font-medium">Memory visualized in the story...</p>
      </div>
    );
  }

  return (
    <div className="relative group overflow-hidden rounded-xl shadow-xl transition-all duration-500">
      <img 
        src={imageUrl} 
        alt={alt} 
        className={`w-full object-cover transition-opacity duration-700 ${className}`} 
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none"></div>
    </div>
  );
};

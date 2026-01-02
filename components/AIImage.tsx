
import React, { useState, useEffect } from 'react';
import { GoogleGenAI } from "@google/genai";

interface AIImageProps {
  prompt: string;
  alt: string;
  className?: string;
  aspectRatio?: "1:1" | "3:4" | "4:3" | "9:16" | "16:9";
}

declare global {
  interface AIStudio {
    hasSelectedApiKey: () => Promise<boolean>;
    openSelectKey: () => Promise<void>;
  }
  interface Window {
    // Removed 'readonly' modifier to avoid "All declarations must have identical modifiers" error
    // when merging with existing global declarations.
    aistudio: AIStudio;
  }
}

export const AIImage: React.FC<AIImageProps> = ({ prompt, alt, className, aspectRatio = "16:9" }) => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [needsKey, setNeedsKey] = useState(false);

  const handleSelectKey = async () => {
    try {
      if (window.aistudio) {
        await window.aistudio.openSelectKey();
        // Race condition mitigation: proceed as if successful
        setNeedsKey(false);
        window.location.reload();
      }
    } catch (err) {
      console.error("Failed to open key selector", err);
    }
  };

  useEffect(() => {
    let isMounted = true;

    const generateImage = async () => {
      // 1. Check for API Key selection (Mandatory for Gemini 3 Pro Image)
      if (window.aistudio) {
        const hasKey = await window.aistudio.hasSelectedApiKey();
        if (!hasKey) {
          if (isMounted) {
            setNeedsKey(true);
            setLoading(false);
          }
          return;
        }
      }

      // 2. Safe access to API_KEY
      const apiKey = process.env.API_KEY;
      if (!apiKey) {
        if (isMounted) {
          setError("API key not configured.");
          setLoading(false);
        }
        return;
      }

      try {
        if (isMounted) {
          setLoading(true);
          setError(null);
        }

        // 3. Initialize fresh instance for each call
        const ai = new GoogleGenAI({ apiKey });
        
        // 4. Using high-quality model for presell aesthetics
        const response = await ai.models.generateContent({
          model: 'gemini-3-pro-image-preview',
          contents: {
            parts: [{ text: `Professional, high-resolution editorial photograph for a health journal. Subject: ${prompt}. Natural lighting, cinematic quality, photorealistic.` }],
          },
          config: {
            imageConfig: {
              aspectRatio: aspectRatio,
              imageSize: "1K"
            },
          },
        });

        if (!isMounted) return;

        let foundImage = false;
        const candidate = response.candidates?.[0];
        
        if (candidate?.content?.parts) {
          for (const part of candidate.content.parts) {
            if (part.inlineData?.data) {
              const base64Data = part.inlineData.data;
              setImageUrl(`data:image/png;base64,${base64Data}`);
              foundImage = true;
              break;
            }
          }
        }

        if (!foundImage) {
          const textMsg = candidate?.content?.parts?.find(p => p.text)?.text || "";
          if (textMsg.includes("Requested entity was not found")) {
            setNeedsKey(true);
          }
          throw new Error(textMsg || "Image generation refused by model.");
        }
      } catch (err: any) {
        console.error("AI Generation Error:", err);
        if (isMounted) {
          if (err.message?.includes("Requested entity was not found")) {
            setNeedsKey(true);
          }
          setError(err.message || "Failed to load visual.");
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

  if (needsKey) {
    return (
      <div className={`bg-blue-50 border-2 border-dashed border-blue-200 flex flex-col items-center justify-center rounded-xl p-6 text-center ${className}`}>
        <p className="text-blue-800 font-bold mb-2">High-Quality Visuals Paused</p>
        <p className="text-blue-600 text-xs mb-4 max-w-xs">To view the story's high-resolution images, please select your API key (Paid GCP project required).</p>
        <button 
          onClick={handleSelectKey}
          className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold py-2 px-4 rounded-lg transition-all shadow-md active:scale-95"
        >
          Select API Key
        </button>
        <a href="https://ai.google.dev/gemini-api/docs/billing" target="_blank" className="text-[10px] text-blue-400 mt-3 underline">View Billing Info</a>
      </div>
    );
  }

  if (loading) {
    return (
      <div className={`bg-gray-100 animate-pulse flex flex-col items-center justify-center rounded-xl border border-gray-200 ${className}`}>
        <div className="w-12 h-12 border-4 border-blue-100 border-t-blue-600 rounded-full animate-spin mb-3"></div>
        <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">Rendering Scene...</span>
      </div>
    );
  }

  if (error || !imageUrl) {
    return (
      <div className={`bg-gray-50 flex flex-col items-center justify-center rounded-xl border border-gray-200 p-8 ${className}`}>
        <svg className="w-8 h-8 text-gray-300 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
        <p className="text-gray-400 text-xs italic">Visualizing this moment of the story...</p>
      </div>
    );
  }

  return (
    <div className="relative group overflow-hidden rounded-xl shadow-2xl">
      <img 
        src={imageUrl} 
        alt={alt} 
        className={`w-full object-cover transition-transform duration-1000 group-hover:scale-105 ${className}`} 
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
    </div>
  );
};


import React, { useState, useEffect } from 'react';
import { GoogleGenAI } from "@google/genai";

interface AIImageProps {
  prompt: string;
  alt: string;
  className?: string;
  aspectRatio?: "1:1" | "3:4" | "4:3" | "9:16" | "16:9";
}

// Global types removed to avoid conflict with existing environment definitions.
// The environment provides aistudio on the window object.

export const AIImage: React.FC<AIImageProps> = ({ prompt, alt, className, aspectRatio = "16:9" }) => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [needsKey, setNeedsKey] = useState(false);

  const handleOpenKeySelector = async () => {
    try {
      // Accessing aistudio from window using type assertion to handle environment-specific injection
      const aistudio = (window as any).aistudio;
      if (aistudio) {
        await aistudio.openSelectKey();
        // Per guidelines, assume key selection was successful after triggering openSelectKey
        setNeedsKey(false);
        setLoading(true);
        // Reloading is a safe way to ensure the new API key is picked up
        window.location.reload();
      }
    } catch (err) {
      console.error("Failed to open key selector:", err);
    }
  };

  useEffect(() => {
    let isMounted = true;

    const generateImage = async () => {
      // 1. Check if user has selected an API key (Required for gemini-3-pro-image-preview)
      const aistudio = (window as any).aistudio;
      if (aistudio) {
        const hasKey = await aistudio.hasSelectedApiKey();
        if (!hasKey) {
          if (isMounted) {
            setNeedsKey(true);
            setLoading(false);
          }
          return;
        }
      }

      try {
        if (isMounted) {
          setLoading(true);
          setError(null);
        }

        // 2. Create fresh instance right before call to ensure latest API key is used
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
        
        // 3. Use gemini-3-pro-image-preview for high-resolution cinematic images
        const response = await ai.models.generateContent({
          model: 'gemini-3-pro-image-preview',
          contents: {
            parts: [{ text: `High-quality cinematic photograph, photorealistic, 8k resolution, natural lighting. Scene: ${prompt}` }],
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
              setImageUrl(`data:image/png;base64,${part.inlineData.data}`);
              foundImage = true;
              break;
            }
          }
        }

        if (!foundImage) {
          // Check for specific error message regarding project/key per guidelines
          const textPart = candidate?.content?.parts?.find(p => p.text)?.text || "";
          if (textPart.includes("Requested entity was not found")) {
            setNeedsKey(true);
            throw new Error("Project not configured. Please re-select key.");
          }
          throw new Error("No image data returned. Safety filters may have blocked the scene.");
        }
      } catch (err: any) {
        console.error("AI Image Error:", err);
        if (isMounted) {
          // If the request fails with this specific message, reset key state
          if (err.message?.includes("Requested entity was not found")) {
            setNeedsKey(true);
          }
          setError(err.message || "Visual generation failed.");
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
      <div className={`bg-blue-50 border-2 border-dashed border-blue-200 flex flex-col items-center justify-center rounded-xl p-8 text-center ${className}`}>
        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
          <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
          </svg>
        </div>
        <p className="text-blue-900 font-bold mb-2">High-Resolution Images Restricted</p>
        <p className="text-blue-700 text-sm mb-6 max-w-sm">To view the story's cinematic visuals, you must select your own API key from a paid GCP project.</p>
        <button 
          onClick={handleOpenKeySelector}
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-all shadow-md active:scale-95"
        >
          Select Paid API Key
        </button>
        <a href="https://ai.google.dev/gemini-api/docs/billing" target="_blank" rel="noreferrer" className="text-xs text-blue-400 mt-4 underline">Why is this required?</a>
      </div>
    );
  }

  if (loading) {
    return (
      <div className={`bg-gray-100 animate-pulse flex flex-col items-center justify-center rounded-xl overflow-hidden ${className}`}>
        <div className="flex flex-col items-center">
          <div className="w-10 h-10 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mb-4"></div>
          <p className="text-xs font-black text-gray-400 tracking-widest uppercase">Rendering Scene...</p>
        </div>
      </div>
    );
  }

  if (error || !imageUrl) {
    return (
      <div className={`bg-gray-50 flex flex-col items-center justify-center rounded-xl border border-gray-200 p-6 text-center ${className}`}>
        <svg className="w-10 h-10 text-gray-300 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
        <p className="text-gray-400 text-xs italic">A vivid memory from the story is loading...</p>
        <button onClick={() => window.location.reload()} className="text-[10px] text-blue-500 mt-2 underline">Retry</button>
      </div>
    );
  }

  return (
    <div className="relative group overflow-hidden rounded-xl shadow-2xl transition-all duration-700 hover:shadow-blue-200/50">
      <img 
        src={imageUrl} 
        alt={alt} 
        className={`w-full object-cover transition-transform duration-1000 group-hover:scale-105 ${className}`} 
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
    </div>
  );
};

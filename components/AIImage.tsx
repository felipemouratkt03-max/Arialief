
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
    // 1. Mandatory Check for API Key Selection
    const aistudio = (window as any).aistudio;
    if (aistudio) {
      const hasKey = await aistudio.hasSelectedApiKey();
      if (!hasKey) {
        pushLog(`Image [${alt}] blocked: No User API Key selected.`, 'info');
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
      if (!apiKey) {
        pushLog(`Fatal: process.env.API_KEY is null in browser context.`, 'error');
        setNeedsKey(true);
        return;
      }

      pushLog(`Attempting generation for: ${alt}...`, 'info');

      // 2. Create Instance Right Before Use
      const ai = new GoogleGenAI({ apiKey });
      
      // Use gemini-2.5-flash-image which is the most reliable for general flash accounts
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash-image',
        contents: {
          parts: [{ text: `Cinematic commercial lifestyle photography, bright morning light, extremely high detail. Scene: ${prompt}` }],
        },
        config: {
          imageConfig: {
            aspectRatio: aspectRatio
          },
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
        pushLog(`Success: Image [${alt}] generated.`, 'success');
      } else {
        pushLog(`API returned success but no image part found for [${alt}]. Check safety filters.`, 'error');
        throw new Error("No image data in response");
      }

    } catch (err: any) {
      const errorMsg = err.message || "Unknown API Error";
      pushLog(`Error generating [${alt}]: ${errorMsg}`, 'error');
      
      if (errorMsg.includes("Requested entity was not found")) {
        pushLog(`TIP: This usually means your API Key doesn't have access to the Image model yet.`, 'info');
        setNeedsKey(true);
      } else if (errorMsg.includes("429")) {
        pushLog(`TIP: Rate Limit Reached.`, 'error');
        setError("Rate limit reached. Waiting...");
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
      <div className={`bg-slate-50 border-2 border-dashed border-slate-200 flex flex-col items-center justify-center rounded-2xl p-8 text-center transition-colors hover:border-blue-300 group ${className}`}>
        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4 text-blue-600 group-hover:scale-110 transition-transform">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
          </svg>
        </div>
        <h3 className="text-sm font-bold text-slate-800 mb-1">Visual Content Blocked</h3>
        <p className="text-[10px] text-slate-500 mb-4 max-w-[220px]">This deployment requires a personal API Key to render premium story visuals.</p>
        <button 
          onClick={handleOpenKeySelector}
          className="bg-blue-600 hover:bg-blue-700 text-white text-[10px] font-bold py-2 px-6 rounded-full shadow-md transition-all active:scale-95 uppercase tracking-wider"
        >
          Select Your API Key
        </button>
      </div>
    );
  }

  if (loading) {
    return (
      <div className={`bg-slate-100 animate-pulse flex flex-col items-center justify-center rounded-2xl overflow-hidden border border-slate-200 ${className}`}>
        <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-[10px] font-black text-slate-400 mt-4 uppercase tracking-[0.3em]">Processing Visual...</p>
      </div>
    );
  }

  if (error || !imageUrl) {
    return (
      <div className={`bg-slate-50 flex flex-col items-center justify-center rounded-2xl border border-slate-200 p-8 text-center ${className}`}>
        <div className="text-red-400 mb-2">⚠️</div>
        <p className="text-slate-500 text-[10px] font-medium uppercase mb-2">Generation Failed</p>
        <button 
          onClick={() => generateImage()}
          className="text-blue-600 text-[10px] font-bold hover:underline"
        >
          RETRY NOW
        </button>
      </div>
    );
  }

  return (
    <div className="relative group overflow-hidden rounded-2xl shadow-xl border border-slate-100">
      <img 
        src={imageUrl} 
        alt={alt} 
        className={`w-full object-cover transition-all duration-1000 group-hover:scale-105 ${className}`} 
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
    </div>
  );
};

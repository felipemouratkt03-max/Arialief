
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
      if (!process.env.API_KEY) {
        if (isMounted) {
          setError("API configuration missing.");
          setLoading(false);
        }
        return;
      }

      try {
        if (isMounted) {
          setLoading(true);
          setError(null);
        }

        // Using gemini-2.5-flash-image as the stable default for general image generation.
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
        const response = await ai.models.generateContent({
          model: 'gemini-2.5-flash-image',
          contents: {
            parts: [{ text: `Create a professional, high-quality, realistic photograph for a health article. Scene: ${prompt}` }],
          },
          config: {
            imageConfig: {
              aspectRatio: aspectRatio,
            },
          },
        });

        if (!isMounted) return;

        let foundImage = false;
        
        // Comprehensive check of the response structure
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
          // If no image, check for textual reasons (safety filters, etc.)
          const textResponse = candidate?.content?.parts?.find(p => p.text)?.text;
          throw new Error(textResponse || "The AI model did not return an image part. This can happen if the prompt triggered a safety filter or the model encountered a temporary error.");
        }
      } catch (err: any) {
        console.error("AI Image Generation Error:", err);
        if (isMounted) {
          setError(err.message || "Failed to generate visual.");
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
        <div className="flex flex-col items-center">
          <div className="w-10 h-10 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mb-3"></div>
          <span className="text-xs font-bold uppercase tracking-widest text-gray-400">Crafting Visual...</span>
        </div>
      </div>
    );
  }

  if (error || !imageUrl) {
    return (
      <div className={`bg-gray-200 flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-gray-300 p-6 text-center ${className}`}>
        <svg className="w-10 h-10 text-gray-400 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
        <p className="text-gray-500 text-sm font-medium">Visualizing this story...</p>
        <p className="text-[10px] text-gray-400 mt-2 italic px-4">
          The AI visual is taking a moment. Try refreshing the page.
        </p>
      </div>
    );
  }

  return (
    <div className="relative group overflow-hidden rounded-xl shadow-xl transition-all duration-500 hover:shadow-2xl">
      <img 
        src={imageUrl} 
        alt={alt} 
        className={`w-full object-cover transition-transform duration-700 group-hover:scale-105 ${className}`} 
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
    </div>
  );
};

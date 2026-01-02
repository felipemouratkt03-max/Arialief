
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
  const [error, setError] = useState(false);

  useEffect(() => {
    const generateImage = async () => {
      try {
        setLoading(true);
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
        const response = await ai.models.generateContent({
          model: 'gemini-2.5-flash-image',
          contents: {
            parts: [{ text: prompt }],
          },
          config: {
            imageConfig: {
              aspectRatio: aspectRatio,
            },
          },
        });

        let foundImage = false;
        if (response.candidates?.[0]?.content?.parts) {
          for (const part of response.candidates[0].content.parts) {
            if (part.inlineData) {
              const base64Data = part.inlineData.data;
              setImageUrl(`data:image/png;base64,${base64Data}`);
              foundImage = true;
              break;
            }
          }
        }
        
        if (!foundImage) throw new Error("No image part found in response");
      } catch (err) {
        console.error("Image generation failed:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    generateImage();
  }, [prompt, aspectRatio]);

  if (loading) {
    return (
      <div className={`bg-gray-100 animate-pulse flex items-center justify-center rounded-xl ${className}`}>
        <div className="text-gray-400 flex flex-col items-center">
          <svg className="w-10 h-10 mb-2 animate-spin" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <span className="text-xs font-medium">Visualizing story...</span>
        </div>
      </div>
    );
  }

  if (error || !imageUrl) {
    return (
      <div className={`bg-gray-200 flex items-center justify-center rounded-xl ${className}`}>
        <span className="text-gray-500 text-sm p-4 text-center">Unable to load visual. Please refresh to try again.</span>
      </div>
    );
  }

  return <img src={imageUrl} alt={alt} className={`rounded-xl shadow-md object-cover ${className}`} />;
};

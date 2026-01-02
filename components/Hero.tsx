
import React from 'react';

export const Hero: React.FC = () => {
  return (
    <section className="text-center space-y-4">
      <div className="inline-block px-3 py-1 bg-blue-50 text-blue-600 text-xs font-bold uppercase tracking-wider rounded-full">
        Real User Story
      </div>
      <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 leading-tight">
        I Couldn’t Hold My Granddaughter’s Hand Without My Fingers Going Numb… Then Everything Changed
      </h1>
      <p className="text-gray-500 text-lg md:text-xl font-medium max-w-2xl mx-auto italic">
        "By Sarah Jenkins — A 64-year-old retired teacher's journey from chronic nerve discomfort back to the life she loved."
      </p>
    </section>
  );
};

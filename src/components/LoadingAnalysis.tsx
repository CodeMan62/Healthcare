import React from 'react';
import { Stethoscope } from 'lucide-react';

export const LoadingAnalysis: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center p-8 bg-white rounded-lg shadow-md border border-gray-200">
      <div className="animate-pulse flex flex-col items-center gap-4">
        <div className="relative">
          <Stethoscope className="h-12 w-12 text-blue-600 animate-bounce" />
          <div className="absolute -top-1 -right-1 h-3 w-3 bg-green-500 rounded-full">
            <div className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></div>
          </div>
        </div>
        <h3 className="text-xl font-semibold text-gray-800">Analyzing Symptoms</h3>
        <div className="flex gap-2 items-center">
          <div className="h-2 w-2 bg-blue-600 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
          <div className="h-2 w-2 bg-blue-600 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
          <div className="h-2 w-2 bg-blue-600 rounded-full animate-bounce"></div>
        </div>
        <p className="text-gray-600 text-center max-w-sm">
          Our system is analyzing your symptoms and matching them with potential conditions...
        </p>
      </div>
    </div>
  );
};
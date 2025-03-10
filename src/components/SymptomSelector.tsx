import React from 'react';
import { Check } from 'lucide-react';

interface SymptomSelectorProps {
  symptomId: number;
  name: string;
  selected: boolean;
  onToggle: (id: number) => void;
}

export const SymptomSelector: React.FC<SymptomSelectorProps> = ({
  symptomId,
  name,
  selected,
  onToggle,
}) => {
  return (
    <button
      onClick={() => onToggle(symptomId)}
      className={`flex items-center justify-between px-4 py-2 rounded-lg transition-all ${
        selected
          ? 'bg-blue-100 border-blue-500 text-blue-700'
          : 'bg-white border-gray-200 hover:bg-gray-50'
      } border`}
    >
      <span className="text-sm font-medium">{name}</span>
      {selected && <Check size={16} className="text-blue-500" />}
    </button>
  );
};
import React from 'react';
import { AlertCircle, AlertTriangle, Clock, ThermometerSun, User } from 'lucide-react';

interface DiseaseCardProps {
  name: string;
  description: string;
  recommendations: string[];
  matchPercentage: number;
  urgency: 'low' | 'medium' | 'high';
  whenToSeekHelp: string[];
  genderSpecificAdvice?: string[];
  ageSpecificAdvice?: string[];
}

export const DiseaseCard: React.FC<DiseaseCardProps> = ({
  name,
  description,
  recommendations,
  matchPercentage,
  urgency,
  whenToSeekHelp,
  genderSpecificAdvice,
  ageSpecificAdvice,
}) => {
  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'high':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default:
        return 'bg-green-100 text-green-800 border-green-200';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200">
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <h3 className="text-xl font-semibold text-gray-900">{name}</h3>
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${getUrgencyColor(urgency)}`}>
              {urgency.charAt(0).toUpperCase() + urgency.slice(1)} Urgency
            </span>
          </div>
          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
            {matchPercentage}% Match
          </span>
        </div>
        
        <p className="text-gray-600 mb-6">{description}</p>

        <div className="space-y-6">
          {/* General Recommendations Section */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-blue-600">
              <ThermometerSun size={20} />
              <h4 className="font-medium">General Recommendations</h4>
            </div>
            <ul className="list-disc list-inside space-y-2 text-gray-600 ml-2">
              {recommendations.map((rec, index) => (
                <li key={index} className="leading-relaxed">{rec}</li>
              ))}
            </ul>
          </div>

          {/* Age-Specific Advice */}
          {ageSpecificAdvice && ageSpecificAdvice.length > 0 && (
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-purple-600">
                <User size={20} />
                <h4 className="font-medium">Age-Specific Advice</h4>
              </div>
              <ul className="list-disc list-inside space-y-2 text-gray-600 ml-2">
                {ageSpecificAdvice.map((advice, index) => (
                  <li key={index} className="leading-relaxed">{advice}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Gender-Specific Advice */}
          {genderSpecificAdvice && genderSpecificAdvice.length > 0 && (
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-pink-600">
                <User size={20} />
                <h4 className="font-medium">Gender-Specific Advice</h4>
              </div>
              <ul className="list-disc list-inside space-y-2 text-gray-600 ml-2">
                {genderSpecificAdvice.map((advice, index) => (
                  <li key={index} className="leading-relaxed">{advice}</li>
                ))}
              </ul>
            </div>
          )}

          {/* When to Seek Help Section */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-red-600">
              <AlertTriangle size={20} />
              <h4 className="font-medium">When to Seek Medical Help</h4>
            </div>
            <ul className="list-disc list-inside space-y-2 text-gray-600 ml-2">
              {whenToSeekHelp.map((item, index) => (
                <li key={index} className="leading-relaxed">{item}</li>
              ))}
            </ul>
          </div>

          {/* Time-sensitive note */}
          <div className="flex items-center gap-2 text-gray-500 text-sm mt-4">
            <Clock size={16} />
            <p>Recommendations are time-sensitive. Seek professional medical advice if symptoms worsen.</p>
          </div>
        </div>
      </div>
    </div>
  );
};
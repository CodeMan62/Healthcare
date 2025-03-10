import React, { useState, useMemo, useEffect } from 'react';
import { Stethoscope } from 'lucide-react';
import { symptoms, diseases } from './data/health-data';
import { SymptomSelector } from './components/SymptomSelector';
import { DiseaseCard } from './components/DiseaseCard';
import { LoadingAnalysis } from './components/LoadingAnalysis';

function App() {
  const [selectedSymptoms, setSelectedSymptoms] = useState<number[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [age, setAge] = useState<string>('');
  const [gender, setGender] = useState<'male' | 'female' | ''>('');
  const [duration, setDuration] = useState<string>('');
  const [showAdditionalInputs, setShowAdditionalInputs] = useState(false);

  const toggleSymptom = (symptomId: number) => {
    setSelectedSymptoms(prev =>
      prev.includes(symptomId)
        ? prev.filter(id => id !== symptomId)
        : [...prev, symptomId]
    );
    setShowAdditionalInputs(true);
    setShowResults(false);
  };

  const handleAnalyze = () => {
    if (age && duration && gender && selectedSymptoms.length > 0) {
      setIsAnalyzing(true);
      setShowResults(false);
    }
  };

  const getAgeGroup = (age: number): 'child' | 'adult' | 'elderly' => {
    if (age < 12) return 'child';
    if (age >= 65) return 'elderly';
    return 'adult';
  };

  const matchedDiseases = useMemo(() => {
    if (selectedSymptoms.length === 0) return [];

    return diseases
      .map(disease => {
        const matchingSymptoms = disease.symptoms.filter(s => 
          selectedSymptoms.includes(s)
        );
        const matchPercentage = Math.round(
          (matchingSymptoms.length / disease.symptoms.length) * 100
        );
        
        // Adjust urgency based on age, gender, and duration
        let adjustedUrgency = disease.urgency;
        const durationDays = parseInt(duration);
        const ageNum = parseInt(age);
        const ageGroup = getAgeGroup(ageNum);

        if (durationDays > 7 || ageNum > 65 || ageNum < 12) {
          if (adjustedUrgency === 'low') adjustedUrgency = 'medium';
          else if (adjustedUrgency === 'medium') adjustedUrgency = 'high';
        }

        // Get gender and age specific advice
        const genderSpecificAdvice = gender && disease.genderSpecific?.[gender];
        const ageSpecificAdvice = disease.ageSpecific?.[ageGroup];

        return {
          ...disease,
          matchPercentage,
          urgency: adjustedUrgency,
          genderSpecificAdvice,
          ageSpecificAdvice,
        };
      })
      .filter(disease => disease.matchPercentage > 0)
      .sort((a, b) => b.matchPercentage - a.matchPercentage);
  }, [selectedSymptoms, age, gender, duration]);

  useEffect(() => {
    if (isAnalyzing) {
      const timer = setTimeout(() => {
        setIsAnalyzing(false);
        setShowResults(true);
      }, 2000 + Math.random() * 1000);

      return () => clearTimeout(timer);
    }
  }, [isAnalyzing]);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Stethoscope className="h-12 w-12 text-blue-600" />
            <h1 className="text-4xl font-bold text-gray-900">HealthGuide</h1>
          </div>
          <p className="text-xl text-gray-600">
            Select your symptoms to get potential health recommendations
          </p>
        </div>

        {/* Symptoms Selection */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">
            What symptoms are you experiencing?
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {symptoms.map(symptom => (
              <SymptomSelector
                key={symptom.id}
                symptomId={symptom.id}
                name={symptom.name}
                selected={selectedSymptoms.includes(symptom.id)}
                onToggle={toggleSymptom}
              />
            ))}
          </div>
        </div>

        {/* Additional Information Form */}
        {showAdditionalInputs && selectedSymptoms.length > 0 && (
          <div className="mb-12 bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h3 className="text-xl font-semibold text-gray-900 mb-6">Additional Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label htmlFor="age" className="block text-sm font-medium text-gray-700 mb-2">
                  Your Age
                </label>
                <input
                  type="number"
                  id="age"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter your age"
                  min="0"
                  max="120"
                />
              </div>
              <div>
                <label htmlFor="gender" className="block text-sm font-medium text-gray-700 mb-2">
                  Your Gender
                </label>
                <select
                  id="gender"
                  value={gender}
                  onChange={(e) => setGender(e.target.value as 'male' | 'female' | '')}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Select gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </div>
              <div>
                <label htmlFor="duration" className="block text-sm font-medium text-gray-700 mb-2">
                  Symptoms Duration (days)
                </label>
                <input
                  type="number"
                  id="duration"
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="How many days?"
                  min="1"
                />
              </div>
            </div>
            <button
              onClick={handleAnalyze}
              disabled={!age || !duration || !gender}
              className={`mt-6 px-6 py-2 rounded-md text-white font-medium transition-colors
                ${age && duration && gender
                  ? 'bg-blue-600 hover:bg-blue-700' 
                  : 'bg-gray-400 cursor-not-allowed'}`}
            >
              Analyze Symptoms
            </button>
          </div>
        )}

        {/* Results or Loading */}
        {selectedSymptoms.length > 0 && (
          <div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">
              {isAnalyzing ? 'Analyzing Your Symptoms' : 'Possible Conditions'}
            </h2>
            
            {isAnalyzing ? (
              <div className="grid md:grid-cols-2 gap-6">
                <LoadingAnalysis />
                <LoadingAnalysis />
              </div>
            ) : showResults && (
              <div className="grid md:grid-cols-2 gap-6">
                {matchedDiseases.map(disease => (
                  <DiseaseCard
                    key={disease.id}
                    name={disease.name}
                    description={disease.description}
                    recommendations={disease.recommendations}
                    matchPercentage={disease.matchPercentage}
                    urgency={disease.urgency}
                    whenToSeekHelp={disease.whenToSeekHelp}
                    genderSpecificAdvice={disease.genderSpecificAdvice}
                    ageSpecificAdvice={disease.ageSpecificAdvice}
                  />
                ))}
              </div>
            )}
          </div>
        )}

        {/* Disclaimer */}
        <div className="mt-12 p-4 bg-amber-50 rounded-lg border border-amber-200">
          <p className="text-amber-800 text-sm text-center">
            Disclaimer: This tool provides general information only and should not be used as a substitute for professional medical advice. Always consult with a qualified healthcare provider for proper diagnosis and treatment.
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;
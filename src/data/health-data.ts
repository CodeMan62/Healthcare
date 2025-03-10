interface Symptom {
  id: number;
  name: string;
}

interface Disease {
  id: number;
  name: string;
  symptoms: number[];
  description: string;
  recommendations: string[];
  urgency: 'low' | 'medium' | 'high';
  whenToSeekHelp: string[];
  genderSpecific?: {
    male?: string[];
    female?: string[];
  };
  ageSpecific?: {
    child?: string[];
    adult?: string[];
    elderly?: string[];
  };
}

export const symptoms: Symptom[] = [
  { id: 1, name: "Fever" },
  { id: 2, name: "Cough" },
  { id: 3, name: "Fatigue" },
  { id: 4, name: "Shortness of breath" },
  { id: 5, name: "Headache" },
  { id: 6, name: "Body aches" },
  { id: 7, name: "Sore throat" },
  { id: 8, name: "Runny nose" },
  { id: 9, name: "Nausea" },
  { id: 10, name: "Diarrhea" }
];

export const diseases: Disease[] = [
  {
    id: 1,
    name: "Common Cold",
    symptoms: [2, 7, 8],
    description: "A viral infection of the upper respiratory tract",
    recommendations: [
      "Rest well and get at least 8 hours of sleep",
      "Stay hydrated with water, herbal tea, or warm soup",
      "Use over-the-counter cold medications for symptom relief",
      "Try saline nasal drops to relieve congestion",
      "Gargle with warm salt water for sore throat relief"
    ],
    urgency: "low",
    whenToSeekHelp: [
      "Symptoms last more than 10 days",
      "Fever above 101.3°F (38.5°C)",
      "Severe sinus pain or headache",
      "Difficulty breathing"
    ],
    ageSpecific: {
      child: [
        "Use pediatric-formulated medications only",
        "Monitor temperature more frequently",
        "Ensure extra rest and fluids"
      ],
      elderly: [
        "Monitor for signs of pneumonia",
        "Stay warm and avoid temperature changes",
        "Consider checking with doctor earlier than usual"
      ]
    }
  },
  {
    id: 2,
    name: "Flu",
    symptoms: [1, 2, 3, 5, 6],
    description: "A contagious respiratory illness caused by influenza viruses",
    recommendations: [
      "Get plenty of rest and avoid physical exertion",
      "Take acetaminophen or ibuprofen for fever and body aches",
      "Stay hydrated with clear fluids and electrolyte solutions",
      "Consider antiviral medications if within 48 hours of symptoms",
      "Isolate yourself to prevent spreading to others"
    ],
    urgency: "medium",
    whenToSeekHelp: [
      "Difficulty breathing or shortness of breath",
      "Chest pain or severe abdominal pain",
      "Severe muscle pain or weakness",
      "Signs of dehydration",
      "Fever or cough that improve but then return or worsen"
    ],
    genderSpecific: {
      female: [
        "If pregnant, contact healthcare provider immediately",
        "Monitor menstrual changes if applicable"
      ],
      male: [
        "Monitor for testicular pain which may indicate complications"
      ]
    },
    ageSpecific: {
      child: [
        "Watch for signs of dehydration more closely",
        "Use children's formulation of medications",
        "Monitor breathing rate carefully"
      ],
      elderly: [
        "Higher risk of complications - seek medical attention earlier",
        "Monitor temperature and breathing more frequently",
        "Ensure proper hydration and nutrition"
      ]
    }
  },
  {
    id: 3,
    name: "COVID-19",
    symptoms: [1, 2, 3, 4, 7],
    description: "A respiratory illness caused by the SARS-CoV-2 virus",
    recommendations: [
      "Isolate immediately in a well-ventilated room",
      "Monitor oxygen levels with a pulse oximeter",
      "Rest and stay hydrated with clear fluids",
      "Take acetaminophen for fever and body aches",
      "Use prone positioning if experiencing breathing difficulties"
    ],
    urgency: "high",
    whenToSeekHelp: [
      "Oxygen levels below 94%",
      "Persistent chest pain or pressure",
      "Difficulty breathing or shortness of breath",
      "New confusion or inability to wake/stay awake",
      "Bluish lips or face"
    ],
    genderSpecific: {
      female: [
        "If pregnant, monitor fetal movement and contact healthcare provider",
        "Report any unusual menstrual changes"
      ],
      male: [
        "Monitor cardiovascular symptoms more closely",
        "Report any chest pain immediately"
      ]
    },
    ageSpecific: {
      child: [
        "Watch for Multisystem Inflammatory Syndrome (MIS-C)",
        "Monitor for rash or gastrointestinal symptoms",
        "Ensure proper mask fitting for children over 2"
      ],
      adult: [
        "Monitor for long COVID symptoms",
        "Watch for blood clot symptoms",
        "Consider vitamin D supplementation"
      ],
      elderly: [
        "Extremely high risk - seek medical attention early",
        "Monitor cognitive changes carefully",
        "Watch for silent hypoxia"
      ]
    }
  },
  {
    id: 4,
    name: "Gastroenteritis",
    symptoms: [1, 9, 10],
    description: "An intestinal infection marked by diarrhea, nausea, and vomiting",
    recommendations: [
      "Stay hydrated with clear fluids and oral rehydration solutions",
      "Start with small sips of water and gradually increase intake",
      "Follow the BRAT diet (Bananas, Rice, Applesauce, Toast)",
      "Avoid dairy products, caffeine, and fatty foods",
      "Get plenty of rest and avoid physical activity"
    ],
    urgency: "medium",
    whenToSeekHelp: [
      "Signs of severe dehydration (dark urine, dizziness, dry mouth)",
      "Blood in stool or vomit",
      "Fever above 102°F (39°C)",
      "Severe abdominal pain",
      "Symptoms lasting more than 3 days"
    ],
    genderSpecific: {
      female: [
        "If pregnant, seek immediate medical attention",
        "Monitor menstrual changes if applicable"
      ],
      male: [
        "Watch for signs of prostate inflammation"
      ]
    },
    ageSpecific: {
      child: [
        "Use pediatric electrolyte solutions",
        "Monitor diaper changes/bathroom visits",
        "Watch closely for dehydration signs"
      ],
      elderly: [
        "Higher risk of dehydration - seek help earlier",
        "Monitor kidney function through urine color",
        "Consider hospital evaluation sooner"
      ]
    }
  }
];
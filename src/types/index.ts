export type BodySystemPetal = {
  id: 'sleep' | 'hydration' | 'vitality' | 'mood' | 'comfort' | 'respiration';
  label: string;
  iconName: string;
  score: number; // 0 - 100
  status: 'optimal' | 'moderate' | 'needs-attention';
  detail: string;
  unit: string;
  value: string;
  color: string;
  lightColor: string;
};

export type SymptomItem = {
  id: string;
  name: string;
  category: 'head' | 'chest' | 'energy' | 'digestive' | 'muscles';
  severity: number; // 1 to 10
  selected: boolean;
  notes?: string;
};

export type MedicationItem = {
  id: string;
  name: string;
  dosage: string;
  timing: 'Morning' | 'Afternoon' | 'Evening' | 'Bedtime';
  instructions: string;
  taken: boolean;
  category: 'prescription' | 'supplement' | 'botanical';
};

export type HealthLogEntry = {
  id: string;
  date: string;
  overallScore: number;
  symptoms: string[];
  notes: string;
};

export type TriageRecommendation = {
  severityLevel: 'low' | 'moderate' | 'high';
  headline: string;
  subtext: string;
  recommendations: string[];
  botanicalRemedy: string;
  shouldAlertDoctor: boolean;
};

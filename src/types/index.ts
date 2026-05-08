export interface SkinAnalysisResult {
  skinType: string;
  concerns: string[];
  hydrationLevel: string;
  recommendations: string[];
  routineSuggestion: {
    morning: string[];
    evening: string[];
  };
  overallScore: number;
    productRecommendations?: { name: string; type: string; price: string; reason: string }[];
}

export interface RoutineEntry {
  id: string;
  date: string;
  timeOfDay: "morning" | "evening";
  steps: RoutineStep[];
  notes: string;
  skinFeeling: number;
}

export interface RoutineStep {
  id: string;
  name: string;
  product?: string;
  completed: boolean;
  order: number;
}

export interface UserProfile {
  skinType?: string;
  concerns?: string[];
  routineHistory: RoutineEntry[];
}

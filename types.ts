
export interface AdAnalysisInput {
  keyword: string;
  region: string;
  platform: string;
  rawAdText?: string;
}

export interface DemographicRow {
  regionType: string;
  locations: string;
  ageGroup: string;
  language: string;
  culturalTone: string;
  purchaseTrigger: string;
}

export interface AdIntelligenceReport {
  id: string;
  timestamp: number;
  input: AdAnalysisInput;
  executiveSummary: {
    meaning: string;
    whatIsWorking: string;
  };
  keywordInterpretation: {
    culturalMeaning: string;
    emotionalAssociations: string[];
    scenarios: string[];
  };
  demographics: DemographicRow[];
  creativePatterns: {
    topHooks: string[];
    visualStyles: string;
    copyTone: string;
  };
  audienceComparison: {
    genZProfile: string;
    massProfile: string;
    dosAndDonts: { audience: string; dos: string[]; donts: string[] }[];
  };
  brandStrategy: {
    legacyApproach: string;
    fmcgTips: string;
    pitfalls: string;
  };
  actionableAssets: {
    copyFrameworks: string[];
    reelHooks: string[];
    messagingAngles: string[];
  };
  trendAlerts: {
    opportunities: string[];
    saturationWarnings: string[];
  };
}

export interface User {
  email: string;
  fullName: string;
  role: string;
  department: string;
  joinedDate: number;
  analysisHistory: AdIntelligenceReport[];
}

export type AuthState = {
  isAuthenticated: boolean;
  currentUser: User | null;
}

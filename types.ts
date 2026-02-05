export interface AdAnalysisInput {
  keyword: string;
  region: string;
  platform: string;
  rawAdText?: string;
}

export interface AdIntelligenceReport {
  id: string;
  timestamp: number;
  input: AdAnalysisInput;
  
  marketIntelligence: {
    industryInsights: string;
    demandPatterns: string;
    winningFormats: string[];
  };
  
  audiencePsychology: {
    corePains: string[];
    emotionalTriggers: string[];
    objections: string[];
    decisionDrivers: string[];
  };
  
  competitorReport: {
    brandName: string;
    strategy: string;
    weaknesses: string;
  }[];
  
  positioningStrategy: {
    statement: string;
    whyThisWins: string;
    howItStandsOut: string;
  };
  
  contentStrategy: {
    platformPlan: string;
    framework30Day: string;
    viralAngles: string[];
  };
  
  funnelBlueprint: {
    flow: string;
    leadCaptureLogic: string;
    nurtureStrategy: string;
  };
  
  executionPlaybook: {
    reelIdeas: { hook: string; idea: string }[];
    adAngles: string[];
    lpHeadline: string;
    lpSubhead: string;
    ctas: string[];
    weeklyActions: string[];
  };
  
  metrics: {
    track: string[];
    successDefinition: string;
    warningSigns: string[];
  };

  frameworkAnalysis: {
    appliedFramework: string;
    whyUsed: string;
  };
  
  sources?: { title: string; url: string }[];
}

export interface User {
  email: string;
  fullName: string;
  role: string;
  department: string;
  joinedDate: number;
  analysisHistory: AdIntelligenceReport[];
}
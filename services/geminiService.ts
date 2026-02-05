import { GoogleGenAI, Type } from "@google/genai";
import { AdAnalysisInput, AdIntelligenceReport } from "../types";
import { SYSTEM_INSTRUCTION, REPORT_PROMPT } from "../constants";

export const generateAdIntelligence = async (input: AdAnalysisInput): Promise<AdIntelligenceReport> => {
  const apiKey = process.env.API_KEY;
  if (!apiKey || apiKey === 'undefined') throw new Error("API Key missing.");

  const ai = new GoogleGenAI({ apiKey });
  
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: [{ parts: [{ text: REPORT_PROMPT(input) }] }],
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        tools: [{ googleSearch: {} }],
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            marketIntelligence: {
              type: Type.OBJECT,
              properties: {
                industryInsights: { type: Type.STRING },
                demandPatterns: { type: Type.STRING },
                winningFormats: { type: Type.ARRAY, items: { type: Type.STRING } }
              }
            },
            audiencePsychology: {
              type: Type.OBJECT,
              properties: {
                corePains: { type: Type.ARRAY, items: { type: Type.STRING } },
                emotionalTriggers: { type: Type.ARRAY, items: { type: Type.STRING } },
                objections: { type: Type.ARRAY, items: { type: Type.STRING } },
                decisionDrivers: { type: Type.ARRAY, items: { type: Type.STRING } }
              }
            },
            competitorReport: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  brandName: { type: Type.STRING },
                  strategy: { type: Type.STRING },
                  weaknesses: { type: Type.STRING }
                }
              }
            },
            positioningStrategy: {
              type: Type.OBJECT,
              properties: {
                statement: { type: Type.STRING },
                whyThisWins: { type: Type.STRING },
                howItStandsOut: { type: Type.STRING }
              }
            },
            contentStrategy: {
              type: Type.OBJECT,
              properties: {
                platformPlan: { type: Type.STRING },
                framework30Day: { type: Type.STRING },
                viralAngles: { type: Type.ARRAY, items: { type: Type.STRING } }
              }
            },
            funnelBlueprint: {
              type: Type.OBJECT,
              properties: {
                flow: { type: Type.STRING },
                leadCaptureLogic: { type: Type.STRING },
                nurtureStrategy: { type: Type.STRING }
              }
            },
            executionPlaybook: {
              type: Type.OBJECT,
              properties: {
                reelIdeas: {
                  type: Type.ARRAY,
                  items: {
                    type: Type.OBJECT,
                    properties: {
                      hook: { type: Type.STRING },
                      idea: { type: Type.STRING }
                    }
                  }
                },
                adAngles: { type: Type.ARRAY, items: { type: Type.STRING } },
                lpHeadline: { type: Type.STRING },
                lpSubhead: { type: Type.STRING },
                ctas: { type: Type.ARRAY, items: { type: Type.STRING } },
                weeklyActions: { type: Type.ARRAY, items: { type: Type.STRING } }
              }
            },
            metrics: {
              type: Type.OBJECT,
              properties: {
                track: { type: Type.ARRAY, items: { type: Type.STRING } },
                successDefinition: { type: Type.STRING },
                warningSigns: { type: Type.ARRAY, items: { type: Type.STRING } }
              }
            },
            frameworkAnalysis: {
              type: Type.OBJECT,
              properties: {
                appliedFramework: { type: Type.STRING },
                whyUsed: { type: Type.STRING }
              }
            }
          }
        }
      }
    });

    const text = response.text;
    if (!text) throw new Error("Empty response from VARTA Node.");
    
    const sources: { title: string; url: string }[] = [];
    const chunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
    chunks.forEach((chunk: any) => {
      if (chunk.web) sources.push({ title: chunk.web.title || 'Live Signal', url: chunk.web.uri });
    });

    const parsedData = JSON.parse(text);
    return { ...parsedData, sources };
  } catch (error: any) {
    if (error.message?.includes('429')) throw new Error("QUOTA_EXHAUSTED: Please establish a private corporate connection.");
    throw new Error(error.message || "VARTA Intelligence connection failure.");
  }
};
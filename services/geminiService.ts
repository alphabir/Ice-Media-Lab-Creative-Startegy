import { GoogleGenAI, Type } from "@google/genai";
import { AdAnalysisInput, AdIntelligenceReport } from "../types";
import { SYSTEM_INSTRUCTION, REPORT_PROMPT } from "../constants";

export const generateAdIntelligence = async (input: AdAnalysisInput): Promise<AdIntelligenceReport> => {
  const apiKey = process.env.API_KEY;
  
  if (!apiKey || apiKey === 'undefined') {
    throw new Error("API Key is missing. Please ensure the API_KEY environment variable is set.");
  }

  const ai = new GoogleGenAI({ apiKey });
  
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-preview',
      contents: [{ parts: [{ text: REPORT_PROMPT(input) }] }],
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        tools: [{ googleSearch: {} }],
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            executiveSummary: {
              type: Type.OBJECT,
              properties: {
                meaning: { type: Type.STRING },
                whatIsWorking: { type: Type.STRING }
              },
              required: ["meaning", "whatIsWorking"]
            },
            keywordInterpretation: {
              type: Type.OBJECT,
              properties: {
                culturalMeaning: { type: Type.STRING },
                emotionalAssociations: { type: Type.ARRAY, items: { type: Type.STRING } },
                scenarios: { type: Type.ARRAY, items: { type: Type.STRING } }
              },
              required: ["culturalMeaning", "emotionalAssociations", "scenarios"]
            },
            demographics: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  regionType: { type: Type.STRING },
                  locations: { type: Type.STRING },
                  ageGroup: { type: Type.STRING },
                  language: { type: Type.STRING },
                  culturalTone: { type: Type.STRING },
                  purchaseTrigger: { type: Type.STRING }
                }
              }
            },
            competitors: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  brandName: { type: Type.STRING },
                  marketShare: { type: Type.STRING },
                  primaryStrategy: { type: Type.STRING },
                  winningCreativeStyle: { type: Type.STRING },
                  estimatedAOV: { type: Type.STRING }
                }
              }
            },
            performingCampaigns: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  platform: { type: Type.STRING },
                  format: { type: Type.STRING },
                  hookType: { type: Type.STRING },
                  performanceRating: { type: Type.STRING },
                  reasoning: { type: Type.STRING }
                }
              }
            },
            creativePatterns: {
              type: Type.OBJECT,
              properties: {
                topHooks: { type: Type.ARRAY, items: { type: Type.STRING } },
                visualStyles: { type: Type.STRING },
                copyTone: { type: Type.STRING }
              }
            },
            audienceComparison: {
              type: Type.OBJECT,
              properties: {
                genZProfile: { type: Type.STRING },
                massProfile: { type: Type.STRING },
                dosAndDonts: {
                  type: Type.ARRAY,
                  items: {
                    type: Type.OBJECT,
                    properties: {
                      audience: { type: Type.STRING },
                      dos: { type: Type.ARRAY, items: { type: Type.STRING } },
                      donts: { type: Type.ARRAY, items: { type: Type.STRING } }
                    }
                  }
                }
              }
            },
            brandStrategy: {
              type: Type.OBJECT,
              properties: {
                legacyApproach: { type: Type.STRING },
                fmcgTips: { type: Type.STRING },
                pitfalls: { type: Type.STRING }
              }
            },
            actionableAssets: {
              type: Type.OBJECT,
              properties: {
                copyFrameworks: { type: Type.ARRAY, items: { type: Type.STRING } },
                reelHooks: { type: Type.ARRAY, items: { type: Type.STRING } },
                messagingAngles: { type: Type.ARRAY, items: { type: Type.STRING } }
              }
            },
            trendAlerts: {
              type: Type.OBJECT,
              properties: {
                opportunities: { type: Type.ARRAY, items: { type: Type.STRING } },
                saturationWarnings: { type: Type.ARRAY, items: { type: Type.STRING } }
              }
            }
          }
        }
      }
    });

    const text = response.text;
    if (!text) throw new Error("Empty response from AI");
    
    // Extract search grounding metadata
    const sources: { title: string; url: string }[] = [];
    const chunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
    chunks.forEach((chunk: any) => {
      if (chunk.web) {
        sources.push({ title: chunk.web.title || 'Source', url: chunk.web.uri });
      }
    });

    const cleanedJson = text.replace(/```json\n?|```/g, "").trim();
    const parsedData = JSON.parse(cleanedJson);
    
    return {
      ...parsedData,
      sources
    };
  } catch (error: any) {
    console.error("Gemini API Error:", error);
    throw new Error(error.message || "An unexpected error occurred during intelligence gathering.");
  }
};
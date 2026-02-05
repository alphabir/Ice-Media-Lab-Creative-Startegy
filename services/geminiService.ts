
import { GoogleGenAI, Type } from "@google/genai";
import { AdAnalysisInput, AdIntelligenceReport } from "../types";
import { SYSTEM_INSTRUCTION, REPORT_PROMPT } from "../constants";

export const generateAdIntelligence = async (input: AdAnalysisInput): Promise<AdIntelligenceReport> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
  
  const response = await ai.models.generateContent({
    model: 'gemini-3-pro-preview',
    contents: REPORT_PROMPT(input),
    config: {
      systemInstruction: SYSTEM_INSTRUCTION,
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
  if (!text) throw new Error("No response from AI");
  
  try {
    // Sanitize output to handle markdown code blocks if the AI includes them despite MIME type
    const cleanedJson = text.replace(/```json\n?|```/g, "").trim();
    return JSON.parse(cleanedJson);
  } catch (error) {
    console.error("JSON Parse Error:", error, "Raw Text:", text);
    throw new Error("The AI returned an invalid data format. Please try again.");
  }
};

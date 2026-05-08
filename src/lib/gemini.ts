import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

interface UserInfo {
  skinType?: string;
  concerns?: string[];
  ageRange?: string;
  routine?: string;
}

export async function analyzeSkin(imageBase64: string, mimeType: string, userInfo?: UserInfo) {
  const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

  const userContext = userInfo
    ? `
The user provided the following information about themselves:
- Self-reported skin type: ${userInfo.skinType || "Not specified"}
- Main concerns: ${userInfo.concerns?.length ? userInfo.concerns.join(", ") : "Not specified"}
- Age range: ${userInfo.ageRange || "Not specified"}
- Current skincare routine level: ${userInfo.routine || "Not specified"}

Use this information alongside your visual analysis to provide more personalized and relevant recommendations. If the user\'s self-reported skin type differs from what you observe, mention both and explain.
`
    : "";

  const prompt = `You are a professional dermatologist AI assistant for a skincare app called "Glow Log".
Analyze this skin photo and provide a detailed assessment. Return ONLY valid JSON with this exact structure:
{
  "skinType": "oily" | "dry" | "combination" | "normal" | "sensitive",
  "concerns": ["list of specific skin concerns you observe"],
  "hydrationLevel": "low" | "moderate" | "good" | "excellent",
  "recommendations": ["5 specific skincare recommendations"],
  "routineSuggestion": {
    "morning": ["step 1", "step 2", "step 3", "step 4", "step 5"],
    "evening": ["step 1", "step 2", "step 3", "step 4", "step 5"]
  },
  "overallScore": 75
}
${userContext}
Be encouraging, specific, and helpful. The overallScore should be 1-100. Always provide actionable advice.`;

  const result = await model.generateContent([
    prompt,
    { inlineData: { mimeType, data: imageBase64 } },
  ]);

  const response = result.response.text();
  const jsonMatch = response.match(/\{[\s\S]*\}/);
  if (!jsonMatch) throw new Error("Invalid AI response");
  return JSON.parse(jsonMatch[0]);
}

export async function getRoutineAdvice(skinType: string, concerns: string[]) {
  const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

  const prompt = `You are a skincare expert for "Glow Log" app.
Given skin type: ${skinType} and concerns: ${concerns.join(", ")},
suggest a personalized daily skincare routine.
Return ONLY JSON:
{
  "morning": [{"step": "Cleanser", "description": "...", "tip": "..."}],
  "evening": [{"step": "Cleanser", "description": "...", "tip": "..."}],
  "weeklyTreatments": [{"name": "...", "frequency": "...", "description": "..."}],
  "ingredientsToLookFor": ["..."],
  "ingredientsToAvoid": ["..."]
}`;

  const result = await model.generateContent(prompt);
  const response = result.response.text();
  const jsonMatch = response.match(/\{[\s\S]*\}/);
  if (!jsonMatch) throw new Error("Invalid AI response");
  return JSON.parse(jsonMatch[0]);
}

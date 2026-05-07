import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

export async function analyzeSkin(imageBase64: string, mimeType: string) {
  const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

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

  Be encouraging, specific, and helpful. The overallScore should be 1-100. Always provide actionable advice.`;

  const result = await model.generateContent([
    prompt,
    {
      inlineData: {
        mimeType,
        data: imageBase64,
      },
    },
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
  Return ONLY valid JSON:
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

import { GoogleGenerativeAI } from "@google/generative-ai";

// API Key rotation: supports multiple keys separated by commas in env
// e.g. GEMINI_API_KEY=key1,key2,key3 → 3 keys x 20 RPD = 60 RPD free
const apiKeys = (process.env.GEMINI_API_KEY || "").split(",").map((k) => k.trim()).filter(Boolean);
let keyIndex = 0;

function getGenAI() {
  if (apiKeys.length === 0) throw new Error("No API key configured");
  const key = apiKeys[keyIndex % apiKeys.length];
  keyIndex++;
  return new GoogleGenerativeAI(key);
}

interface UserInfo {
  skinType?: string;
  concerns?: string[];
  ageRange?: string;
  routine?: string;
  budget?: string;
}

export async function analyzeSkin(imageBase64: string, mimeType: string, userInfo?: UserInfo) {
  const genAI = getGenAI();
  const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

  const userContext = userInfo
    ? `
The user provided the following information:
- Self-reported skin type: ${userInfo.skinType || "Not specified"}
- Main concerns: ${userInfo.concerns?.length ? userInfo.concerns.join(", ") : "Not specified"}
- Age range: ${userInfo.ageRange || "Not specified"}
- Current skincare routine level: ${userInfo.routine || "Not specified"}
- Budget preference: ${userInfo.budget || "Not specified"}

Use this alongside your visual analysis for personalized recommendations.
If the user\'s self-reported skin type differs from what you observe, mention both.
IMPORTANT: Recommend real, specific products that match the user\'s budget preference.
`
    : "";

  const prompt = `You are a professional dermatologist AI assistant for "Glow Log".
Analyze this skin photo and provide a detailed assessment.
Return ONLY valid JSON with this exact structure:
{
  "skinType": "oily" | "dry" | "combination" | "normal" | "sensitive",
  "concerns": ["list of specific skin concerns you observe"],
  "hydrationLevel": "low" | "moderate" | "good" | "excellent",
  "recommendations": ["5 specific skincare recommendations"],
  "routineSuggestion": {
    "morning": ["step 1", "step 2", "step 3", "step 4", "step 5"],
    "evening": ["step 1", "step 2", "step 3", "step 4", "step 5"]
  },
  "productRecommendations": [
    {
      "name": "Product Name by Brand",
      "type": "cleanser" | "toner" | "serum" | "moisturizer" | "sunscreen" | "treatment" | "mask",
      "price": "$XX",
      "reason": "Why this product is good for the user"
    }
  ],
  "overallScore": 75
}

For productRecommendations:
- Recommend 4-6 REAL products from well-known brands (CeraVe, The Ordinary, La Roche-Posay, Neutrogena, Paula\'s Choice, COSRX, Cetaphil, Olay, etc.)
- Match the budget: "Budget-Friendly" = drugstore under $15, "Mid-Range" = $15-40, "Premium" = $40-80, "Luxury" = $80+
- Each product must be a real product that actually exists
- Include a mix of product types (cleanser, serum, moisturizer, sunscreen at minimum)
${userContext}
Be encouraging, specific, and helpful. The overallScore should be 1-100.`;

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
  const genAI = getGenAI();
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

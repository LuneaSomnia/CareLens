import { GoogleGenAI } from "@google/genai";
import { UserProfile, Symptom } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

// Using gemini-3-flash-preview for quicker responses, pro for deep reasoning
const MODEL_FLASH = 'gemini-3-flash-preview';
const MODEL_PRO = 'gemini-3-pro-preview';

export const getGeminiRecommendations = async (
  profile: UserProfile,
  context: 'vaccine' | 'screening' | 'lifestyle'
): Promise<string> => {
  const prompt = `
    You are CareLens, a warm, caring, and professional health partner.
    Address the user directly as "${profile.name}".
    
    User Context:
    - Age: ${profile.age}
    - Gender: ${profile.gender}
    - Location: ${profile.location}
    - Medical History: ${profile.conditions}, ${profile.familyHistory}
    - Lifestyle: ${profile.activity}, ${profile.diet}, ${profile.substanceUse}

    Your Task:
    Provide personalized recommendations for ${context}.
    Use a soft, supportive tone (like a trusted advisor). 
    Speak in the second person ("You should...", "I recommend...").
    
    Context Specific Instructions:
    ${context === 'vaccine' ? 'Suggest necessary immunizations, personalized booster shots, and explain why they are needed based on their location/demographics/risk.' : ''}
    ${context === 'screening' ? 'Suggest specific preventive screenings (e.g., cancer, cardio) relevant to their age/gender/risk. Include frequency and clear rationale.' : ''}
    ${context === 'lifestyle' ? 'Suggest evidence-based avoidant measures and lifestyle habits to reduce health risks. Be adaptive to their habits.' : ''}

    FORMATTING REQUIREMENTS:
    - Use Markdown.
    - Use bold headings (e.g., ## Recommendation).
    - Use bullet points.
    
    DISCLAIMER:
    At the very bottom of your response, separate from the rest, add this exact disclaimer:
    > *Disclaimer: I am CareLens, an AI tool designed to support your preventive care journey. While I strive to provide accurate insights based on your data, I am not a doctor. Please consult with a healthcare professional before making significant medical decisions.*
  `;

  try {
    const response = await ai.models.generateContent({
      model: MODEL_FLASH,
      contents: prompt,
    });
    return response.text || "Unable to generate recommendations at this time.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Error connecting to AI service. Please try again later.";
  }
};

export const analyzeSymptomsAndRisks = async (
  profile: UserProfile,
  symptoms: Symptom[]
): Promise<string> => {
  const symptomText = symptoms.map(s => `${s.name} (Severity: ${s.severity}/10, Duration: ${s.duration})`).join(', ');

  const prompt = `
    You are CareLens, an advanced but empathetic medical AI assistant. 
    Address the user directly as "${profile.name}".
    
    User Profile:
    - Age: ${profile.age}, Gender: ${profile.gender}
    - History: ${profile.conditions}, ${profile.familyHistory}
    
    Current Symptoms:
    ${symptomText}

    Task:
    1. **Symptom Analysis & Measures**: Suggest personalized measures to manage current symptoms.
    2. **Risk Calculation & Red Flag Triage**: Analyze risks based on symptoms + history. Identify any "Red Flags".
    3. **Smart Tests & Screening Suggestions**: 
       - Recommend specific tests (e.g., Blood tests, imaging).
       - Explain WHAT it is, HOW it is done, WHERE to go (general facility type), and WHY it is necessary for *them*.
    
    Tone: Warm, human, professional, yet cautious.
    
    FORMATTING REQUIREMENTS:
    - Use Markdown.
    - Use clear headings: ## Symptom Management, ## Risk Calculation, ## Smart Test Suggestions.
    - Use bullet points.

    DISCLAIMER:
    At the very bottom of your response, separate from the rest, add this exact disclaimer:
    > *Disclaimer: I am CareLens, an AI tool designed to support your preventive care journey. While I strive to provide accurate insights based on your data, I am not a doctor. Please consult with a healthcare professional before making significant medical decisions.*
  `;

  try {
    const response = await ai.models.generateContent({
      model: MODEL_PRO, // Using Pro for better reasoning capabilities
      contents: prompt,
      config: {
        thinkingConfig: { thinkingBudget: 2048 } // Allow some thinking for risk assessment
      }
    });
    return response.text || "Unable to analyze risks.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Error connecting to AI service.";
  }
};

export const getManagementPlan = async (
  profile: UserProfile,
  condition: string
): Promise<string> => {
  const prompt = `
    You are CareLens, a supportive health partner.
    Create a Disease-Specific Management Plan for "${profile.name}" regarding their condition: ${condition}.
    
    User Context:
    - Age: ${profile.age}
    - Current Habits: ${profile.activity}, ${profile.diet}

    Include:
    1. **Educational Module**: Explain the condition simply and share any emerging info relevant to them.
    2. **Habits to Adopt**: Personalized actions (e.g., specific exercises, dietary changes).
    3. **Rationale**: Why these changes help manage ${condition}.
    
    Tone: Encouraging, soft, and professional.

    FORMATTING REQUIREMENTS:
    - Use Markdown.
    - Use headings (##) and lists.

    DISCLAIMER:
    At the very bottom of your response, separate from the rest, add this exact disclaimer:
    > *Disclaimer: I am CareLens, an AI tool designed to support your preventive care journey. While I strive to provide accurate insights based on your data, I am not a doctor. Please consult with a healthcare professional before making significant medical decisions.*
  `;

  try {
    const response = await ai.models.generateContent({
      model: MODEL_FLASH,
      contents: prompt,
    });
    return response.text || "Unable to generate plan.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Error connecting to AI service.";
  }
};
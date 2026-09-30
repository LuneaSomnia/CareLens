import { GoogleGenAI, Type } from "@google/genai";
import { UserProfile, Symptom } from "../types";
import { db, auth } from "../firebase";
import { collection, addDoc, getDocs, query, orderBy, limit, deleteDoc, doc, where } from "firebase/firestore";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

// Using gemini-3.8-flash for quicker responses, pro for deep reasoning
const MODEL_FLASH = 'gemini-3.8-flash';
const MODEL_PRO = 'gemini-3.1-pro-preview';

const saveRecommendationAndProcedures = async (text: string, category: 'PREVENTION' | 'MANAGEMENT' | 'ANALYSIS', profile: UserProfile) => {
  if (!auth.currentUser) return;
  const userId = auth.currentUser.uid;
  const now = new Date();
  const expiresAt = new Date();
  expiresAt.setDate(now.getDate() + 7); // 7 days from now

  try {
    // Enforce maximum 5 recommendations limit
    const recsQuery = query(collection(db, 'recommendations'), where('userId', '==', userId));
    const recsSnapshot = await getDocs(recsQuery);
    
    // Sort by createdAt descending
    const existingRecs = recsSnapshot.docs.map(d => ({ id: d.id, ...d.data() })).sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    
    // If there are already 5 or more, delete the older ones to make room for the new 1 (keep max 4)
    if (existingRecs.length >= 5) {
      for (let i = 4; i < existingRecs.length; i++) {
        await deleteDoc(doc(db, 'recommendations', existingRecs[i].id));
      }
    }

    // Save the recommendation text
    await addDoc(collection(db, 'recommendations'), {
      userId,
      category,
      text,
      createdAt: now.toISOString(),
      expiresAt: expiresAt.toISOString()
    });

    // Extract procedures
    const extractionPrompt = `
      Extract any recommended vaccines, tests, or screenings from the following text.
      Return a JSON array of objects. Each object should have:
      - type: "VACCINE", "TEST", or "SCREENING"
      - name: The name of the procedure
      - facility: The recommended facility type (e.g., "Local Clinic", "Hospital", "Specialist")
      
      Text:
      ${text}
    `;

    const response = await ai.models.generateContent({
      model: MODEL_FLASH,
      contents: extractionPrompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              type: { type: Type.STRING, enum: ["VACCINE", "TEST", "SCREENING"] },
              name: { type: Type.STRING },
              facility: { type: Type.STRING }
            },
            required: ["type", "name", "facility"]
          }
        }
      }
    });

    const procedures = JSON.parse(response.text || "[]");
    for (const proc of procedures) {
      await addDoc(collection(db, 'procedures'), {
        userId,
        userName: profile.name || 'Unknown',
        userPhone: profile.phoneNumber || 'Not provided',
        userNationalId: profile.nationalId || 'Not provided',
        type: proc.type,
        name: proc.name,
        facility: proc.facility,
        completed: false,
        createdAt: now.toISOString()
      });
    }
  } catch (error) {
    console.error("Error saving recommendation/procedures:", error);
  }
};

const getUserMedicalRecords = async (userId: string) => {
  try {
    const q = query(collection(db, 'users', userId, 'medicalRecords'), orderBy('createdAt', 'desc'), limit(10));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => doc.data());
  } catch (error) {
    console.error("Error fetching medical records:", error);
    return [];
  }
};

export const getGeminiRecommendations = async (
  profile: UserProfile,
  context: 'vaccine' | 'screening' | 'lifestyle'
): Promise<string> => {
  const medicalRecords = auth.currentUser ? await getUserMedicalRecords(auth.currentUser.uid) : [];
  const medicalRecordsContext = medicalRecords.length > 0 
    ? `\nRecent Medical Procedures History (from Doctor Portal):\n${JSON.stringify(medicalRecords, null, 2)}\n`
    : '';

  const prompt = `
    You are CareLens, a warm but formal health partner.
    Address the user directly as "${profile.name}".
    
    User Context:
    - Age: ${profile.age}
    - Gender: ${profile.gender}
    - Location: ${profile.location}
    - Medical History: ${profile.conditions}, ${profile.familyHistory}
    - Lifestyle: ${profile.activity}, ${profile.diet}, ${profile.substanceUse}
    ${medicalRecordsContext}

    Your Task:
    Provide personalized recommendations for ${context}.
    Use a warm but formal tone, similar to talking to a caring health professional.
    Speak in the second person ("You should...", "I recommend...").

    CRITICAL REQUIREMENT:
    EVERY SINGLE RECOMMENDATION AND SUGGESTION MUST be clinically anchored and validated.
    You MUST cite a recognized health organization or body such as the CDC, WHO, or Kenya Ministry of Health (MoH) for EVERY suggestion.
    EVERY suggestion and recommendation MUST be carefully worded in the following way (or similar):
    "According to the [Organization Name] standard clinical guideline [Guideline Name/Topic], you should..."
    DO NOT use phrases like "I think you should..." or "Based on clinical guidelines...". Be specific with the organization and the guideline.
    
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
      config: {
        tools: [{ googleSearch: {} }]
      }
    });
    const resultText = response.text || "Unable to generate recommendations at this time.";
    if (response.text) {
      await saveRecommendationAndProcedures(resultText, 'PREVENTION', profile);
    }
    return resultText;
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

  const medicalRecords = auth.currentUser ? await getUserMedicalRecords(auth.currentUser.uid) : [];
  const medicalRecordsContext = medicalRecords.length > 0 
    ? `\nRecent Medical Procedures History (from Doctor Portal):\n${JSON.stringify(medicalRecords, null, 2)}\n`
    : '';

  const prompt = `
    You are CareLens, an advanced but empathetic medical AI assistant. 
    Address the user directly as "${profile.name}".
    
    User Profile:
    - Age: ${profile.age}, Gender: ${profile.gender}
    - History: ${profile.conditions}, ${profile.familyHistory}
    ${medicalRecordsContext}
    
    Current Symptoms:
    ${symptomText}

    Task:
    1. **Deep Personalization**: Analyze the user's symptoms strictly in the context of their entire profile (age, gender, chronic conditions, family history, and recent medical records). A mild symptom in a healthy person might be benign, but in a person with chronic conditions (e.g., diabetes, hypertension) or specific medical history, it could be a sign of a serious complication. Personalize your advice to account for this dynamic.
    
    2. **Objective Red-Flag Triage**: Evaluate the symptoms against the following universal, objective red-flag triage list. If ANY of these are present or suspected based on the user's input, you MUST immediately inform them of the need to seek urgent medical care within the specified timeframe. Your response must be well-worded to avoid panic, well-informed as to why it may be necessary, and heavily emphasize the need to seek medical attention within the required window.

    **Red-Flag Triage List:**
    *   **Immediate / life-threatening — go to ER / ambulance now (≤2 hours or call emergency):**
        *   Chest pain with exertion, crushing chest pain, or sudden severe chest pressure
        *   Sudden onset severe shortness of breath, respiratory distress
        *   Sudden weakness or numbness on one side, slurred speech, facial droop (stroke signs)
        *   Loss of consciousness, fainting with no recovery, or seizure not resolving
        *   Active heavy bleeding not controlled by pressure
        *   Severe abdominal pain with peritonitic signs (rigid abdomen)
        *   Severe head injury with confusion, vomiting, seizures
        *   Severe allergic reaction with breathing difficulty (anaphylaxis)
        *   Neonate with high fever / newborn lethargy
    *   **Urgent — seek care within 24 hours (fast clinic / urgent care):**
        *   High fever (>39°C) in adults with persistent vomiting or signs of dehydration
        *   Repeated vomiting with inability to keep fluids
        *   Signs of severe infection (fever + extreme lethargy)
        *   New severe jaundice, dark urine and confusion
        *   Acute severe psychiatric risk (suicidal ideation with plan) — urgent mental health intervention
    *   **Urgent but next-day / within 48 hours (clinic appointment within 48 hours):**
        *   Persistent fever for 3+ days
        *   Worsening chronic disease symptoms (e.g., orthopnea, rapid weight gain from edema)
        *   New visual loss or sudden severe headache with vomiting (possible acute glaucoma/bleed)
    *   **Non-urgent but should be evaluated within 7 days:**
        *   New or worsening chronic cough >2 weeks (TB screening)
        *   New unexplained weight loss, changes in bowel habits >2 weeks (colorectal screening need)
        *   Recurrent mild chest pain with exertion (schedule cardiology assessment)
        *   Minor but persistent bleeding (e.g., abnormal uterine bleeding) — schedule within 7 days

    3. **Symptom Analysis & Measures**: Suggest personalized measures to manage current symptoms, keeping their medical history in mind.
    4. **Risk Calculation**: Analyze risks based on symptoms + history.
    5. **Smart Tests & Screening Suggestions**: 
       - Recommend specific tests (e.g., Blood tests, imaging).
       - Explain WHAT it is, HOW it is done, WHERE to go (general facility type), and WHY it is necessary for *them*.
    
    Tone: Warm but formal, similar to talking to a caring health professional. If a red flag is detected, be firm, clear, and prioritize the urgent care instruction above all else, while remaining calm.

    CRITICAL REQUIREMENT:
    EVERY SINGLE RECOMMENDATION AND SUGGESTION MUST be clinically anchored and validated.
    You MUST cite a recognized health organization or body such as the CDC, WHO, or Kenya Ministry of Health (MoH) for EVERY suggestion.
    EVERY suggestion and recommendation MUST be carefully worded in the following way (or similar):
    "According to the [Organization Name] standard clinical guideline [Guideline Name/Topic], you should..."
    DO NOT use phrases like "I think you should..." or "Based on clinical guidelines...". Be specific with the organization and the guideline.
    
    FORMATTING REQUIREMENTS:
    - Use Markdown.
    - If a red flag is detected, start with a highly visible **⚠️ URGENT MEDICAL ATTENTION REQUIRED** section.
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
        tools: [{ googleSearch: {} }]
      }
    });
    const resultText = response.text || "Unable to analyze risks.";
    if (response.text) {
      await saveRecommendationAndProcedures(resultText, 'ANALYSIS', profile);
    }
    return resultText;
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Error connecting to AI service.";
  }
};

export const getManagementPlan = async (
  profile: UserProfile,
  condition: string
): Promise<string> => {
  const medicalRecords = auth.currentUser ? await getUserMedicalRecords(auth.currentUser.uid) : [];
  const medicalRecordsContext = medicalRecords.length > 0 
    ? `\nRecent Medical Procedures History (from Doctor Portal):\n${JSON.stringify(medicalRecords, null, 2)}\n`
    : '';

  const prompt = `
    You are CareLens, a supportive health partner.
    Create a Disease-Specific Management Plan for "${profile.name}" regarding their condition: ${condition}.
    
    User Context:
    - Age: ${profile.age}
    - Current Habits: ${profile.activity}, ${profile.diet}
    ${medicalRecordsContext}

    Include:
    1. **Educational Module**: Explain the condition simply and share any emerging info relevant to them.
    2. **Habits to Adopt**: Personalized actions (e.g., specific exercises, dietary changes).
    3. **Rationale**: Why these changes help manage ${condition}.
    
    Tone: Warm but formal, similar to talking to a caring health professional.

    CRITICAL REQUIREMENT:
    EVERY SINGLE RECOMMENDATION AND SUGGESTION MUST be clinically anchored and validated.
    You MUST cite a recognized health organization or body such as the CDC, WHO, or Kenya Ministry of Health (MoH) for EVERY suggestion.
    EVERY suggestion and recommendation MUST be carefully worded in the following way (or similar):
    "According to the [Organization Name] standard clinical guideline [Guideline Name/Topic], you should..."
    DO NOT use phrases like "I think you should..." or "Based on clinical guidelines...". Be specific with the organization and the guideline.

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
      config: {
        tools: [{ googleSearch: {} }]
      }
    });
    const resultText = response.text || "Unable to generate plan.";
    if (response.text) {
      await saveRecommendationAndProcedures(resultText, 'MANAGEMENT', profile);
    }
    return resultText;
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Error connecting to AI service.";
  }
};
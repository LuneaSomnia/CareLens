CareLens is a web application that improves preventive care by combining manual user inputs, clinically anchored risk calculators, and explainable AI to deliver personalized immunization advice, screening schedules, symptom triage, and condition-specific management — deliberately designed to work without wearables so it’s accessible to people in low-resource backgrounds. 

## Core features.
### A. Prevention Dashboard.
**Purpose:**  This feature keeps users up-to-date with immunizations, ensure timely screenings, and reduce risk via targeted lifestyle changes.
1. **Immunization & Vaccine dashboard**
   * Stores user-entered immunization history and vaccines.
   * Generates **personalized** booster and vaccine recommendations based on: user profile (age, comorbidities), location (regional outbreaks/trends), demographics, and clinical rules.
   * Each recommendation includes **why** it’s needed (short, evidence-based education) and suggested timing. 
2. **Preventive Screening dashboard**
   * Records all past screenings (type, date, result).
   * Automatically notifies users when their next screening is due, with frequency tailored by validated guidelines + the user’s personalized risk profile.
   * Each reminder contains rationale: what the screen detects, why it matters, and recommended intervals. 
3. **Avoidant Measures (Adaptive Lifestyle Recommendations)**
   * Produces evidence-based behavior change suggestions tuned to demographic + lifestyle + medical history + risk scores.
   * Recommendations are **adaptive**, not generic — e.g., smoking cessation steps for a 55-year-old with elevated CV risk, or diet changes for a person with hypercholesterolemia — with explanation and expected benefit. 

### B. Analysis & Risk.
**Purpose:** This feature help users log symptoms, detect patterns, and suggest tests/screenings and red-flag actions.
1. **Symptom Diary**
   * Users log signs/symptoms (text + structured fields: frequency, duration, severity).
   * The diary displays historical entries and trends (how often symptoms recur, severity changes).
   * After logging, the system suggests personalized self-care measures and next steps (with a disclaimer). 
2. **Risk Calculators + Red-flag Triage**
   * Uses diary data + profile + family/medical history to run validated risk calculators and determine urgency.
   * Suggests appropriate tests/screenings (what the test is, why it’s needed, how it’s done), and practical next steps including **where** to go.
   * Outputs are prioritized and explained so users understand rationale and urgency. 

### C. Management & Care.
**Purpose:** This feature support users living with conditions, track progress, and adapt education over time.
1. **Disease-Specific Management / Care Plans**
   * Users can input current or previous conditions. CareLens produces tailored management advice, habit suggestions, and situation-specific guidance (exercise plans, medication adherence tips, emergent signs to watch for).
   * Education modules are personalized and updated with emerging information relevant to the user’s conditions. 
2. **Progress Tracking**
   * Manual user inputs (BP readings from clinic, symptom severity over time, weekly exercise logs) create an actionable longitudinal view.
   * Progress data feeds back into personalization: risk scores, screening cadence, and recommendations adjust as the user’s data changes. 

### User profile
This feature includes the following User submitted data;
* **Basic info:** name, gender, DOB, location, email.
* **Health background:** current conditions, allergies, current medications, family history, organ donor status.
* **Lifestyle:** diet preference, physical activity (type / duration / frequency, weekly format), sleep patterns, substance use.
  This data(from the user profile section) drives the app’s personalization and risk calculations. 

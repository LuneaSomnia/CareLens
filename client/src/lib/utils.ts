import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: Date | string): string {
  if (!date) return "";
  const d = typeof date === "string" ? new Date(date) : date;
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

// For tokenized inputs
export const healthConditions = [
  "Type 2 Diabetes",
  "Type 1 Diabetes",
  "Hypertension",
  "Heart Disease",
  "Asthma",
  "COPD",
  "Arthritis",
  "Osteoporosis",
  "Depression",
  "Anxiety",
  "Seasonal Allergies",
  "Migraine",
  "Chronic Fatigue Syndrome",
  "Fibromyalgia",
  "Irritable Bowel Syndrome",
  "Crohn's Disease",
  "Ulcerative Colitis",
  "Multiple Sclerosis",
  "Parkinson's Disease",
  "Alzheimer's Disease",
  "Lupus",
  "Thyroid Disease",
  "Eczema",
  "Psoriasis"
];

export const allergyTypes = [
  "Penicillin",
  "Sulfa Drugs",
  "Aspirin",
  "NSAIDs",
  "Pollen",
  "Dust Mites",
  "Pet Dander",
  "Mold",
  "Latex",
  "Insect Stings",
  "Tree Nuts",
  "Peanuts",
  "Shellfish",
  "Fish",
  "Eggs",
  "Milk",
  "Soy",
  "Wheat",
  "Sesame"
];

export const medications = [
  "Metformin 500mg",
  "Metformin 1000mg",
  "Lisinopril 10mg",
  "Lisinopril 20mg",
  "Atorvastatin 10mg",
  "Atorvastatin 20mg",
  "Atorvastatin 40mg",
  "Levothyroxine 50mcg",
  "Levothyroxine 75mcg",
  "Levothyroxine 100mcg",
  "Amlodipine 5mg",
  "Amlodipine 10mg",
  "Simvastatin 20mg",
  "Simvastatin 40mg",
  "Omeprazole 20mg",
  "Losartan 50mg",
  "Losartan 100mg",
  "Albuterol Inhaler",
  "Fluticasone Inhaler",
  "Montelukast 10mg",
  "Sertraline 50mg",
  "Sertraline 100mg",
  "Loratadine 10mg",
  "Cetirizine 10mg"
];

export const familyHistoryConditions = [
  "Heart Disease (Father)",
  "Heart Disease (Mother)",
  "Heart Disease (Sibling)",
  "Heart Disease (Grandparent)",
  "Type 2 Diabetes (Father)",
  "Type 2 Diabetes (Mother)",
  "Type 2 Diabetes (Sibling)",
  "Type 2 Diabetes (Grandparent)",
  "Hypertension (Father)",
  "Hypertension (Mother)",
  "Hypertension (Sibling)",
  "Hypertension (Grandparent)",
  "Cancer - Breast (Father)",
  "Cancer - Breast (Mother)",
  "Cancer - Breast (Sibling)",
  "Cancer - Breast (Grandparent)",
  "Cancer - Colon (Father)",
  "Cancer - Colon (Mother)",
  "Cancer - Colon (Sibling)",
  "Cancer - Colon (Grandparent)",
  "Stroke (Father)",
  "Stroke (Mother)",
  "Stroke (Sibling)",
  "Stroke (Grandparent)",
  "Alzheimer's Disease (Father)",
  "Alzheimer's Disease (Mother)",
  "Alzheimer's Disease (Sibling)",
  "Alzheimer's Disease (Grandparent)"
];

export const dietaryChoices = [
  "Omnivore",
  "Vegetarian",
  "Vegan",
  "Pescatarian",
  "Paleo",
  "Keto",
  "Gluten-Free",
  "Dairy-Free",
  "Low-Carb",
  "Low-Fat",
  "Mediterranean",
  "DASH",
  "Intermittent Fasting"
];

export const activityTypes = [
  "Walking",
  "Running",
  "Cycling",
  "Swimming",
  "Weight Training",
  "Yoga",
  "Pilates",
  "HIIT",
  "Dancing",
  "Hiking",
  "Tennis",
  "Basketball",
  "Soccer",
  "Gardening",
  "Golf"
];

export const frequencyOptions = [
  "Daily",
  "Every other day",
  "3 times per week",
  "2 times per week",
  "Weekly",
  "Biweekly",
  "Monthly",
  "Rarely",
  "Never"
];

export const sleepQualityOptions = [
  "Excellent",
  "Good",
  "Fair",
  "Poor",
  "Very Poor"
];

export const substanceTypes = [
  "Alcohol",
  "Tobacco",
  "Marijuana",
  "Caffeine",
  "Other"
];

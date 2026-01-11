export interface UserProfile {
  name: string;
  age: string;
  gender: string;
  email: string;
  location: string;
  conditions: string;
  allergies: string;
  medications: string;
  familyHistory: string;
  organDonor: boolean;
  diet: string;
  activity: string; // Type, duration, frequency
  sleep: string;
  substanceUse: string;
}

export interface Symptom {
  id: string;
  name: string;
  severity: number; // 1-10
  duration: string;
  date: string;
  notes: string;
}

export interface Vaccination {
  id: string;
  name: string;
  date: string;
  notes: string;
}

export interface Screening {
  id: string;
  name: string;
  date: string;
  result: string;
  nextDueDate?: string;
}

export interface HealthMetric {
  date: string;
  systolic: number;
  diastolic: number;
  heartRate: number;
  weight: number;
}

export enum ViewState {
  HOME = 'HOME',
  PROFILE = 'PROFILE',
  PREVENTION = 'PREVENTION',
  ANALYSIS = 'ANALYSIS',
  MANAGEMENT = 'MANAGEMENT',
}

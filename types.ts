export interface UserProfile {
  uid?: string;
  name: string;
  age: string;
  gender: string;
  email: string;
  phoneNumber?: string;
  nationalId?: string;
  location: string;
  conditions: string;
  allergies: string;
  medications: string;
  familyHistory: string;
  organDonor: boolean;
  donatedOrgans?: string;
  diet: string;
  activity: string; // Type, duration, frequency
  sleep: string;
  substanceUse: string;
  pushNotificationsEnabled?: boolean;
}

export interface Recommendation {
  id: string;
  userId: string;
  category: 'PREVENTION' | 'MANAGEMENT' | 'ANALYSIS';
  text: string;
  createdAt: string;
  expiresAt: string;
}

export interface ProcedureRecord {
  id: string;
  userId: string;
  userName: string;
  userPhone: string;
  userNationalId: string;
  type: 'VACCINE' | 'TEST' | 'SCREENING';
  name: string;
  facility: string;
  doctorName?: string;
  doctorId?: string;
  results?: string;
  procedureDate?: string;
  procedureTime?: string;
  completed: boolean;
  createdAt: string;
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

import { 
  users, type User, type InsertUser,
  healthBackground, type HealthBackground, type InsertHealthBackground,
  lifestyleData, type LifestyleData, type InsertLifestyleData,
  userSettings, type UserSettings, type InsertUserSettings,
  healthMetrics, type HealthMetric, type InsertHealthMetric,
  vaccinations, type Vaccination, type InsertVaccination,
  healthGoals, type HealthGoal, type InsertHealthGoal,
  symptoms, type Symptom, type InsertSymptom,
  educationalModules, type EducationalModule, type InsertEducationalModule,
  userModuleProgress, type UserModuleProgress, type InsertUserModuleProgress
} from "@shared/schema";

export interface IStorage {
  // User methods
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  updateUser(id: number, userData: Partial<User>): Promise<User | undefined>;
  
  // Health background methods
  getHealthBackground(userId: number): Promise<HealthBackground | undefined>;
  createHealthBackground(data: InsertHealthBackground): Promise<HealthBackground>;
  updateHealthBackground(userId: number, data: Partial<HealthBackground>): Promise<HealthBackground | undefined>;
  
  // Lifestyle data methods
  getLifestyleData(userId: number): Promise<LifestyleData | undefined>;
  createLifestyleData(data: InsertLifestyleData): Promise<LifestyleData>;
  updateLifestyleData(userId: number, data: Partial<LifestyleData>): Promise<LifestyleData | undefined>;
  
  // User settings methods
  getUserSettings(userId: number): Promise<UserSettings | undefined>;
  createUserSettings(data: InsertUserSettings): Promise<UserSettings>;
  updateUserSettings(userId: number, data: Partial<UserSettings>): Promise<UserSettings | undefined>;
  
  // Health metrics methods
  getHealthMetrics(userId: number, type?: string): Promise<HealthMetric[]>;
  createHealthMetric(data: InsertHealthMetric): Promise<HealthMetric>;
  
  // Vaccination methods
  getVaccinations(userId: number): Promise<Vaccination[]>;
  createVaccination(data: InsertVaccination): Promise<Vaccination>;
  updateVaccination(id: number, data: Partial<Vaccination>): Promise<Vaccination | undefined>;
  
  // Health goals methods
  getHealthGoals(userId: number): Promise<HealthGoal[]>;
  getHealthGoal(id: number): Promise<HealthGoal | undefined>;
  createHealthGoal(data: InsertHealthGoal): Promise<HealthGoal>;
  updateHealthGoal(id: number, data: Partial<HealthGoal>): Promise<HealthGoal | undefined>;
  
  // Symptoms methods
  getSymptoms(userId: number): Promise<Symptom[]>;
  createSymptom(data: InsertSymptom): Promise<Symptom>;
  
  // Educational modules methods
  getEducationalModules(): Promise<EducationalModule[]>;
  getEducationalModule(id: number): Promise<EducationalModule | undefined>;
  getEducationalModulesByCategory(category: string): Promise<EducationalModule[]>;
  
  // User module progress methods
  getUserModuleProgress(userId: number): Promise<(UserModuleProgress & { module: EducationalModule })[]>;
  getUserModuleProgressByModuleId(userId: number, moduleId: number): Promise<UserModuleProgress | undefined>;
  createUserModuleProgress(data: InsertUserModuleProgress): Promise<UserModuleProgress>;
  updateUserModuleProgress(userId: number, moduleId: number, data: Partial<UserModuleProgress>): Promise<UserModuleProgress | undefined>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private healthBackgrounds: Map<number, HealthBackground>;
  private lifestyleDatas: Map<number, LifestyleData>;
  private userSettings: Map<number, UserSettings>;
  private healthMetrics: HealthMetric[];
  private vaccinations: Map<number, Vaccination>;
  private healthGoals: Map<number, HealthGoal>;
  private symptoms: Symptom[];
  private educationalModules: Map<number, EducationalModule>;
  private userModuleProgress: Map<string, UserModuleProgress>;
  
  private userIdCounter: number = 1;
  private healthBackgroundIdCounter: number = 1;
  private lifestyleDataIdCounter: number = 1;
  private userSettingsIdCounter: number = 1;
  private healthMetricsIdCounter: number = 1;
  private vaccinationIdCounter: number = 1;
  private healthGoalIdCounter: number = 1;
  private symptomIdCounter: number = 1;
  private educationalModuleIdCounter: number = 1;
  private userModuleProgressIdCounter: number = 1;

  constructor() {
    this.users = new Map();
    this.healthBackgrounds = new Map();
    this.lifestyleDatas = new Map();
    this.userSettings = new Map();
    this.healthMetrics = [];
    this.vaccinations = new Map();
    this.healthGoals = new Map();
    this.symptoms = [];
    this.educationalModules = new Map();
    this.userModuleProgress = new Map();

    // Seed educational modules
    this.seedEducationalModules();
  }

  // User methods
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.userIdCounter++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async updateUser(id: number, userData: Partial<User>): Promise<User | undefined> {
    const existingUser = this.users.get(id);
    if (!existingUser) return undefined;

    const updatedUser = { ...existingUser, ...userData };
    this.users.set(id, updatedUser);
    return updatedUser;
  }

  // Health background methods
  async getHealthBackground(userId: number): Promise<HealthBackground | undefined> {
    return Array.from(this.healthBackgrounds.values()).find(
      (hb) => hb.userId === userId
    );
  }

  async createHealthBackground(data: InsertHealthBackground): Promise<HealthBackground> {
    const id = this.healthBackgroundIdCounter++;
    const healthBackground: HealthBackground = { ...data, id };
    this.healthBackgrounds.set(id, healthBackground);
    return healthBackground;
  }

  async updateHealthBackground(userId: number, data: Partial<HealthBackground>): Promise<HealthBackground | undefined> {
    const existingHB = Array.from(this.healthBackgrounds.values()).find(
      (hb) => hb.userId === userId
    );
    if (!existingHB) return undefined;

    const updatedHB = { ...existingHB, ...data };
    this.healthBackgrounds.set(existingHB.id, updatedHB);
    return updatedHB;
  }

  // Lifestyle data methods
  async getLifestyleData(userId: number): Promise<LifestyleData | undefined> {
    return Array.from(this.lifestyleDatas.values()).find(
      (ld) => ld.userId === userId
    );
  }

  async createLifestyleData(data: InsertLifestyleData): Promise<LifestyleData> {
    const id = this.lifestyleDataIdCounter++;
    const lifestyleData: LifestyleData = { ...data, id };
    this.lifestyleDatas.set(id, lifestyleData);
    return lifestyleData;
  }

  async updateLifestyleData(userId: number, data: Partial<LifestyleData>): Promise<LifestyleData | undefined> {
    const existingLD = Array.from(this.lifestyleDatas.values()).find(
      (ld) => ld.userId === userId
    );
    if (!existingLD) return undefined;

    const updatedLD = { ...existingLD, ...data };
    this.lifestyleDatas.set(existingLD.id, updatedLD);
    return updatedLD;
  }

  // User settings methods
  async getUserSettings(userId: number): Promise<UserSettings | undefined> {
    return Array.from(this.userSettings.values()).find(
      (us) => us.userId === userId
    );
  }

  async createUserSettings(data: InsertUserSettings): Promise<UserSettings> {
    const id = this.userSettingsIdCounter++;
    const userSettings: UserSettings = { ...data, id };
    this.userSettings.set(id, userSettings);
    return userSettings;
  }

  async updateUserSettings(userId: number, data: Partial<UserSettings>): Promise<UserSettings | undefined> {
    const existingUS = Array.from(this.userSettings.values()).find(
      (us) => us.userId === userId
    );
    if (!existingUS) return undefined;

    const updatedUS = { ...existingUS, ...data };
    this.userSettings.set(existingUS.id, updatedUS);
    return updatedUS;
  }

  // Health metrics methods
  async getHealthMetrics(userId: number, type?: string): Promise<HealthMetric[]> {
    let metrics = this.healthMetrics.filter(metric => metric.userId === userId);
    if (type) {
      metrics = metrics.filter(metric => metric.type === type);
    }
    return metrics;
  }

  async createHealthMetric(data: InsertHealthMetric): Promise<HealthMetric> {
    const id = this.healthMetricsIdCounter++;
    const healthMetric: HealthMetric = { ...data, id };
    this.healthMetrics.push(healthMetric);
    return healthMetric;
  }

  // Vaccination methods
  async getVaccinations(userId: number): Promise<Vaccination[]> {
    return Array.from(this.vaccinations.values()).filter(
      (vacc) => vacc.userId === userId
    );
  }

  async createVaccination(data: InsertVaccination): Promise<Vaccination> {
    const id = this.vaccinationIdCounter++;
    const vaccination: Vaccination = { ...data, id };
    this.vaccinations.set(id, vaccination);
    return vaccination;
  }

  async updateVaccination(id: number, data: Partial<Vaccination>): Promise<Vaccination | undefined> {
    const existingVacc = this.vaccinations.get(id);
    if (!existingVacc) return undefined;

    const updatedVacc = { ...existingVacc, ...data };
    this.vaccinations.set(id, updatedVacc);
    return updatedVacc;
  }

  // Health goals methods
  async getHealthGoals(userId: number): Promise<HealthGoal[]> {
    return Array.from(this.healthGoals.values()).filter(
      (goal) => goal.userId === userId
    );
  }

  async getHealthGoal(id: number): Promise<HealthGoal | undefined> {
    return this.healthGoals.get(id);
  }

  async createHealthGoal(data: InsertHealthGoal): Promise<HealthGoal> {
    const id = this.healthGoalIdCounter++;
    const healthGoal: HealthGoal = { ...data, id };
    this.healthGoals.set(id, healthGoal);
    return healthGoal;
  }

  async updateHealthGoal(id: number, data: Partial<HealthGoal>): Promise<HealthGoal | undefined> {
    const existingGoal = this.healthGoals.get(id);
    if (!existingGoal) return undefined;

    const updatedGoal = { ...existingGoal, ...data };
    this.healthGoals.set(id, updatedGoal);
    return updatedGoal;
  }

  // Symptoms methods
  async getSymptoms(userId: number): Promise<Symptom[]> {
    return this.symptoms.filter(symptom => symptom.userId === userId);
  }

  async createSymptom(data: InsertSymptom): Promise<Symptom> {
    const id = this.symptomIdCounter++;
    const symptom: Symptom = { ...data, id };
    this.symptoms.push(symptom);
    return symptom;
  }

  // Educational modules methods
  async getEducationalModules(): Promise<EducationalModule[]> {
    return Array.from(this.educationalModules.values());
  }

  async getEducationalModule(id: number): Promise<EducationalModule | undefined> {
    return this.educationalModules.get(id);
  }

  async getEducationalModulesByCategory(category: string): Promise<EducationalModule[]> {
    return Array.from(this.educationalModules.values()).filter(
      (module) => module.category === category
    );
  }

  // User module progress methods
  async getUserModuleProgress(userId: number): Promise<(UserModuleProgress & { module: EducationalModule })[]> {
    const progressEntries = Array.from(this.userModuleProgress.values()).filter(
      (progress) => progress.userId === userId
    );
    
    return progressEntries.map(progress => {
      const module = this.educationalModules.get(progress.moduleId);
      if (!module) throw new Error(`Module not found: ${progress.moduleId}`);
      return { ...progress, module };
    });
  }

  async getUserModuleProgressByModuleId(userId: number, moduleId: number): Promise<UserModuleProgress | undefined> {
    const key = `${userId}-${moduleId}`;
    return this.userModuleProgress.get(key);
  }

  async createUserModuleProgress(data: InsertUserModuleProgress): Promise<UserModuleProgress> {
    const id = this.userModuleProgressIdCounter++;
    const progress: UserModuleProgress = { ...data, id };
    const key = `${data.userId}-${data.moduleId}`;
    this.userModuleProgress.set(key, progress);
    return progress;
  }

  async updateUserModuleProgress(userId: number, moduleId: number, data: Partial<UserModuleProgress>): Promise<UserModuleProgress | undefined> {
    const key = `${userId}-${moduleId}`;
    const existingProgress = this.userModuleProgress.get(key);
    if (!existingProgress) return undefined;

    const updatedProgress = { ...existingProgress, ...data };
    this.userModuleProgress.set(key, updatedProgress);
    return updatedProgress;
  }

  // Seed data for educational modules
  private seedEducationalModules() {
    const modules: InsertEducationalModule[] = [
      {
        title: "Nutrition Fundamentals",
        description: "Learn the basics of balanced nutrition and meal planning",
        category: "nutrition",
        contentType: "article",
        totalSections: 5,
        imageUrl: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
      },
      {
        title: "Stress Management",
        description: "Techniques to reduce stress and improve mental well-being",
        category: "mental_health",
        contentType: "video",
        totalSections: 4,
        imageUrl: "https://images.unsplash.com/photo-1465513010005-7aca575a0969?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
      },
      {
        title: "Active Lifestyle",
        description: "Building sustainable exercise habits for long-term health",
        category: "physical_activity",
        contentType: "article",
        totalSections: 5,
        imageUrl: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
      }
    ];

    modules.forEach(module => {
      const id = this.educationalModuleIdCounter++;
      const educationalModule: EducationalModule = { ...module, id };
      this.educationalModules.set(id, educationalModule);
    });
  }
}

export const storage = new MemStorage();

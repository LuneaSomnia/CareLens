import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { 
  insertUserSchema, 
  insertHealthBackgroundSchema, 
  insertLifestyleDataSchema, 
  insertUserSettingsSchema,
  insertHealthMetricsSchema,
  insertVaccinationSchema,
  insertHealthGoalSchema,
  insertSymptomSchema,
  insertUserModuleProgressSchema
} from "@shared/schema";
import { ZodError } from "zod";
import { fromZodError } from "zod-validation-error";

// Helper function to validate request body against a schema
function validateBody(req: Request, schema: any) {
  try {
    return schema.parse(req.body);
  } catch (error) {
    if (error instanceof ZodError) {
      const validationError = fromZodError(error);
      throw { status: 400, message: validationError.message };
    }
    throw error;
  }
}

export async function registerRoutes(app: Express): Promise<Server> {
  // User routes
  app.get("/api/users/:id", async (req: Request, res: Response) => {
    const user = await storage.getUser(parseInt(req.params.id));
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.json(user);
  });

  app.post("/api/users", async (req: Request, res: Response) => {
    const validatedData = validateBody(req, insertUserSchema);
    const user = await storage.createUser(validatedData);
    return res.status(201).json(user);
  });

  app.put("/api/users/:id", async (req: Request, res: Response) => {
    const userId = parseInt(req.params.id);
    const user = await storage.updateUser(userId, req.body);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.json(user);
  });

  // Health background routes
  app.get("/api/users/:userId/health-background", async (req: Request, res: Response) => {
    const userId = parseInt(req.params.userId);
    const healthBackground = await storage.getHealthBackground(userId);
    if (!healthBackground) {
      return res.status(404).json({ message: "Health background not found" });
    }
    return res.json(healthBackground);
  });

  app.post("/api/users/:userId/health-background", async (req: Request, res: Response) => {
    const userId = parseInt(req.params.userId);
    const validatedData = validateBody(req, insertHealthBackgroundSchema);
    
    // Check if health background already exists
    const existing = await storage.getHealthBackground(userId);
    if (existing) {
      const updated = await storage.updateHealthBackground(userId, validatedData);
      return res.json(updated);
    }
    
    const healthBackground = await storage.createHealthBackground({ ...validatedData, userId });
    return res.status(201).json(healthBackground);
  });

  app.put("/api/users/:userId/health-background", async (req: Request, res: Response) => {
    const userId = parseInt(req.params.userId);
    const healthBackground = await storage.updateHealthBackground(userId, req.body);
    if (!healthBackground) {
      return res.status(404).json({ message: "Health background not found" });
    }
    return res.json(healthBackground);
  });

  // Lifestyle data routes
  app.get("/api/users/:userId/lifestyle-data", async (req: Request, res: Response) => {
    const userId = parseInt(req.params.userId);
    const lifestyleData = await storage.getLifestyleData(userId);
    if (!lifestyleData) {
      return res.status(404).json({ message: "Lifestyle data not found" });
    }
    return res.json(lifestyleData);
  });

  app.post("/api/users/:userId/lifestyle-data", async (req: Request, res: Response) => {
    const userId = parseInt(req.params.userId);
    const validatedData = validateBody(req, insertLifestyleDataSchema);
    
    // Check if lifestyle data already exists
    const existing = await storage.getLifestyleData(userId);
    if (existing) {
      const updated = await storage.updateLifestyleData(userId, validatedData);
      return res.json(updated);
    }
    
    const lifestyleData = await storage.createLifestyleData({ ...validatedData, userId });
    return res.status(201).json(lifestyleData);
  });

  app.put("/api/users/:userId/lifestyle-data", async (req: Request, res: Response) => {
    const userId = parseInt(req.params.userId);
    const lifestyleData = await storage.updateLifestyleData(userId, req.body);
    if (!lifestyleData) {
      return res.status(404).json({ message: "Lifestyle data not found" });
    }
    return res.json(lifestyleData);
  });

  // User settings routes
  app.get("/api/users/:userId/settings", async (req: Request, res: Response) => {
    const userId = parseInt(req.params.userId);
    const settings = await storage.getUserSettings(userId);
    if (!settings) {
      return res.status(404).json({ message: "User settings not found" });
    }
    return res.json(settings);
  });

  app.post("/api/users/:userId/settings", async (req: Request, res: Response) => {
    const userId = parseInt(req.params.userId);
    const validatedData = validateBody(req, insertUserSettingsSchema);
    
    // Check if settings already exists
    const existing = await storage.getUserSettings(userId);
    if (existing) {
      const updated = await storage.updateUserSettings(userId, validatedData);
      return res.json(updated);
    }
    
    const settings = await storage.createUserSettings({ ...validatedData, userId });
    return res.status(201).json(settings);
  });

  app.put("/api/users/:userId/settings", async (req: Request, res: Response) => {
    const userId = parseInt(req.params.userId);
    const settings = await storage.updateUserSettings(userId, req.body);
    if (!settings) {
      return res.status(404).json({ message: "User settings not found" });
    }
    return res.json(settings);
  });

  // Health metrics routes
  app.get("/api/users/:userId/health-metrics", async (req: Request, res: Response) => {
    const userId = parseInt(req.params.userId);
    const type = req.query.type as string | undefined;
    const metrics = await storage.getHealthMetrics(userId, type);
    return res.json(metrics);
  });

  app.post("/api/users/:userId/health-metrics", async (req: Request, res: Response) => {
    const userId = parseInt(req.params.userId);
    const validatedData = validateBody(req, insertHealthMetricsSchema);
    const metric = await storage.createHealthMetric({ ...validatedData, userId });
    return res.status(201).json(metric);
  });

  // Vaccination routes
  app.get("/api/users/:userId/vaccinations", async (req: Request, res: Response) => {
    const userId = parseInt(req.params.userId);
    const vaccinations = await storage.getVaccinations(userId);
    return res.json(vaccinations);
  });

  app.post("/api/users/:userId/vaccinations", async (req: Request, res: Response) => {
    const userId = parseInt(req.params.userId);
    const validatedData = validateBody(req, insertVaccinationSchema);
    const vaccination = await storage.createVaccination({ ...validatedData, userId });
    return res.status(201).json(vaccination);
  });

  app.put("/api/vaccinations/:id", async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const vaccination = await storage.updateVaccination(id, req.body);
    if (!vaccination) {
      return res.status(404).json({ message: "Vaccination not found" });
    }
    return res.json(vaccination);
  });

  // Health goals routes
  app.get("/api/users/:userId/health-goals", async (req: Request, res: Response) => {
    const userId = parseInt(req.params.userId);
    const goals = await storage.getHealthGoals(userId);
    return res.json(goals);
  });

  app.get("/api/health-goals/:id", async (req: Request, res: Response) => {
    const goal = await storage.getHealthGoal(parseInt(req.params.id));
    if (!goal) {
      return res.status(404).json({ message: "Health goal not found" });
    }
    return res.json(goal);
  });

  app.post("/api/users/:userId/health-goals", async (req: Request, res: Response) => {
    const userId = parseInt(req.params.userId);
    const validatedData = validateBody(req, insertHealthGoalSchema);
    const goal = await storage.createHealthGoal({ ...validatedData, userId });
    return res.status(201).json(goal);
  });

  app.put("/api/health-goals/:id", async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const goal = await storage.updateHealthGoal(id, req.body);
    if (!goal) {
      return res.status(404).json({ message: "Health goal not found" });
    }
    return res.json(goal);
  });

  // Symptom routes
  app.get("/api/users/:userId/symptoms", async (req: Request, res: Response) => {
    const userId = parseInt(req.params.userId);
    const symptoms = await storage.getSymptoms(userId);
    return res.json(symptoms);
  });

  app.post("/api/users/:userId/symptoms", async (req: Request, res: Response) => {
    const userId = parseInt(req.params.userId);
    const validatedData = validateBody(req, insertSymptomSchema);
    const symptom = await storage.createSymptom({ ...validatedData, userId });
    return res.status(201).json(symptom);
  });

  // Educational modules routes
  app.get("/api/educational-modules", async (_req: Request, res: Response) => {
    const modules = await storage.getEducationalModules();
    return res.json(modules);
  });

  app.get("/api/educational-modules/:id", async (req: Request, res: Response) => {
    const module = await storage.getEducationalModule(parseInt(req.params.id));
    if (!module) {
      return res.status(404).json({ message: "Educational module not found" });
    }
    return res.json(module);
  });

  app.get("/api/educational-modules/category/:category", async (req: Request, res: Response) => {
    const modules = await storage.getEducationalModulesByCategory(req.params.category);
    return res.json(modules);
  });

  // User module progress routes
  app.get("/api/users/:userId/module-progress", async (req: Request, res: Response) => {
    const userId = parseInt(req.params.userId);
    const progress = await storage.getUserModuleProgress(userId);
    return res.json(progress);
  });

  app.get("/api/users/:userId/module-progress/:moduleId", async (req: Request, res: Response) => {
    const userId = parseInt(req.params.userId);
    const moduleId = parseInt(req.params.moduleId);
    const progress = await storage.getUserModuleProgressByModuleId(userId, moduleId);
    if (!progress) {
      return res.status(404).json({ message: "Module progress not found" });
    }
    return res.json(progress);
  });

  app.post("/api/users/:userId/module-progress", async (req: Request, res: Response) => {
    const userId = parseInt(req.params.userId);
    const validatedData = validateBody(req, insertUserModuleProgressSchema);
    
    // Check if progress already exists
    const existing = await storage.getUserModuleProgressByModuleId(userId, validatedData.moduleId);
    if (existing) {
      const updated = await storage.updateUserModuleProgress(userId, validatedData.moduleId, validatedData);
      return res.json(updated);
    }
    
    const progress = await storage.createUserModuleProgress({ ...validatedData, userId });
    return res.status(201).json(progress);
  });

  app.put("/api/users/:userId/module-progress/:moduleId", async (req: Request, res: Response) => {
    const userId = parseInt(req.params.userId);
    const moduleId = parseInt(req.params.moduleId);
    const progress = await storage.updateUserModuleProgress(userId, moduleId, req.body);
    if (!progress) {
      return res.status(404).json({ message: "Module progress not found" });
    }
    return res.json(progress);
  });

  // Create and return the HTTP server
  const httpServer = createServer(app);
  return httpServer;
}

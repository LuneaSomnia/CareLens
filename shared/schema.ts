import { pgTable, text, serial, integer, boolean, date, timestamp, json } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// User table
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  dateOfBirth: date("date_of_birth").notNull(),
  gender: text("gender").notNull(),
  location: text("location").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  profilePicture: text("profile_picture"),
  emergencyContactName: text("emergency_contact_name"),
  emergencyContactRelationship: text("emergency_contact_relationship"),
  emergencyContactPhone: text("emergency_contact_phone"),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
  firstName: true,
  lastName: true,
  dateOfBirth: true,
  gender: true,
  location: true,
  email: true,
  phone: true,
  profilePicture: true,
  emergencyContactName: true,
  emergencyContactRelationship: true,
  emergencyContactPhone: true,
});

// Health background table
export const healthBackground = pgTable("health_background", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  currentConditions: json("current_conditions").$type<string[]>().notNull().default([]),
  allergies: json("allergies").$type<string[]>().notNull().default([]),
  medications: json("medications").$type<string[]>().notNull().default([]),
  familyHistory: json("family_history").$type<string[]>().notNull().default([]),
  organDonor: boolean("organ_donor").default(false),
  donatedOrgan: text("donated_organ"),
});

export const insertHealthBackgroundSchema = createInsertSchema(healthBackground).pick({
  userId: true,
  currentConditions: true,
  allergies: true,
  medications: true,
  familyHistory: true,
  organDonor: true,
  donatedOrgan: true,
});

// Lifestyle data table
export const lifestyleData = pgTable("lifestyle_data", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  diet: json("diet").$type<string[]>().notNull().default([]),
  physicalActivityType: text("physical_activity_type"),
  physicalActivityDuration: integer("physical_activity_duration"),
  physicalActivityFrequency: text("physical_activity_frequency"),
  sleepDuration: integer("sleep_duration"),
  sleepQuality: text("sleep_quality"),
  substanceUse: json("substance_use").$type<{type: string, frequency: string}[]>().notNull().default([]),
});

export const insertLifestyleDataSchema = createInsertSchema(lifestyleData).pick({
  userId: true,
  diet: true,
  physicalActivityType: true,
  physicalActivityDuration: true,
  physicalActivityFrequency: true,
  sleepDuration: true,
  sleepQuality: true,
  substanceUse: true,
});

// User settings table
export const userSettings = pgTable("user_settings", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  notificationsEnabled: boolean("notifications_enabled").default(true),
  screeningNotifications: boolean("screening_notifications").default(true),
  followUpNotifications: boolean("follow_up_notifications").default(true),
  testingNotifications: boolean("testing_notifications").default(true),
  communityAnonymous: boolean("community_anonymous").default(false),
  preferredLearningMode: text("preferred_learning_mode").default("article"),
});

export const insertUserSettingsSchema = createInsertSchema(userSettings).pick({
  userId: true,
  notificationsEnabled: true,
  screeningNotifications: true,
  followUpNotifications: true,
  testingNotifications: true,
  communityAnonymous: true,
  preferredLearningMode: true,
});

// Health metrics table
export const healthMetrics = pgTable("health_metrics", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  type: text("type").notNull(), // blood_pressure, cholesterol, glucose, etc.
  value: text("value").notNull(),
  unit: text("unit").notNull(),
  date: timestamp("date").notNull(),
  notes: text("notes"),
});

export const insertHealthMetricsSchema = createInsertSchema(healthMetrics).pick({
  userId: true,
  type: true,
  value: true,
  unit: true,
  date: true,
  notes: true,
});

// Vaccination records table
export const vaccinations = pgTable("vaccinations", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  name: text("name").notNull(),
  dateReceived: date("date_received"),
  nextDue: date("next_due"),
  status: text("status").notNull(), // up_to_date, due_soon, overdue
  notes: text("notes"),
});

export const insertVaccinationSchema = createInsertSchema(vaccinations).pick({
  userId: true,
  name: true,
  dateReceived: true,
  nextDue: true,
  status: true,
  notes: true,
});

// Health goals table
export const healthGoals = pgTable("health_goals", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  category: text("category").notNull(), // steps, weight, sleep, etc.
  targetValue: text("target_value").notNull(),
  currentValue: text("current_value").notNull(),
  startValue: text("start_value").notNull(),
  unit: text("unit").notNull(),
  startDate: date("start_date").notNull(),
  targetDate: date("target_date"),
  status: text("status").notNull(), // not_started, in_progress, completed
  progress: integer("progress").notNull().default(0), // 0-100
});

export const insertHealthGoalSchema = createInsertSchema(healthGoals).pick({
  userId: true,
  title: true,
  description: true,
  category: true,
  targetValue: true,
  currentValue: true,
  startValue: true,
  unit: true,
  startDate: true,
  targetDate: true,
  status: true,
  progress: true,
});

// Symptoms table
export const symptoms = pgTable("symptoms", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  name: text("name").notNull(),
  severity: integer("severity").notNull(), // 1-10
  frequency: text("frequency").notNull(),
  duration: text("duration"),
  triggers: json("triggers").$type<string[]>().notNull().default([]),
  notes: text("notes"),
  date: timestamp("date").notNull(),
});

export const insertSymptomSchema = createInsertSchema(symptoms).pick({
  userId: true,
  name: true,
  severity: true,
  frequency: true,
  duration: true,
  triggers: true,
  notes: true,
  date: true,
});

// Educational modules table
export const educationalModules = pgTable("educational_modules", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  category: text("category").notNull(), // nutrition, stress, physical_activity, etc.
  contentType: text("content_type").notNull(), // article, video, quiz, game
  totalSections: integer("total_sections").notNull(),
  imageUrl: text("image_url"),
});

export const insertEducationalModuleSchema = createInsertSchema(educationalModules).pick({
  title: true,
  description: true,
  category: true,
  contentType: true,
  totalSections: true,
  imageUrl: true,
});

// User progress on educational modules
export const userModuleProgress = pgTable("user_module_progress", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  moduleId: integer("module_id").notNull(),
  sectionsCompleted: integer("sections_completed").notNull().default(0),
  completed: boolean("completed").default(false),
  lastAccessed: timestamp("last_accessed"),
});

export const insertUserModuleProgressSchema = createInsertSchema(userModuleProgress).pick({
  userId: true,
  moduleId: true,
  sectionsCompleted: true,
  completed: true,
  lastAccessed: true,
});

// Export types
export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;

export type HealthBackground = typeof healthBackground.$inferSelect;
export type InsertHealthBackground = z.infer<typeof insertHealthBackgroundSchema>;

export type LifestyleData = typeof lifestyleData.$inferSelect;
export type InsertLifestyleData = z.infer<typeof insertLifestyleDataSchema>;

export type UserSettings = typeof userSettings.$inferSelect;
export type InsertUserSettings = z.infer<typeof insertUserSettingsSchema>;

export type HealthMetric = typeof healthMetrics.$inferSelect;
export type InsertHealthMetric = z.infer<typeof insertHealthMetricsSchema>;

export type Vaccination = typeof vaccinations.$inferSelect;
export type InsertVaccination = z.infer<typeof insertVaccinationSchema>;

export type HealthGoal = typeof healthGoals.$inferSelect;
export type InsertHealthGoal = z.infer<typeof insertHealthGoalSchema>;

export type Symptom = typeof symptoms.$inferSelect;
export type InsertSymptom = z.infer<typeof insertSymptomSchema>;

export type EducationalModule = typeof educationalModules.$inferSelect;
export type InsertEducationalModule = z.infer<typeof insertEducationalModuleSchema>;

export type UserModuleProgress = typeof userModuleProgress.$inferSelect;
export type InsertUserModuleProgress = z.infer<typeof insertUserModuleProgressSchema>;

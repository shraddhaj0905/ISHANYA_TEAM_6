import { pgTable, text, serial, integer, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// User schema with role-based access
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  email: text("email").notNull(),
  fullName: text("full_name").notNull(),
  role: text("role", { enum: ["admin", "staff", "teacher"] }).notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

// Student schema
export const students = pgTable("students", {
  id: serial("id").primaryKey(),
  fullName: text("full_name").notNull(),
  admissionNumber: text("admission_number").notNull().unique(),
  grade: text("grade").notNull(),
  gender: text("gender").notNull(),
  dateOfBirth: timestamp("date_of_birth").notNull(),
  parentName: text("parent_name").notNull(),
  parentContact: text("parent_contact").notNull(),
  address: text("address").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

// Admission form schema
export const admissionForms = pgTable("admission_forms", {
  id: serial("id").primaryKey(),
  formName: text("form_name").notNull(),
  gradeLevel: text("grade_level").notNull(),
  uniqueCode: text("unique_code").notNull().unique(),
  expiryDate: timestamp("expiry_date").notNull(),
  includeMedicalInfo: boolean("include_medical_info").default(false),
  includeAcademicRecords: boolean("include_academic_records").default(false),
  includeExtracurricular: boolean("include_extracurricular").default(false),
  includeParentOccupation: boolean("include_parent_occupation").default(false),
  createdById: integer("created_by_id").references(() => users.id),
  createdAt: timestamp("created_at").defaultNow(),
});

// Activity log schema
export const activityLogs = pgTable("activity_logs", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id),
  action: text("action").notNull(),
  description: text("description").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

// Schemas for data insertion with zod
export const insertUserSchema = createInsertSchema(users).omit({
  id: true,
  createdAt: true,
});

export const insertStudentSchema = createInsertSchema(students).omit({
  id: true,
  createdAt: true,
});

export const insertAdmissionFormSchema = createInsertSchema(admissionForms).omit({
  id: true,
  createdAt: true,
});

export const insertActivityLogSchema = createInsertSchema(activityLogs).omit({
  id: true,
  createdAt: true,
});

// Type definitions for exported schemas
export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export type InsertStudent = z.infer<typeof insertStudentSchema>;
export type Student = typeof students.$inferSelect;

export type InsertAdmissionForm = z.infer<typeof insertAdmissionFormSchema>;
export type AdmissionForm = typeof admissionForms.$inferSelect;

export type InsertActivityLog = z.infer<typeof insertActivityLogSchema>;
export type ActivityLog = typeof activityLogs.$inferSelect;

// Login schema for authentication
export const loginSchema = z.object({
  username: z.string().min(1, "Username is required"),
  password: z.string().min(1, "Password is required"),
});

export type LoginData = z.infer<typeof loginSchema>;

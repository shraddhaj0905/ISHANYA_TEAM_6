import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { setupAuth } from "./auth";
import { randomBytes } from "crypto";
import { 
  insertStudentSchema, 
  insertAdmissionFormSchema 
} from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Set up authentication routes
  setupAuth(app);

  // Student related routes
  app.get("/api/students", async (req, res, next) => {
    try {
      if (!req.isAuthenticated()) {
        return res.status(401).json({ message: "Not authenticated" });
      }
      
      const students = await storage.getAllStudents();
      res.json(students);
    } catch (error) {
      next(error);
    }
  });

  app.post("/api/students", async (req, res, next) => {
    try {
      if (!req.isAuthenticated()) {
        return res.status(401).json({ message: "Not authenticated" });
      }
      
      const validatedData = insertStudentSchema.parse(req.body);
      const student = await storage.createStudent(validatedData);
      
      // Log the activity
      await storage.createActivityLog({
        userId: req.user!.id,
        action: "CREATE_STUDENT",
        description: `New student created: ${student.fullName}`,
      });
      
      res.status(201).json(student);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ 
          message: "Validation error", 
          errors: error.errors 
        });
      }
      next(error);
    }
  });

  // Staff related routes
  app.get("/api/staff", async (req, res, next) => {
    try {
      if (!req.isAuthenticated()) {
        return res.status(401).json({ message: "Not authenticated" });
      }
      
      const staffUsers = await storage.getUsersByRole("staff");
      // Remove passwords from the response
      const sanitizedUsers = staffUsers.map(({ password, ...user }) => user);
      res.json(sanitizedUsers);
    } catch (error) {
      next(error);
    }
  });

  // Teacher related routes
  app.get("/api/teachers", async (req, res, next) => {
    try {
      if (!req.isAuthenticated()) {
        return res.status(401).json({ message: "Not authenticated" });
      }
      
      const teacherUsers = await storage.getUsersByRole("teacher");
      // Remove passwords from the response
      const sanitizedUsers = teacherUsers.map(({ password, ...user }) => user);
      res.json(sanitizedUsers);
    } catch (error) {
      next(error);
    }
  });

  // Admission form routes
  app.post("/api/admission-forms", async (req, res, next) => {
    try {
      if (!req.isAuthenticated()) {
        return res.status(401).json({ message: "Not authenticated" });
      }
      
      // Generate a unique code for the form
      const uniqueCode = randomBytes(8).toString("hex");
      
      const validatedData = insertAdmissionFormSchema.parse({
        ...req.body,
        uniqueCode,
        createdById: req.user!.id
      });
      
      const admissionForm = await storage.createAdmissionForm(validatedData);
      
      // Log the activity
      await storage.createActivityLog({
        userId: req.user!.id,
        action: "CREATE_ADMISSION_FORM",
        description: `New admission form created: ${admissionForm.formName}`,
      });
      
      res.status(201).json(admissionForm);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ 
          message: "Validation error", 
          errors: error.errors 
        });
      }
      next(error);
    }
  });

  app.get("/api/admission-forms", async (req, res, next) => {
    try {
      if (!req.isAuthenticated()) {
        return res.status(401).json({ message: "Not authenticated" });
      }
      
      const forms = await storage.getAllAdmissionForms();
      res.json(forms);
    } catch (error) {
      next(error);
    }
  });

  // Activity log routes
  app.get("/api/activity-logs", async (req, res, next) => {
    try {
      if (!req.isAuthenticated()) {
        return res.status(401).json({ message: "Not authenticated" });
      }
      
      const limit = parseInt(req.query.limit as string) || 10;
      const logs = await storage.getRecentActivityLogs(limit);
      res.json(logs);
    } catch (error) {
      next(error);
    }
  });

  // Dashboard statistics
  app.get("/api/dashboard/stats", async (req, res, next) => {
    try {
      if (!req.isAuthenticated()) {
        return res.status(401).json({ message: "Not authenticated" });
      }
      
      const students = await storage.getAllStudents();
      const staffUsers = await storage.getUsersByRole("staff");
      const teacherUsers = await storage.getUsersByRole("teacher");
      const admissionForms = await storage.getAllAdmissionForms();
      
      res.json({
        totalStudents: students.length,
        totalStaff: staffUsers.length,
        totalTeachers: teacherUsers.length,
        totalAdmissions: admissionForms.length,
      });
    } catch (error) {
      next(error);
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}

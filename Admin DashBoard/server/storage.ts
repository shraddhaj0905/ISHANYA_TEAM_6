import { 
  User, InsertUser, 
  Student, InsertStudent, 
  AdmissionForm, InsertAdmissionForm, 
  ActivityLog, InsertActivityLog 
} from "@shared/schema";
import createMemoryStore from "memorystore";
import session from "express-session";

const MemoryStore = createMemoryStore(session);

// Interface for storage operations
export interface IStorage {
  // User operations
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  getUsersByRole(role: string): Promise<User[]>;
  
  // Student operations
  getStudent(id: number): Promise<Student | undefined>;
  getStudentByAdmissionNumber(admissionNumber: string): Promise<Student | undefined>;
  createStudent(student: InsertStudent): Promise<Student>;
  getAllStudents(): Promise<Student[]>;
  
  // Admission form operations
  getAdmissionForm(id: number): Promise<AdmissionForm | undefined>;
  getAdmissionFormByCode(uniqueCode: string): Promise<AdmissionForm | undefined>;
  createAdmissionForm(form: InsertAdmissionForm): Promise<AdmissionForm>;
  getAllAdmissionForms(): Promise<AdmissionForm[]>;
  
  // Activity log operations
  createActivityLog(log: InsertActivityLog): Promise<ActivityLog>;
  getRecentActivityLogs(limit: number): Promise<ActivityLog[]>;
  
  // Session store for auth
  sessionStore: session.SessionStore;
}

// In-memory storage implementation
export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private students: Map<number, Student>;
  private admissionForms: Map<number, AdmissionForm>;
  private activityLogs: Map<number, ActivityLog>;
  currentUserId: number;
  currentStudentId: number;
  currentFormId: number;
  currentLogId: number;
  sessionStore: session.SessionStore;

  constructor() {
    this.users = new Map();
    this.students = new Map();
    this.admissionForms = new Map();
    this.activityLogs = new Map();
    this.currentUserId = 1;
    this.currentStudentId = 1;
    this.currentFormId = 1;
    this.currentLogId = 1;
    this.sessionStore = new MemoryStore({
      checkPeriod: 86400000, // prune expired entries every 24h
    });
    
    // Add a default admin user
    this.createUser({
      username: "admin",
      password: "$2b$10$RYlNQgp3hZSJu6Zdi.Z3c.YyC3TIP2d0HKEQOfjbOQIKGZAGCDFZa", // "password" hashed
      email: "admin@example.com",
      fullName: "Admin User",
      role: "admin"
    });
  }

  // User methods
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const now = new Date();
    const user: User = { ...insertUser, id, createdAt: now };
    this.users.set(id, user);
    return user;
  }

  async getUsersByRole(role: string): Promise<User[]> {
    return Array.from(this.users.values()).filter(
      (user) => user.role === role,
    );
  }

  // Student methods
  async getStudent(id: number): Promise<Student | undefined> {
    return this.students.get(id);
  }

  async getStudentByAdmissionNumber(admissionNumber: string): Promise<Student | undefined> {
    return Array.from(this.students.values()).find(
      (student) => student.admissionNumber === admissionNumber,
    );
  }

  async createStudent(insertStudent: InsertStudent): Promise<Student> {
    const id = this.currentStudentId++;
    const now = new Date();
    const student: Student = { ...insertStudent, id, createdAt: now };
    this.students.set(id, student);
    return student;
  }

  async getAllStudents(): Promise<Student[]> {
    return Array.from(this.students.values());
  }

  // Admission form methods
  async getAdmissionForm(id: number): Promise<AdmissionForm | undefined> {
    return this.admissionForms.get(id);
  }

  async getAdmissionFormByCode(uniqueCode: string): Promise<AdmissionForm | undefined> {
    return Array.from(this.admissionForms.values()).find(
      (form) => form.uniqueCode === uniqueCode,
    );
  }

  async createAdmissionForm(insertForm: InsertAdmissionForm): Promise<AdmissionForm> {
    const id = this.currentFormId++;
    const now = new Date();
    const form: AdmissionForm = { ...insertForm, id, createdAt: now };
    this.admissionForms.set(id, form);
    return form;
  }

  async getAllAdmissionForms(): Promise<AdmissionForm[]> {
    return Array.from(this.admissionForms.values());
  }

  // Activity log methods
  async createActivityLog(insertLog: InsertActivityLog): Promise<ActivityLog> {
    const id = this.currentLogId++;
    const now = new Date();
    const log: ActivityLog = { ...insertLog, id, createdAt: now };
    this.activityLogs.set(id, log);
    return log;
  }

  async getRecentActivityLogs(limit: number): Promise<ActivityLog[]> {
    return Array.from(this.activityLogs.values())
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
      .slice(0, limit);
  }
}

export const storage = new MemStorage();

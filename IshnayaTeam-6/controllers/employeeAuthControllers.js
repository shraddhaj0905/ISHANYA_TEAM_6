const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const EmployeeRegistration = require("../models/employeeregister");
const JWT_SECRET = process.env.JWT_SECRET || "babbar";
const ApprovedEmployee = require("../models/approveemployee");
dotenv.config();



exports.employeeSignup = async (req, res) => {
    try {
      console.log("Request Body:", req.body);
  
      const { name, email, password, contact_number, address, qualifications, experience, skills } = req.body;
  
      if (!name || !email || !password || !contact_number || !address || !qualifications || !experience || !skills) {
        return res.status(400).json({ error: "All fields are required" });
      }
  
      // Check if email already exists
      const existingEmployee = await EmployeeRegistration.findOne({ email });
      if (existingEmployee) return res.status(400).json({ message: "Email already registered" });
  
      // Hash Password
      const hashedPassword = await bcrypt.hash(password, 10);
  
      // Create Employee Registration Entry
      const newEmployee = new EmployeeRegistration({
        name,
        email,
        password: hashedPassword,
        contact_number,
        address,
        qualifications,
        experience,
        skills
      });
  
      await newEmployee.save();
      res.status(201).json({ message: "Employee registered successfully, pending approval" });
  
    } catch (error) {
      console.error("Signup Error:", error);
      res.status(500).json({ error: error.message || "Internal Server Error" });
    }
  };
  



exports.employeeLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if employee is approved
    const employee = await ApprovedEmployee.findOne({ email });
    if (!employee) return res.status(400).json({ message: "You are not approved yet. Please wait for admin approval." });

    // Compare Password
    const isMatch = await bcrypt.compare(password, employee.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid email or password" });

    // Generate Token
    const token = jwt.sign({ id: employee._id, role: "employee" }, process.env.JWT_SECRET, { expiresIn: "1h" });

    res.status(200).json({ message: "Login successful", token });

  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

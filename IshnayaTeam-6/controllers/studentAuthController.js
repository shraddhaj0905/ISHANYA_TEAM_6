const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const StudentRegistration = require("../models/studentregister");

const ApprovedStudent = require("../models/approvestudent"); 
dotenv.config();


const JWT_SECRET = process.env.JWT_SECRET || "babbar";


exports.studentSignup = async (req, res) => {
  try {
    const { parent_name, parent_email, password, contact_number, address, student_name, dob, blood_group, gender, disability_type, disability_description } = req.body;

    // Check if email already exists
    const existingStudent = await StudentRegistration.findOne({ parent_email });
    if (existingStudent) return res.status(400).json({ message: "Email already registered" });

    // Hash Password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create Student Registration Entry
    const newStudent = new StudentRegistration({
      parent_name,
      parent_email,
      password: hashedPassword,
      contact_number,
      address,
      student_name,
      dob,
      blood_group,
      gender,
      disability_type,
      disability_description
    });

    await newStudent.save();
    res.status(201).json({ message: "Student registered successfully, pending approval" });

  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};





exports.studentLogin = async (req, res) => {
  try {
    const { parent_email, password } = req.body;

    // Check if student is approved
    const student = await ApprovedStudent.findOne({ parent_email });
    if (!student) return res.status(400).json({ message: "You are not approved yet. Please wait for admin approval." });

    // Compare Password
    const isMatch = await bcrypt.compare(password, student.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid email or password" });

    // Generate Token
    const token = jwt.sign({ id: student._id, role: "student" }, JWT_SECRET, { expiresIn: "1h" });

    res.status(200).json({ message: "Login successful", token });

  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

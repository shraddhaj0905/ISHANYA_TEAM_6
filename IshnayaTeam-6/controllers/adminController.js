const bcrypt = require("bcryptjs");
const StudentRegistration = require("../models/studentregister"); // Pending students database
const ApprovedStudent = require("../models/approvestudent"); // Approved students database
const EmployeeRegistration = require("../models/employeeregister"); // Import EmployeeRegistration model
const ApprovedEmployee = require("../models/approveemployee"); // 
const Admin = require("../models/admin"); 
exports.approveStudent = async (req, res) => {
    try {
        const { parent_email } = req.body; // Admin provides parent's email to approve student

        // Find the student using parent email
        const student = await StudentRegistration.findOne({ parent_email });

        if (!student) {
            return res.status(404).json({ message: "Student not found for the given parent email." });
        }

        // Check if student is already approved
        const alreadyApproved = await ApprovedStudent.findOne({ parent_email });
        if (alreadyApproved) {
            return res.status(400).json({ message: "Student is already approved." });
        }

        // Copy the hashed password from StudentRegistration (DO NOT HASH AGAIN)
        const approvedStudent = new ApprovedStudent({
            parent_email: student.parent_email,
            parent_name: student.parent_name,
            contact_number: student.contact_number,
            address: student.address,
            student_name: student.student_name,
            dob: student.dob,
            blood_group: student.blood_group,
            gender: student.gender,
            disability_type: student.disability_type,
            disability_description: student.disability_description,
            special_requirements: student.special_requirements,
            previous_interventions: student.previous_interventions,
            recommended_programs: "",
            join_date: new Date(),
            approved_at: new Date(),
            password: student.password //  Copy hashed password directly
        });

        await approvedStudent.save();

        res.status(201).json({ message: "Student approved successfully!", approvedStudent });

    } catch (error) {
        console.error(" Internal Server Error:", error);
        res.status(500).json({ error: "Internal Server Error", details: error.message });
    }
};



exports.approveEmployee = async (req, res) => {
    try {
        const { email } = req.body; // Admin provides email to approve employee

        // Find the employee using email
        const employee = await EmployeeRegistration.findOne({ email });

        if (!employee) {
            return res.status(404).json({ message: "Employee not found for the given email." });
        }

        // Check if employee is already approved
        const alreadyApproved = await ApprovedEmployee.findOne({ email });
        if (alreadyApproved) {
            return res.status(400).json({ message: "Employee is already approved." });
        }

        //  Copy the hashed password from EmployeeRegistration (DO NOT HASH AGAIN)
        const approvedEmployee = new ApprovedEmployee({
            name: employee.name,
            email: employee.email,
            contact_number: employee.contact_number,
            address: employee.address,
            qualifications: employee.qualifications,
            experience: employee.experience,
            skills: employee.skills,
            resume: employee.resume,
            join_date: new Date(),
            approved_at: new Date(),
            password: employee.password //  Copy hashed password directly
        });

        await approvedEmployee.save();

        res.status(201).json({ message: "Employee approved successfully!", approvedEmployee });

    } catch (error) {
        console.error("Internal Server Error:", error);
        res.status(500).json({ error: "Internal Server Error", details: error.message });
    }
};

exports.addAdmin = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        //  Check if admin already exists
        const existingAdmin = await Admin.findOne({ email });
        if (existingAdmin) {
            return res.status(400).json({ message: "Admin with this email already exists." });
        }

        //  Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new admin
        const newAdmin = new Admin({
            name,
            email,
            password: hashedPassword, // Store hashed password
        });

        await newAdmin.save();
        res.status(201).json({ message: "New admin added successfully!", newAdmin });

    } catch (error) {
        console.error(" Error adding admin:", error);
        res.status(500).json({ error: "Internal Server Error", details: error.message });
    }
};
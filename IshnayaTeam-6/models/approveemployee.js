const mongoose = require("mongoose");

const approvedEmployeeSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    contact_number: { type: String, required: true },
    address: { type: String, required: true },
  
    qualifications: { type: String, required: true },
    experience: { type: String },
    skills: { type: [String] }, // ✅ Change from String to Array of Strings
    
    resume: { type: String }, // Stores uploaded file URL/path
    
    assigned_students: [{ type: mongoose.Schema.Types.ObjectId, ref: "ApprovedStudent" }], // Array of students
    join_date: { type: Date, required: true, default: Date.now },
    approved_at: { type: Date, default: Date.now },

    password: { type: String, required: true } // ✅ Keep hashed password
});

// ✅ Prevent model overwriting
const ApprovedEmployee = mongoose.models.ApprovedEmployee || mongoose.model("ApprovedEmployee", approvedEmployeeSchema);

module.exports = ApprovedEmployee;

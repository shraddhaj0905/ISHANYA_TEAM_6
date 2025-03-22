const mongoose = require("mongoose");

const ApprovedStudentSchema = new mongoose.Schema({
    parent_email: { type: String, required: true, unique: true },
    parent_name: { type: String, required: true },
    contact_number: { type: String, required: true },
    address: { type: String, required: true },
    student_name: { type: String, required: true },
    dob: { type: Date, required: true },
    blood_group: { type: String, required: true },
    gender: { type: String, required: true },
    disability_type: { type: String, required: true },
    disability_description: { type: String, required: true },
    special_requirements: { type: String },
    previous_interventions: { type: String },
    recommended_programs: { type: String },
    join_date: { type: Date, default: Date.now },
    approved_at: { type: Date, default: Date.now },

    // ✅ Add this if missing
    password: { type: String, required: true }
});

module.exports = mongoose.model("ApprovedStudent", ApprovedStudentSchema);

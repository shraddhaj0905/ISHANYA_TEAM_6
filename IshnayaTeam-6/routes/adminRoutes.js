const express = require("express");
const router = express.Router();
const adminAuth = require("../middlewares/adminauth"); // ✅ Protect route with admin auth
const { addAdmin, approveStudent, approveEmployee } = require("../controllers/adminController"); // ✅ Import all functions
const adminController = require("../controllers/adminAuthController");

//  Admin login route
router.post("/login", adminController.adminLogin);

//  Route to approve a student (Protected)
router.post("/approve-student", adminAuth, approveStudent);

//  Route to approve an employee (Protected)
router.post("/approve-employee", adminAuth, approveEmployee);

//  Route to add a new admin (Protected)
router.post("/add-admin", adminAuth, addAdmin);

module.exports = router;

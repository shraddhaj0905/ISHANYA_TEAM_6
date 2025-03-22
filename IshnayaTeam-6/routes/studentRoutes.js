const express = require("express");
const router = express.Router();
const studentController = require("../controllers/studentAuthController");

router.post("/signup", studentController.studentSignup);
router.post("/login", studentController.studentLogin);

module.exports = router;

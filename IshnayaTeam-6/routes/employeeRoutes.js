const express = require("express");
const router = express.Router();
const employeeController = require("../controllers/employeeAuthControllers");


router.post("/signup", employeeController.employeeSignup);
router.post("/login", employeeController.employeeLogin);


module.exports = router;

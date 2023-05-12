const express = require("express");
const verifyToken = require("../middleware/auth");

const router = express.Router();
const dashboardController = require("../controllers/dashboard");

// ROUTES
router.get("/userdata", verifyToken, dashboardController.getUserData);
router.patch("/updateaboutyou", verifyToken, dashboardController.updateAboutYou);
router.patch("/updateaboutclass", verifyToken, dashboardController.updateAboutClass);

module.exports = router;

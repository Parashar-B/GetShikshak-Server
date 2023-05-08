const express = require("express");
const verifyToken = require("../middleware/auth");

const router = express.Router();
const dashboardController = require("../controllers/dashboard");

// ROUTES
router.get("/userdata", verifyToken, dashboardController.getUserData);

module.exports = router;

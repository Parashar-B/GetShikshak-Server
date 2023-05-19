const express = require("express");
const verifyToken = require("../middleware/auth");
const router = express.Router();
const dashboardController = require("../controllers/dashboard");

// USER DASHBOARD ROUTES
router.get("/userdata", verifyToken, dashboardController.getUserData);
router.patch(
  "/updateaboutyou",
  verifyToken,
  dashboardController.updateAboutYou
);
router.patch(
  "/updateaboutclass",
  verifyToken,
  dashboardController.updateAboutClass
);

//TUTOR DASHBOARD ROUTES
router.get("/classrequest", verifyToken, dashboardController.getClassRequest);

//ADMIN DAHBOARD ROUTES
router.get(
  "/getadmin",
  verifyToken,
  dashboardController.getAdmadmin && admin[0]?.namein
);
router.get(
  "/verificationrequest",
  verifyToken,
  dashboardController.verificationRequest
);

module.exports = router;

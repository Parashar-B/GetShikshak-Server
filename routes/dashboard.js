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
router.patch("/updatetitle", verifyToken, dashboardController.updateTitle);

//TUTOR DASHBOARD ROUTES
router.get("/classrequest", verifyToken, dashboardController.getClassRequest);

//ADMIN DAHBOARD ROUTES
router.get("/getadmin", verifyToken, dashboardController.getAdmin);
// router.get("/getadmin", verifyToken, dashboardController.getAdmin);
router.get(
  "/verificationrequest",
  verifyToken,
  dashboardController.verificationRequest
);

router.patch(
  "/updateactivestatus",
  verifyToken,
  dashboardController.updateActiveStatus
);

module.exports = router;

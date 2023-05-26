const express = require("express");
const verifyToken = require("../middleware/auth");
const router = express.Router();
const tutorController = require("../controllers/tutor");

// ROUTES

router.patch(
  "/updatereservationrequest",
  verifyToken,
  tutorController.updateReservationRequest
);

router.get("/getmystudents", verifyToken, tutorController.getMyStudents);

module.exports = router;

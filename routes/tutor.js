const express = require("express");
const verifyToken = require("../middleware/auth");
const router = express.Router();
const tutorController = require("../controllers/tutor");

// ROUTES

router.patch(
  "/updaterequeststatus",
  verifyToken,
  tutorController.updateRequestStatus
);

module.exports = router;

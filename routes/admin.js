const express = require("express");
const router = express.Router();
const adminController = require("../controllers/admin");
const admin = require("../middleware/admin");
const verifyToken = require("../middleware/auth");

// ROUTES

router.post("/addSubject", adminController.addSubject);
router.post("/addMode", adminController.addMode);
router.post("/addLanguage", adminController.addLanguage);
router.get(
  "/getverificationrequest",
  verifyToken,
  admin,
  adminController.getVerificationRequest
);
router.patch(
  "/updateverificationrequest",
  verifyToken,
  admin,
  adminController.updateVerificationRequest
);

module.exports = router;

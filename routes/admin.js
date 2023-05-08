const express = require("express");
const router = express.Router();
const adminController = require("../controllers/admin");

// ROUTES

router.post("/addSubject", adminController.addSubject);
router.post("/addMode", adminController.addMode);
router.post("/addLanguage", adminController.addLanguage);

module.exports = router;

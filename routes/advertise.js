const express = require("express");
const router = express.Router();
const adverstiseController = require("../controllers/adverstise");

// ROUTES

router.get("/subjects", adverstiseController.getSubject);
router.get("/modes", adverstiseController.getMode);
router.get("/languages", adverstiseController.getLanguage);

module.exports = router;

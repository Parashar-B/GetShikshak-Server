const express = require("express");
const studentController = require("../controllers/student");
const adminController = require("../controllers/admin");
const tutorController = require("../controllers/tutor");
const userController = require("../controllers/user");

const verifyToken = require("../middleware/auth");

const router = express.Router();

router.get("/gettutors", userController.getTutors);
router.get("/getstudents", userController.getStudents);

router.get("/search", userController.searchTutor);
router.get("/:id", userController.getTutorDetails);

router.post("/test", verifyToken, (req, res) => {
  try {
    // console.log("Hit url success");

    // console.log("user payload", req.user);
    res
      .status(201)
      .json({ message: "Data submitted successfully", user: req.user });
  } catch (err) {
    // console.log("Hit url error");
    res.status(500).json({ error: "Error from get login" });
  }
});

router.post("/reserveclass/:id", verifyToken, userController.reserveClass);
router.patch("/givefeedback/:id",verifyToken,userController.giveFeedback);


module.exports = router;



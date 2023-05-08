const User = require("../models/Users");
const userController = {
  getTutors: async (req, res) => {
    try {
      const tutors = await User.find({ role: "tutor" }).catch((err) => {
        return res.json({ error: "Cannot complete the request" });
      });
      if (tutors.length > 0) {
        console.log(tutors);
        return res.json({ message: "Inside get tutors", tutors });
      } else return res.json({ message: "No tutors Found" });
    } catch (err) {
      return res.status(500).json({ error: err });
    }
  },
  getStudents: async (req, res) => {
    try {
      const students = await User.find({ role: "student" }).catch((err) => {
        return res.json({ error: "Cannot complete the request" });
      });

      if (students.length > 0) {
        console.log(students);
        res.json({ message: "Inside get students", students });
      } else return res.json({ message: "No students Found" });
    } catch (err) {
      return res.status(500).json({ error: err });
    }
  },
};

module.exports = userController;

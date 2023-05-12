const User = require("../models/Users");
const userController = {
  getTutors: async (req, res) => {
    try {
      const tutors = await User.find({ role: "tutor" }).catch((err) => {
        return res.json({ error: "Cannot complete the request" });
      });
      if (tutors.length > 0) {
        console.log(tutors);
        return res.json({ message: "Tutors found", tutors });
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
  searchTutor: async (req, res) => {
    try {
      const { subject, city } = req.query;
      console.log("subject city", subject, city);
      const filter = {};
      if (subject) {
        filter["tutorForm.subjects"] = { $regex: `${subject}`, $options: "i" };
        filter.role = "tutor";
      }
      if (city) {
        filter["tutorForm.city"] = { $regex: `${city}`, $options: "i" };
        filter.role = "tutor";
      }
      if (subject && city) {
        filter["tutorForm.subjects"] = { $regex: `${subject}`, $options: "i" };
        filter["tutorForm.city"] = { $regex: `${city}`, $options: "i" };
        filter.role = "tutor";
      }
      const searchedUser = await User.find(filter).catch((err) => {
        res.status(500).json({ error: err, message: "Search error" });
      });
      console.log(searchedUser, "user");
      if (searchedUser.length > 0) {
        res.status(200).json({ searchedUser });
      } else res.json({ error: "No data related to search option" });
    } catch (err) {
      console.log(err);
    }
  },
};

module.exports = userController;

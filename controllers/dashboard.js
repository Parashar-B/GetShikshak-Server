const User = require("../models/Users");
const ReserveClass = require("../models/ReserveClass");

const dashboardController = {
  getUserData: async (req, res) => {
    try {
      const RequestingUser = req.user;
      const user = await User.findOne({ _id: RequestingUser.id }).catch(
        (err) => {
          return res.status(404).json({ error: "No user found" });
        }
      );
      // console.log(user, "user");
      if (user) {
        // console.log("currentUser", RequestingUser);
        return res.json({ RequestingUser, user: user });
      }
    } catch (err) {
      // console.log(err);
      return res.json({ error: err });
    }
  },

  updateAboutYou: async (req, res) => {
    try {
      // console.log(req.body);
      // return res.json(req.body)
      const { newData } = req.body;
      const RequestingUser = req.user;
      const updatedData = {
        "tutorForm.aboutYou": newData,
      };
      const updatedUser = await User.findByIdAndUpdate(
        RequestingUser.id,
        updatedData,
        { new: true }
      );

      if (!updatedUser) {
        return res.status(400).json({ error: "User not found" });
      }

      return res.json(updatedUser);
    } catch (error) {
      // console.log(error);
      return res.status(500).json({ error: "Server Error" });
    }
  },

  updateAboutClass: async (req, res) => {
    try {
      const { newData } = req.body;
      //console.log("About Class ",newData);
      const RequestingUser = req.user;
      const updatedData = {
        "tutorForm.aboutClass": newData,
      };
      const updatedUser = await User.findByIdAndUpdate(
        RequestingUser.id,
        updatedData,
        { new: true }
      );

      if (!updatedUser) {
        return res.status(400).json({ error: "User not found" });
      }

      return res.json(updatedUser);
    } catch (error) {
      // console.log(error);
      return res.status(500).json({ error: "Server Error" });
    }
  },
  updateTitle: async (req, res) => {
    try {
      const { newData } = req.body;
      //console.log("About Class ",newData);
      const RequestingUser = req.user;
      const updatedData = {
        "tutorForm.title": newData,
      };
      const updatedUser = await User.findByIdAndUpdate(
        RequestingUser.id,
        updatedData,
        { new: true }
      );

      if (!updatedUser) {
        return res.status(400).json({ error: "User not found" });
      }

      return res.json(updatedUser);
    } catch (error) {
      // console.log(error);
      return res.status(500).json({ error: "Server Error" });
    }
  },

  getClassRequest: async (req, res) => {
    try {
      const RequestingUserId = req.user.id;
      let classRequest;
      if (req.user.role === "tutor") {
        classRequest = await ReserveClass.find({
          $and: [{ tutorId: RequestingUserId }, { isAccepted: "pending" }],
        })
          .populate("studentId")
          .catch((err) => {
            // console.log("Error in finding");
            return res.status(500).json("Server error");
          });
      } else {
        classRequest = await ReserveClass.find({
          studentId: RequestingUserId,
        })
          .populate("tutorId")
          .catch((err) => {
            // console.log("Error in finding");
            return res.status(500).json({ error: err });
          });
      }

      if (classRequest) {
        // console.log("class request", classRequest);
        return res.json(classRequest);
      }
    } catch (err) {
      // console.log(err);
      return res.json(err);
    }
  },
  verificationRequest: async (req, res) => {
    try {
      const tutors = await User.find({
        $and: [
          { role: "tutor" },
          { "tutorForm.isProfileVerified": "pending" },
          { isProfileCompleted: true },
        ],
      }).catch((err) => {
        res.status(500).json({ error: err });
      });
      if (!tutors) {
        res.status(500).json({ message: "No such result found" });
      }
      if (tutors) {
        return res
          .status(201)
          .json({ tutors, message: "Tutors with verification request found" });
      }
    } catch (err) {
      // console.log(err);
      return res.json(err);
    }
  },
  getAdmin: async (req, res) => {
    try {
      const admin = await User.find({ role: "admin" }).catch((err) => {
        // console.log("err", err);
        return res.status(500).json({ error: "Internal server error" });
      });

      if (!admin) {
        return res.status(404).json({ message: "Admin not found" });
      }
      if (admin) {
        // console.log("admin", admin);
        return res.status(201).json({ admin, message: "Admin found" });
      }
    } catch (err) {
      // console.log(err);
      return res.json("error", err);
    }
  },
  updateActiveStatus: async (req, res) => {
    try {
      const RequestingUserId = req.user.id;
      const { updatedStatus } = req.body;
      console.log("updated STtau", updatedStatus);
      console.log("requesting", RequestingUserId);
      const updatedData = {
        isAccountActive: updatedStatus,
      };
      const updatedUser = await User.findByIdAndUpdate(
        RequestingUserId,
        updatedData,
        { new: true }
      ).catch((err) => {
        console.log("erre", err);
        return res.status(500).json({ error: "Internal server error" });
      });

      if (!updatedUser) {
        return res.status(400).json({ error: "Request not found" });
      }
      return res.status(201).json({
        updatedUser,
        message: `Tutor status updated successfully`,
      });
    } catch (err) {
      return res.json({ error: err });
    }
  },
};

module.exports = dashboardController;

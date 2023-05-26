const ReserveClass = require("../models/ReserveClass");
const tutorController = {
  updateReservationRequest: async (req, res) => {
    try {
      const { updatedStatus, reqId } = req.body;
      console.log("updatedStatus", updatedStatus, reqId);
      // const RequestingUserId = req.user.id;
      const updateData = {
        isAccepted: updatedStatus,
      };

      const updatedReservationRequest = await ReserveClass.findByIdAndUpdate(
        reqId,
        updateData,
        { new: true }
      );

      if (!updatedReservationRequest) {
        return res.status(400).json({ error: "Request not found" });
      }
      console.log("Inside");
      return res.json({
        updatedReservationRequest,
        message: `Student ${updatedStatus} successfully`,
      });
    } catch (err) {
      //   console.log("error", err);
      return res.status(500).json({ error: "Server error" });
    }
  },
  getMyStudents: async (req, res) => {
    try {
      const RequestionUserId = req.user.id;
      // console.log("inside try");

      // return res.json({ RequestionUserId });
      const students = await ReserveClass.find({
        $and: [{ tutorId: RequestionUserId }, { isAccepted: "accepted" }],
      })
        .populate("studentId")
        .populate("tutorId")
        .catch((err) => {
          return res.json({ error: err });
        });

      if (students.length <= 0) {
        // console.log("inside length<0");
        return res.json({ message: "No students associated with you!" });
      }
      if (students.length > 0) {
        // console.log("inside length>0");
        const filteredStudents = students.map((student) => {
          return {
            profilePic: student.studentId.profilePic,
            name: student.studentId.name,
            email: student.studentId.email,
            education: student.studentId.education,
            phone: student.studentId.phone,
            gender: student.studentId.gender,
          };
        });

        const filteredClasses = students.map((student) => {
          return {
            name: student.studentId.name,
            subjects: student.subjects,
            mode: student.mode,
            fee: student.tutorId.tutorForm.rate,
          };
        });

        return res.json({
          filteredStudents,
          filteredClasses,
          students,
          message: "students succesfully fetched",
        });
      }
    } catch (err) {
      return res.json({ error: err });
    }
  },
};

module.exports = tutorController;

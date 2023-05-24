const ReserveClass = require("../models/ReserveClass");
const tutorController = {
  updateRequestStatus: async (req, res) => {
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
};

module.exports = tutorController;

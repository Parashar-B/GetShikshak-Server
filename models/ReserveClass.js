const mongoose = require("mongoose");

const ReserveClassSchema = new mongoose.Schema(
  {
    studentId: { type: String, ref: User },
    teacherId: { type: String, ref: User },
    isAccepted: { type: Boolean, default: false },
    subjects: { type: Array },
    mode: { type: Array },
  },
  { timestamps: true }
);

const ReserveClass = mongoose.model("ReserveClass", ReserveClassSchema);
module.exports = ReserveClass;

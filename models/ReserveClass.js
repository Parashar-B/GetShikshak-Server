const mongoose = require("mongoose");
const User = require("./Users");
const constants = require("../utils/constants");
const states = constants.states;
const ReserveClassSchema = new mongoose.Schema(
  {
    studentId: { type: String, ref: User, require: true },
    tutorId: { type: String, ref: User, require: true },
    intro: { type: String },
    isAccepted: {
      type: String,
      enum: [states.pending, states.accepted, states.rejected],
      default: "pending",
    },
    subjects: { type: Array, require: true },
    mode: { type: Array },
    rating: { type: Number },
  },
  { timestamps: true }
);

const ReserveClass = mongoose.model("ReserveClass", ReserveClassSchema);
module.exports = ReserveClass;

const mongoose = require("mongoose");
const constants = require("../utils/constants");
const roles = constants.roles;
const states = constants.states;

const StudentClassSchema = new mongoose.Schema({
  subject: {
    type: String,
  },
  teacher_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  mode: {
    type: String,
  },
});

const TeacherClassSchema = new mongoose.Schema({
  class_name: {
    type: mongoose.Schema.Types.String,
  },
  students: [
    {
      studentName: { type: mongoose.Schema.Types.String },
      studentId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      isActive: { type: mongoose.Schema.Types.Boolean, default: true },
    },
  ],
});

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, require: true },
    email: { type: String, require: true },
    password: { type: String, require: true },
    role: {
      type: String,
      enum: [roles.student, roles.tutor, roles.admin],
      default: null,
    },
    address: { type: String },
    age: { type: String },
    gender: { type: String },
    phone: { type: String },
    tutorForm: {
      subjects: { type: Array },
      title: { type: String },
      aboutYou: { type: String },
      aboutClass: { type: String },
      city: { type: String },
      mode: { type: Array },
      language: { type: Array },
      rate: { type: String },
      isProfileVerified: {
        type: String,
        enum: [
          states.pending,
          states.accepted,
          states.rejected,
          states.reverted,
        ],
        default: "pending",
      },
      identity: { type: String },
      lastEducationalCertificate: { type: String },
    },
    isProfileCompleted: { type: Boolean, default: false },
    profilePic: { type: String },
    rating: { type: mongoose.Schema.Types.Number },
    isAccountActive: { type: Boolean, default: true },
    education: { type: String },
  },
  { timestamps: true }
);

const User = mongoose.model("User", UserSchema);
module.exports = User;

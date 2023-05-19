const mongoose = require("mongoose");
const constants = require("../utils/constants");
const roles = constants.roles;

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
    },
    address: { type: String },
    age: { type: String },
    gender: { type: String },
    tutorForm: {
      subjects: { type: Array },
      title: { type: String },
      aboutYou: { type: String },
      aboutClass: { type: String },
      city: { type: String },
      mode: { type: Array },
      language: { type: Array },
      rate: { type: String },
      phone: { type: String },
      isProfileVerified: { type: Boolean, default: "false" },
      isProfileCompleted: { type: Boolean, default: "false" },
      identity: { type: String },
      lastEducationalCertificate: { type: String },
    },
    profilePic: { type: String },
    StudentClasses: {
      type: [StudentClassSchema],
      default: [],
    },
    TeachersClasses: {
      type: [TeacherClassSchema],
      default: [],
    },
    rating: { type: mongoose.Schema.Types.Number },
    isAccountActive: { type: String, default: true },
  },
  { timestamps: true }
);

const User = mongoose.model("User", UserSchema);
module.exports = User;

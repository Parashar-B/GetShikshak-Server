const mongoose = require("mongoose");

const MyClasse = new mongoose.Schema({
  subject: {
    type: mongoose.SchemaTypes.String,
  },
  teacher_id: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "User",
  },
  mode: {
    type: mongoose.SchemaTypes.String,
  },
});

const UserSchema = new mongoose.Schema(
  {
    email: { type: String, require: true },
    password: { type: String, require: true },
    role: { type: String, enum: ["tutor", "student", "admin"] },
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
      identity: { type: String },
      lastEducationalCertificate: { type: String },
    },
    profilePic: { type: String },
    myClasses: {
      type: [MyClasse],
      default: [],
    },
    classes: {
      type: [],
      default: [],
    },

    rating: {
      type: mongoose.SchemaTypes.Number,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", UserSchema);
module.exports = User;

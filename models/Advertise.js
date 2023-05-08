const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const subjectSchema = new Schema({
  value: String,
  label: String,
});

const languageSchema = new Schema({
  value: String,
  label: String,
});
const modeSchema = new Schema({
  value: String,
  label: String,
});

const Subject = mongoose.model("Subject", subjectSchema);
const Language = mongoose.model("Language", languageSchema);
const Mode = mongoose.model("Mode", modeSchema);

module.exports = { Subject, Language, Mode };

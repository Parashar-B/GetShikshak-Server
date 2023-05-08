const { Subject, Language, Mode } = require("../models/Advertise");
const adminController = {
  addSubject: async (req, res) => {
    // console.log(req.body);
    try {
      const { subject } = req.body;
      console.log("Subject", subject);

      const subjectExist = await Subject.findOne({ value: subject }).catch(
        (err) => {
          console.log("Cennot find the subject", err);
        }
      );

      if (subjectExist) {
        return res.status(500).json({ error: "Subject Already exist!" });
      }

      const newSubject = new Subject({
        value: subject,
        label: subject,
      });

      const savedSubject = await newSubject.save().catch((err) => {
        console.log("New Subject cannot be added", err);
        res.status(500).json({ error: "Cannot create new Subject !" });
      });

      if (savedSubject) {
        console.log("New subject created successfully!");
        res
          .status(201)
          .json({ message: "Subject created successfully !", savedSubject });
      }
    } catch (err) {
      res.status(500).json({ error: `${err.message}` });
    }
  },
  addMode: async (req, res) => {
    try {
      const { mode } = req.body;
      console.log("Mode", mode);

      const modeExist = await Subject.findOne({ value: mode }).catch((err) => {
        console.log("Cannot find the subject", err);
      });

      if (modeExist) {
        return res.status(500).json({ error: "Mode Already exist!" });
      }
      const newMode = new Mode({
        value: mode,
        label: mode,
      });

      const savedMode = await newMode.save().catch((err) => {
        console.log("New Mode of teaching cannot be added", err);
        res.status(500).json({ error: "Cannot create new mode !" });
      });

      if (savedMode) {
        console.log("New mode created successfully!");
        res
          .status(201)
          .json({ message: "mode created successfully !", savedMode });
      }
    } catch (err) {
      console.log("Error side");
      res.status(500).json({ error: `${err.message}` });
    }
  },
  addLanguage: async (req, res) => {
    try {
      const { language } = req.body;

      const languageExist = await Language.findOne({ value: language }).catch(
        (err) => {
          console.log("Cannot find the language");
        }
      );

      if (languageExist) {
        return res.status(500).json({ error: "Language Already exist!" });
      }

      const newLanguage = new Language({
        value: language,
        label: language,
      });

      const savedLanguage = await newLanguage.save().catch((err) => {
        console.log("New Language cannot be added", err);
        res.status(500).json({ error: "Cannot create new Language !" });
      });

      if (savedLanguage) {
        console.log("New Language created successfully!");
        res
          .status(201)
          .json({ message: "Language created successfully !", savedLanguage });
      }
    } catch (err) {
      res.status(500).json({ error: `${err.message}` });
    }
  },
};

module.exports = adminController;
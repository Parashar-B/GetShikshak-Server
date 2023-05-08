const { Subject, Mode, Language } = require("../models/Advertise");
const advertiseController = {
  getSubject: async (req, res) => {
    try {
      const subjects = await Subject.find({});
      res.status(201).json({ subjects, message: "subjects" });
    } catch (err) {
      res.status(500).json({ error: err });
    }
  },
  getMode: async (req, res) => {
    try {
      const modes = await Mode.find({});
      res.status(201).json({ modes, message: "modes" });
    } catch (err) {
      res.status(500).json({ error: err });
    }
  },
  getLanguage: async (req, res) => {
    try {
      const languages = await Language.find({});
      res.status(201).json({ languages, message: "languages" });
    } catch (err) {
      res.status(500).json({ error: err });
    }
  },
};

module.exports = advertiseController;

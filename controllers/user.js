const User = require("../models/Users");
const ReserveClass = require("../models/ReserveClass");
const nodemailer = require("nodemailer");
const userController = {
  getTutors: async (req, res) => {
    try {
      const tutors = await User.find({ role: "tutor" }).catch((err) => {
        return res.json({ error: "Cannot complete the request" });
      });
      if (tutors.length > 0) {
        // console.log(tutors);
        const filteredTutors = tutors.filter((tutor) => {
          return tutor.isProfileCompleted === true;
        });
        // console.log("filtered", filteredTutors);
        return res.json({ message: "Tutors found", filteredTutors });
      } else return res.json({ message: "No tutors Found" });
    } catch (err) {
      return res.status(500).json({ error: err });
    }
  },
  getStudents: async (req, res) => {
    try {
      const students = await User.find({ role: "student" }).catch((err) => {
        return res.json({ error: "Cannot complete the request" });
      });
      let filteredStudents = [];
      if (students.length > 0) {
        filteredStudents = students.map((student) => {
          return {
            name: student.name,
            email: student.email,
            gender: student.gender,
            age: student.age,
            profilePic: student.profilePic,
            address: student.address,
            isAccounActive: student.isAccountActive,
          };
        });
        // console.log(students);
        res.json({ message: "Inside get students", filteredStudents });
      } else return res.json({ message: "No students Found" });
    } catch (err) {
      return res.status(500).json({ error: err });
    }
  },
  searchTutor: async (req, res) => {
    try {
      const { subject, city } = req.query;
      // console.log("subject city", subject, city);
      const filter = {};
      if (!subject && !city) {
        filter.role = "tutor";
        filter.isProfileCompleted = true;
      }
      if (subject) {
        filter["tutorForm.subjects"] = { $regex: `${subject}`, $options: "i" };
        filter.role = "tutor";
        filter.isProfileCompleted = true;
      }
      if (city) {
        filter["tutorForm.city"] = { $regex: `${city}`, $options: "i" };
        filter.role = "tutor";
        filter.isProfileCompleted = true;
      }
      if (subject && city) {
        filter["tutorForm.subjects"] = { $regex: `${subject}`, $options: "i" };
        filter["tutorForm.city"] = { $regex: `${city}`, $options: "i" };
        filter.role = "tutor";
        filter.isProfileCompleted = true;
      }
      const searchedUser = await User.find(filter).catch((err) => {
        res.status(500).json({ error: err, message: "Search error" });
      });
      // console.log(searchedUser, "user");
      if (searchedUser.length > 0) {
        res.status(200).json({ searchedUser });
      } else res.json({ error: "No data related to search option" });
    } catch (err) {
      console.log(err);
    }
  },
  getTutorDetails: async (req, res) => {
    try {
      const id = req.params.id;
      // console.log(req.params);
      const user = await User.findById(id).catch((err) => {
        return res.status(500).json({ error: err });
      });

      if (user) {
        // console.log("user", user);
        return res.status(200).json({ user });
      }
    } catch (err) {
      console.log("errors", err);
    }
  },
  reserveClass: async (req, res) => {
    try {
      console.log("tutorId", req.params.id);
      console.log("studentId", req.user.id);
      const tutorId = req.params.id;
      const studentId = req.user.id;

      const student = await User.findById({ _id: studentId }).catch((err) => {
        res.status(500).json("Server error");
      });
      const tutor = await User.findById({ _id: tutorId }).catch((err) => {
        res.status(500).json("Server error");
      });

      if (!student) {
        return res.status(404).json("No student with particular id");
      }
      const { intro, subjects, mode, phone } = req.body;
      // console.log("params", params);

      const existingDocument = await ReserveClass.find({
        $and: [
          { studentId: studentId },
          { tutorId: tutorId },
          { subjects: { $in: subjects } },
        ],
      }).catch((err) => {
        console.log(err, err);
      });

      console.log("existing doc", existingDocument);

      // const existingDocument = await ReserveClass.find({
      //   studentId: studentId,
      //   tutorId: tutorId,
      //   subjects: { $in: subjects },
      // });

      // {
      //   studentId:"6465eca1ff49f0bff53542e9",
      //   tutorId:"6465ec8dff49f0bff53542e6",
      //   subjects:{$in:["social"]}
      // }

      if (existingDocument.length > 0) {
        return res
          .status(409)
          .json({ error: "You have already requested for the same" });
      }
      const newReservation = new ReserveClass({
        intro: intro,
        subjects: subjects,
        mode: mode,
        phone: phone,
        studentId: studentId,
        tutorId: tutorId,
      });

      const savedReservation = await newReservation.save().catch((err) => {
        console.log("Cannot reserve the class");
        return res.status(500).json({ message: "Cannot reserve the class" });
      });

      if (savedReservation) {
        console.log("Reservation request sent");
        if (savedReservation) {
          // Send email to the tutor
          const transporter = nodemailer.createTransport({
            // Configure your email service provider here
            service: "Gmail",
            auth: {
              user: "rachnaag1999@gmail.com",
              pass: process.env.GMAILPW,
            },
            port: 587, // Alternate port number
            secure: false, // Set secure to false if using port 587
          });
          const emailContent = `
            <h1>New Class Request</h1>
            <p>Student Name: ${student.name}</p>
            <p>Student Email: ${student.email}</p>
            <p>Class Details:</p>
            <p>Intro: ${intro}</p>
            <p>Subjects: ${subjects}</p>
            <p>Mode: ${mode}</p>
            <p>Phone: ${phone}</p>
          `;

          const mailOptions = {
            from: process.env.WEB_EMAIL, // Your email address
            to: tutor.email, // Tutor's email address
            subject: "New Class Request From GetShiksha",
            html: emailContent,
          };

          transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
              console.error(error);
              // Handle error sending the email
            } else {
              console.log(
                `Email sent: from ${process.env.WEB_EMAIL} to ${tutor.email}`,
                info.response
              );
              // Handle successful email sending
            }
          });

          console.log("Reservation request sent");
          return res.status(201).json({ message: "Reservation request sent!" });
        }
      }
      // console.log("req", req.user);
      console.log("inside");
    } catch (err) {
      console.log("error", err);
    }
  },
};

module.exports = userController;

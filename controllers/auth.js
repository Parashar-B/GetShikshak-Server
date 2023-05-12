const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/Users");

// REGISTER USER
const authController = {
  register: async (req, res) => {
    try {
      const { email, password, confirmPassword, role } = req.body;
      if (!email || !password || !confirmPassword || !role) {
        return res.status(500).json({ error: "All fields are compulsory !!" });
      }

      if (password !== confirmPassword) {
        return res.status(500).json({ error: "password should match" });
      }

      const userExists = await User.exists({ email: email }).catch((err) => {
        console.log("User exist error", err);
      });

      if (userExists) {
        return res.status(500).json({ error: "User Already exist!" });
      }

      const salt = await bcrypt.genSalt();
      const hashedPassword = await bcrypt.hash(password, salt);
      const newUser = new User({
        email,
        password: hashedPassword,
        role: role,
      });
      const savedUser = await newUser.save().catch((err) => {
        console.log("Cannot register user at this moment", err);
        res.status(500).json({ error: "Cannot register user at this moment" });
      });
      if (savedUser) {
        console.log("User registered successfully !!");
        res
          .status(201)
          .json({ message: "Registration successfull! Login here !" });
      }
    } catch (err) {
      res.status(500).json({ error: `${err.message}` });
    }
  },
  login: async (req, res) => {
    try {
      const { email, password } = req.body;

      const user = await User.findOne({ email: email }).catch((err) => {
        console.log("error", err);
      });
      if (!user) return res.status(500).json({ error: "User don't exist" });

      await bcrypt.compare(password, user.password).catch((err) => {
        console.log("Password is invalid");
        return res.status(403).json({ error: "Invalid credentials" });
      });
      const ParsedData = JSON.parse(JSON.stringify(user));
      const { password: pass, ...restParams } = ParsedData;

      // const {password:pass,...restParams}=user;
      // const removePass = restParams._doc
      // const { password:passRemove , ...restData} = removePass
      const token = jwt.sign(
        { id: user.id, role: user.role },
        process.env.JWT_SECRET_KEY
      );

      res
        .status(201)
        .json({ token, user: restParams, message: "Login successfull" });
    } catch (err) {
      res.status(403).json({ error: err.message });
    }
  },
  tutorRegister: async (req, res) => {
    try {
      console.log("req.body", req.body);
      console.log("req.files", req.files);
      console.log(
        "req.files.profilePic.originalname",
        req.files.profilePic[0].originalname
      );

      const {
        subjects,
        title,
        aboutClass,
        aboutYou,
        city,
        language,
        mode,
        phone,
        role,
        rate,
        isProfileVerified,
      } = req.body;
      const loggedInUserId = req.user.id;
      const user = await User.findOne({ _id: loggedInUserId }).catch((err) => {
        console.log("error", err);
      });
      if (!user) return res.status(404).json({ error: "User not found" });

      // console.log(
      //   "ProfilePic",
      //   rate,
      //   role,
      //   profilePic,
      //   identity,
      //   lastEducationalCertificate
      // );
      user.role = role;
      user.tutorForm.subjects = subjects;
      user.tutorForm.title = title;
      user.tutorForm.aboutClass = aboutClass;
      user.tutorForm.aboutYou = aboutYou;
      user.tutorForm.city = city;
      user.tutorForm.mode = mode;
      user.tutorForm.language = language;
      user.tutorForm.rate = rate;
      user.tutorForm.phone = phone;
      user.profilePic = req.files.profilePic[0].filename;
      user.tutorForm.identity = req.files.identity[0].filename;
      user.tutorForm.lastEducationalCertificate =
        req.files.lastEducationalCertificate[0].filename;

      const savedUser = await user.save().catch((err) => {
        console.log("Cannot update user at this moment", err);
        res.status(500).json({ error: "Cannot update user at this moment" });
      });

      if (savedUser) {
        console.log("Tutor registered successfully !!");
        res
          .status(201)
          .json({ message: "Tutor registration successful", savedUser, user });
      }
    } catch (err) {
      console.log("err", err);
    }
  },
};

module.exports = authController;

// {
//   email:'seema1@gmail.com',
//   role: 'tutor',
//   subjects: ['Hindi'],
//   title: "titile",
//   aboutYou: "",
//   aboutClass: "somsdsd",
//   city:' Assam',
//   mode: [
//     'Online'
//   ],
//   language:[
//     "English"
//   ],
//   rate:200,
//   phone: '9365636140',
//   profilePic: {},
//   identity: {},
//   lastEducationalCertificate: {},
//   isProfileVerified:

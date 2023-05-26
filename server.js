const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const multer = require("multer");
const morgan = require("morgan");
const helmet = require("helmet");
const path = require("path");
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
const adminRoutes = require("./routes/admin");
const advertiseRoutes = require("./routes/advertise");
const dashboardRoutes = require("./routes/dashboard");
const tutorRoutes = require("./routes/tutor");

// const url = require('url')

// const __dirname = path.dirname()

// MIDDLEWARES
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(express.static(path.join(__dirname, "public")));

// ROUTES
app.use("/auth", authRoutes);
app.use("/user", userRoutes);
app.use("/admin", adminRoutes);
app.use("/advertise", advertiseRoutes);
app.use("/dashboard", dashboardRoutes);
app.use("/tutor", tutorRoutes);

// // FILE STORAGE
// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//       cb(null, "public/assets")
//     },
//     filename: function (req, file, cb) {
//       console.log()
//       cb(null,path.extname(file.originalname))
//     }
//   })

// const upload = multer({storage});

// DATABASE CONNECTION
const PORT = process.env.PORT || 6001;
mongoose
  .connect("mongodb://127.0.0.1:27017/getShikshak", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((err) => {
    console.error(err);
  });

// LISTENING TO SERVER
app.listen(PORT, (req, res) => {
  console.log(`Listining on PORT ${PORT}`);
});

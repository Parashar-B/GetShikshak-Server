const express = require("express");
const authController = require("../controllers/auth");
const router = express.Router();
const verifyToken = require("../middleware/auth");

// ROUTES

router.post("/register", authController.register);
router.post("/login", authController.login);
router.post("/tutorRegister", verifyToken, authController.tutorRegister);
// router.get('/test',verifyToken,(req,res)=>{
//     try{
//         res.json({message:"Hello from get login"})
//     }
//     catch(err){
//         res.json({error:"Error from get login"})
//     }
// })

module.exports = router;

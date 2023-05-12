const User = require("../models/Users");

const dashboardController = {
  getUserData: async (req, res) => {
    const RequestingUser = req.user;
    const user = await User.findOne({ _id: RequestingUser.id }).catch((err) => {
      return res.status(404).json({ error: "No user found" });
    });
    console.log(user, "user");
    if (user) {
      console.log("currentUser", RequestingUser);
      return res.json({ RequestingUser, user: user });
    }
  },

  updateAboutYou:async (req, res) => {
    try{
      // console.log(req.body);
      // return res.json(req.body)
      const {newData}=req.body;
      const RequestingUser = req.user;
      const updatedData = {
        'tutorForm.aboutYou':newData
      }
      const updatedUser = await User.findByIdAndUpdate(RequestingUser.id, updatedData, {new:true});

      if(!updatedUser){
        return res.status(400).json({error:"User not found"});
      }

      return res.json(updatedUser);
    }
    catch(error){
        console.log(error);
        return res.status(500).json({error:"Server Error"});
    }
  },

  updateAboutClass:async(req,res)=>{
      try{
        // console.log("Body ",req.body);
        
        // return res.json(req.body)
        const {newData}=req.body;
        //console.log("About Class ",newData);
        const RequestingUser = req.user;
        const updatedData = {
          'tutorForm.aboutClass':newData
        }
        const updatedUser = await User.findByIdAndUpdate(RequestingUser.id, updatedData, {new:true});
  
        if(!updatedUser){
          return res.status(400).json({error:"User not found"});
        }
  
        return res.json(updatedUser);
      }
      catch(error){
          console.log(error);
          return res.status(500).json({error:"Server Error"});
      }
  }
  }

module.exports = dashboardController;

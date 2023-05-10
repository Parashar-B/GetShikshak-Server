const User = require("../models/Users");

const dashboardController = {
  getUserData: async (req, res) => {
    try {
      const RequestingUser = req.user;
      const user = await User.findOne({ _id: RequestingUser.id }).catch(
        (err) => {
          return res.status(404).json({ error: "No user found" });
        }
      );
      console.log(user, "user");
      if (user) {
        console.log("currentUser", RequestingUser);
        return res.json({ RequestingUser, user: user });
      }
    } catch (err) {
      console.log(err);
      return res.json({ error: err });
    }
  },
};

module.exports = dashboardController;

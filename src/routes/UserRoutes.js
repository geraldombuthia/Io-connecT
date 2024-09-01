const express = require("express");
const User = require("../models/User");
const passport = require("../config/passportAuth");
const ensureAuthenticated = require("../middleware/auth");

const router = express.Router();

router
  .route("/register")
  .get((req, res) => {
    res.send("Register");
  })
  .post(async (req, res) => {
    try {
      const { username, email, password } = req.body;

      const existingUser = await User.findOne({ 
        $or: [
            {email: email},
            {username: username}
        ]
       });

      if (existingUser) {
        console.log('Username or Email already exists');
        return res.status(400).send('Username or Email already exists');
      }

      const newUser = new User({username, email, password});
      await newUser.save();
      console.log(newUser);
      res.status(201).send("Successful Registration");
    } catch (error) {
        console.log(error);
        res.status(400).send('Error registering user');
    }
  });

router.route("/login")
  .get((req, res) => {console.log("Hello")} )
  .post(passport.authenticate('local', {
    successRedirect: '/user/dashboard',
    failureRedirect: '/user/login'
  }));

router.get("/dashboard", ensureAuthenticated, (req, res) => {
    res.send("Dashboard");
});

router.get("/logout", (req, res) => {
  req.logout();
  res.redirect('/');
//   res.send("Logout");
});

module.exports = router;

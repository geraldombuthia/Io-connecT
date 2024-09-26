const express = require("express");
const User = require("../models/User");
const passport = require("../config/passportAuth");
const ensureAuthenticated = require("../middleware/auth");
const DeviceController = require("../controllers/Device.controller");

const router = express.Router();

router
  .route("/register")
  .get((req, res) => {
    // res.send("Register");
    res.render('register');
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
        // render the view with the error instead of returning
        return res.status(400).send('Username or Email already exists');
      }

      const newUser = new User({username, email, password});
      await newUser.save();
      console.log(newUser);
      // res.status(201).send("Successful Registration");
      res.redirect('/user/login');
    } catch (error) {
        console.log(error);
        res.status(400).send('Error registering user');
    }
  });

router.route("/login")
  .get((req, res) => {res.render('login')} )
  .post(passport.authenticate('local', {
    successRedirect: '/user/dashboard',
    failureRedirect: '/user/login'
  }));

router.get("/profile", ensureAuthenticated, (req, res) => {
    // res.send("Dashboard");
    res.render('profile.ejs');
});

router.get("/dashboard", ensureAuthenticated, (req, res) => {
  const Devices = DeviceController.getUserDevices(req.user.id);

  res.render("dashboard.ejs", Devices);
})

router.get("/alerts", ensureAuthenticated, (req, res) => {
  res.render('alert.ejs')
})
router.get("/devices", (req, res) => {
  res.render('devices.ejs');
})
router.get("/logout", (req, res) => {
  req.logout();
  res.redirect('/');
//   res.send("Logout");
});

module.exports = router;

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
    res.render("register");
  })
  .post(async (req, res) => {
    try {
      const { username, email, password } = req.body;

      const existingUser = await User.findOne({
        $or: [{ email: email }, { username: username }],
      });

      if (existingUser) {
        console.log("Username or Email already exists");
        // render the view with the error instead of returning
        return res.status(400).send("Username or Email already exists");
      }

      const newUser = new User({ username, email, password });
      await newUser.save();
      console.log(newUser);
      // res.status(201).send("Successful Registration");
      res.redirect("/user/login");
    } catch (error) {
      console.log(error);
      res.status(400).send("Error registering user");
    }
  });

router
  .route("/login")
  .get((req, res) => {
    res.render("login");
  })
  .post(
    passport.authenticate("local", {
      successRedirect: "/user/dashboard",
      failureRedirect: "/user/login",
    })
  );

router.get("/profile", ensureAuthenticated, (req, res) => {
  // res.send("Dashboard");
  res.render("profile.ejs");
});

router.get("/dashboard", ensureAuthenticated, async (req, res) => {
  const devices = await DeviceController.getUserDevices(req.user.id);

  console.log(devices, req.user.id);
  res.render("dashboard.ejs",{devices});
});

router.get("/alerts", ensureAuthenticated, (req, res) => {
  res.render("alert.ejs");
});
router.get("/devices", async (req, res) => {
  const devices = await DeviceController.getUserDevices(req.user.id);

  res.render("devices.ejs", {devices});
});

router.get("/add-device", (req, res) => {
  console.log(req.headers);

  res.render("add-device.ejs");
});
router.post("/add-device", ensureAuthenticated, async (req, res) => {

  const { name, type, serialnumber, location } = req.body;

  // Validate all required fields
  if (!name || !type || !serialnumber || !location) {
    return res.status(400).json({ error: "All fields are required." });
  }
  const newDeviceInfo = {
    name,
    type,
    serialnumber,
    location,
  };

  console.log("New Device: ", newDeviceInfo.serialnumber);
  const newDevice = await DeviceController.registerDevice(
    req.user.id,
    newDeviceInfo
  );

  if (newDevice) {
    console.log("Added device successfully");
  }
  res.redirect("/user/dashboard");
  // res.render("device.ejs");
});

router.post("/post-data", (req, res) => {});
router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/");
  //   res.send("Logout");
});

module.exports = router;

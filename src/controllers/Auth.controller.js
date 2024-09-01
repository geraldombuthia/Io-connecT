const User = require("../models/User");
const passport = require("../config/passportAuth");
const bcrypt = require("bcrypt");

class AuthController {
  static async register(req, res) {
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
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);

        const newUser = new User({username, email, password: hash});
        await newUser.save();
        console.log(newUser);
        res.status(201).send("Successful Registration");
      } catch (error) {
          console.log(error);
          res.status(400).send('Error registering user');
      }
  }

  static async login(req, res, next) {
  }

  static async logout(req, res) {
    req.logout();
    res.redirect('/');
  }
  static
}

module.exports = AuthController;

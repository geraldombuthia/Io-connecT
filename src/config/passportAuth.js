const passport = require("passport");
const bcrypt = require("bcrypt");
const LocalStrategy = require("passport-local").Strategy;
const User = require("../models/User");

passport.use(new LocalStrategy({usernameField: 'email'}, async (email, password, done) => {
    try {
        const user = await User.findOne({ email });

        if (!user) {
            return done(null, false, { message: "Incorrect username" });    
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return done(null, false, {message: 'Incorrect Password'});
        }

        // Authentication successful
        console.log('Authentication Successful');
        return done(null, user);
    } catch (err) {
        return done(err);
    }
}));

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((async (id, done) => {
    try {
        const user = await User.findById(id);
        console.log('Deserializing User');
        done(null, user);
    } catch (err) {
        done(err);
    }
}));

module.exports = passport;
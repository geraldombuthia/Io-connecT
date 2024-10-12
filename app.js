require('dotenv').config();
require("./src/config/passportAuth");

const express = require("express");
const session = require("express-session");
const path = require('path');
const helmet = require('helmet');

const connectDB = require("./src/config/database");
const UserRoutes = require("./src/routes/UserRoutes");
const passport = require("./src/config/passportAuth");
const { xPoweredBy } = require('helmet');
const app = express();

const PORT = process.env.PORT || 3000;

connectDB();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'src/views'));

app.use(express.static(path.join(__dirname, 'src/public')));
app.use(session({
    secret: process.env.SECRET_SESSION_KEY,
    resave: false,
    saveUninitialized: false
}))
app.use(passport.initialize());
app.use(passport.session());

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use("/user", UserRoutes);

app.get("/", (req, res) => {
    res.send("Hello World");
});

app.use((req, res, next) => {
    res.status(404).send("Not Found");
});

app.listen(PORT, () => {
    console.log(process.env.SECRET_SESSION_KEY);
    console.log(`Server is running on port ${PORT}`);
})
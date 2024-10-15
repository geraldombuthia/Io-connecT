const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        await mongoose.connect("mongodb://localhost:27017/ioconnect");
        console.log("Database connected successfully");
    } catch (err) {
        console.log("DB Error: ", err);
    }
}


module.exports = connectDB;
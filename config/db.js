const mongoose = require("mongoose");

const connectionURL = "mongodb://localhost:27017/GamePulsedb";

// Connect to database
const connectDb = mongoose.connect(connectionURL)
.then(() => console.log("Database connection successful"))
.catch((error) => console.log(error));

module.exports = connectDb;
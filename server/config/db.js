const mongoose = require("mongoose");

const connectionURL = process.env.MONGODB_CONNECTION_STRING;

// Connect to database
const connectDb = mongoose.connect(connectionURL)
.then(() => console.log("Database connection successful"))
.catch((error) => console.log(error));

module.exports = connectDb;
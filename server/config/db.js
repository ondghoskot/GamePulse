const mongoose = require("mongoose");
const connectionURL = process.env.MONGODB_CONNECTION_STRING;

// database connection callback function
const connectDb = () => {
  return mongoose.connect(connectionURL)
    .then(() => console.log("Database connection successful"))
    .catch((error) => console.log("Database connection error:", error));
};

module.exports = connectDb;

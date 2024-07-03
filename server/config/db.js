const mongoose = require("mongoose");
const connectionURL = process.env.MONGODB_CONNECTION_STRING;

const connectDb = () => {
  return mongoose.connect(connectionURL)
    .then(() => console.log("Database connection successful"))
    .catch((error) => console.log("Database connection error:", error));
};

module.exports = connectDb;

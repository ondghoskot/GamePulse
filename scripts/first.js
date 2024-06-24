// Import modules
const express = require("express");
const mongoose = require("mongoose");

// Start an instance in local
const app = express();
app.use(express.json());
const connectionURL = "mongodb://localhost:27017/GamePulsedb";

// Connect to database
mongoose.connect(connectionURL)
.then(() => console.log("Database connection successful"))
.catch((error) => console.log(error));

app.use((error, req, res, next) => {
    res.status(500).send(error.message);
});

// set the port
app.listen(8000, () => {
    console.log("server is running on port 8000.");
});
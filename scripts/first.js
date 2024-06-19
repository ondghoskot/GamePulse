// Import modules
const express = require("express");
const mongodb = require("mongodb");

// Start an instance in local
const app = express();
const connectionURL = "mongodb://localhost:27017";
const client = new mongodb.MongoClient(connectionURL);

// Establish database connection
client
.connect()
.then(() => console.log("Database connection successful"))
.catch((error) => console.log(error));

app.use((error, req, res, next) => {
    res.status(500).send(error.message);
});

// set the port
app.listen(8000, () => {
    console.log("server is running on port 8000.");
});
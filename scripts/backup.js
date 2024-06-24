// Import modules
const express = require("express");
const mongodb = require("mongodb");

// Start an instance in local
const app = express();
const connectionURL = "mongodb://localhost:27017";
const client = new mongodb.MongoClient(connectionURL);
app.use(express.json());

// Create database
const db = client.db("GamePulsedb");
// Create collections
const user = db.collection("user");
const games = db.collection("games");
const list = db.collection("list");
const reviews = db.collection("reviews");

// test
app.post("/user", (req, res, next) => {
    const {name, email, password} = req.body;
    user.insertOne({name: name, email: email, password: password})
    .then(() => res.status(201).send("user added successfully"))
    .catch((error) => res.status(500).send(error.message));
});

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
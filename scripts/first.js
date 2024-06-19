// express module
const express = require("express");

// start an instance in local
const app = express();
app.get("/", (req, res) => {
    res.send("Home page");
});

// set the port
app.listen(8000, () => {
    console.log("server is running on port 8000.");
});
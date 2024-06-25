// Import modules
const express = require("express");
const fs = require("fs");
const https = require("https");
const userRoutes = require("../routes/users");
const gameRoutes = require("../routes/games");
const connectDb = require("./db");


const httpsOptions = {
    key: fs.readFileSync("../certs/localhost.decrypted.key"),
    cert: fs.readFileSync("../certs/localhost.crt")
};

// start instance
const app = express();
app.use(express.json());

// create server
const server = https.createServer(httpsOptions, app);

// testing
app.use("/", gameRoutes);
app.use("/", userRoutes);
app.get("/", (req, res) => {
    res.send("hello world")
});

app.use((error, req, res, next) => {
    res.status(500).send(error.message);
});

server.listen(3001, ()=>{ console.log("Listening on 3001")});

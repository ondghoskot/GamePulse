// Import modules
const express = require("express");
const fs = require("fs");
const https = require("https");
const userRoutes = require("../routes/users");
const gameRoutes = require("../routes/games");
const reviewRoutes = require("../routes/reviews");
const connectDb = require("./db");
const cors = require('cors');
require('dotenv').config();


const httpsOptions = {
    key: fs.readFileSync("./server/certs/localhost.decrypted.key"),
    cert: fs.readFileSync("./server/certs/localhost.crt")
};

// start instance
const app = express();
app.use(express.json());
app.use(cors({
    origin: "http://localhost:3000",
    credentials: true
  }));

// create server
const server = https.createServer(httpsOptions, app);

// testing
app.use("/", gameRoutes);
app.use("/", userRoutes);
app.use("/", reviewRoutes);
app.get("/", (req, res) => {
    res.send("hello world")
});

app.use((error, req, res, next) => {
    res.status(500).send(error.message);
});

server.listen(process.env.PORT, ()=>{ console.log(`Listening on ${process.env.PORT}`)});

// Import modules
const express = require("express");
const userRoutes = require("./routes/users");
const gameRoutes = require("./routes/games");
const reviewRoutes = require("./routes/reviews");
const connectDb = require("./config/db");
const cors = require('cors');
require('dotenv').config();




// start instance
const app = express();
app.use(express.json());
app.use(cors({
    origin: "*"
  }));

connectDb();
// create server


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

app.listen(process.env.PORT, ()=>{ console.log(`Listening on ${process.env.PORT}`)});

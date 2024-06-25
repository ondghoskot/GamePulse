const mongoose = require("mongoose");

const gameSchema = mongoose.Schema({
    title: String,
    releaseDate: Date,
    genre: String,
    platforms: [String]
});

module.exports = mongoose.model("Game", gameSchema);
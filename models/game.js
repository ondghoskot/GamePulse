const mongoose = require("mongoose");

const gameSchema = mongoose.Schema({
    title: String,
    img: String,
    releaseDate: Date,
    genre: String,
    platforms: [String],
    summary: String,
    rating: Number
});

module.exports = mongoose.model("Game", gameSchema);
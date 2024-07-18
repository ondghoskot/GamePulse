const mongoose = require("mongoose");

//Game object structure
const gameSchema = mongoose.Schema({
    title: String,
    img: String,
    releaseDate: Date,
    genres: [String],
    platforms: [String],
    summary: String,
    storyline: String,
    rating: Number,
    screenshots: [String],
    reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: "Review"}],
    //id: Number
});

//indexing for search feature
gameSchema.index({
    title: 'text',
    genre: 'text',
    platform: 'text'
});

module.exports = mongoose.model("Game", gameSchema);
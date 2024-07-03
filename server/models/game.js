const mongoose = require("mongoose");

const gameSchema = mongoose.Schema({
    id: Number,
    title: String,
    img: String,
    releaseDate: Date,
    genres: [String],
    platforms: [String],
    summary: String,
    storyline: String,
    rating: Number,
    screenshots: [String],
    reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: "Review"}]
});

gameSchema.index({
    title: 'text',
    genre: 'text',
    platform: 'text'
});

module.exports = mongoose.model("Game", gameSchema);
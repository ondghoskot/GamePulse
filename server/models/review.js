const mongoose = require("mongoose");

//review object feature
const reviewSchema = mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User"},
    game: { type: Number, required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    title: { type: String, required: true },
    review: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Review", reviewSchema);
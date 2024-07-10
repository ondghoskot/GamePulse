const Review = require('../models/review');
const Game = require('../models/game');
const User = require('../models/user');

//method to create a review on the game page
exports.createReview = async (req, res) => {
    try {
        const { gameId, rating, title, review } = req.body;
        const userId = req.user._id;

        const newReview = new Review({ user: userId, game: gameId, rating, title, review });
        await newReview.save();

        // Update the game and user to reference the new review
        //await Game.findByIdAndUpdate({ id: gameId }, { $push: { reviews: newReview._id } });
        //await User.findByIdAndUpdate(userId, { $push: { reviews: newReview._id } });

        res.status(201).send(newReview);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};

//method to display reviews on the game page
exports.getReviewsByGame = async (req, res) => {
    try {
        const { gameId } = req.params;
        const reviews = await Review.find({ game: gameId }).populate('user', 'username');
        res.send(reviews);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};

//method to display each user's reviews
exports.getReviewsByUser = async (req, res) => {
    try {
        const { userId } = req.params;
        const reviews = await Review.find({ user: userId }).populate('game', 'title');
        res.send(reviews);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};

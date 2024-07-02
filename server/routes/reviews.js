const express = require("express");
const reviewController = require("../controllers/reviewController");
const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();

router.post('/reviews/game/:id', authMiddleware, reviewController.createReview);
router.get('/game/game-reviews', reviewController.getReviewsByGame);
router.get('/profile/game-reviews', reviewController.getReviewsByUser);

module.exports = router;
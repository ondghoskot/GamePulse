const express = require("express");
const reviewController = require("../controllers/reviewController");
const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();

// router for reviews endpoints
router.post('/reviews', reviewController.createReview);
router.get('/reviews/game/:id', reviewController.getReviewsByGame);
router.get('/profile/game-reviews', reviewController.getReviewsByUser);

module.exports = router;
const express = require("express");
const reviewController = require("../controllers/reviewController");
const authMiddleware = require('../middlewares/authMiddleware');
const router = express.Router();

router.post('/', authMiddleware, reviewController.createReview);
router.get('/game/:gameId', reviewController.getReviewsByGame);
router.get('/user/:userId', reviewController.getReviewsByUser);

module.exports = router;
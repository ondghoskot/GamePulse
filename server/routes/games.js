const express = require("express");
const gameController = require("../controllers/gameController");
const router = express.Router();

//router for our game method endpoints
router.get("/games", gameController.getGames);
router.get("/most-played", gameController.getMostPlayed);
router.get("/top-rated", gameController.getTopRated);
router.get("/games/:id", gameController.getGameDetails);
router.get("/games/results", gameController.searchGames);

module.exports = router;
const express = require("express");
const gameController = require("../controllers/gameController");
const router = express.Router();

router.get("/games", gameController.getGames);
router.get("/most-played", gameController.getMostPlayed);
router.get("/top-rated", gameController.getTopRated);
router.get("/games/:gameId", gameController.getGameDetails);
// router.get("/search", gameController.searchGames);

module.exports = router;
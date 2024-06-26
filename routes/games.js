const express = require("express");
const gameController = require("../controllers/gameController");
const router = express.Router();

router.get("/games", gameController.getGames);
router.get("/games/:gameId", gameController.getGameDetails);
// router.get("/search", gameController.searchGames);

module.exports = router;
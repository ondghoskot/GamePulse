const express = require("express");
const gameController = require("../controllers/gameController");
const router = express.Router();

router.get("/titles", gameController.titles);
// router.get("/genres", gameController.genres);

module.exports = router;
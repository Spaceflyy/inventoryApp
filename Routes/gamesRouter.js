const { Router } = require("express");
const router = Router();
const gamesController = require("../Controllers/gamesController");

router.get("/", gamesController.getGames);

module.exports = router;

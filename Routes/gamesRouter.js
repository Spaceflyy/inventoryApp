const { Router } = require("express");
const router = Router();
const gamesController = require("../Controllers/gamesController");

router.get("/", gamesController.home);
router.get("/games", gamesController.getGames);
router.get("/genres", gamesController.getGenres);
router.get("/platforms", gamesController.getPlatforms);
router.get("/developers", gamesController.getDevelopers);
router.get("/developers/:dev", gamesController.getGamesByDev);
router.get("/genres/:genre", gamesController.getGamesByGenre);

module.exports = router;

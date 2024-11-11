const { Router } = require("express");
const router = Router();
const gamesController = require("../Controllers/gamesController");

router.get("/", gamesController.home);
router.get("/games", gamesController.getGames);
router.get("/genres", gamesController.getGenres);
router.get("/developers", gamesController.getDevelopers);
router.get("/developers/:dev", gamesController.getGamesByDev);
router.get("/genres/:genre", gamesController.getGamesByGenre);
router.get("/search", gamesController.gameSearchGet);
router.post("/delete/:id", gamesController.deleteGame);
router.get("/update/:id", gamesController.updateGameGet);

router.post("/update/:id", gamesController.updateGamePost);
module.exports = router;

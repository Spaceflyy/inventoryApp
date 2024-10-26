const { Router } = require("express");
const router = Router();
const gamesController = require("../Controllers/gamesController");

router.get("/game", gamesController.addGame);
router.get("/genre", gamesController.addGenre);
router.get("/platform", gamesController.addPlatform);
router.get("/developer", gamesController.addDeveloper);
module.exports = router;

const { Router } = require("express");
const router = Router();
const gamesController = require("../Controllers/gamesController");

router.get("/", gamesController.addGame);

module.exports = router;

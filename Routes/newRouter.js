const { Router } = require("express");
const gamesController = require("../Controllers/gamesController");
const router = Router();
router.post("/", gamesController.addGame);
router.get("/game", (req, res) => {
	res.render("form", { title: "Add Game", item: "game", action: "new" });
});

module.exports = router;

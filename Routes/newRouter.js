const { Router } = require("express");
const gamesController = require("../Controllers/gamesController");
const router = Router();
router.post("/", gamesController.addGame);
router.get("/game", (req, res) => {
	res.render("form", { title: "Add Game" });
});

module.exports = router;

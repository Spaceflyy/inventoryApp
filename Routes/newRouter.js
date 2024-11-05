const { Router } = require("express");
const gamesController = require("../Controllers/gamesController");
const router = Router();
router.post("/", gamesController.addGame);

router.get("/game", (req, res) => {
	res.render("form", { title: "Add Game", item: "game" });
});
router.get("/genre", (req, res) => {
	res.render("form", { title: "Add Game", item: "genre" });
});
router.get("/developer", (req, res) => {
	res.render("form", { title: "Add Game", item: "developer" });
});

module.exports = router;

const db = require("../db/queries");
exports.home = (req, res) => {
	res.render("index", { title: "Home" });
};

exports.getGames = async (req, res) => {
	const games = await db.getAllGames();
	res.render("viewCategory", { title: "All Games", items: games, type: "game" });
};
exports.getGenres = async (req, res) => {
	const genres = await db.getAllGenres();

	res.render("viewCategory", {
		title: "All Genres",
		items: genres,
		type: "genre",
	});
};

exports.getDevelopers = async (req, res) => {
	const developers = await db.getAllDevelopers();
	res.render("viewCategory", {
		title: "All Developers",
		items: developers,
		type: "developer",
	});
};

exports.getPlatforms = async (req, res) => {
	res.render("viewCategory", { title: "All Platforms" });
};

exports.addGame = async (req, res) => {
	const gameData = {
		name: req.body.gameName,
		developer: req.body.developer,
		releaseDate: req.body.releaseDate,
		genre: req.body.genre,
	};

	await db.insertGame(gameData);
	res.redirect("/");
};

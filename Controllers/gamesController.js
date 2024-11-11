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

exports.getGamesByDev = async (req, res) => {
	const { dev } = req.params;
	const games = await db.getDevGames(dev);
	res.render("viewCategory", {
		title: `Games by ${dev}`,
		items: games,
		type: "game",
	});
};

exports.getGamesByGenre = async (req, res) => {
	const { genre } = req.params;
	const games = await db.getGenreGames(genre);
	res.render("viewCategory", {
		title: `${genre} games`,
		items: games,
		type: "game",
	});
};

exports.addGame = async (req, res) => {
	const gameData = {
		name: req.body.gameName,
		developer: req.body.developer,
		releaseDate: req.body.releaseDate,
		genre: req.body.genre,
	};

	await db.insertGame(gameData);
	res.redirect("/games");
};

exports.gameSearchGet = async (req, res) => {
	const results = await db.search(req.query.searchTerm, req.query.searchTable);

	res.render("viewCategory", {
		title: `Results for "${req.query.searchTerm}" in ${req.query.searchTable}s`,
		items: results,
		type: req.query.searchTable,
	});
};

exports.deleteGame = async (req, res) => {
	const { id } = req.params;
	db.deleteGame(id);
	res.redirect("/games");
};

exports.updateGameGet = async (req, res) => {
	const game = await db.getSingleGame(req.params.id);
	res.render("updateGame", {
		title: "Update Game",
		item: game[0],
	});
};

exports.updateGamePost = async (req, res) => {
	const game_id = req.params.id;
	const name = req.body.gameName;
	const developer = req.body.developer;
	const date = req.body.releaseDate;
	const genre = req.body.genre;
	await db.updateGame(game_id, name, genre, developer, date);
	res.redirect("/games");
};

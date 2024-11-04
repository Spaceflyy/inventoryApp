const pool = require("./pool");

const getAllGames = async () => {
	const { rows } = await pool.query("SELECT * FROM games");
	return rows;
};

const getAllGenres = async () => {
	const { rows } = await pool.query("SELECT * FROM genres");
	return rows;
};

const getAllDevelopers = async () => {
	const { rows } = await pool.query("SELECT * FROM developers");
	return rows;
};

const insertGame = async (game) => {
	const { name, developer, releaseDate, genre } = game;

	await pool.query(
		"INSERT INTO games (game_name, release_date) VALUES ($1,$2)",
		[name, releaseDate]
	);
	const { rows } = await pool.query(
		"SELECT id FROM games WHERE game_name = ($1)",
		[name]
	);

	const gameid = Number(rows[0].id);

	await pool.query(
		"INSERT INTO developers (game_id, developer) VALUES ($1,$2)",
		[gameid, developer]
	);

	await pool.query("INSERT INTO genres (game_id, genre) VALUES ($1,$2)", [
		gameid,
		genre,
	]);
};

const getDevGames = async (dev) => {
	const { rows } = await pool.query(
		"SELECT games.id, game_name, release_date, developer FROM games JOIN developers ON games.id = developers.game_id WHERE developer = ($1);",
		[dev]
	);
	return rows;
};

const getGenreGames = async (genre) => {
	const { rows } = await pool.query(
		"SELECT games.id, game_name, release_date, genre FROM games JOIN genres ON games.id = genres.game_id WHERE genre = ($1);",
		[genre]
	);
	return rows;
};

module.exports = {
	getAllGames,
	getAllGenres,
	insertGame,
	getAllDevelopers,
	getDevGames,
	getGenreGames,
};

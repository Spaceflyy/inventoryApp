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

module.exports = {
	getAllGames,
	getAllGenres,
	insertGame,
	getAllDevelopers,
};

const pool = require("./pool");

const getAllGames = async () => {
	const { rows } = await pool.query("SELECT * FROM games");
	return rows;
};

const getSingleGame = async (id) => {
	const { rows } = await pool.query(
		"SELECT games.id, game_name, TO_CHAR(release_date, 'yyyy-mm-dd') as release_date, developer,genre FROM games JOIN developers ON games.id = developers.game_id JOIN genres ON games.id = genres.game_id WHERE games.id = ($1)",
		[id]
	);
	return rows;
};

const getAllGenres = async () => {
	const { rows } = await pool.query(
		"SELECT genre, COUNT (*) FROM genres GROUP BY genre"
	);
	return rows;
};

const getAllDevelopers = async () => {
	const { rows } = await pool.query(
		"SELECT developer, COUNT (*) FROM developers GROUP BY developer"
	);
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

const search = async (query, searchTable) => {
	if (searchTable === "game") {
		const { rows } = await pool.query(
			"SELECT * FROM games WHERE game_name ILIKE ($1)",
			[query + "%"]
		);

		return rows;
	}
	if (searchTable === "developer") {
		const { rows } = await pool.query(
			"SELECT DISTINCT developer , COUNT (*) FROM developers WHERE developer ILIKE ($1) GROUP BY developer",
			[query + "%"]
		);

		return rows;
	}
	if (searchTable === "genre") {
		const { rows } = await pool.query(
			"SELECT DISTINCT genre, COUNT (*) FROM genres WHERE genre ILIKE ($1) GROUP BY genre",
			[query + "%"]
		);

		return rows;
	}
};

const deleteGame = async (id) => {
	await pool.query("DELETE FROM games WHERE id = ($1)", [id]);
};

const updateGame = async (id, game_name, genre, developer, release_date) => {
	await pool.query(
		"UPDATE games SET game_name = ($1), release_date = ($2) WHERE id = ($3)  ",
		[game_name, release_date, id]
	);
	await pool.query("UPDATE genres SET genre = ($1) WHERE game_id = ($2)  ", [
		genre,
		id,
	]);

	await pool.query(
		"UPDATE developers SET developer = ($1) WHERE game_id = ($2)  ",
		[developer, id]
	);
};

module.exports = {
	getAllGames,
	getAllGenres,
	insertGame,
	getAllDevelopers,
	getDevGames,
	getGenreGames,
	search,
	deleteGame,
	getSingleGame,
	updateGame,
};

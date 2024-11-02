#! /usr/bin/env node

const { Client } = require("pg");
require("dotenv").config();
const SQL = `

CREATE TABLE IF NOT EXISTS games (id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY, 
game_name VARCHAR (255), 
release_date DATE);

CREATE TABLE  IF NOT EXISTS genres (id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY, 
game_id INTEGER REFERENCES games (id) ON DELETE CASCADE, 
genre VARCHAR (255));

CREATE TABLE IF NOT EXISTS developers (id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY, 
game_id INTEGER REFERENCES games (id) ON DELETE CASCADE, 
developer VARCHAR (255));

INSERT INTO games (game_name, release_date)
VALUES ('Crash Bandicoot', '09/09/1996'),
('Resident Evil 2 (2019)', '25/01/2019');

INSERT INTO genres (game_id, genre)
VALUES (1, 'Platformer'),
(2, 'Survival Horror');

INSERT INTO developers (game_id, developer)
VALUES (1, 'Naughty Dog'),
(2, 'Capcom');

`;

async function main() {
	console.log("seeding...");
	const client = new Client({
		connectionString: `postgresql://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/inventory`,
	});
	await client.connect();
	await client.query(SQL);
	await client.end();
	console.log("done");
}

main();

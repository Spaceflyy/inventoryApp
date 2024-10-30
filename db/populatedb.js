#! /usr/bin/env node

// CREATE TABLE games (id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY, game_name VARCHAR (255), release_date DATE);
// CREATE TABLE genres (id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY, game_id INTEGER REFERENCES games (id), genre VARCHAR (255));
// CREATE TABLE developers (id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY, game_id INTEGER REFERENCES games (id), developer VARCHAR (255));

const { Client } = require("pg");
require("dotenv").config();
const SQL = `
CREATE TABLE games (id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY, 
game_name VARCHAR (255), 
release_date DATE);

CREATE TABLE genres (id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY, 
game_id INTEGER REFERENCES games (id), 
genre VARCHAR (255));

CREATE TABLE developers (id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY, 
game_id INTEGER REFERENCES games (id), 
developer VARCHAR (255));

`;

async function main() {
	console.log("seeding...");
	const client = new Client({
		connectionString: `postgresql://${process.env.DB_ROLE}:${process.env.DB_PASSWORD}@localhost:5432/inventory`,
	});
	await client.connect();
	await client.query(SQL);
	await client.end();
	console.log("done");
}

main();

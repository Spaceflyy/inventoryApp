const { Pool } = require("pg");
require("dotenv").config();
// Again, this should be read from an environment variable
module.exports = new Pool({
	connectionString: `postgresql://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/inventory`,
});

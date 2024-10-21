const express = require("express");
const path = require("node:path");

const app = express();
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
	res.send("Hello World");
});

app.listen(3000, () => console.log(`Server listening on port 3000`));

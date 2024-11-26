const express = require("express");
const path = require("node:path");
const app = express();
app.use(express.static(path.join(__dirname, "assets")));
app.set("views", path.join(__dirname, "views"));

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

const gamesRouter = require("./Routes/gamesRouter");
const newRouter = require("./Routes/newRouter");
app.use("/new", newRouter);
app.use("/", gamesRouter);

app.listen(3000, () => console.log(`Server listening on port 3000`));

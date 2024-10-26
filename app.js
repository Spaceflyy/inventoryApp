const express = require("express");
const path = require("node:path");
const app = express();
app.set("views", path.join(__dirname, "views"));
const assetpath = path.join(__dirname, "assets");
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));

const gamesRouter = require("./Routes/gamesRouter");
const newRouter = require("./Routes/newRouter");
app.use("/", gamesRouter);
app.use("/new", newRouter);
app.listen(3000, () => console.log(`Server listening on port 3000`));

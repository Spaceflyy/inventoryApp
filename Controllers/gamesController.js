exports.getGames = (req, res) => {
	res.render("index", { title: "Home" });
};

exports.addGame = (req, res) => {
	res.render("form", { item: "game" });
};
exports.addGenre = (req, res) => {
	res.render("form", { item: "genre" });
};
exports.addPlatform = (req, res) => {
	res.render("form", { item: "platform" });
};
exports.addDeveloper = (req, res) => {
	res.render("form", { item: "developer" });
};

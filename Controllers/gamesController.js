exports.home = (req, res) => {
	res.render("index", { title: "Home" });
};

exports.getGames = (req, res) => {
	res.render("viewCategory", { title: "All Games" });
};
exports.getGenres = (req, res) => {
	res.render("viewCategory", { title: "All Genres" });
};
exports.getPlatforms = (req, res) => {
	res.render("viewCategory", { title: "All Platforms" });
};
exports.getDevelopers = (req, res) => {
	res.render("viewCategory", { title: "All Developers" });
};

exports.addGame = (req, res) => {
	res.render("form", { title: "Add Game", item: "game" });
};
exports.addGenre = (req, res) => {
	res.render("form", { title: "Add Genre", item: "genre" });
};
exports.addPlatform = (req, res) => {
	res.render("form", { title: "Add Playform", item: "platform" });
};
exports.addDeveloper = (req, res) => {
	res.render("form", { title: "Add Developer", item: "developer" });
};

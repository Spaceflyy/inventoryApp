exports.getGames = (req, res) => {
	res.render("index", { title: "Home" });
};

exports.addGame = (req, res) => {
	console.log("Game added here");
	res.redirect("/");
};

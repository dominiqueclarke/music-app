const mongoose = require("mongoose");

const Artist = new mongoose.Schema({
	name: {
		type: String
	},
	songPreviews: Array,
	fbID: {
		type: String
	}
});

module.exports = mongoose.model("Artist", Artist);
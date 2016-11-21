const Artist = require("./Artist");
const mongoose = require("mongoose");

module.exports = {
	artistExists(req, res, next) {
		Artist.findOne({
			name: req.body.name
		}, (err, artist) => {
			if (err) {
				return res.status(500).json(err);
			}
			if (artist) {
				return res.status(200).json(artist);
			}
			next();
		});
	},
	postNewArtist(req, res) {
		new Artist(req.body).save((err, artist) => {
			if (err) {
				console.log(err);
				return res.status(500).json(err);
			} else {
				return res.status(200).json(artist)
			}
		});
	}
}
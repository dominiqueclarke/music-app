const artistCtrl = require("./artistCtrl.js");

module.exports = app => {
	app.post('/api/artist', artistCtrl.artistExists, artistCtrl.postNewArtist);
}
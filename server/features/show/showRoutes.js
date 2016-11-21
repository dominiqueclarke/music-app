const showCtrl = require("./showCtrl.js");

module.exports = app => {
	app.get('/api/shows/:zip', showCtrl.getShows);
	app.post('/api/shows', showCtrl.showExists, showCtrl.postNewShow);
}
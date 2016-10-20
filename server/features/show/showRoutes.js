const showCtrl = require("./showCtrl.js");

module.exports = app => {
  app.post('/api/shows', showCtrl.showExists, showCtrl.postNewShow);
}

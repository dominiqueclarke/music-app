const userRoutes = require("./features/user/userRoutes");
const artistRoutes = require("./features/artist/artistRoutes");
const showRoutes = require("./features/show/showRoutes")

module.exports = app => {
  userRoutes(app);
  artistRoutes(app);
  showRoutes(app);
}

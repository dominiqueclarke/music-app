const userRoutes = require("./features/user/userRoutes");
const artistRoutes = require("./features/artist/artistRoutes");

module.exports = app => {
  userRoutes(app);
  artistRoutes(app);
}

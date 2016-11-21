// const userCtrl = require('./userCtrl');
//
// module.exports = app => {
//
//   app.route("/api/user/:fbID")
//     .get(userCtrl.getUserByFbId);
//
// }

const userCtrl = require('./userCtrl.js');
const passport = require('passport');

module.exports = app => {
  app.get('/auth/facebook',
    passport.authenticate(
        'facebook',
        {authType: 'rerequest', scope: ['email']}
    )
  );

  app.get('/auth/facebook/callback',
    passport.authenticate(
      'facebook',
      {successRedirect: '/#/shows', failureRedirect: '/login'}
    )
  );

  app.get('/me',
    userCtrl.getUserIfExists
    , userCtrl.createUser
  );

  app.put('/api/users/:id', userCtrl.updateUser);

  app.put('/api/users/:id/addShow', userCtrl.pushShow);

  app.put('/api/users/:id/removeShow', userCtrl.pullShow);
}

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
const middleware = require('../middleware/middleware.js');

module.exports = app => {
  app.get('/auth/facebook',
    passport.authenticate(
        'facebook',
        {authType: 'rerequest', scope: ['user_friends', 'user_likes', 'email']}
    )
  );

  app.get('/auth/facebook/callback',
    passport.authenticate(
      'facebook',
      {successRedirect: '/#/shows', failureRedirect: '/login'}
    )
  );

  app.get('/me',
    userCtrl.userExists
    , userCtrl.getUserFBMusicLikes
    , userCtrl.saveFBMusicLikes
    , userCtrl.createUser
  )
	// //Auth 0 callback handler
	// app.get(
	// 	'/auth/facebook/callback',
	// 	passport.authenticate('facebook', { failureRedirect: '/' })
	// 	, userCtrl.userExists
	// 	//userCtrl.createUser
	// );
	// app.get( '/api/user', middleware, userCtrl.getAuthUser );
  //
	// // GET REQUEST
	// app.get( '/api/users', middleware, userCtrl.getUsers );
	// app.get( '/api/users/:id', middleware, userCtrl.getThisUser );
  //
	// // PUT REQUEST
	// app.put( '/api/users/:id', middleware, userCtrl.editUser );
  //
	// // DELETE REQUEST
	// app.delete( '/api/users/:id', middleware, userCtrl.deleteUser );
}
